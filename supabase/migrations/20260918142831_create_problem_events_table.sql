/*
# Create problem_events table for anonymous statistics

1. New Tables
- `problem_events`
  - `id` (uuid, primary key)
  - `problem_type` (text, not null) — e.g. counterfeit, defective_product, wrong_description, etc.
  - `country` (text, nullable) — selected country
  - `marketplace` (text, nullable) — selected marketplace
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `problem_events`.
- Allow anon + authenticated INSERT (anyone can record a problem selection).
- Allow anon + authenticated SELECT (statistics are public and anonymous).
- No UPDATE or DELETE — events are append-only.

3. Notes
- This table stores ONLY anonymous, impersonal data: the problem type, country, and marketplace.
- No personal data (name, phone, email, address, order number, claim text) is ever stored.
- Statistics are aggregated counts by problem_type.
*/

CREATE TABLE IF NOT EXISTS problem_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_type text NOT NULL,
  country text,
  marketplace text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE problem_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_problem_events" ON problem_events;
CREATE POLICY "anon_select_problem_events" ON problem_events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_problem_events" ON problem_events;
CREATE POLICY "anon_insert_problem_events" ON problem_events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_problem_events_type ON problem_events(problem_type);
CREATE INDEX IF NOT EXISTS idx_problem_events_created_at ON problem_events(created_at);
