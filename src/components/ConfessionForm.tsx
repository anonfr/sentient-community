import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

const tags = ["Praise", "Criticism", "Suggestion", "Meme"];

export const ConfessionForm = () => {
  const [message, setMessage] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedTag) {
      toast({
        title: "Please fill in all fields",
        description: "Message and tag are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `confessions/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, selectedImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { error } = await supabase
        .from("confessions")
        .insert({
          message: message.trim(),
          tag: selectedTag,
          image_url: imageUrl,
        });

      if (error) throw error;

      toast({
        title: "Confession submitted!",
        description: "Your anonymous message has been posted",
      });
      
      setMessage("");
      setSelectedTag("");
      setSelectedImage(null);
    } catch (error) {
      toast({
        title: "Error submitting confession",
        description: "Please try again",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-gradient">Share Your Thoughts Anonymously about Sentient</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              What do you want to say?
            </label>
            <Textarea
              id="message"
              placeholder="Share your thoughts about the Sentient project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] border-primary/30 focus:border-primary resize-none"
            />
          </div>

          <div>
            <label htmlFor="tag" className="block text-sm font-medium mb-2">
              Tag
            </label>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Image (Optional)
            </label>
            <div className="space-y-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="border-primary/30 focus:border-primary"
              />
              {selectedImage && (
                <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-md">
                  <Upload className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground/70">{selectedImage.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedImage(null)}
                    className="ml-auto h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? "Submitting..." : "Submit Confession"}
          </Button>
        </form>
        
        <div className="mt-4 pt-4 border-t border-border text-center">
          <div className="text-sm text-muted-foreground">
            Learn more about{" "}
            <a 
              href="https://sentient.foundation/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Sentient
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};