import { motion } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { Filter, X } from "lucide-react";

export const FilterBar = ({
  activeFiltersCount,
  resetFilters,
  showFilters,
  setShowFilters,
}: {
  activeFiltersCount: number;
  resetFilters: () => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}) => (
  <div className="flex items-center gap-3">
    {activeFiltersCount > 0 && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          Limpar filtros
        </Button>
      </motion.div>
    )}

    <Button
      onClick={() => setShowFilters(!showFilters)}
      variant="outline"
      size="sm"
      className="gap-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
    >
      {showFilters ? <X size={16} /> : <Filter size={16} />}
      <span>Filtros</span>
      {activeFiltersCount > 0 && (
        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black text-xs">
          {activeFiltersCount}
        </Badge>
      )}
    </Button>
  </div>
);
