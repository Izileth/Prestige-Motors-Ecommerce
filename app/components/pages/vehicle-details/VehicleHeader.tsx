import type React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { Heart, Share2, ChevronLeft } from "lucide-react";

interface VehicleHeaderProps {
  isFavorite: boolean;
  scrolled: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

const VehicleHeader: React.FC<VehicleHeaderProps> = ({
  isFavorite,
  scrolled,
  onToggleFavorite,
  onShare,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`sticky top-0 z-10 bg-zinc-50 dark:bg-gray-950/95 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? "shadow-sm py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <ChevronLeft size={16} className="mr-2" /> Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <Heart
                size={20}
                className={
                  isFavorite
                    ? "fill-black text-black dark:fill-white dark:text-white"
                    : "text-gray-500"
                }
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onShare}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <Share2 size={20} className="text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleHeader;
