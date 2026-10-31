-- Real birthday content: 18 questions (ids 0–17). Clears demo attempts/answers.

truncate public.quiz_answers;
truncate public.quiz_attempts;

alter table public.quiz_questions drop constraint if exists quiz_questions_id_check;
alter table public.quiz_questions add constraint quiz_questions_id_check check (id between 0 and 17);

alter table public.quiz_attempts drop constraint if exists quiz_attempts_cursor_check;
alter table public.quiz_attempts add constraint quiz_attempts_cursor_check check (cursor between 0 and 17);

delete from public.quiz_questions;

insert into public.quiz_questions (id, prompt_ru, prompt_en, answer, story_ru, story_en) values
(
  0,
  'Кто старше?',
  'Who was born first?',
  'lera',
  'Лера старше на 7 минут. И эти 7 минут никто не даст Саше забыть.',
  'Val is 7 minutes older. And Sasha will never hear the end of it.'
),
(
  1,
  'Кто не ест рыбу?',
  'Who doesn’t eat fish?',
  'lera',
  'Лера не ест ни рыбу, ни другие морепродукты.',
  'Val doesn’t eat fish or any other seafood.'
),
(
  2,
  'Кто картавит?',
  'Who has trouble pronouncing the Russian “R”?',
  'lera',
  'Лера прекрасно обходится без «р».',
  'Rolling your R’s is a big part of speaking Russian. Val has been getting by without it.'
),
(
  3,
  'Кто засунул себе батарейку в нос, и врачам пришлось ее вытаскивать?',
  'Who stuck a battery up her nose and had to have a doctor remove it?',
  'sasha',
  'Саша была совсем маленькой, но до сих пор это помнит. Было страшно.',
  'Sasha was very little, but she still remembers it. It was scary.'
),
(
  4,
  'У кого более высокий уровень образования?',
  'Who has the higher level of education?',
  'lera',
  'У Леры докторская степень в области физиотерапии, а у Саши — бакалаврская степень по рекламе и связям с общественностью.',
  'Val has a doctorate in physical therapy. Sasha has a bachelor’s degree in advertising and public relations.'
),
(
  5,
  'У кого первой появился парень?',
  'Who had a boyfriend first?',
  'sasha',
  'У Саши появился парень в 12 лет. Они встречались целых 7 месяцев — в том возрасте это практически вечность.',
  'Sasha had her first boyfriend at 12. They dated for seven whole months — practically a lifetime at that age.'
),
(
  6,
  'Кто тайно поженился?',
  'Who eloped?',
  'lera',
  'Лера и ее муж Кристиан расписались 7 июня 2022 года.',
  'Val and her husband, Christian, got married on June 7, 2022.'
),
(
  7,
  'У кого было три сотрясения мозга?',
  'Who has had three concussions?',
  'sasha',
  'У Саши было три сотрясения. И только два из них связаны с баскетболом.',
  'Sasha has had three concussions. And only two of them were basketball-related.'
),
(
  8,
  'Кому сделали операцию под именем другой близняшки?',
  'Who had surgery under her twin sister’s name?',
  'sasha',
  'В спортивной разрядной книжке Саши по ошибке указали первый разряд. Для операции по квоте требовалось звание не ниже КМС — кандидата в мастера спорта. Поэтому операцию сделали под именем Леры.',
  'Sasha’s official sports record mistakenly listed her at a lower competitive rank. To qualify for the state-funded surgery, she needed at least the title of Candidate for Master of Sport, a higher Russian sports qualification. So she had the surgery under Val’s name.'
),
(
  9,
  'У кого лучшее время на 5 и 10 км?',
  'Who has the faster personal bests in both the 5K and 10K?',
  'lera',
  'Оба рекорда принадлежат Лере. Пока что 😉',
  'Val holds both records. For now 😉'
),
(
  10,
  'У кого есть список на все случаи жизни?',
  'Who has a list for every occasion?',
  'sasha',
  'Саша любит поддерживать иллюзию контроля.',
  'Sasha likes maintaining the illusion of control.'
),
(
  11,
  'Кого в 14 лет задержали за распитие алкоголя?',
  'Who was detained for drinking alcohol at 14?',
  'lera',
  'В России алкоголь — с 18 лет.',
  'The drinking age in Russia is 18.'
),
(
  12,
  'Кто первой сделал татуировку?',
  'Who got a tattoo first?',
  'lera',
  'Лера сделала татуировку на ступне в 16 лет. Через полгода Саша решила: раз Лере можно, значит, можно и ей.',
  'Val got a tattoo on her foot at 16. Six months later, Sasha decided that if Val could have one, so could she.'
),
(
  13,
  'Кто пропустил месяц школы, прежде чем родители узнали?',
  'Who skipped a month of school before our parents found out?',
  'lera',
  'В седьмом классе Лере так не нравилась школа, что она решила просто туда не ходить. Саша ее прикрывала — пока их обеих не раскусили.',
  'In seventh grade, Val disliked school so much that she simply stopped going. Sasha covered for her — until they both got caught.'
),
(
  14,
  'У кого проколот нос?',
  'Who has a nose piercing?',
  'lera',
  'Лера проколола нос в 19 лет, но последние пять лет почти не носит украшение.',
  'Val got her nose pierced at 19, but she has barely worn any jewelry in it for the past five years.'
),
(
  15,
  'Кто не пьет пиво?',
  'Who doesn’t drink beer?',
  'sasha',
  'Саша пыталась полюбить пиво, но так и не смогла. Зато джин-тоник — совсем другое дело.',
  'Sasha tried to develop a taste for beer, but it never happened. A gin and tonic, though? That’s a different story.'
),
(
  16,
  'У кого была челка с детства до 15 лет?',
  'Who had bangs from childhood until she was 15?',
  'lera',
  'Лера наконец отрастила челку в 15 лет. До этого она была одним из признаков, по которым нас различали.',
  'Val finally grew out her bangs at 15. Until then, they were one of the ways people could tell us apart.'
),
(
  17,
  'У кого есть коллекция пластинок?',
  'Who has a vinyl record collection?',
  'sasha',
  'Саша начала собирать пластинки относительно недавно, но слушает их каждый день. Коллекция уже получилась очень разноплановой.',
  'Sasha only started collecting vinyl relatively recently, but she listens to her records every day. Her collection already covers a wide range of music.'
);

create or replace function public.quiz_state() returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  uid uuid := auth.uid();
  a public.quiz_attempts%rowtype;
  q public.quiz_questions%rowtype;
  ans public.quiz_answers%rowtype;
  score integer;
  total integer;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  select * into a from public.quiz_attempts where user_id = uid;
  if not found then return null; end if;
  select count(*)::integer into total from public.quiz_questions;
  select count(*) filter (where correct) into score from public.quiz_answers where user_id = uid;
  if a.completed_at is null then
    select * into q from public.quiz_questions where id = a.cursor;
    select * into ans from public.quiz_answers where user_id = uid and question_id = a.cursor;
  end if;
  return jsonb_build_object(
    'name', a.name,
    'cursor', a.cursor,
    'total', total,
    'score', score,
    'done', a.completed_at is not null,
    'question', case
      when a.completed_at is null then jsonb_build_object(
        'id', q.id,
        'text', jsonb_build_object('ru', q.prompt_ru, 'en', q.prompt_en)
      )
      else null
    end,
    'reveal', case
      when ans.user_id is not null then jsonb_build_object(
        'choice', ans.choice,
        'correct', case when ans.correct then 1 else 0 end,
        'person', q.answer,
        'story', jsonb_build_object('ru', q.story_ru, 'en', q.story_en)
      )
      else null
    end
  );
end $$;

create or replace function public.quiz_advance(p_question integer) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  uid uuid := auth.uid();
  a public.quiz_attempts%rowtype;
  last_id integer;
begin
  if uid is null then raise exception 'Authentication required'; end if;
  select * into a from public.quiz_attempts where user_id = uid for update;
  if not found then raise exception 'Attempt not found'; end if;
  if a.completed_at is not null then return public.quiz_state(); end if;
  if a.cursor <> p_question then return public.quiz_state(); end if;
  if not exists (
    select 1 from public.quiz_answers where user_id = uid and question_id = a.cursor
  ) then
    raise exception 'Answer first';
  end if;
  select max(id) into last_id from public.quiz_questions;
  update public.quiz_attempts
  set
    cursor = case when cursor < last_id then cursor + 1 else cursor end,
    completed_at = case when cursor = last_id then now() else null end
  where user_id = uid;
  return public.quiz_state();
end $$;
