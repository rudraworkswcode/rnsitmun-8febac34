import { useEffect, useState } from 'react';

interface SimpleLoaderProps {
  onLoadComplete?: () => void;
}

const SimpleLoader: React.FC<SimpleLoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsVisible(false);
            onLoadComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(progressTimer);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
      
      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo and rotating ring */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-24 h-24 rounded-full border-2 border-primary/20 animate-spin">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary"></div>
          </div>
          
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Brand text */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-inter font-bold text-foreground tracking-wide">
            RNSIT MUN
          </h1>
          <p className="text-sm font-inter text-muted-foreground">
            Empowering Global Diplomacy
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 space-y-2">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center">
            <span className="text-xs font-mono text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 animate-pulse"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </div>
    </div>
  );
};

export default SimpleLoader;