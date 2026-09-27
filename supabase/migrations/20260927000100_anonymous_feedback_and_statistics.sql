/* Anonymous reviews and problem statistics for Jardem AI. */
CREATE TABLE IF NOT EXISTS problem_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_type text NOT NULL,
  session_id text NOT NULL CHECK (char_length(session_id) BETWEEN 16 AND 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, problem_type)
);
ALTER TABLE problem_statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_problem_statistics" ON problem_statistics FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_insert_problem_statistics" ON problem_statistics FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_problem_statistics_type ON problem_statistics(problem_type);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS submission_key text;
UPDATE reviews SET source = 'complaint' WHERE source IS NULL;
ALTER TABLE reviews ALTER COLUMN source SET NOT NULL;
ALTER TABLE reviews DROP COLUMN IF EXISTS name;
ALTER TABLE reviews ADD CONSTRAINT reviews_source_check CHECK (source IN ('complaint', 'ai_assistant'));
ALTER TABLE reviews ADD CONSTRAINT reviews_comment_length_check CHECK (comment IS NULL OR char_length(comment) <= 500);
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_submission_key ON reviews(submission_key) WHERE submission_key IS NOT NULL;
