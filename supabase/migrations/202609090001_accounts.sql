-- Huzaifa Accounts V1. Run as the project database owner in Supabase SQL Editor.
begin;

create table public.account_tool_catalog (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
alter table public.account_tool_catalog enable row level security;
create policy catalog_read on public.account_tool_catalog for select to authenticated using (true);
revoke all on public.account_tool_catalog from public, anon, authenticated;
grant select on public.account_tool_catalog to authenticated;

create table public.account_profiles (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.account_favorites (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tool_slug text not null references public.account_tool_catalog(slug),
  created_at timestamptz not null default now(),
  primary key (user_id, tool_slug)
);
create table public.account_history (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tool_slug text not null references public.account_tool_catalog(slug),
  visited_at timestamptz not null default now(),
  primary key (user_id, tool_slug)
);
create index account_history_recent on public.account_history (user_id, visited_at desc);

create function public.account_server_timestamps() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_table_name = 'account_history' then
    new.visited_at := now();
  else
    new.updated_at := now();
    if tg_op = 'INSERT' then new.created_at := now();
    else new.created_at := old.created_at; end if;
  end if;
  return new;
end;
$$;
revoke all on function public.account_server_timestamps() from public;
create trigger account_history_clock before insert or update on public.account_history
for each row execute function public.account_server_timestamps();
create trigger account_profile_clock before insert or update on public.account_profiles
for each row execute function public.account_server_timestamps();

alter table public.account_profiles enable row level security;
alter table public.account_profiles force row level security;
alter table public.account_favorites enable row level security;
alter table public.account_favorites force row level security;
alter table public.account_history enable row level security;
alter table public.account_history force row level security;

-- JWT identity is evaluated by Postgres. A client-supplied user_id is not authority.
create policy own_profile on public.account_profiles for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy own_favorites on public.account_favorites for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy own_history on public.account_history for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

revoke all on public.account_profiles, public.account_favorites, public.account_history from public, anon, authenticated;
grant select, delete on public.account_profiles, public.account_favorites, public.account_history to authenticated;
grant insert (user_id, display_name), update (user_id, display_name) on public.account_profiles to authenticated;
grant insert (user_id, tool_slug), update (user_id, tool_slug) on public.account_favorites, public.account_history to authenticated;

-- Catalog seed follows. Keeping history limited to this catalog bounds it to 100 rows/user.
insert into public.account_tool_catalog (slug) values
('word-counter'),
('character-counter'),
('text-case-converter'),
('text-reverser'),
('json-formatter'),
('base64-converter'),
('url-encoder'),
('url-slug-generator'),
('morse-code-converter'),
('csv-to-json'),
('password-generator'),
('md5-hash'),
('sha256-hash'),
('uuid-generator'),
('qr-code-generator'),
('qr-code-scanner'),
('color-picker'),
('gradient-generator'),
('bmi-calculator'),
('age-calculator'),
('loan-calculator'),
('emi-calculator'),
('percentage-calculator'),
('simple-interest'),
('compound-interest'),
('tip-calculator'),
('discount-calculator'),
('markup-calculator'),
('vat-calculator'),
('gpa-calculator'),
('factorial-calculator'),
('unit-converter'),
('temperature-converter'),
('weight-converter'),
('length-converter'),
('volume-converter'),
('area-converter'),
('speed-converter'),
('energy-converter'),
('currency-converter'),
('stopwatch'),
('timer'),
('time-calculator'),
('uptime-calculator'),
('prime-checker'),
('fibonacci-generator'),
('roman-numeral'),
('hex-to-decimal'),
('decimal-to-binary'),
('binary-to-decimal'),
('hex-to-rgb'),
('rgb-to-hex'),
('distance-calculator'),
('text-to-speech'),
('screen-resolution'),
('image-compressor'),
('regex-tester'),
('jwt-decoder'),
('unix-timestamp-converter'),
('html-entity-converter'),
('lorem-ipsum-generator'),
('password-strength-checker'),
('css-minifier'),
('javascript-minifier'),
('meta-tag-generator'),
('robots-txt-generator'),
('xml-formatter'),
('xml-to-json'),
('json-to-xml'),
('html-formatter'),
('sql-formatter'),
('url-parser'),
('cron-expression-generator'),
('hmac-generator'),
('text-diff-checker'),
('color-contrast-checker'),
('mortgage-calculator'),
('roi-calculator'),
('budget-calculator'),
('commission-calculator'),
('retirement-calculator'),
('bmr-calculator'),
('calorie-calculator'),
('ideal-weight-calculator'),
('grade-calculator'),
('pace-calculator'),
('pdf-merger'),
('pdf-splitter'),
('pdf-page-extractor'),
('images-to-pdf'),
('pdf-to-images'),
('image-resizer'),
('image-cropper'),
('image-converter'),
('image-metadata-viewer'),
('image-rotate-flip'),
('json-to-csv'),
('html-minifier'),
('css-formatter'),
('javascript-formatter');
commit;
