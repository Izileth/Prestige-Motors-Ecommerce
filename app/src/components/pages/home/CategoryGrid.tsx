import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { ArrowRight, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useIsMobile } from "~/src/hooks/use-mobile";
import { categories } from "./category.d";

export const CategoryGrid = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllMobile, setShowAllMobile] = useState(false);

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For mobile, limit initial display to 4 categories unless "Show All" is clicked
  const displayedCategories =
    isMobile && !showAllMobile
      ? filteredCategories.slice(0, 4)
      : filteredCategories;

  const handleCategoryClick = (categoryId: string) => {
    if (isMobile && expandedCategory === categoryId) {
      // If already expanded, navigate to the category
      navigate(
        {
          pathname: "/vehicles/category",
          search: `?categoria=${categoryId}`,
        },
        {
          replace: true,
          state: { fromCategoryGrid: true },
        }
      );
    } else if (isMobile) {
      // On mobile, toggle expansion instead of immediate navigation
      setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    } else {
      // On desktop, navigate immediately
      navigate(
        {
          pathname: "/vehicles/category",
          search: `?categoria=${categoryId}`,
        },
        {
          replace: true,
          state: { fromCategoryGrid: true },
        }
      );
    }
  };

  return (
    <section className="container mx-auto max-h-full w-full px-4 py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-6xl font-extralight tracking-tight text-gray-900 dark:text-gray-100 mb-3"
        >
          NAVEGUE POR CATEGORIAS
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "40px" }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="h-0.5 bg-black dark:bg-white mx-auto"
        />
      </motion.div>

      {/* Search input for both mobile and desktop */}
      <div className="relative max-w-full mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar categorias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {displayedCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {category.name}
                  </h3>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>

              <AnimatePresence>
                {expandedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-gray-200 dark:border-gray-800"
                  >
                    <div className="p-4 bg-gray-50 dark:bg-gray-800">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {category.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate({
                            pathname: "/vehicles/category",
                            search: `?categoria=${category.id}`,
                          });
                        }}
                        className="flex items-center text-sm font-medium text-black dark:text-white"
                      >
                        <span>Ver veículos</span>
                        <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Show more/less button for mobile */}
          {filteredCategories.length > 4 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium text-sm flex items-center justify-center"
              onClick={() => setShowAllMobile(!showAllMobile)}
            >
              {showAllMobile ? (
                <>
                  <span>Mostrar menos</span>
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <span>
                    Mostrar mais {filteredCategories.length - 4} categorias
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </motion.button>
          )}

          {/* Guidance text for mobile */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4"
          >
            Toque para expandir e ver detalhes
          </motion.p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              className="relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-none p-8 cursor-pointer transition-all duration-300 h-full bg-white dark:bg-gray-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)]"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex flex-col items-center gap-5 relative z-10">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="p-4 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300"
                  >
                    {category.icon}
                  </motion.div>
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {category.name}
                    </h3>
                    <AnimatePresence>
                      {hoveredCategory === category.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="flex items-center justify-center mt-2 text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                          >
                            <span className="mr-1">Ver veículos</span>
                            <ArrowRight size={12} />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-black dark:bg-white"
                  initial={{ width: 0 }}
                  animate={{
                    width: hoveredCategory === category.id ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
