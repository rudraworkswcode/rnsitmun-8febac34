-- Restrict public read access to analytics tables by removing public SELECT policies
-- This addresses privacy risk: exposed user search queries with IP hashes

-- Ensure RLS is enabled (it already is if policies exist, but keep for safety)
ALTER TABLE public.search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_feedback ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive public read policies
DROP POLICY IF EXISTS "Allow public read on search_queries" ON public.search_queries;
DROP POLICY IF EXISTS "Allow public read on search_feedback" ON public.search_feedback;

-- Keep INSERT open for now to avoid breaking current logging flows from the client or edge functions.
-- Service role inserts from the edge function bypass RLS; if you want to harden further later, we can tighten INSERT too.

-- Optional (commented): example stricter policy if later needed to require authenticated users only
-- CREATE POLICY "Authenticated can insert search_queries" ON public.search_queries FOR INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "Authenticated can insert search_feedback" ON public.search_feedback FOR INSERT TO authenticated WITH CHECK (true);
