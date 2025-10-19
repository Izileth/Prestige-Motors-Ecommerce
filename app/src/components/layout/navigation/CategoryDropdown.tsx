import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "~/src/components/pages/home/category.d";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "~/src/components/ui/navigation-menu";
import { cn } from "~/src/lib/cn";

export const CategoryDropdown = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
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
  };

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          'font-extralight tracking-wider text-xs uppercase bg-transparent hover:bg-transparent',
        )}
      >
        Categorias
      </NavigationMenuTrigger>
      <NavigationMenuContent className="data-[side=top]:animate-slideDown data-[side=right]:animate-slideLeft data-[side=left]:animate-slideRight data-[side=bottom]:animate-slideUp">
        <ul className="grid grid-cols-2 w-[400px] gap-2 p-4 border-t border-border">
          {categories.map((category, index) => (
            <motion.li
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <NavigationMenuLink asChild>
                <a
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col p-4 rounded-md hover:bg-accent focus:outline-none focus:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                      {category.icon}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {category.name}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {hoveredCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400"
                        >
                          <span className="mr-1">Ver veículos</span>
                          <ArrowRight size={12} />
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </a>
              </NavigationMenuLink>
            </motion.li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
