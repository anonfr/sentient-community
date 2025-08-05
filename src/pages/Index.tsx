import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ConfessionForm } from "@/components/ConfessionForm";
import { ConfessionWall } from "@/components/ConfessionWall";
import { RolePitchForm } from "@/components/RolePitchForm";
import { RolePitchWall } from "@/components/RolePitchWall";
import { FloatingHelp } from "@/components/FloatingHelp";

const Index = () => {
  const [activeTab, setActiveTab] = useState("confessions");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-card/50 backdrop-blur-sm">
            <TabsTrigger 
              value="confessions" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Anonymous Confessions
            </TabsTrigger>
            <TabsTrigger 
              value="pitches" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Express Yourself
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="confessions" className="space-y-8">
            <ConfessionForm />
            <ConfessionWall />
          </TabsContent>
          
          <TabsContent value="pitches" className="space-y-8">
            <RolePitchForm />
            <RolePitchWall />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="container mx-auto px-4 py-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-muted-foreground">Created by</span>
          <a 
            href="https://x.com/AnonfrXBT" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-card/80 border border-primary/20 hover:border-primary/40 transition-all duration-200 hover:scale-105"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-4 h-4 fill-current text-primary"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm font-semibold text-foreground">@AnonXBT</span>
          </a>
        </div>
      </footer>
      
      <FloatingHelp />
    </div>
  );
};

export default Index;
