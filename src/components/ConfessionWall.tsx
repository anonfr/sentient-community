import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TagBadge } from "@/components/TagBadge";
import { ImageDisplay } from "@/components/ImageDisplay";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Confession {
  id: string;
  message: string;
  tag: string;
  created_at: string;
  image_url: string | null;
}

export const ConfessionWall = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const { data, error } = await supabase
          .from("confessions")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setConfessions(data);
        }
      } catch (error) {
        console.error("Error fetching confessions:", error);
      }
      setIsLoading(false);
    };

    fetchConfessions();

    // Set up real-time subscription
    const channel = supabase
      .channel("confessions_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "confessions",
        },
        (payload) => {
          setConfessions((current) => [payload.new as Confession, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading confessions...</div>;
  }

  return (
    <div className="space-y-4">
      {confessions.length === 0 ? (
        <Card className="border-primary/20">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No confessions yet. Be the first to share!</p>
          </CardContent>
        </Card>
      ) : (
        confessions.map((confession) => (
          <Card key={confession.id} className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <TagBadge tag={confession.tag} />
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(confession.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {confession.message}
                </p>
                {confession.image_url && (
                  <ImageDisplay
                    imageUrl={confession.image_url}
                    alt="Confession image"
                    className="mt-2"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};