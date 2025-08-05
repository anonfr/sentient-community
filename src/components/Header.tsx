import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gradient text-center">
          Sentient Community
        </h1>
        <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
          Share your thoughts and express yourself
        </p>
      </div>
    </header>
  );
};