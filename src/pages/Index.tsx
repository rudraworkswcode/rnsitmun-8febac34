<<<<<<< HEAD
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import EventBanner from "@/components/sections/EventBanner";
import AboutSection from "@/components/sections/AboutSection";
import LocalSEOSection from "@/components/sections/LocalSEOSection";
import AISearchBar from "@/components/search/AISearchBar";
=======
import { Sparkles, Calendar, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import LocalSEOSection from "@/components/sections/LocalSEOSection";
import AISearchBar from "@/components/search/AISearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
>>>>>>> c6353bc2254a8e63cf00f25da6d5f04e141eb9ef

const Index = () => {
  return (
    <Layout>
      <HeroSection />
<<<<<<< HEAD
      <EventBanner />

=======
      
      {/* Atlas Quiz Promotion Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Floating quiz icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              {i % 3 === 0 ? "🧠" : i % 3 === 1 ? "🏆" : "💡"}
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Card className="max-w-5xl mx-auto bg-black/80 border-primary/30 backdrop-blur-lg shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <div className="p-8 sm:p-12">
                  <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 mb-6">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    <span className="text-primary font-semibold text-sm">REGISTRATION OPEN</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-inter leading-tight">
                    Atlas <span className="text-gradient-lusion">Intercollege Quiz</span>
                  </h2>
                  
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    Test your knowledge against the brightest minds from colleges across the region. 
                    Join us for an exciting quiz competition with amazing prizes and recognition!
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Entry Fee</p>
                        <p className="text-white/70 text-sm">Only ₹60</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Date</p>
                        <p className="text-white/70 text-sm">9 October 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    disabled
                    className="bg-gray-500 text-white px-8 py-3 rounded-xl font-semibold text-lg cursor-not-allowed opacity-70"
                  >
                    CLOSED!
                  </Button>
                </div>
                
                {/* Visual Side */}
                <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-8 sm:p-12 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 absolute -top-6 -left-6 animate-pulse"></div>
                    <div className="w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full opacity-30 absolute top-12 right-0 animate-pulse" style={{ animationDelay: "1s" }}></div>
                    
                    <div className="relative z-10 text-center">
                      <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🧠</div>
                      <h3 className="text-2xl font-bold text-white mb-2">Atlas 2.0</h3>
                      <p className="text-white/70">AROUND THE GLOBE, ACROSS THE TIMELINE</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
>>>>>>> c6353bc2254a8e63cf00f25da6d5f04e141eb9ef
      <AboutSection />
      <LocalSEOSection />
      
      {/* Enhanced AI Search Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Floating particles for visual enhancement */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-lusion-glow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 font-inter tracking-tight">
              Ask Our{" "}
              <span className="text-gradient-lusion">AI Assistant</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed font-medium">
              Get instant answers about MUN procedures, UN organizations, current international affairs, 
              and diplomacy from our AI-powered search engine.
            </p>
          </div>
          <AISearchBar />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
