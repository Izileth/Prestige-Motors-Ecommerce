
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { X } from "lucide-react";

interface ImageViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string | null;
}

export function ImageViewer({ open, onOpenChange, imageUrl }: ImageViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent border-0 shadow-none max-w-4xl">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10"
          >
            <X className="h-5 w-5" />
          </Button>
          {imageUrl && (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Visualização da imagem"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
