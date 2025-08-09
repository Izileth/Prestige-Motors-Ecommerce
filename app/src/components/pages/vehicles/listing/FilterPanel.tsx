import { motion } from "framer-motion";
import { VehicleFilters } from "~/src/components/common/VehicleFilter";

export const FilterPanel = ({
  filtersRef,
  searchParams,
  handleFilterChange,
  resetFilters,
}: {
  filtersRef: React.RefObject<HTMLDivElement | null>;
  searchParams: any;
  handleFilterChange: (field: any, value: any) => void;
  resetFilters: () => void;
}) => (
  <motion.div
    ref={filtersRef}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
    className="container mx-auto px-2 lg:px-4 relative z-10"
  >
    <VehicleFilters
      searchParams={searchParams}
      onFilterChange={handleFilterChange}
      onReset={resetFilters}
    />
  </motion.div>
);
