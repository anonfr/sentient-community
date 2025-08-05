import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

export const RolePitchForm = () => {
  const [xHandle, setXHandle] = useState("");
  const [discordHandle, setDiscordHandle] = useState("");
  const [pitch, setPitch] = useState("");
  const [workLink, setWorkLink] = useState("");
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
    
    if ((!xHandle.trim() && !discordHandle.trim()) || !pitch.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "At least one username and pitch are required",
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
        const filePath = `express-yourself/${fileName}`;

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
        .from("role_pitches")
        .insert({
          x_handle: xHandle.trim() || null,
          discord_handle: discordHandle.trim() || null,
          pitch: pitch.trim(),
          project_link: workLink.trim() || null,
          image_url: imageUrl,
        });

      if (error) throw error;

      toast({
        title: "Expression submitted successfully!",
        description: "Your message is now public",
      });
      setXHandle("");
      setDiscordHandle("");
      setPitch("");
      setWorkLink("");
      setSelectedImage(null);
    } catch (error) {
      toast({
        title: "Error submitting expression",
        description: "Please try again",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-gradient">Express Yourself</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="x-handle" className="block text-sm font-medium mb-2">
                X (Twitter) Handle
              </label>
              <Input
                id="x-handle"
                placeholder="@yourusername"
                value={xHandle}
                onChange={(e) => setXHandle(e.target.value)}
                className="border-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="discord-handle" className="block text-sm font-medium mb-2">
                Discord Username
              </label>
              <Input
                id="discord-handle"
                placeholder="username"
                value={discordHandle}
                onChange={(e) => setDiscordHandle(e.target.value)}
                className="border-primary/30 focus:border-primary"
              />
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            * At least one username is required
          </p>

          <div>
            <label htmlFor="pitch" className="block text-sm font-medium mb-2">
              You're contribution to Sentient Project *
            </label>
            <Textarea
              id="pitch"
              placeholder="Share your thoughts, experiences, ideas, or anything you'd like to express..."
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              className="min-h-[120px] border-primary/30 focus:border-primary resize-none"
            />
          </div>

          <div>
            <label htmlFor="work-link" className="block text-sm font-medium mb-2">
              My Work (Optional)
            </label>
            <Input
              id="work-link"
              placeholder="https://github.com/yourusername/project or portfolio link"
              value={workLink}
              onChange={(e) => setWorkLink(e.target.value)}
              className="border-primary/30 focus:border-primary"
            />
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
            {isSubmitting ? "Submitting..." : "Share Expression"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};