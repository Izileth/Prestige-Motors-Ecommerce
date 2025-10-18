import type React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useVehicle from "~/src/hooks/useVehicle";
import { AnimatePresence } from "framer-motion";
import {
  FilterPanel,
  VehicleGrid,
  NoVehiclesFound,
  LoadingSkeleton,
  ErrorState,
  FavoriteError,
} from "~/src/components/pages/vehicles/listing";
import { SearchBar } from "~/src/components/pages/vehicles/listing/SearchBar";
import type {
  Vehicle,
  VehicleSearchParams,
  VehicleError,
} from "~/src/types/vehicle";

const VehicleSearchPage = () => {
  const {
    vehicles,
    loading,
    fetchVehicles,
    addFavorite,
    removeFavorite,
    fetchUserFavorites,
    favorites,
  } = useVehicle();

  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedParams, setDebouncedParams] = useState(searchParams);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<VehicleError | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(searchParams);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    const params: VehicleSearchParams = {};
    for (const [key, value] of debouncedParams.entries()) {
      (params as any)[key] = value;
    }
    fetchVehicles(params);
  }, [debouncedParams, fetchVehicles]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("modelo", e.target.value);
    setSearchParams(newSearchParams, { replace: true });
  };

  const handleFilterChange = (
    field: keyof VehicleSearchParams,
    value: string | number | boolean | undefined
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === "All" || value === undefined) {
      newSearchParams.delete(field);
    } else {
      newSearchParams.set(field, String(value));
    }
    setSearchParams(newSearchParams, { replace: true });
  };

  const resetFilters = () => {
    const newSearchParams = new URLSearchParams();
    const modelo = searchParams.get("modelo");
    if (modelo) {
      newSearchParams.set("modelo", modelo);
    }
    setSearchParams(newSearchParams);
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
    const params: VehicleSearchParams = {};
    for (const [key, value] of debouncedParams.entries()) {
      (params as any)[key] = value;
    }
    fetchVehicles(params);
  };
  
  const searchParamsObject = (): VehicleSearchParams => {
    const params: VehicleSearchParams = {};
    for (const [key, value] of searchParams.entries()) {
      (params as any)[key] = value;
    }
    return params;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div
            className={`z-10 mt-0 space-y-0 bg-white dark:bg-gray-950 transition-all duration-300`}
          >
            <SearchBar
              searchParams={searchParamsObject()}
              handleSearchChange={handleSearchChange}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
          </div>
          <AnimatePresence>
            {showFilters && (
              <FilterPanel
                filtersRef={filtersRef}
                searchParams={searchParamsObject()}
                handleFilterChange={handleFilterChange}
                resetFilters={resetFilters}
              />
            )}
          </AnimatePresence>
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

export default VehicleSearchPage;