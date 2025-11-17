import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <img
            src="/mun-logo.jpg"
            alt="RNSIT MUN Logo"
            className="h-16 w-16 mx-auto rounded-full shadow-lg"
            loading="eager"
          />
          <div className="absolute inset-0 rounded-full animate-ping bg-primary/20"></div>
        </div>
        <div className="flex items-center justify-center space-x-2 text-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="font-inter font-medium">Loading RNSIT MUN...</span>
        </div>
        <div className="w-32 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;