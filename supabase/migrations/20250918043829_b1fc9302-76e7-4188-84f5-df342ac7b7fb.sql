-- Create atlas_quiz_registrations table
CREATE TABLE IF NOT EXISTS public.atlas_quiz_registrations (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  team_name text NOT NULL,
  stream text NOT NULL,
  institution text,
  email text NOT NULL,
  screenshot_url text,
  transaction_id text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.atlas_quiz_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (registration is open to everyone)
CREATE POLICY "Allow public insert on atlas_quiz_registrations"
ON public.atlas_quiz_registrations
FOR INSERT
WITH CHECK (true);

-- Create storage bucket for quiz screenshots if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('atlas-quiz-screenshots', 'atlas-quiz-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for quiz screenshots
CREATE POLICY "Allow public upload to atlas-quiz-screenshots"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'atlas-quiz-screenshots');

CREATE POLICY "Allow public access to atlas-quiz-screenshots"
ON storage.objects
FOR SELECT
USING (bucket_id = 'atlas-quiz-screenshots');