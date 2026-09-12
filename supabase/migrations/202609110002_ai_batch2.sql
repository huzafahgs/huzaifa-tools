-- Apply after 202609110001_ai_tools.sql. Add catalog entries only; quotas/RLS unchanged.
begin;
do $$ begin
 if to_regprocedure('public.consume_ai_quota()') is null then
   raise exception 'Apply AI Batch 1 migration before AI Batch 2';
 end if;
end $$;
insert into public.account_tool_catalog (slug) values
 ('ai-paraphraser'), ('ai-blog-outline-generator'), ('ai-title-generator'),
 ('ai-social-caption-generator'), ('ai-product-description-generator'),
 ('ai-resume-bullet-generator'), ('ai-cover-letter-assistant'),
 ('ai-study-notes-generator'), ('ai-faq-generator'), ('ai-code-explainer')
on conflict do nothing;
create function public.ai_batch2_ready() returns boolean
language sql stable set search_path = '' as $$ select true $$;
revoke all on function public.ai_batch2_ready() from public;
grant execute on function public.ai_batch2_ready() to anon, authenticated;
commit;
