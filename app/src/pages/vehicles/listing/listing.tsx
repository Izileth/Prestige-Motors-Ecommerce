import type React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import useVehicle from "~/src/hooks/useVehicle";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel } from "~/src/components/template/carousel/RadomCarousel";
import { PrincipalCars } from "~/src/data/carousel";
import {
  SearchBar,
  FilterPanel,
  VehicleGrid,
  NoVehiclesFound,
  LoadingSkeleton,
  ErrorState,
  FavoriteError,
} from "~/src/components/pages/vehicles/listing";
import type {
  Vehicle,
  VehicleSearchParams,
  VehicleError,
} from "~/src/types/vehicle";

const VehicleListingPage = () => {
  const {
    vehicles,
    loading,
    fetchVehicles,
    addFavorite,
    removeFavorite,
    fetchUserFavorites,
    favorites,
  } = useVehicle();

  const [searchParams, setSearchParams] = useState<VehicleSearchParams>({});
  const [showFilters, setShowFilters] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [error, setError] = useState<VehicleError | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVehicles(searchParams);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams, fetchVehicles]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node) &&
        showFilters
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, modelo: e.target.value });
  };

  const handleFilterChange = (
    field: keyof VehicleSearchParams,
    value: string | number | boolean | undefined
  ) => {
    if (value === "All" || value === undefined) {
      const newParams = { ...searchParams };
      delete newParams[field];
      setSearchParams(newParams);
    } else {
      setSearchParams({ ...searchParams, [field]: value });
    }
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const toggleFavorite = async (vehicle: Vehicle) => {
    try {
      if (isFavorite(vehicle.id)) {
        await removeFavorite(vehicle.id);
      } else {
        await addFavorite(vehicle.id);
      }
      await fetchUserFavorites();
      setError(null);
    } catch (err) {
      const error = err as Error;

      if (error.message === "User not authenticated") {
        setError({
          message: "Você precisa fazer login para adicionar aos favoritos",
          type: "auth",
        });
      } else {
        setError({
          message: "Ocorreu um erro ao atualizar seus favoritos",
          type: "api",
        });
        console.error("Erro ao atualizar favoritos:", error);
      }
    }
  };

  const isFavorite = (vehicleId: string) => {
    return (
      Array.isArray(favorites) && favorites.some((v) => v.id === vehicleId)
    );
  };

  const retryFetch = () => {
    fetchVehicles(searchParams);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div
        className={`z-10 bg-white dark:bg-gray-950 transition-all duration-300 ${scrolled ? "shadow-md py-3" : "py-6"}`}
      >
        <SearchBar
          searchParams={searchParams}
          handleSearchChange={handleSearchChange}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </div>

      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            filtersRef={filtersRef}
            searchParams={searchParams}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-0 py-0">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium mb-2 text-gray-900 dark:text-gray-100"
          >
            <Carousel items={PrincipalCars} className="w-full max-w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium mb-2 bg-white h-18 text-gray-900 dark:text-gray-100"
          />
        </div>

        {loading && <LoadingSkeleton />}

        {error && (
          <FavoriteError error={error} setError={setError} location={location} />
        )}

        {!loading && !Array.isArray(vehicles) && (
          <ErrorState retryFetch={retryFetch} />
        )}

        {!loading && Array.isArray(vehicles) && (
          <>
            <VehicleGrid
              vehicles={vehicles}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />

            {vehicles.length === 0 && <NoVehiclesFound />}
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleListingPage;