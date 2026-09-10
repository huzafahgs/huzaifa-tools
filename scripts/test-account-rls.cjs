const fs = require("fs");
const { PGlite } = require(process.env.PGLITE_MODULE || "@electric-sql/pglite");
const assert = require("node:assert/strict");
(async () => {
  const db = new PGlite();
  await db.exec(
    `create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true),'')::uuid $$; grant usage on schema auth, public to authenticated, anon; grant execute on function auth.uid() to authenticated, anon;`,
  );
  await db.exec(
    fs.readFileSync(
      require("node:path").join(
        __dirname,
        "../supabase/migrations/202609090001_accounts.sql",
      ),
      "utf8",
    ),
  );
  const a = "11111111-1111-4111-8111-111111111111",
    b = "22222222-2222-4222-8222-222222222222";
  await db.exec(`insert into auth.users values ('${a}'),('${b}');`);
  let checks = 0;
  const as = async (id) =>
    db.exec(
      `reset role; set role authenticated; select set_config('request.jwt.claim.sub','${id}',false);`,
    );
  const denied = async (sql) => {
    await assert.rejects(db.exec(sql));
    checks++;
  };
  for (const id of [a, b]) {
    await as(id);
    await db.exec(
      `insert into public.account_profiles(display_name) values ('User'); insert into public.account_favorites(tool_slug) values ('word-counter'); insert into public.account_history(tool_slug) values ('word-counter');`,
    );
  }
  await as(a);
  for (const table of [
    "account_profiles",
    "account_favorites",
    "account_history",
  ]) {
    assert.equal(
      (await db.query(`select * from public.${table}`)).rows.length,
      1,
    );
    assert.equal(
      (await db.query(`select * from public.${table} where user_id='${b}'`))
        .rows.length,
      0,
    );
    assert.equal(
      (
        await db.query(
          `delete from public.${table} where user_id='${b}' returning *`,
        )
      ).rows.length,
      0,
    );
    await denied(
      `update public.${table} set user_id='${b}' where user_id='${a}'`,
    );
    checks += 3;
  }
  await denied(
    `insert into public.account_profiles(user_id,display_name) values ('${b}','intrusion') on conflict(user_id) do update set display_name=excluded.display_name`,
  );
  for (const table of ["account_favorites", "account_history"]) {
    await denied(
      `insert into public.${table}(user_id,tool_slug) values ('${b}','json-formatter')`,
    );
    await denied(
      `insert into public.${table}(tool_slug) values ('private-input')`,
    );
  }
  await denied(`update public.account_history set visited_at='2099-01-01'`);
  await denied(`update public.account_profiles set created_at='2099-01-01'`);
  await denied(
    `insert into public.account_profiles(display_name) values (repeat('x',81)) on conflict(user_id) do update set display_name=excluded.display_name`,
  );
  await db.exec(
    `insert into public.account_history(user_id,tool_slug) values ('${a}','word-counter') on conflict(user_id,tool_slug) do update set tool_slug=excluded.tool_slug;`,
  );
  assert.equal(
    (await db.query("select * from public.account_history")).rows.length,
    1,
  );
  checks++;
  await db.exec("reset role; set role anon;");
  for (const table of [
    "account_profiles",
    "account_favorites",
    "account_history",
  ])
    await denied(`select * from public.${table}`);
  await db.exec(`reset role; delete from auth.users where id='${a}';`);
  for (const table of [
    "account_profiles",
    "account_favorites",
    "account_history",
  ]) {
    assert.equal(
      (await db.query(`select * from public.${table}`)).rows.length,
      1,
    );
    checks++;
  }
  console.log(
    JSON.stringify({
      checks,
      result: "PASS",
      engine: "PGlite PostgreSQL; auth.uid JWT fixture, not hosted Supabase",
    }),
  );
  await db.close();
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
