import { useState, useRef, useEffect } from "react";
import {
  Search,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface SearchResult {
  answer: string;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  confidence: number;
}

const EXAMPLE_QUERIES = [
  "What is the UN Security Council?",
  "Latest UN statements on climate change",
  "How to draft a MUN resolution?",
  "What are the functions of the ICJ?",
  "India's position on global diplomacy",
];

// 🔧 Confidence calculation helper
const calculateConfidence = (sources: any[], answer: string) => {
  if (!answer || answer.length < 30) return 0.4;
  if (!sources || sources.length === 0) return 0.5;
  if (sources.length >= 3) return 0.9;
  return 0.7;
};

const AISearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // ✅ Initialize mermaid safely (only client-side)
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        try {
          const { default: mermaid } = await import("mermaid");
          mermaid.initialize({ startOnLoad: true, theme: "dark" });
        } catch (error) {
          console.warn("Mermaid not available:", error);
        }
      }
    })();
  }, []);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setResult(null);
    setFeedback(null);

    try {
      const { data, error } = await supabase.functions.invoke("ai-search", {
        body: { query: searchQuery },
      });

      if (error) {
        throw new Error(error.message || "Search failed");
      }

      const safeSources = Array.isArray(data.sources) ? data.sources : [];

      const confidence = calculateConfidence(safeSources, data.answer);

      const updatedResult: SearchResult = {
        answer: data.answer || "No answer found.",
        sources: [],
        confidence,
      };

      setResult(updatedResult);

      await logQuery(searchQuery, updatedResult);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Unable to process your search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const logQuery = async (query: string, result: SearchResult) => {
    try {
      await supabase.functions.invoke("analytics-logger/log-query", {
        body: {
          query,
          confidence: result.confidence,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Failed to log query:", error);
    }
  };

  const handleFeedback = async (type: "up" | "down") => {
    if (!result) return;

    setFeedback(type);

    try {
      await supabase.functions.invoke("analytics-logger/feedback", {
        body: {
          query,
          feedback: type,
          timestamp: new Date().toISOString(),
        },
      });

      toast({
        title: "Thank you!",
        description: "Your feedback helps improve our AI search.",
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  const handleExampleQuery = (exampleQuery: string) => {
    setQuery(exampleQuery);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    handleSearch(exampleQuery);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 transition-colors group-focus-within:text-primary" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask anything about MUN, UN, or international affairs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => {
              setShowSuggestions(true);
              setTimeout(
                () =>
                  inputRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  }),
                0
              );
            }}
            className="pl-12 pr-24 h-14 sm:h-16 text-base sm:text-lg font-inter bg-black/80 border border-primary/30 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-white placeholder:text-white/60 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-black/90 focus:bg-black/90 w-full"
            style={{ fontSize: "16px" }}
          />
          <Button
            onClick={() => handleSearch()}
            disabled={isSearching || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-3 sm:px-6 bg-primary hover:bg-primary/90 text-white font-inter font-medium transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(26,47,251,0.4)] active:scale-95 text-sm sm:text-base"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <span className="hidden sm:inline">Search</span>
            )}
            {isSearching ? null : <Search className="w-4 h-4 sm:hidden" />}
          </Button>
        </div>

        {/* Example Queries */}
        {showSuggestions && !result && (
          <Card className="absolute top-full mt-2 w-full z-[999] bg-black/95 border-primary/30 backdrop-blur-lg animate-fade-in shadow-2xl shadow-primary/10">
            <CardContent className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto overscroll-contain pr-1">
              <div className="flex items-center mb-4">
                <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
                <p className="text-sm sm:text-base text-white/70 font-inter font-medium">
                  Popular questions to get you started:
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {EXAMPLE_QUERIES.map((example, index) => (
                  <button
                    key={index}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleExampleQuery(example);
                    }}
                    className="group flex items-center w-full text-left p-3 sm:p-4 rounded-xl hover:bg-primary/10 text-sm sm:text-base transition-all duration-300 text-white/80 hover:text-white font-inter hover:shadow-[0_0_15px_rgba(26,47,251,0.2)] active:scale-[0.98] border border-transparent hover:border-primary/20 bg-white/5"
                  >
                    <Search className="w-4 h-4 mr-3 text-primary/60 group-hover:text-primary transition-colors flex-shrink-0" />
                    <span className="flex-1 leading-relaxed">{example}</span>
                    <ArrowRight className="w-4 h-4 ml-2 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-xs text-white/40 font-inter text-center">
                  Click any suggestion to search instantly
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search Results */}
      {result && (
        <Card className="bg-black/90 border-primary/30 backdrop-blur-lg animate-fade-in shadow-2xl shadow-primary/5">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-6">
              {/* Answer */}
              <div className="ai-response-bubble">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white font-inter">
                    AI Response
                  </h3>
                  <Badge
                    variant={result.confidence > 0.8 ? "default" : "secondary"}
                    className={`${
                      result.confidence > 0.8
                        ? "bg-primary text-white"
                        : "bg-white/10 text-white/80"
                    } font-inter font-medium`}
                  >
                    {Math.round(result.confidence * 100)}% confidence
                  </Badge>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 sm:p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(26,47,251,0.1)]">
                  <div className="text-white font-inter leading-relaxed prose prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          const code = String(children).trim();
                          if (className === "language-mermaid") {
                            return <div className="mermaid">{code}</div>;
                          }
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {result.answer}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Sources removed as requested */}

              {/* Feedback */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                <p className="text-xs sm:text-sm text-white/60 font-inter text-center sm:text-left">
                  Was this answer helpful?
                </p>
                <div className="flex justify-center sm:justify-end space-x-3">
                  <Button
                    variant={feedback === "up" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFeedback("up")}
                    className={`${
                      feedback === "up"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white"
                    } transition-all duration-300 rounded-lg min-h-10 active:scale-95`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={feedback === "down" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFeedback("down")}
                    className={`${
                      feedback === "down"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white"
                    } transition-all duration-300 rounded-lg min-h-10 active:scale-95`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Privacy Notice */}
      <p className="text-xs text-white/40 text-center font-inter leading-relaxed">
        Your queries are used to improve our AI search experience.
        <a
          href="/privacy"
          className="text-primary hover:text-primary/80 hover:underline ml-1 transition-colors duration-300"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default AISearchBar;
