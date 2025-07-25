import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryGrid } from "~/src/components/template/grid/CategoryGrid";
import { VehicleFilters } from "~/src/components/common/VehicleFilter";
import { VehicleCard } from "~/src/components/common/VehiclesCard";
import { VehicleCardSkeleton } from "~/src/components/layout/skeleton/VehicleCardSkeleton";
import useVehicle from "~/src/hooks/useVehicle";
import { Button } from "~/src/components/ui/button";
import { Filter, X, ChevronUp, ArrowRight, Search } from "lucide-react";
import { usePersistentFilters } from "~/src/hooks/usePersistFilters";
import type { Vehicle, VehicleSearchParams } from "~/src/types/vehicle";
import { useNavigate } from "react-router";
import { Badge } from "~/src/components/ui/badge";

import { ExpecionalCars } from "~/src/data/carousel";
import { Carousel } from "~/src/components/template/RadomCarousel";

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

  // Update search when filters change (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVehicles(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  // Clear localStorage if not coming from category grid
  useEffect(() => {
    if (!location.state?.fromCategoryGrid) {
      localStorage.removeItem("vehicleFilters");
    }
  }, [location.key]);

  // Track scroll position for header styling
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

    // Scroll to results after filter change
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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Carousel items={ExpecionalCars} className="max-w-full w-full" />

      {!filters.categoria && <CategoryGrid />}

      <div
        ref={resultsRef}
        className={`sticky top-0 z-10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm transition-all duration-300 ${
          scrolled ? "py-4 shadow-none" : "py-8"
        }`}
      >
        <div className="container mx-auto px-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 border-0 shadow-none flex-wrap">
                <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  {filters.categoria ? "VEÍCULOS" : "TODOS OS VEÍCULOS"}
                </h1>
                
                {filters.categoria && (
                  <div className="relative">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm md:text-2xl font-medium bg-gradient-to-r from-zinc-950 to-zinc-900 text-white">
                      {formatCategoryName(filters.categoria)}
                      <motion.span 
                        className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-sm"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ repeat: Infinity, repeatType: "mirror", duration: 3 }}
                      />
                    </span>
                  </div>
                )}
              </div>

              {vehicles.length > 0 && !loading && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {vehicles.length} {vehicles.length === 1 ? "resultado" : "resultados"} encontrados
                </p>
              )}
            </motion.div>

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
          </div>
        </div>
      </div>

      <div className="container mx-auto ">
        {/* Expandable filters */}
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

        {/* Vehicle listing */}

        <AnimatePresence mode="wait">
          <motion.div
            key={filters.categoria || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-8 px-4"
          >
            <div className="py-8 px-4">
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="max-w-2xl mx-auto text-center p-8 md:p-12 bg-transparent dark:bg-gray-900 "
              >
                <div className="flex flex-col items-center gap-6">
                  {/* Ilustração SVG */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 dark:text-gray-600"
                  >
                    <h1 className="text-8xl font-semibold text-gray-900 dark:text-gray-100">104!</h1>
                  </motion.div>

                  <div className="px-6 gap-4 flex flex-col items-center">
                    <h3 className="text-lg font-light text-gray-800 dark:text-gray-200">
                      Falha ao carregar veículos
                    </h3>
                    <p className="text-gray-500 text-md dark:text-gray-400 font-light">
                      Não foi possível carregar os veículos no momento. Por favor,
                      tente novamente.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2 text-sm bg-transparent text-gray-800 dark:text-gray-200 font-light rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
                    onClick={() => fetchVehicles(filters)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-spin"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Tentar novamente...
                  </motion.button>
                </div>
              </motion.div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(6)].map((_, i) => (
                  <VehicleCardSkeleton key={i} />
                ))}
              </div>
            ) : vehicles.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {vehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4 },
                      },
                    }}
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      isFavorite={favorites.some((v) => v.id === vehicle.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border border-gray-100 dark:border-gray-800 rounded-none"
              >
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 dark:text-gray-100">
                    Nenhum veículo encontrado
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Não encontramos veículos que correspondam aos seus critérios
                    de busca.
                  </p>
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="mt-4 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    Limpar filtros
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

        {/* Show more button */}
        {vehicles.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center my-8"
          >
            <Button
              variant="outline"
              className="group border-gray-200 border-none rounded-none shadow-none dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 gap-2"
              onClick={handleVehicles}
            >
              <span>Ver mais veículos</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};



// Adicione esta função acima do componente principal
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