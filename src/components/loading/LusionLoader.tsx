import { useEffect, useState } from 'react';

interface LusionLoaderProps {
  onLoadComplete?: () => void;
}

const LusionLoader: React.FC<LusionLoaderProps> = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onLoadComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />
      
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full lusion-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* CSS Globe Animation */}
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          {/* Middle ring */}
          <div className="absolute inset-4 border border-primary/50 rounded-full animate-reverse-spin-slow">
            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-primary/70 rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>
          
          {/* Inner core */}
          <div className="absolute inset-8 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full animate-pulse">
            <div className="absolute inset-2 bg-primary/60 rounded-full animate-lusion-glow" />
          </div>
          
          {/* Floating particles around globe */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-lusion-orbit"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: '4s',
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-inter font-bold text-foreground lusion-loader-text">
            RNSIT MUN
          </h1>
          <p className="text-base md:text-lg font-inter text-foreground/70">
            Empowering Global Diplomacy
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="text-sm font-roboto-mono text-foreground/60">
          {Math.round(loadingProgress)}%
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-lusion-glow" />
      </div>
    </div>
  );
};

export default LusionLoader;