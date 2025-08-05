import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ConfessionForm } from "@/components/ConfessionForm";
import { ConfessionWall } from "@/components/ConfessionWall";
import { RolePitchForm } from "@/components/RolePitchForm";
import { RolePitchWall } from "@/components/RolePitchWall";

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
        <p className="text-sm text-muted-foreground">
          Created by{" "}
          <a 
            href="https://x.com/AnonfrXBT" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Anon
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
