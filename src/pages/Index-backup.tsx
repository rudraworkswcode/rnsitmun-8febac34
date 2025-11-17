import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import LocalSEOSection from "@/components/sections/LocalSEOSection";
import AISearchBar from "@/components/search/AISearchBar";


const Index = () => {
  return (
    <Layout>
      <HeroSection />
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