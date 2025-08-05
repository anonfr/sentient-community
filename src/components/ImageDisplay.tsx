import { useState } from "react";
import { ImageModal } from "./ImageModal";
import { Expand } from "lucide-react";

interface ImageDisplayProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export const ImageDisplay = ({ imageUrl, alt, className = "" }: ImageDisplayProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`relative group cursor-pointer ${className}`}>
        <div className="aspect-video rounded-lg overflow-hidden border border-primary/20 bg-muted">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onClick={() => setIsModalOpen(true)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <Expand className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
      
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={imageUrl}
        alt={alt}
      />
    </>
  );
}; 