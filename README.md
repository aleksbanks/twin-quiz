# Twin Quiz — Sasha or Val?

Bilingual birthday quiz: React 19, TypeScript, Vite, CSS Modules, Supabase.

Content (answers, stories, portraits) is still marked as work-in-progress in the UI. Replace and verify before the birthday launch.

## Stack

- `src/` — app UI, pages, components
- `src/api/` — Supabase client + RPC wrappers
- `supabase/migrations/` — schema, seeds, scoring RPCs

## Local development

Node 22.13+ (Node 24 recommended).

```sh
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Use only the publishable / anon key in Vite. Never put a service-role key in frontend env.

```sh
npm install
npm run dev
```

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. **Authentication → Providers → Anonymous** — enable.
3. Run migrations in **SQL Editor** (or `supabase link` + `supabase db push`):
   - `supabase/migrations/202610300001_initial_quiz.sql`
   - `supabase/migrations/202610300002_en_display_val.sql`
4. Copy **Project URL** and **publishable / anon** key into `.env.local`.
5. Restart `npm run dev`.

Each browser keeps an anonymous Supabase session. Progress is tied to `auth.uid()`. Clearing site data starts a new attempt.

Clients call RPCs only (`quiz_restore`, `quiz_start`, `quiz_answer`, `quiz_advance`, `quiz_leaderboard`). Tables are not exposed to the browser.

## Commands

```sh
npm run lint
npm run build
npm run preview
```

## Before launch

- Replace seeded answers and stories (new migration or edit seeds).
- Replace portrait placeholders with real photos.
- Keep the WIP banner until content is verified.
- Prefer a clean Supabase project (or reset) so demo attempts do not lock guests.
