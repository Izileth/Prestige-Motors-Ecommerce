import { useEffect, useState, useCallback, useRef } from 'react';
import useVehicle from './useVehicle';
import type { Vehicle } from '../types/vehicle';
import { CACHE_EXPIRY_MS } from '~/src/lib/cache';

export const useFeaturedVehicles = (count: number = 4) => {
    const { vehicles, loading, fetchVehicles, error: fetchError } = useVehicle();
    const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const lastFetchTime = useRef<number>(0);
    const isMounted = useRef(true);
    
    const selectRandomVehicles = useCallback((vehicleList: Vehicle[]) => {
        if (vehicleList.length <= count) return [...vehicleList];
        
        const shuffled = [...vehicleList];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }, [count]);
    
    const loadFeaturedVehicles = useCallback(async (forceRefresh = false) => {
        if (!isMounted.current) return;
        
        setError(null); // Reset error before new request
        const now = Date.now();
        const shouldFetch =
            forceRefresh ||
            vehicles.length === 0 ||
            now - lastFetchTime.current > CACHE_EXPIRY_MS;
        
        if (shouldFetch) {
            try {
                await fetchVehicles();
                lastFetchTime.current = Date.now();
            } catch (err) {
                if (isMounted.current) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch vehicles'));
                }
                throw err; // Re-throw to allow components to handle
            }
        }
    }, [fetchVehicles, vehicles.length]);
    
    useEffect(() => {
        isMounted.current = true;
        loadFeaturedVehicles().catch(() => {}); // Error already handled
        
        return () => {
            isMounted.current = false;
        };
    }, [loadFeaturedVehicles]);
    
    useEffect(() => {
        if (vehicles.length > 0 && isMounted.current) {
            setFeaturedVehicles(selectRandomVehicles(vehicles));
        }
    }, [vehicles, selectRandomVehicles]);
    
    return {
        featuredVehicles,
        loading,
        error: error || fetchError, // Combine both possible error sources
        refresh: () => loadFeaturedVehicles(true),
    };
};