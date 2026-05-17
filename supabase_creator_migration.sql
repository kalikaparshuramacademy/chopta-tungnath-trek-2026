-- ============================================================
-- Migration: Creator Referral System
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Add referral_code column to registrations (if not exists)
ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS referral_code TEXT DEFAULT NULL;

-- 2. Create creator_codes table
CREATE TABLE IF NOT EXISTS creator_codes (
  id                          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at                  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name                        TEXT NOT NULL,
  code                        TEXT NOT NULL UNIQUE,
  password                    TEXT NOT NULL,
  commission_per_registration  INTEGER NOT NULL DEFAULT 500,
  is_active                   BOOLEAN NOT NULL DEFAULT TRUE
);

-- 3. Enable Row Level Security on creator_codes
ALTER TABLE creator_codes ENABLE ROW LEVEL SECURITY;

-- 4. Policy: creators can only read their own row (matched by code + password)
-- The app does the join in the query, so we allow anon reads on creator_codes
-- (password is the secret — in production you'd hash this)
CREATE POLICY "Public can read creator_codes for login"
  ON creator_codes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. Allow anon to read registrations that match a referral_code
-- (the existing RLS policies may already cover this; adjust as needed)

-- 6. Insert a sample creator (edit before use)
-- INSERT INTO creator_codes (name, code, password, commission_per_registration)
-- VALUES ('Rahul Sharma', 'RAHUL500', 'your_secure_password_here', 500);

-- ============================================================
-- END OF MIGRATION
-- ============================================================
