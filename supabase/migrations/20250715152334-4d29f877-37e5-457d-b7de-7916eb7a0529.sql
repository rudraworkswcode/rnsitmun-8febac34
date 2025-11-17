-- Create tables for AI search analytics and logging

-- Table for logging search queries
CREATE TABLE public.search_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  confidence DECIMAL(3,2),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_hash VARCHAR(16), -- For privacy-preserving analytics
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for user feedback on search results
CREATE TABLE public.search_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  feedback_type VARCHAR(10) NOT NULL CHECK (feedback_type IN ('up', 'down')),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_hash VARCHAR(16),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_search_queries_timestamp ON public.search_queries(timestamp DESC);
CREATE INDEX idx_search_queries_ip_hash ON public.search_queries(ip_hash);
CREATE INDEX idx_search_feedback_timestamp ON public.search_feedback(timestamp DESC);
CREATE INDEX idx_search_feedback_type ON public.search_feedback(feedback_type);

-- Enable Row Level Security (though these tables will be publicly accessible for analytics)
ALTER TABLE public.search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is for anonymous search logging)
CREATE POLICY "Allow public insert on search_queries" 
ON public.search_queries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public insert on search_feedback" 
ON public.search_feedback 
FOR INSERT 
WITH CHECK (true);

-- Allow reading for analytics (you may want to restrict this later)
CREATE POLICY "Allow public read on search_queries" 
ON public.search_queries 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read on search_feedback" 
ON public.search_feedback 
FOR SELECT 
USING (true);