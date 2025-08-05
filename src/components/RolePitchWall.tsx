import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { ImageDisplay } from "@/components/ImageDisplay";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface RolePitch {
  id: string;
  x_handle: string | null;
  discord_handle: string | null;
  pitch: string;
  project_link: string | null;
  created_at: string;
  image_url: string | null;
}

export const RolePitchWall = () => {
  const [pitches, setPitches] = useState<RolePitch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPitches = async () => {
      const { data, error } = await supabase
        .from("role_pitches")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPitches(data);
      }
      setIsLoading(false);
    };

    fetchPitches();

    // Set up real-time subscription
    const channel = supabase
      .channel("role_pitches_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "role_pitches",
        },
        (payload) => {
          setPitches((current) => [payload.new as RolePitch, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading pitches...</div>;
  }

  return (
    <div className="space-y-4">
      {pitches.length === 0 ? (
        <Card className="border-primary/20">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No expressions yet. Be the first to share your thoughts!</p>
          </CardContent>
        </Card>
      ) : (
        pitches.map((pitch) => (
          <Card key={pitch.id} className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    {pitch.x_handle && (
                      <span className="text-primary font-medium text-sm md:text-base">
                        {pitch.x_handle.startsWith('@') ? pitch.x_handle : `@${pitch.x_handle}`}
                      </span>
                    )}
                    {pitch.discord_handle && (
                      <span className="text-accent-foreground font-medium text-sm md:text-base">
                        {pitch.discord_handle}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(pitch.created_at), { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {pitch.pitch}
                </p>
                
                {pitch.image_url && (
                  <ImageDisplay
                    imageUrl={pitch.image_url}
                    alt="Expression image"
                    className="mt-2"
                  />
                )}
                
                {pitch.project_link && (
                  <a
                    href={pitch.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm w-fit"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View My Work
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};