import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  tag: string;
}

const tagColors = {
  praise: "bg-tag-praise text-tag-praise-foreground",
  criticism: "bg-tag-criticism text-tag-criticism-foreground", 
  suggestion: "bg-tag-suggestion text-tag-suggestion-foreground",
  meme: "bg-tag-meme text-tag-meme-foreground",
};

export const TagBadge = ({ tag }: TagBadgeProps) => {
  const colorClass = tagColors[tag.toLowerCase() as keyof typeof tagColors] || tagColors.suggestion;
  
  return (
    <Badge className={`${colorClass} font-medium px-3 py-1`}>
      {tag}
    </Badge>
  );
};