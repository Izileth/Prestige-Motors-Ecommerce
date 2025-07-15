
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
            // Remova esta linha para evitar chamada adicional
            // await fetchUserFavorites();
        } catch (error) {
            console.error("Erro ao atualizar favoritos:", error);
        }
    };

    const handleStatusChange = async (vehicleId: string, newStatus: string) => {
        try {
            await updateStatus(vehicleId, newStatus);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
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
            <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <AlertTitle className="text-red-600 dark:text-red-400">Erro</AlertTitle>
                <AlertDescription className="text-red-600 dark:text-red-400">{error}</AlertDescription>
            </Alert>
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
