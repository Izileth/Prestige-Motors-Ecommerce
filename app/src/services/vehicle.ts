import api from "./api";

import type {
  Vehicle,
  VehicleCreateInput,
  VehicleSearchParams,
} from "../types/vehicle";

import { extractIdFromSlug , createSlug} from "../utils/slugify";
import type { VehicleUpdateInput } from "../types/inputs";

export const vehicleService = {

  async getVehicles(params?: VehicleSearchParams): Promise<Vehicle[]> {
        const cleanParams = Object.fromEntries(
            Object.entries(params || {}).filter(
                ([_, v]) => v !== undefined && v !== null && v !== ""
            )
        );

        const response = await api.get("/vehicles", {
            params: cleanParams,
            paramsSerializer: {
                indexes: null,
            },
        });

        const vehicles = response.data?.data || [];
        
        // Adiciona slug mascarado a cada veículo
        return vehicles.map((vehicle: Vehicle) => ({
            ...vehicle,
            slug: createSlug(
                vehicle.marca, 
                vehicle.modelo, 
                vehicle.anoFabricacao?.toString() || vehicle.anoModelo?.toString() || 'unknown',
                vehicle.id
            )
        }));
    },
    
    async getFeaturedVehicles(): Promise<Vehicle[]> {
      const response = await api.get("/vehicles", {
        params: {
          destaque: true,
          limit: 8,
          sort: "-createdAt",
        },
      });
      return response.data.data || [];
    },



    async getVehicleBySlug(slug: string): Promise<Vehicle> {
        const id = extractIdFromSlug(slug);
        const response = await api.get(`/vehicles/${id}`);
        const vehicle = response.data;
        
        // Adiciona slug ao veículo retornado
        return {
            ...vehicle,
            slug: createSlug(
                vehicle.marca, 
                vehicle.modelo, 
                vehicle.anoFabricacao?.toString() || vehicle.anoModelo?.toString() || 'unknown',
                vehicle.id
            )
        };
    },

    async getVehicleById(id: string): Promise<Vehicle> {
          const response = await api.get(`/vehicles/${id}`);
          const vehicle = response.data;
          
          return {
              ...vehicle,
              slug: createSlug(
                  vehicle.marca, 
                  vehicle.modelo, 
                  vehicle.anoFabricacao?.toString() || vehicle.anoModelo?.toString() || 'unknown',
                  vehicle.id
              )
          };
      },

    async createVehicle(data: VehicleCreateInput): Promise<Vehicle> {
      const response = await api.post<Vehicle>("/vehicles", data);
      console.log("Veículo Criado!", response.data);
      return response.data;
    },

    async updateVehicle(id: string, data: VehicleUpdateInput): Promise<Vehicle> {
      const response = await api.put(`/vehicles/${id}`, data);
      console.log("Veículo Atualizado!", response.data);
      return response.data;
    },

    async deleteVehicle(id: string): Promise<void> {
      await api.delete(`/vehicles/${id}`);
    },

    async updateVehicleStatus(id: string, status: string): Promise<Vehicle> {
      const response = await api.put(`/vehicles/${id}/status`, { status });
      return response.data;
    },

    async uploadImages(vehicleId: string, files: File[]): Promise<Vehicle> {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const response = await api.post(`/vehicles/${vehicleId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    async uploadVideos(vehicleId: string, file: File): Promise<Vehicle> {
      const formData = new FormData();
      formData.append("video", file);

      const response = await api.post(`/vehicles/${vehicleId}/videos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  
    async deleteVehicleImage(vehicleId: string, imageId: string): Promise<void> {
      // Enviar o ID da imagem com um nome de parâmetro mais claro
      await api.delete(`/vehicles/${vehicleId}/images`, {
        data: { imageId }, // Usar imageId em vez de imageUrl para maior clareza
      });
    },
};

export default vehicleService;
