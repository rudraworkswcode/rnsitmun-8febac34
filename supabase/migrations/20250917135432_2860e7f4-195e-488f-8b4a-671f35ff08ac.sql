-- Create atlas_registrations table
create table if not exists atlas_registrations (
  id bigserial primary key,
  participant1_name text not null,
  participant1_contact text not null,
  participant2_name text,
  participant2_contact text,
  stream_of_study text not null,
  is_rnsit boolean not null default false,
  institution_name text,
  team_name text not null,
  team_size int not null default 1,
  agreed_terms boolean not null default false,
  payment_amount int not null default 60,
  payment_proof_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
ALTER TABLE atlas_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert (for registration form)
CREATE POLICY "Allow public insert on atlas_registrations" 
ON atlas_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for payment proofs if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('atlas-payment-proofs', 'atlas-payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for payment proof uploads
CREATE POLICY "Allow public upload to atlas-payment-proofs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'atlas-payment-proofs');

CREATE POLICY "Allow public access to atlas-payment-proofs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'atlas-payment-proofs');