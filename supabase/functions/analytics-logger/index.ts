import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.pathname.split('/').pop();

    if (endpoint === 'log-query') {
      const { query, confidence, timestamp } = await req.json();
      
      const { error } = await supabase
        .from('search_queries')
        .insert({
          query: query.substring(0, 500), // Limit query length
          confidence,
          timestamp,
          ip_hash: await hashIP(req.headers.get('x-forwarded-for') || 'unknown'),
        });

      if (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Failed to log query' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (endpoint === 'feedback') {
      const { query, feedback, timestamp } = await req.json();
      
      const { error } = await supabase
        .from('search_feedback')
        .insert({
          query: query.substring(0, 500),
          feedback_type: feedback,
          timestamp,
          ip_hash: await hashIP(req.headers.get('x-forwarded-for') || 'unknown'),
        });

      if (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Failed to log feedback' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (endpoint === 'analytics') {
      // Get analytics data (for admin dashboard)
      const { data: queries, error: queriesError } = await supabase
        .from('search_queries')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      const { data: feedback, error: feedbackError } = await supabase
        .from('search_feedback')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (queriesError || feedbackError) {
        return new Response(JSON.stringify({ error: 'Failed to fetch analytics' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Calculate basic metrics
      const totalQueries = queries?.length || 0;
      const averageConfidence = queries?.reduce((sum, q) => sum + (q.confidence || 0), 0) / totalQueries || 0;
      const positiveRating = feedback?.filter(f => f.feedback_type === 'up').length || 0;
      const totalFeedback = feedback?.length || 0;
      const satisfactionRate = totalFeedback > 0 ? (positiveRating / totalFeedback) * 100 : 0;

      return new Response(JSON.stringify({
        totalQueries,
        averageConfidence: Math.round(averageConfidence * 100) / 100,
        satisfactionRate: Math.round(satisfactionRate * 100) / 100,
        recentQueries: queries?.slice(0, 10).map(q => ({
          query: q.query,
          confidence: q.confidence,
          timestamp: q.timestamp
        })) || []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Analytics error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + 'salt_for_privacy');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
}