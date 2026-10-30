-- Demo content only. Replace every answer and story before launch.
create table public.quiz_questions (
  id smallint primary key check (id between 0 and 16),
  prompt_ru text not null,
  prompt_en text not null,
  answer text not null check (answer in ('sasha','lera')),
  story_ru text not null,
  story_en text not null
);

create table public.quiz_attempts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 30),
  cursor smallint not null default 0 check (cursor between 0 and 16),
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.quiz_answers (
  user_id uuid not null references public.quiz_attempts(user_id) on delete cascade,
  question_id smallint not null references public.quiz_questions(id),
  choice text not null check (choice in ('sasha','lera')),
  correct boolean not null,
  created_at timestamptz not null default now(),
  primary key (user_id,question_id)
);

alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_answers enable row level security;
revoke all on public.quiz_questions,public.quiz_attempts,public.quiz_answers from anon,authenticated;

insert into public.quiz_questions(id,prompt_ru,prompt_en,answer,story_ru,story_en) values
(0,'Кто старше?','Who was born first?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(1,'Кто не ест рыбу?','Who doesn’t eat fish?','lera','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(2,'Кто картавит?','Who has trouble pronouncing the Russian “R”?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(3,'Кто засунул себе батарейку в нос?','Who stuck a battery up her nose?','lera','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(4,'У кого есть крестник?','Who has a godson?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(5,'У кого более высокий уровень образования?','Who has the higher academic qualification?','lera','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(6,'У кого первой появился парень?','Who had a boyfriend first?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(7,'Кто тайно поженился?','Who eloped?','lera','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(8,'У кого было три сотрясения мозга?','Who has had three concussions?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(9,'Кому сделали операцию под именем сестры?','Who had surgery under her twin’s name?','lera','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(10,'У кого лучшее время на 5 и 10 км?','Who has the faster 5K and 10K personal bests?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(11,'У кого есть список на все случаи жизни?','Who has a list for every occasion?','lera','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(12,'Кого в 14 лет задержали за распитие алкоголя?','Who was detained for drinking alcohol at 14?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(13,'Кто принес наркотики на наше 16-летие?','Who brought drugs to our 16th birthday party?','lera','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(14,'Кто первой сделал татуировку?','Who got a tattoo first?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(15,'Кто знает больше языков? Считаем и языки программирования!','Who knows more languages? Programming languages count!','lera','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.'),
(16,'Кто пропускал школу, пока родители не узнали?','Who skipped school until our parents found out?','sasha','Здесь будет настоящая история от Саши и Леры. Ответ выбран только для тестирования игры.','Sasha and Val’s real story will go here. This answer is only a placeholder for testing.');

create or replace function public.quiz_state() returns jsonb
language plpgsql security definer set search_path=public,pg_temp as $$
declare uid uuid:=auth.uid();a public.quiz_attempts%rowtype;q public.quiz_questions%rowtype;ans public.quiz_answers%rowtype;score integer;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  select * into a from public.quiz_attempts where user_id=uid;
  if not found then return null; end if;
  select count(*) filter(where correct) into score from public.quiz_answers where user_id=uid;
  if a.completed_at is null then
    select * into q from public.quiz_questions where id=a.cursor;
    select * into ans from public.quiz_answers where user_id=uid and question_id=a.cursor;
  end if;
  return jsonb_build_object(
    'name',a.name,'cursor',a.cursor,'total',17,'score',score,'done',a.completed_at is not null,
    'question',case when a.completed_at is null then jsonb_build_object('id',q.id,'text',jsonb_build_object('ru',q.prompt_ru,'en',q.prompt_en)) else null end,
    'reveal',case when ans.user_id is not null then jsonb_build_object('choice',ans.choice,'correct',case when ans.correct then 1 else 0 end,'person',q.answer,'story',jsonb_build_object('ru',q.story_ru,'en',q.story_en)) else null end
  );
end $$;

create or replace function public.quiz_restore() returns jsonb
language sql security definer set search_path=public,pg_temp as $$ select public.quiz_state() $$;

create or replace function public.quiz_start(p_name text) returns jsonb
language plpgsql security definer set search_path=public,pg_temp as $$
declare uid uuid:=auth.uid();clean_name text:=left(btrim(regexp_replace(coalesce(p_name,''),'[[:cntrl:]]','','g')),30);
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if clean_name='' then raise exception 'Name is required'; end if;
  insert into public.quiz_attempts(user_id,name) values(uid,clean_name) on conflict(user_id) do nothing;
  return public.quiz_state();
end $$;

create or replace function public.quiz_answer(p_question integer,p_choice text) returns jsonb
language plpgsql security definer set search_path=public,pg_temp as $$
declare uid uuid:=auth.uid();a public.quiz_attempts%rowtype;right_answer text;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  if p_choice not in ('sasha','lera') then raise exception 'Invalid choice'; end if;
  select * into a from public.quiz_attempts where user_id=uid for update;
  if not found then raise exception 'Attempt not found'; end if;
  if a.completed_at is not null then return public.quiz_state(); end if;
  if a.cursor<>p_question then raise exception 'Stale question'; end if;
  select answer into right_answer from public.quiz_questions where id=a.cursor;
  insert into public.quiz_answers(user_id,question_id,choice,correct)
  values(uid,a.cursor,p_choice,p_choice=right_answer) on conflict do nothing;
  return public.quiz_state();
end $$;

create or replace function public.quiz_advance(p_question integer) returns jsonb
language plpgsql security definer set search_path=public,pg_temp as $$
declare uid uuid:=auth.uid();a public.quiz_attempts%rowtype;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  select * into a from public.quiz_attempts where user_id=uid for update;
  if not found then raise exception 'Attempt not found'; end if;
  if a.completed_at is not null then return public.quiz_state(); end if;
  if a.cursor<>p_question then return public.quiz_state(); end if;
  if not exists(select 1 from public.quiz_answers where user_id=uid and question_id=a.cursor) then raise exception 'Answer first'; end if;
  update public.quiz_attempts set cursor=case when cursor<16 then cursor+1 else cursor end,
    completed_at=case when cursor=16 then now() else null end where user_id=uid;
  return public.quiz_state();
end $$;

create or replace function public.quiz_leaderboard() returns jsonb
language sql security definer set search_path=public,pg_temp as $$
  select coalesce(jsonb_agg(to_jsonb(r) order by r.score desc,r.completed asc),'[]'::jsonb)
  from (select a.name,count(*) filter(where b.correct)::integer score,a.completed_at::text completed
        from public.quiz_attempts a left join public.quiz_answers b on b.user_id=a.user_id
        where a.completed_at is not null group by a.user_id order by score desc,a.completed_at asc limit 100) r
$$;

revoke all on function public.quiz_state() from public,anon,authenticated;
grant execute on function public.quiz_restore(),public.quiz_start(text),public.quiz_answer(integer,text),public.quiz_advance(integer),public.quiz_leaderboard() to authenticated;
