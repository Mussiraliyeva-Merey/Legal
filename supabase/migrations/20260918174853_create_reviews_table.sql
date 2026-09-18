/*
# Create reviews table for user feedback

1. New Tables
- `reviews`
  - `id` (uuid, primary key)
  - `rating` (int, 1-5, not null) — star rating from 1 to 5
  - `comment` (text, nullable) — optional written review
  - `name` (text, nullable) — optional display name
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `reviews`.
- Allow anon + authenticated INSERT (anyone can leave a review, no sign-in required).
- Allow anon + authenticated SELECT (reviews are public and visible to everyone).
- No UPDATE or DELETE — reviews are append-only.

3. Notes
- This is a no-auth app, so policies use TO anon, authenticated.
- Reviews store only: rating, comment, and optional name. No personal data beyond what the user chooses to share.
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
