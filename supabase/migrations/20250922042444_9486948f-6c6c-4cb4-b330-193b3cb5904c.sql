-- Create atlas_quiz_registrations table
CREATE TABLE public.atlas_quiz_registrations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    participant1_name TEXT NOT NULL,
    participant1_contact TEXT NOT NULL,
    participant1_email TEXT NOT NULL,
    participant1_usn TEXT,
    participant2_name TEXT,
    participant2_contact TEXT,
    participant2_usn TEXT,
    team_size INTEGER NOT NULL CHECK (team_size IN (1, 2)),
    stream TEXT NOT NULL,
    represents_rnsit BOOLEAN NOT NULL DEFAULT false,
    institution_name TEXT,
    team_name TEXT NOT NULL,
    screenshot_url TEXT,
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.atlas_quiz_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insertions (for registration)
CREATE POLICY "Allow public insert on atlas_quiz_registrations" 
ON public.atlas_quiz_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_atlas_quiz_registrations_updated_at
BEFORE UPDATE ON public.atlas_quiz_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();