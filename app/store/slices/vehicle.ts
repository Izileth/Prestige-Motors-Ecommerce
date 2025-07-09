
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import vehicleService from '~/services/vehicle';
import type { ReviewCreateInput, VehicleUpdateInput } from '~/types/inputs';
import type { Vehicle, VehicleUserStats, VehicleCreateInput, VehicleSearchParams, VehicleGlobalStats } from '~/types/vehicle';
import type { Review } from '~/types/reviews';

interface VehicleState {
  // Estado (igual ao Redux)
  vehicles: Vehicle[];
  featuredVehicles: Vehicle[];
  favorites: Vehicle[];
  
  userVehicles: Vehicle[];
  vendorVehicles: Vehicle[];
  currentVehicle: Vehicle | null;
  reviews: Review[];
  stats: VehicleGlobalStats | null;
  userStats: VehicleUserStats | null;
  views: number;
  loading: boolean;
  error: string | null;
  success: boolean;

  // Ações (todas as thunks + reducers)
  fetchVehicles: (params?: VehicleSearchParams) => Promise<void>;
  fetchVehicleById: (id: string) => Promise<void>;
    
  createVehicle: (data: VehicleCreateInput) => Promise<Vehicle>;
  updateVehicle: (id: string, data: VehicleUpdateInput) => Promise<Vehicle>;
  deleteVehicle: (id: string) => Promise<void>;
  fetchFeaturedVehicles: () => Promise<void>;
  fetchUserFavorites: () => Promise<void>;
  addFavorite: (vehicleId: string) => Promise<void>;
  removeFavorite: (vehicleId: string) => Promise<void>;
  fetchVehicleReviews: (vehicleId: string) => Promise<void>;
  createReview: (vehicleId: string, data: ReviewCreateInput) => Promise<Review>;
  uploadVehicleImages: (vehicleId: string, files: File[]) => Promise<Vehicle>;
  deleteVehicleImage: (vehicleId: string, imageUrl: string) => Promise<void>;
  fetchVehicleStats: () => Promise<VehicleGlobalStats>;
  fetchUserVehicles: () => Promise<void>;
  fetchUserVehicleStats: () => Promise<void>;
  registerVehicleView: (vehicleId: string) => Promise<void>;
  fetchVehicleViews: () => Promise<void>;
  fetchVehiclesByVendor: (vendorId: string) => Promise<void>;
  updateStatus: (id: string, status: string) => Promise<Vehicle>;
  uploadVehicleVideos: (vehicleId: string, file: File) => Promise<Vehicle>;
  
  // Reducers
  resetVehicleState: () => void;
  setCurrentVehicle: (vehicle: Vehicle | null) => void;
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      vehicles: [],
      featuredVehicles: [],
      favorites: [],
      userVehicles: [],
      vendorVehicles: [],
      currentVehicle: null,
      reviews: [],
      stats: null,
      userStats: null,
      views: 0,
      loading: false,
      error: null,
      success: false,

      // Implementação das ações
      fetchVehicles: async (params = {}) => {
        set({ loading: true, error: null });
        try {
          const vehicles = await vehicleService.getVehicles(params);
          set({ vehicles, loading: false });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch vehicles' 
          });
        }
      },

      fetchVehicleById: async (id) => {
        set({ loading: true });
        try {
          const vehicle = await vehicleService.getVehicleById(id);
          set({ 
            currentVehicle: {
              ...vehicle,
              imagens: vehicle.imagens || []
            },
            loading: false
          });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch vehicle' 
          });
        }
      },

      createVehicle: async (data) => {
        set({ loading: true, error: null, success: false });
        try {
          const vehicle = await vehicleService.createVehicle(data);
          set(state => ({
            vehicles: [...state.vehicles, vehicle],
            loading: false,
            success: true
          }));
          return vehicle;
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to create vehicle' 
          });
          throw error;
        }
      },

      updateVehicle: async (id, data) => {
        set({ loading: true, error: null, success: false });
        try {
          const updatedVehicle = await vehicleService.updateVehicle(id, data);
          set(state => ({
            vehicles: state.vehicles.map(v => 
              v.id === id ? updatedVehicle : v
            ),
            currentVehicle: state.currentVehicle?.id === id ? updatedVehicle : state.currentVehicle,
            userVehicles: state.userVehicles.map(v =>
              v.id === id ? updatedVehicle : v
            ),
            loading: false,
            success: true
          }));
          return updatedVehicle;
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to update vehicle' 
          });
          throw error;
        }
      },

      deleteVehicle: async (id) => {
        set({ loading: true, error: null, success: false });
        try {
          await vehicleService.deleteVehicle(id);
          set(state => ({
            vehicles: state.vehicles.filter(v => v.id !== id),
            currentVehicle: state.currentVehicle?.id === id ? null : state.currentVehicle,
            userVehicles: state.userVehicles.filter(v => v.id !== id),
            loading: false,
            success: true
          }));
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to delete vehicle' 
          });
          throw error;
        }
      },

      fetchFeaturedVehicles: async () => {
        set({ loading: true, error: null });
        try {
          const featuredVehicles = await vehicleService.getFeaturedVehicles();
          set({ featuredVehicles, loading: false });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch featured vehicles' 
          });
        }
      },

      fetchUserFavorites: async () => {
        set({ loading: true, error: null });
        try {
          const favorites = await vehicleService.getUserFavorites();
          set({ favorites, loading: false });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch favorites' 
          });
        }
      },

      addFavorite: async (vehicleId) => {
        set({ loading: true, error: null });
        try {
          const vehicle = await vehicleService.addFavorite(vehicleId);
          set(state => ({
            vehicles: state.vehicles.map(v =>
              v.id === vehicleId ? { ...v, isFavorite: true } : v
            ),
            currentVehicle: state.currentVehicle?.id === vehicleId 
              ? { ...state.currentVehicle, isFavorite: true }
              : state.currentVehicle,
            favorites: [...state.favorites, vehicle],
            loading: false
          }));
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to add favorite' 
          });
          throw error;
        }
      },

      removeFavorite: async (vehicleId) => {
        set({ loading: true, error: null });
        try {
          await vehicleService.removeFavorite(vehicleId);
          set(state => ({
            favorites: state.favorites.filter(v => v.id !== vehicleId),
            vehicles: state.vehicles.map(v =>
              v.id === vehicleId ? { ...v, isFavorite: false } : v
            ),
            currentVehicle: state.currentVehicle?.id === vehicleId
              ? { ...state.currentVehicle, isFavorite: false }
              : state.currentVehicle,
            loading: false
          }));
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to remove favorite' 
          });
          throw error;
        }
      },

      fetchVehicleReviews: async (vehicleId) => {
        set({ loading: true, error: null });
        try {
          const reviews = await vehicleService.getVehicleReviews(vehicleId);
          set({ reviews, loading: false });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch reviews' 
          });
        }
      },

      createReview: async (vehicleId, data) => {
        set({ loading: true, error: null, success: false });
        try {
          const review = await vehicleService.createReview(vehicleId, data);
          set(state => ({
            reviews: [...state.reviews, review],
            loading: false,
            success: true
          }));
          return review;
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to create review' 
          });
          throw error;
        }
      },

      uploadVehicleImages: async (vehicleId, files) => {
        set({ loading: true, error: null, success: false });
        try {
          const vehicle = await vehicleService.uploadImages(vehicleId, files);
          set(state => ({
            vehicles: state.vehicles.map(v =>
              v.id === vehicleId ? vehicle : v
            ),
            currentVehicle: state.currentVehicle?.id === vehicleId 
              ? vehicle 
              : state.currentVehicle,
            loading: false,
            success: true
          }));
          return vehicle;
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to upload images' 
          });
          throw error;
        }
      },

      deleteVehicleImage: async (vehicleId, imageUrl) => {
        set({ loading: true, error: null });
        try {
          await vehicleService.deleteVehicleImage(vehicleId, imageUrl);
          set(state => ({
            currentVehicle: state.currentVehicle?.id === vehicleId
              ? {
                  ...state.currentVehicle,
                  imagens: state.currentVehicle.imagens?.filter(img => img.id !== imageUrl)
                }
              : state.currentVehicle,
            vehicles: state.vehicles.map(v =>
              v.id === vehicleId
                ? {
                    ...v,
                    imagens: v.imagens?.filter(img => img.id !== imageUrl)
                  }
                : v
            ),
            loading: false
          }));
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to delete image' 
          });
          throw error;
        }
      },
      fetchVehicleStats: async () => {
        set({ loading: true, error: null });
        try {
          const stats = await vehicleService.getVehicleStats();
          set({ stats, loading: false });
          return stats; // Adicione esta linha para retornar os dados
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch stats'
          });
          throw error; // Lança o erro para ser capturado pelo chamador
        }
      },

      fetchUserVehicles: async () => {
        set({ loading: true, error: null });
        try {
          const userVehicles = await vehicleService.getUserVehicles();
          set({ userVehicles, loading: false });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch user vehicles' 
          });
        }
      },

      fetchUserVehicleStats: async () => {
        set({ loading: true, error: null });
        try {
          const userStats = await vehicleService.getUserVehicleStats();
          set({ userStats, loading: false });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch user vehicle stats' 
          });
        }
      },

      registerVehicleView: async (vehicleId) => {
        try {
          await vehicleService.registerVehicleView(vehicleId);
          set(state => ({
            vehicles: state.vehicles.map(v =>
              v.id === vehicleId
                ? { ...v, visualizacoes: (v.visualizacoes || 0) + 1 }
                : v
            ),
            currentVehicle: state.currentVehicle?.id === vehicleId
              ? {
                  ...state.currentVehicle,
                  visualizacoes: (state.currentVehicle.visualizacoes || 0) + 1
                }
              : state.currentVehicle
          }));
        } catch (error) {
          console.error('Error registering view:', error);
        }
      },

      fetchVehicleViews: async () => {
        set({ loading: true, error: null });
        try {
          const views = await vehicleService.getVehicleViews();
          set({ views, loading: false });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch vehicle views' 
          });
        }
      },

      fetchVehiclesByVendor: async (vendorId) => {
        set({ loading: true, error: null });
        try {
          const vendorVehicles = await vehicleService.getVehiclesByVendor(vendorId);
          set({ vendorVehicles, loading: false });
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch vendor vehicles' 
          });
        }
      },

      updateStatus: async (id, status) => {
        set({ loading: true, error: null, success: false });
        try {
          const vehicle = await vehicleService.updateVehicleStatus(id, status);
          set(state => ({
            vehicles: state.vehicles.map(v =>
              v.id === id ? vehicle : v
            ),
            userVehicles: state.userVehicles.map(v =>
              v.id === id ? vehicle : v
            ),
            currentVehicle: state.currentVehicle?.id === id ? vehicle : state.currentVehicle,
            loading: false,
            success: true
          }));
          return vehicle;
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to update vehicle status' 
          });
          throw error;
        }
      },

      uploadVehicleVideos: async (vehicleId, file) => {
        set({ loading: true, error: null, success: false });
        try {
          const vehicle = await vehicleService.uploadVideos(vehicleId, file);
          set(state => ({
            vehicles: state.vehicles.map(v =>
              v.id === vehicleId ? vehicle : v
            ),
            userVehicles: state.userVehicles.map(v =>
              v.id === vehicleId ? vehicle : v
            ),
            currentVehicle: state.currentVehicle?.id === vehicleId ? vehicle : state.currentVehicle,
            loading: false,
            success: true
          }));
          return vehicle;
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to upload videos' 
          });
          throw error;
        }
      },

      // Reducers
      resetVehicleState: () => {
        set({
          vehicles: [],
          featuredVehicles: [],
          favorites: [],
          userVehicles: [],
          vendorVehicles: [],
          currentVehicle: null,
          reviews: [],
          stats: null,
          userStats: null,
          views: 0,
          loading: false,
          error: null,
          success: false
        });
      },

      setCurrentVehicle: (vehicle) => {
        set({ currentVehicle: vehicle });
      }
    }),
    {
      name: 'vehicle-storage',
      partialize: (state) => ({
        // Persistir apenas os dados necessários
        favorites: state.favorites,
        userVehicles: state.userVehicles
      }),
    }
  )
);

// Selectors opcionais (para manter compatibilidade)
export const selectCurrentVehicle = () => useVehicleStore.getState().currentVehicle;
export const selectVehicles = () => useVehicleStore.getState().vehicles;
export const selectVehicleLoading = () => useVehicleStore.getState().loading;
export const selectVehicleError = () => useVehicleStore.getState().error;