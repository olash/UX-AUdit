-- Run this in your Supabase SQL Editor

-- 1. Update PROJECTS table (Scoring & Reports)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS score INTEGER,
ADD COLUMN IF NOT EXISTS score_breakdown JSONB,
ADD COLUMN IF NOT EXISTS report_url TEXT;

-- 2. Update AI_REVIEWS table (Scoring)
ALTER TABLE ai_reviews 
ADD COLUMN IF NOT EXISTS scores JSONB,
ADD COLUMN IF NOT EXISTS score INTEGER;

-- 3. Storage Bucket
-- You must manually create a storage bucket named 'reports' in the Supabase Dashboard
-- and set it to Public.

-- 4. Create PROFILES table (Plans)
-- This table links to auth.users via id
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  plan text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
