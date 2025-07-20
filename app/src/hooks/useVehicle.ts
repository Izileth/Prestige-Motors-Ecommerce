
import { useCallback } from 'react';
import { useVehicleStore } from '~/src/store/slices/vehicle';
import type { Vehicle, VehicleCreateInput, VehicleSearchParams } from '~/src/types/vehicle';
import type { VehicleUpdateInput } from '~/src/types/inputs';
import { useAuth } from './useAuth';

const useVehicle = () => {
  const { isAuthenticated } = useAuth(); // Obtenha o estado de autenticação
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

  // Modificado para lidar com usuários não autenticados

  const fetchUserFavoritesSafe = useCallback(async () => {
    if (!isAuthenticated) {
      // Não faz nada se não autenticado
      return;
    }
    try {
      return await fetchUserFavorites();
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // Não propaga o erro para não quebrar o componente
      return;
    }
  }, [fetchUserFavorites, isAuthenticated]);

  // Modificado para lidar com usuários não autenticados
  const addFavoriteSafe = useCallback(async (vehicleId: string) => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    return addFavorite(vehicleId);
  }, [addFavorite, isAuthenticated]);

  // Modificado para lidar com usuários não autenticados
  const removeFavoriteSafe = useCallback(async (vehicleId: string) => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    return removeFavorite(vehicleId);
  }, [removeFavorite, isAuthenticated]);

  // Método utilitário seguro para verificar favoritos
  const isFavoriteSafe = useCallback((vehicleId: string) => {
    return isAuthenticated && favorites.some(v => v.id === vehicleId);
  }, [favorites, isAuthenticated]);

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
    fetchUserFavorites: fetchUserFavoritesSafe, // Usando a versão segura
    addFavorite: addFavoriteSafe, // Usando a versão segura
    removeFavorite: removeFavoriteSafe, // Usando a versão segura
    fetchVehicleReviews,
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
    isFavorite: isFavoriteSafe, // Usando a versão segura
    getUserVehicleCount: () => userVehicles.length,
    getVehicleById: (id: string) => vehicles.find(v => v.id === id) || null
  };
};

export default useVehicle;