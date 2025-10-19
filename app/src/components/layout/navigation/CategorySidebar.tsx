import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { categories } from "~/src/components/pages/home/category.d";

interface CategorySidebarProps {
  onLinkClick: () => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      onLinkClick();
      navigate(
        {
          pathname: "/vehicles/select",
          search: `?categoria=${categoryId}`,
        },
        {
          replace: true,
          state: { fromCategoryGrid: true },
        }
      );
    } else {
      setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    }
  };

  return (
    <div className="space-y-1">
      {categories.map((category) => (
        <div key={category.id}>
          <button
            onClick={() => handleCategoryClick(category.id)}
            className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-extralight tracking-wider uppercase hover:bg-accent rounded-md transition-colors"
          >
            <div className="flex items-center gap-3">
              {category.icon}
              <span>{category.name}</span>
            </div>
            {expandedCategory === category.id ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <AnimatePresence>
            {expandedCategory === category.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden ml-4 mt-1 space-y-1 border-l-2 border-border pl-3"
              >
                <p className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                  {category.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLinkClick();
                    navigate({
                      pathname: "/vehicles/select",
                      search: `?categoria=${category.id}`,
                    });
                  }}
                  className="flex items-center px-3 py-2 text-sm font-medium text-black dark:text-white"
                >
                  <span>Ver veículos</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
