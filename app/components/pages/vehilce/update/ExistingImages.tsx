
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import type { VehicleImage } from "~/types/vehicle";

interface ExistingImagesProps {
  images: VehicleImage[];
  onRemove: (imageId: string) => void;
  onPreview: (url: string) => void;
}

export function ExistingImages({ images, onRemove, onPreview }: ExistingImagesProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Imagens atuais
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div
              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => onPreview(img.url)}
            >
              <img
                src={img.url || "/placeholder.svg"}
                alt={`Imagem ${img.ordem || ""}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-300" />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(img.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remover imagem</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {img.isMain && (
              <Badge className="absolute bottom-2 left-2 bg-black text-white dark:bg-white dark:text-black border-0">
                Principal
              </Badge>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
