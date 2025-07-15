// src/utils/vehicleStatsUtils.ts
import type { VehicleStatsData } from '~/types/vehicle';

// Calcula o total de veículos a partir do objeto stats
export const getTotalVehicles = (stats: VehicleStatsData | null | undefined): number => {
    return stats?.marcas?.reduce((total, marca) => total + (marca.quantidade || 0), 0) || 0;
};

// Calcula a porcentagem em relação ao total do catálogo
type PercentageParams = {
    userStats: VehicleStatsData | null | undefined;
    catalogStats: VehicleStatsData | null | undefined;
};

export const getCatalogPercentage = ({ userStats, catalogStats }: PercentageParams): string => {
    const userTotal = getTotalVehicles(userStats);
    const catalogTotal = getTotalVehicles(catalogStats) || 1; // Evita divisão por zero

    const percentage = (userTotal / catalogTotal) * 100;

    if (percentage <= 0) return '0% do catálogo';
    if (percentage < 0.1) return '< 0.1% do catálogo';
    
    return `${percentage.toFixed(1)}% do catálogo`;
};