import { AlertTriangle, Wrench, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MaintenanceModeProps {
  message?: string;
  estimatedTime?: string;
}

export const MaintenanceMode = ({ 
  message = "We're currently performing scheduled maintenance to improve your experience.",
  estimatedTime = "We'll be back shortly"
}: MaintenanceModeProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border border-primary/20">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Wrench className="w-16 h-16 text-primary animate-pulse" />
              <AlertTriangle className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1" />
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Under Maintenance
            </h1>
            <p className="text-muted-foreground">
              {message}
            </p>
          </div>
          
          {/* Estimated Time */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{estimatedTime}</span>
          </div>
          
          {/* Contact Info */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Questions? Reach out to us:
            </p>
            <a 
              href="https://x.com/AnonfrXBT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-200 hover:scale-105 text-sm"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4 fill-current text-primary"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="font-semibold">@AnonXBT</span>
            </a>
          </div>
          
          {/* Sentient Branding */}
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Sentient Community Platform
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
