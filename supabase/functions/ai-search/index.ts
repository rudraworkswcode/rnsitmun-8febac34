import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Knowledge base for MUN/UN topics
const MUN_KNOWLEDGE_BASE = {
  "UN Security Council": {
    definition: "The UN Security Council is one of the six main organs of the United Nations, responsible for maintaining international peace and security.",
    functions: ["Maintaining international peace and security", "Investigating disputes", "Recommending methods of settlement", "Imposing sanctions", "Authorizing military action"],
    members: "15 members: 5 permanent (US, UK, France, Russia, China) with veto power, 10 non-permanent elected for 2-year terms"
  },
  "Model United Nations": {
    definition: "Model United Nations (MUN) is an educational simulation of the United Nations where students role-play as delegates from different countries.",
    purpose: "To educate participants about civics, current events, effective communication, globalization, and multilateral diplomacy",
    structure: "Committees simulate UN bodies like General Assembly, Security Council, Economic and Social Council, etc."
  },
  "International Court of Justice": {
    definition: "The ICJ is the principal judicial organ of the United Nations, settling legal disputes between states and giving advisory opinions.",
    location: "The Hague, Netherlands",
    composition: "15 judges elected for 9-year terms by the UN General Assembly and Security Council"
  }
};

async function searchNews(query: string) {
  try {
    // You would integrate with news APIs here
    // For now, returning mock data
    return [
      {
        title: "UN Climate Summit 2025: Key Developments",
        url: "https://un.org/climate-2025",
        snippet: "Latest updates on global climate initiatives and international cooperation..."
      }
    ];
  } catch (error) {
    console.error('News search error:', error);
    return [];
  }
}

function searchKnowledgeBase(query: string) {
  const queryLower = query.toLowerCase();
  const results = [];

  for (const [topic, data] of Object.entries(MUN_KNOWLEDGE_BASE)) {
    if (queryLower.includes(topic.toLowerCase()) || 
        data.definition.toLowerCase().includes(queryLower)) {
      results.push({
        topic,
        data,
        relevance: 0.9
      });
    }
  }

  return results;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid query is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Search knowledge base first
    const kbResults = searchKnowledgeBase(query);
    
    // Search news for current events
    const newsResults = await searchNews(query);

    // Prepare context for AI
    let context = "";
    if (kbResults.length > 0) {
      context += "Knowledge Base Information:\n";
      kbResults.forEach(result => {
        context += `${result.topic}: ${result.data.definition}\n`;
        if ('functions' in result.data && result.data.functions) {
          context += `Functions: ${result.data.functions.join(", ")}\n`;
        }
        if ('members' in result.data && result.data.members) {
          context += `Members: ${result.data.members}\n`;
        }
        context += "\n";
      });
    }

    // Generate AI response
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert AI assistant specializing in Model United Nations (MUN), United Nations affairs, international diplomacy, and current global issues. 

Your role is to:
- Provide accurate, well-sourced information about UN organizations, procedures, and current events
- Help with MUN preparation, including resolution drafting, parliamentary procedure, and country position research
- Explain complex international relations concepts in accessible language
- Reference reliable sources when possible

Use the following knowledge base when relevant: ${context}

Always aim to be:
- Accurate and factual
- Educational and informative
- Diplomatic and neutral in tone
- Helpful for MUN participants and those interested in international affairs

If you don't have current information, acknowledge this and suggest where users might find the most up-to-date information.`
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 800,
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      throw new Error('AI service unavailable');
    }

    const aiData = await aiResponse.json();
    const answer = aiData.choices[0]?.message?.content || 'Unable to generate response';

    // Calculate confidence based on knowledge base matches and AI response
    let confidence = 0.7; // Base confidence
    if (kbResults.length > 0) confidence += 0.2;
    if (newsResults.length > 0) confidence += 0.1;

    // Prepare sources
    const sources = [
      ...kbResults.map(result => ({
        title: `MUN Knowledge Base: ${result.topic}`,
        url: `/knowledge/${result.topic.toLowerCase().replace(/\s+/g, '-')}`,
        snippet: result.data.definition.substring(0, 150) + '...'
      })),
      ...newsResults.slice(0, 3) // Limit to top 3 news results
    ];

    const response = {
      answer,
      sources,
      confidence: Math.min(confidence, 1.0),
      query,
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Search error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Search service temporarily unavailable',
        fallback: 'Please try again later or contact support if the issue persists.'
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});