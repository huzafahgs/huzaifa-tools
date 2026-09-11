-- Additive AI Batch 1 migration. Does not modify Accounts V1 policies or auth.
begin;
insert into public.account_tool_catalog (slug) values
 ('ai-text-summarizer'), ('ai-writing-assistant'), ('ai-grammar-rewrite'),
 ('ai-email-generator'), ('ai-prompt-generator') on conflict do nothing;

-- Bounded metadata only: one row per user, plus one global row. No prompt/output.
create table public.ai_usage (
 user_id uuid primary key references auth.users(id) on delete cascade,
 usage_day date not null,
 requests integer not null check (requests between 0 and 10),
 last_request timestamptz not null
);
create table public.ai_daily_budget (
 singleton boolean primary key default true check (singleton),
 usage_day date not null,
 requests integer not null check (requests between 0 and 200)
);
insert into public.ai_daily_budget values (true, (now() at time zone 'UTC')::date, 0);
alter table public.ai_usage enable row level security;
alter table public.ai_usage force row level security;
alter table public.ai_daily_budget enable row level security;
alter table public.ai_daily_budget force row level security;
revoke all on public.ai_usage, public.ai_daily_budget from public, anon, authenticated;

create function public.consume_ai_quota() returns boolean
language plpgsql security definer set search_path = '' as $$
declare
 uid uuid := auth.uid();
 today date := (clock_timestamp() at time zone 'UTC')::date;
 requested_at timestamptz := clock_timestamp();
 used public.ai_usage%rowtype;
 budget public.ai_daily_budget%rowtype;
begin
 if uid is null or not exists (select 1 from auth.users where id = uid and email_confirmed_at is not null and not coalesce(is_anonymous, false)) then return false; end if;
 -- A single locked row serializes reservations across all workers.
 select * into budget from public.ai_daily_budget where singleton = true for update;
 if not found then return false; end if;
 if budget.usage_day <> today then
   update public.ai_daily_budget set usage_day = today, requests = 0 where singleton = true;
   budget.requests := 0;
 end if;
 if budget.requests >= 200 then return false; end if;
 select * into used from public.ai_usage where user_id = uid for update;
 if found and (used.last_request > requested_at - interval '30 seconds' or (used.usage_day = today and used.requests >= 10)) then return false; end if;
 insert into public.ai_usage values (uid, today, 1, requested_at)
 on conflict (user_id) do update set usage_day = today,
   requests = case when public.ai_usage.usage_day = today then public.ai_usage.requests + 1 else 1 end,
   last_request = requested_at;
 update public.ai_daily_budget set requests = requests + 1 where singleton = true;
 return true;
end;
$$;
revoke all on function public.consume_ai_quota() from public, anon;
grant execute on function public.consume_ai_quota() to authenticated;
-- Public capability flag only; reveals no user data and consumes no quota.
create function public.ai_tools_ready() returns boolean
language sql stable set search_path = '' as $$ select true $$;
revoke all on function public.ai_tools_ready() from public;
grant execute on function public.ai_tools_ready() to anon, authenticated;
commit;
