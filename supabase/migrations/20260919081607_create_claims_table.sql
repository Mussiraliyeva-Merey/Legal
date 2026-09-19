/*
# Create claims table for saving and sharing claims

1. New Tables
- `claims`
  - `id` (uuid, primary key) — used in the shareable URL
  - `claim_text` (text, not null) — the full generated claim document
  - `country` (text, nullable) — selected country
  - `marketplace` (text, nullable) — selected marketplace
  - `problem_type` (text, nullable) — selected problem type
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `claims`.
- Allow anon + authenticated INSERT (anyone can create a claim, no sign-in).
- Allow anon + authenticated SELECT (claims are shareable by URL, anyone with the link can read).
- No UPDATE or DELETE — claims are immutable once created.

3. Notes
- This is a no-auth app, so policies use TO anon, authenticated.
- The claim text stores only the generated document. No personal data is stored beyond what's in the claim text itself.
- Shareable URL format: /claim/[id]
*/

CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_text text NOT NULL,
  country text,
  marketplace text,
  problem_type text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_claims" ON claims;
CREATE POLICY "anon_select_claims" ON claims FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_claims" ON claims;
CREATE POLICY "anon_insert_claims" ON claims FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_claims_created_at ON claims(created_at DESC);
