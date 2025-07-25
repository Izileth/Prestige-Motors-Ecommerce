import { useEffect, useState, useCallback, useRef } from 'react';
import useVehicle from './useVehicle';
import type { Vehicle } from '../types/vehicle';

export const useRandomVehicles = (count: number = 6) => {
  const { fetchVehicles, vehicles, loading, error: fetchError } = useVehicle();
  const [randomVehicles, setRandomVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);
  const lastFetchTime = useRef<number>(0);

  const loadVehicles = useCallback(async (force = false) => {
    if (!isMounted.current) return;

    setError(null); // Reset error before new request
    const now = Date.now();
    const cacheExpired = now - lastFetchTime.current > 300000; // 5 minutos

    if (!force && !cacheExpired && vehicles.length > 0) {
      return;
    }

    try {
      await fetchVehicles();
      lastFetchTime.current = Date.now();
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err : new Error('Failed to fetch vehicles'));
      }
      throw err; // Re-throw to allow components to handle
    }
  }, [fetchVehicles, vehicles.length]);

  useEffect(() => {
    isMounted.current = true;
    loadVehicles().catch(() => {}); // Error already handled

    return () => {
      isMounted.current = false;
    };
  }, [loadVehicles]);

  useEffect(() => {
    if (vehicles.length > 0 && isMounted.current) {
      const shuffled = [...vehicles]
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
      setRandomVehicles(shuffled);
    }
  }, [vehicles, count]);

  return {
    vehicles: randomVehicles,
    loading,
    error: error || fetchError, // Combine both possible error sources
    refresh: () => loadVehicles(true),
  };
};