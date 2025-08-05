import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 md:py-6 relative">
        {/* Mobile: Theme toggle at top */}
        <div className="flex justify-end mb-4 md:hidden">
          <ThemeToggle />
        </div>
        
        {/* Desktop: Theme toggle positioned absolutely */}
        <div className="hidden md:block absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="flex flex-col items-center space-y-3 md:space-y-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img 
              src="/sentient-logo.jpeg" 
              alt="Sentient Community Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient">
              Sentient Community
            </h1>
          </div>
          <p className="text-center text-muted-foreground text-xs md:text-sm lg:text-base">
            Share your thoughts about Sentient 
          </p>
        </div>
      </div>
    </header>
  );
};
