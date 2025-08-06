import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";

export const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </Button>
      </div>

      {/* Help Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Help & Support</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">How to use Sentient Community:</h3>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">📝 Anonymous Confessions</h4>
                  <p>Share your thoughts, feedback, or suggestions about Sentient anonymously. Choose from tags like Praise, Criticism, Suggestion, or Meme.</p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">💬 Express Yourself</h4>
                  <p>Share your contributions and experiences about Sentient publicly with your social media handles. Connect with the community!</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Need more help?</span>
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}; 