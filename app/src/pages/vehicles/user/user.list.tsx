
import { useEffect, useState, useCallback } from "react";
import useVehicle from "~/src/hooks/useVehicle";
import { useAuth } from "~/src/hooks/useAuth";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "~/src/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "~/src/components/ui/alert";
import { Skeleton } from "~/src/components/ui/skeleton";
import {
    VehicleListHeader,
    VehicleTable,
    VehicleGrid,
    EmptyState,
    DeleteConfirmationDialog,
} from "~/src/components/pages/vehicle/user";

import type { StatusFilter } from "~/src/components/pages/vehicle/user";

import type { Vehicle } from "~/src/types/vehicle";
import { toast } from "sonner";
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function UserVehicleList() {
    const { user } = useAuth();
    const {
        userVehicles = [],
        loading,
        error,
        fetchUserVehicles,
        deleteVehicle,
        fetchUserFavorites,
        addFavorite,
        removeFavorite,
        favorites,
        updateStatus,
        userStats,
    } = useVehicle();

    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [hoveredVehicle, setHoveredVehicle] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter | null>(null);    
    const [confirmDelete, setConfirmDelete] = useState<Vehicle | null>(null);
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");
    const [showFilters, setShowFilters] = useState(false);
    
    const [statusUpdating, setStatusUpdating] = useState<Record<string, boolean>>({});

    
    const [vehicleUpdates, setVehicleUpdates] = useState<Record<string, string>>({});

    const fetchData = useCallback(async () => {
        try {
            await fetchUserVehicles();
            await fetchUserFavorites();
        } catch (error) {
            console.error("Failed to fetch data:", error);
            // Tratar erro de limite de chamadas aqui
        }
    }, [fetchUserVehicles, fetchUserFavorites]);


    // Adicione as funções como dependências do useEffect

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    }, [user?.id, fetchData]);

    const vehiclesToRender = Array.isArray(userVehicles)
        ? userVehicles
            .filter((vehicle) => {
                const searchMatch =
                    searchTerm === "" || `${vehicle.marca} ${vehicle.modelo}`.toLowerCase().includes(searchTerm.toLowerCase());
                const statusMatch = statusFilter === null || vehicle.status === statusFilter;
                return searchMatch && statusMatch;
            })
            .sort((a, b) => {
                if (a.destaque && !b.destaque) return -1;
                if (!a.destaque && b.destaque) return 1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
        : [];

    const handleDelete = async (vehicleId: string) => {
        setIsDeleting(vehicleId);
        try {
            await deleteVehicle(vehicleId);
            setConfirmDelete(null);
        } catch (error) {
            console.error("Erro ao excluir veículo:", error);
        } finally {
            setIsDeleting(null);
        }
    };


    const toggleFavorite = async (vehicleId: string) => {
        try {
            if (isFavorite(vehicleId)) {
                await removeFavorite(vehicleId);
            } else {
                await addFavorite(vehicleId);
            }
         
        } catch (error) {
            console.error("Erro ao atualizar favoritos:", error);
        }
    };




    const handleStatusChange = async (vehicleId: string, newStatus: string) => {
        setStatusUpdating(prev => ({ ...prev, [vehicleId]: true }));
        

        const previousVehicles = [...userVehicles];
        const updatedVehicles = userVehicles.map(vehicle => 
            vehicle.id === vehicleId 
                ? { ...vehicle, status: newStatus }
                : vehicle
        );
        
        try {
      
            await updateStatus(vehicleId, newStatus);
            

            await fetchData();
            
            toast.success("Status atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            
            toast.error("Erro ao atualizar status!");
        } finally {
            setTimeout(() => {
                setStatusUpdating(prev => ({ ...prev, [vehicleId]: false }));
            }, 500);
        }
    };


    const isFavorite = (vehicleId: string) => {
        return Array.isArray(favorites) && favorites.some((v) => v.id === vehicleId);
    };

    if (loading && !userVehicles.length) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-10 w-40" />
                </div>
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
        <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="max-w-2xl mx-auto text-center p-8 md:p-12 bg-transparent dark:bg-gray-900 "
            >
              <div className="flex flex-col items-center gap-6">
                {/* Ilustração SVG */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-400 dark:text-gray-600"
                >
                  <h1 className="text-8xl font-semibold text-gray-900 dark:text-gray-100">
                    104!
                  </h1>
                </motion.div>

                <div className="px-6 gap-4 flex flex-col items-center">
                  <h3 className="text-lg font-light text-gray-800 dark:text-gray-200">
                    Falha ao carregar veículos
                  </h3>
                  <p className="text-gray-500 text-md dark:text-gray-400 font-light">
                    Não foi possível carregar os veículos no momento. Por favor,
                    tente novamente.
                  </p>
                </div>
              </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                <CardHeader>
                    <VehicleListHeader
                        userVehicles={userVehicles}
                        userStats={userStats}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />
                </CardHeader>
                <CardContent>
                    {userVehicles.length === 0 ? (
                        <EmptyState type="noVehicles" />
                    ) : vehiclesToRender.length === 0 ? (
                        <EmptyState type="noResults" clearFilters={() => {
                            setSearchTerm("");
                            setStatusFilter(null);
                        }} />
                    ) : viewMode === "table" ? (
                        <VehicleTable
                            vehicles={vehiclesToRender}
                            hoveredVehicle={hoveredVehicle}
                            setHoveredVehicle={setHoveredVehicle}
                            isFavorite={isFavorite}
                            toggleFavorite={toggleFavorite}
                            handleStatusChange={handleStatusChange}
                            setConfirmDelete={setConfirmDelete}
                            isDeleting={isDeleting}
                            vehicleUpdates={vehicleUpdates}
                            statusUpdating={statusUpdating}
                        />
                    ) : (
                        <VehicleGrid
                            vehicles={vehiclesToRender}
                            hoveredVehicle={hoveredVehicle}
                            setHoveredVehicle={setHoveredVehicle}
                            isFavorite={isFavorite}
                            toggleFavorite={toggleFavorite}
                            handleStatusChange={handleStatusChange}
                            setConfirmDelete={setConfirmDelete}
                            isDeleting={isDeleting}
                            vehicleUpdates={vehicleUpdates}
                            statusUpdating={statusUpdating}
                        />
                    )}
                </CardContent>
            </Card>

            <DeleteConfirmationDialog
                vehicle={confirmDelete}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
                isDeleting={!!isDeleting}
            />
        </motion.div>
    );
}
