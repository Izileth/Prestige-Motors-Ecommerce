import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryGrid } from "~/src/components/template/grid/CategoryGrid";
import { VehicleFilters } from "~/src/components/common/VehicleFilter";
import useVehicle from "~/src/hooks/useVehicle";
import { Button } from "~/src/components/ui/button";
import { ChevronUp } from "lucide-react";
import { usePersistentFilters } from "~/src/hooks/usePersistFilters";
import type { Vehicle, VehicleSearchParams } from "~/src/types/vehicle";
import { useNavigate } from "react-router";
import { Carousel } from "~/src/components/template/carousel/RadomCarousel";
import { ExpecionalCars } from "~/src/data/carousel";
import {
  CategoryHeader,
  FilterBar,
  VehicleGrid,
  NoVehiclesFound,
  LoadingSkeleton,
  ErrorState,
  ShowMoreButton,
} from "~/src/components/pages/vehicles/category";

export const VehiclesByCategoryPage = () => {
  const location = useLocation();
  const [filters, setFilters] = usePersistentFilters<VehicleSearchParams>({});
  const [showFilters, setShowFilters] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    vehicles,
    loading,
    error,
    fetchVehicles,
    addFavorite,
    removeFavorite,
    fetchUserFavorites,
    favorites,
  } = useVehicle();
  const navigate = useNavigate();

  const handleVehicles = () => {
    navigate("/vehicles");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVehicles(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, fetchVehicles]);

  useEffect(() => {
    if (!location.state?.fromCategoryGrid) {
      localStorage.removeItem("vehicleFilters");
    }
  }, [location.key, location.state?.fromCategoryGrid]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = (
    field: keyof VehicleSearchParams,
    value: string | number | boolean | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value === "All" ? undefined : value,
    }));

    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const resetFilters = () => {
    fetchVehicles();
    setShowFilters(false);
  };

  const toggleFavorite = async (vehicle: Vehicle) => {
    if (favorites.some((v) => v.id === vehicle.id)) {
      await removeFavorite(vehicle.id);
    } else {
      await addFavorite(vehicle.id);
    }
    fetchUserFavorites();
  };

  const activeFiltersCount = Object.keys(filters).filter(
    (key) => filters[key as keyof VehicleSearchParams] !== undefined
  ).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 ">
      <Carousel items={ExpecionalCars} className="max-w-full w-full" />

      {!filters.categoria && <CategoryGrid />}

      <div
        ref={resultsRef}
        className={`sticky top-0 z-10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm transition-all duration-300 px-0 md:px-4 ${scrolled ? "py-4 shadow-none" : "py-8"}`}
      >
        <div className="container mx-auto w-full max-w-full px-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-2">
            <CategoryHeader
              filters={filters}
              vehiclesCount={vehicles.length}
              loading={loading}
            />
            <FilterBar
              activeFiltersCount={activeFiltersCount}
              resetFilters={resetFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto ">
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden mb-8 shadow-none border-none"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="border-none shadow-none border-gray-100 dark:border-gray-800 rounded-none bg-white dark:bg-gray-900  mt-4"
              >
                <VehicleFilters
                  searchParams={filters}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />

                <div className="flex justify-end mt-6 shadow-none border-none">
                  <Button
                    onClick={() => setShowFilters(false)}
                    variant="outline"
                    size="sm"
                    className="gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-gray-200 dark:border-gray-800"
                  >
                    <ChevronUp size={16} />
                    <span>Fechar filtros</span>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={filters.categoria || "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-8 px-4"
          >
            <div className="py-8 px-4">
              {error ? (
                <ErrorState fetchVehicles={fetchVehicles} filters={filters} />
              ) : loading ? (
                <LoadingSkeleton />
              ) : vehicles.length > 0 ? (
                <VehicleGrid
                  vehicles={vehicles}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              ) : (
                <NoVehiclesFound resetFilters={resetFilters} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};


const formatCategoryName = (id: string) => {
  const map: Record<string, string> = {
    SUV: "SUV",
    SPORTS_CAR: "Esportivos",
    PICKUP_4X4: "Picapes",
    HOT_HATCH: "Hot Hatches",
    ELECTRIC: "Elétricos",
    CLASSIC: "Clássicos",
    RETRO_SUPER: "Retro Super",
  };
  
  // Remove underlines e formata para título
  const formatted = map[id] || id.replace(/_/g, ' ');
  return formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
