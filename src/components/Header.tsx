import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/sentient-logo.jpeg" 
              alt="Sentient Community Logo" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gradient">
              Sentient Community
            </h1>
          </div>
          <p className="text-center text-muted-foreground text-sm md:text-base">
            Share your thoughts and express yourself
          </p>
        </div>
      </div>
    </header>
  );
};