-- English display name is Val (DB id stays 'lera'). Demo placeholder stories only.
update public.quiz_questions
set story_en = replace(story_en, 'Sasha and Lera', 'Sasha and Val')
where story_en like '%Sasha and Lera%';
