// use-vehicle.ts
import { useCallback } from 'react';
import { useVehicleStore } from '~/store/slices/vehicle';
import type { Vehicle, VehicleCreateInput, VehicleSearchParams } from '~/types/vehicle';
import type { VehicleUpdateInput } from '~/types/inputs';


const useVehicle = () => {
  const {
    // Estado
    vehicles,
    featuredVehicles,
    favorites,
    userVehicles,
    vendorVehicles,
    currentVehicle,
    reviews,
    stats,
    userStats,
    views,
    loading,
    error,
    success,
    
    // Ações
    fetchVehicles,
    fetchVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    fetchFeaturedVehicles,
    fetchUserFavorites,
    addFavorite,
    removeFavorite,
    fetchVehicleReviews,
    createReview,
    uploadVehicleImages,
    uploadVehicleVideos,
    fetchVehicleStats,
    fetchUserVehicleStats,
    fetchUserVehicles,
    fetchVehiclesByVendor,
    registerVehicleView,
    fetchVehicleViews,
    updateStatus,
    deleteVehicleImage,
    resetVehicleState,
    setCurrentVehicle
  } = useVehicleStore();

  // Métodos com lógica adicional podem ser encapsulados aqui
  const fetchVehiclesWithParams = useCallback(async (params?: VehicleSearchParams) => {
    const normalizedParams = params
      ? Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v !== undefined)
        )
      : {};
    return fetchVehicles(normalizedParams);
  }, [fetchVehicles]);

  const createVehicleWithHandling = useCallback(async (data: VehicleCreateInput) => {
    try {
      return await createVehicle(data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create vehicle');
    }
  }, [createVehicle]);

  const updateVehicleWithHandling = useCallback(async (id: string, data: VehicleUpdateInput) => {
    try {
      return await updateVehicle(id, data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update vehicle');
    }
  }, [updateVehicle]);

  const updateStatusWithHandling = useCallback(async (id: string, status: string) => {
    try {
      return await updateStatus(id, status);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update vehicle status');
    }
  }, [updateStatus]);

  const deleteImageWithHandling = useCallback(async (vehicleId: string, imageUrl: string) => {
    try {
      await deleteVehicleImage(vehicleId, imageUrl);
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      throw error;
    }
  }, [deleteVehicleImage]);

  return {
    // Estado
    vehicles,
    featuredVehicles,
    favorites,
    userVehicles,
    vendorVehicles,
    currentVehicle,
    reviews,
    stats,
    userStats,
    views,
    loading,
    error,
    success,
    
    // Ações
    fetchVehicles: fetchVehiclesWithParams,
    fetchVehicleById,
    createVehicle: createVehicleWithHandling,
    updateVehicle: updateVehicleWithHandling,
    deleteVehicle,
    fetchFeaturedVehicles,
    fetchUserFavorites,
    addFavorite,
    removeFavorite,
    fetchVehicleReviews,
    createReview,
    uploadVehicleImages,
    uploadVehicleVideos,
    fetchVehicleStats,
    fetchUserVehicleStats,
    fetchUserVehicles,
    fetchVehiclesByVendor,
    registerVehicleView,
    fetchVehicleViews,
    updateStatus: updateStatusWithHandling,
    deleteVehicleImage: deleteImageWithHandling,
    resetVehicleState,
    setCurrentVehicle,

    // Métodos utilitários
    isFavorite: (vehicleId: string) => favorites.some(v => v.id === vehicleId),
    getUserVehicleCount: () => userVehicles.length,
    getVehicleById: (id: string) => vehicles.find(v => v.id === id) || null
  };
};

export default useVehicle;