import api from "./api";

import type {
  Vehicle,
  VehicleCreateInput,
  VehicleSearchParams,
} from "../types/vehicle";

import type { VehicleUpdateInput } from "../types/inputs";

export const vehicleService = {

  async getVehicles(params?: VehicleSearchParams): Promise<Vehicle[]> {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params || {}).filter(
          ([_, v]) => v !== undefined && v !== null && v !== ""
        )
      );

      console.log('🔍 [VehicleService] Fetching vehicles with params:', cleanParams);

      const response = await api.get("/vehicles", {
        params: cleanParams,
        paramsSerializer: {
          indexes: null,
        },
      });

      console.log('✅ [VehicleService] Vehicles fetched:', response.data?.data?.length || 0);
      return response.data?.data || [];
    } catch (error) {
      console.error('❌ [VehicleService] Error fetching vehicles:', error);
      throw error;
    }
  },
  
  async getFeaturedVehicles(): Promise<Vehicle[]> {
    try {
      console.log('🔍 [VehicleService] Fetching featured vehicles');

      const response = await api.get("/vehicles", {
        params: {
          destaque: true,
          limit: 8,
          sort: "-createdAt",
        },
      });

      console.log('✅ [VehicleService] Featured vehicles fetched:', response.data.data?.length || 0);
      return response.data.data || [];
    } catch (error) {
      console.error('❌ [VehicleService] Error fetching featured vehicles:', error);
      throw error;
    }
  },

  // ✅ CORRIGIDO - Agora usa a rota correta /vehicles/slug/{slug}
  async getVehicleBySlug(slug: string): Promise<Vehicle> {
    try {
      if (!slug || slug.trim() === '') {
        throw new Error('Slug inválido');
      }

      console.log('🔍 [VehicleService] Fetching vehicle by slug:', slug);
      console.log('📡 [VehicleService] URL:', `/vehicles/slug/${slug}`);

      // ✅ ROTA CORRETA
      const response = await api.get(`/vehicles/slug/${slug}`);
      
      console.log('✅ [VehicleService] Vehicle found:', response.data);

      // Validação dos dados
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Dados inválidos recebidos da API');
      }

      if (!response.data.id) {
        throw new Error('Veículo sem identificador');
      }

      // Normalização dos dados
      const normalizedVehicle: Vehicle = {
        ...response.data,
        imagens: Array.isArray(response.data.imagens) ? response.data.imagens : [],
        videos: Array.isArray(response.data.videos) ? response.data.videos : [],
        avaliacoes: Array.isArray(response.data.avaliacoes) ? response.data.avaliacoes : [],
        reviewStats: response.data.reviewStats || {
          averageRating: 0,
          totalReviews: 0,
        },
      };

      console.log('✅ [VehicleService] Normalized vehicle data');
      return normalizedVehicle;

    } catch (error: any) {
      console.error('❌ [VehicleService] Error fetching vehicle by slug:', error);
      
      // Tratamento específico de erros
      if (error.response) {
        console.error('❌ Response status:', error.response.status);
        console.error('❌ Response data:', error.response.data);
        
        if (error.response.status === 404) {
          throw new Error('Veículo não encontrado');
        }
        
        throw new Error(error.response.data?.message || 'Erro ao buscar veículo');
      }
      
      if (error.request) {
        console.error('❌ No response received:', error.request);
        throw new Error('Erro de conexão com o servidor');
      }
      
      throw error;
    }
  },

  async getVehicleById(id: string): Promise<Vehicle> {
    try {
      if (!id || id.trim() === '') {
        throw new Error('ID inválido');
      }

      console.log('🔍 [VehicleService] Fetching vehicle by ID:', id);

      const response = await api.get(`/vehicles/${id}`);
      
      console.log('✅ [VehicleService] Vehicle found by ID:', response.data);

      // Normalização dos dados
      const normalizedVehicle: Vehicle = {
        ...response.data,
        imagens: Array.isArray(response.data.imagens) ? response.data.imagens : [],
        videos: Array.isArray(response.data.videos) ? response.data.videos : [],
        avaliacoes: Array.isArray(response.data.avaliacoes) ? response.data.avaliacoes : [],
        reviewStats: response.data.reviewStats || {
          averageRating: 0,
          totalReviews: 0,
        },
      };

      return normalizedVehicle;

    } catch (error: any) {
      console.error('❌ [VehicleService] Error fetching vehicle by ID:', error);
      
      if (error.response?.status === 404) {
        throw new Error('Veículo não encontrado');
      }
      
      throw new Error(error.response?.data?.message || 'Erro ao buscar veículo');
    }
  },

  async createVehicle(data: VehicleCreateInput): Promise<Vehicle> {
    try {
      console.log('➕ [VehicleService] Creating vehicle:', data);

      const response = await api.post<Vehicle>("/vehicles", data);
      
      console.log('✅ [VehicleService] Vehicle created:', response.data);
      return response.data;

    } catch (error: any) {
      console.error('❌ [VehicleService] Error creating vehicle:', error);
      throw new Error(error.response?.data?.message || 'Erro ao criar veículo');
    }
  },

  async updateVehicle(id: string, data: VehicleUpdateInput): Promise<Vehicle> {
    try {
      console.log('✏️ [VehicleService] Updating vehicle:', id, data);

      const response = await api.put(`/vehicles/${id}`, data);
      
      console.log('✅ [VehicleService] Vehicle updated:', response.data);
      return response.data;

    } catch (error: any) {
      console.error('❌ [VehicleService] Error updating vehicle:', error);
      throw new Error(error.response?.data?.message || 'Erro ao atualizar veículo');
    }
  },

  async deleteVehicle(id: string): Promise<void> {
    try {
      console.log('🗑️ [VehicleService] Deleting vehicle:', id);

      await api.delete(`/vehicles/${id}`);
      
      console.log('✅ [VehicleService] Vehicle deleted');

    } catch (error: any) {
      console.error('❌ [VehicleService] Error deleting vehicle:', error);
      throw new Error(error.response?.data?.message || 'Erro ao deletar veículo');
    }
  },

  async updateVehicleStatus(id: string, status: string): Promise<Vehicle> {
    try {
      console.log('🔄 [VehicleService] Updating vehicle status:', id, status);

      const response = await api.put(`/vehicles/${id}/status`, { status });
      
      console.log('✅ [VehicleService] Status updated:', response.data);
      return response.data;

    } catch (error: any) {
      console.error('❌ [VehicleService] Error updating status:', error);
      throw new Error(error.response?.data?.message || 'Erro ao atualizar status');
    }
  },

  async uploadImages(vehicleId: string, files: File[]): Promise<Vehicle> {
    try {
      console.log('📤 [VehicleService] Uploading images for vehicle:', vehicleId, files.length);

      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const response = await api.post(`/vehicles/${vehicleId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log('✅ [VehicleService] Images uploaded');
      return response.data;

    } catch (error: any) {
      console.error('❌ [VehicleService] Error uploading images:', error);
      throw new Error(error.response?.data?.message || 'Erro ao enviar imagens');
    }
  },

  async uploadVideos(vehicleId: string, file: File): Promise<Vehicle> {
    try {
      console.log('📤 [VehicleService] Uploading video for vehicle:', vehicleId);

      const formData = new FormData();
      formData.append("video", file);

      const response = await api.post(`/vehicles/${vehicleId}/videos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log('✅ [VehicleService] Video uploaded');
      return response.data;

    } catch (error: any) {
      console.error('❌ [VehicleService] Error uploading video:', error);
      throw new Error(error.response?.data?.message || 'Erro ao enviar vídeo');
    }
  },

  async deleteVehicleImage(vehicleId: string, imageId: string): Promise<void> {
    try {
      console.log('🗑️ [VehicleService] Deleting image:', imageId, 'from vehicle:', vehicleId);

      await api.delete(`/vehicles/${vehicleId}/images`, {
        data: { imageId },
      });

      console.log('✅ [VehicleService] Image deleted');

    } catch (error: any) {
      console.error('❌ [VehicleService] Error deleting image:', error);
      throw new Error(error.response?.data?.message || 'Erro ao deletar imagem');
    }
  },
};

export default vehicleService;