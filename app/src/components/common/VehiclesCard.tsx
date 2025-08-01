import {
    Heart,
    ChevronRight,
    Zap,
    ShieldCheck,
    Calendar,
    Gauge,
    MapPin,
    Crown,
    Flame,
} from "lucide-react";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/src/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import type { Vehicle } from "~/src/types/vehicle";
import useVehicle from "~/src/hooks/useVehicle";
import type { VehicleError } from "~/src/types/vehicle";

import { useVehicleNavigation } from "~/src/hooks/useVehicleSlug";

interface VehicleCardProps {
    vehicle: Vehicle;
    isFavorite?: boolean;
    onToggleFavorite?: (vehicle: Vehicle) => void;
    index?: number; // Para animação sequencial
    onError?: (error: VehicleError) => void; // Adicione esta prop
}

export const VehicleCard = ({ vehicle, index = 0 }: VehicleCardProps) => {
    const navigate = useNavigate();
    const {
        vehicles,
        loading,
        error,
        fetchVehicles,
        addFavorite,
        removeFavorite,
        fetchUserFavorites,
        favorites,
        isFavorite: isFavoriteSafe // Use a versão segura do hook
    } = useVehicle();
      
    const { navigateToVehicle, generateVehicleUrl } = useVehicleNavigation();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(price);
    };

    const isFavorite = (vehicleId: string) => {
        return (
        Array.isArray(favorites) && favorites.some((v) => v.id === vehicleId)
        );
    };

    const toggleFavorite = async (vehicle: Vehicle) => {
        try {
        if (isFavorite(vehicle.id)) {
            await removeFavorite(vehicle.id);
        } else {
            await addFavorite(vehicle.id);
        }
        await fetchUserFavorites();
        } catch (error) {
        console.error("Erro ao atualizar favoritos:", error);
        }
    };
    const getFuelType = (type: string) => {
        const fuelTypes: Record<string, string> = {
        GASOLINA: "Gasolina",
        ETANOL: "Etanol",
        FLEX: "Flex",
        DIESEL: "Diesel",
        ELETRICO: "Elétrico",
        HIBRIDO: "Híbrido",
        GNV: "GNV",
        };
        return fuelTypes[type] || type;
    };

    const getTransmissionType = (type: string) => {
        const transmissionTypes: Record<string, string> = {
        MANUAL: "Manual",
        AUTOMATICO: "Automático",
        SEMI_AUTOMATICO: "Semi-automático",
        CVT: "CVT",
        };
        return transmissionTypes[type] || type;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            className="w-full h-full"
        >
        <Card onClick={() => navigateToVehicle(vehicle)} className="overflow-hidden border-0 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
            <div className="relative overflow-hidden group">
            {vehicle.imagens && vehicle.imagens.length > 0 ? (
                <div className="overflow-hidden">
                <img
                    src={
                    vehicle.imagens.find((img) => img.isMain)?.url ||
                    vehicle.imagens[0].url
                    }
                    alt={`${vehicle.marca} ${vehicle.modelo}`}
                    className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                />
                </div>
            ) : (
                <div className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                    Sem imagem disponível
                </span>
                </div>
            )}

            <div className="absolute bottom-3 left-3 flex gap-2">
                {vehicle.destaque && (
                <Badge
                    variant="default"
                    className="bg-black text-white dark:bg-white dark:text-black border-0 flex items-center gap-1 shadow-md"
                >
                    <Zap size={14} /> Destaque
                </Badge>
                )}
                {vehicle.seloOriginal && (
                <Badge
                    variant="secondary"
                    className="bg-white text-black dark:bg-black dark:text-white flex items-center gap-1 shadow-md"
                >
                    <ShieldCheck size={14} /> Original
                </Badge>
                )}
                {vehicle.classe && (
                <Badge
                    variant="secondary"
                    className="bg-white text-black dark:bg-black dark:text-white flex items-center gap-1 shadow-md"
                >
                    <Flame size={14} />
                    Classe {vehicle?.classe}
                </Badge>
                )}
            </div>

            {vehicle.categoria && (
                <Badge
                variant="secondary"
                className="bg-zinc-950 absolute top-4 left-2 text-zinc-50 dark:bg-black dark:text-white flex items-center gap-1 shadow-md"
                >
                <Crown size={14} />
                {vehicle?.categoria}
                </Badge>
            )}
            <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black shadow-sm transition-transform duration-300 transform group-hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(vehicle);
                    }}
                    aria-label={
                        isFavoriteSafe(vehicle.id)
                            ? "Remover dos favoritos"
                            : "Adicionar aos favoritos"
                    }
                >
                    <Heart
                        size={18}
                        className={
                            isFavoriteSafe(vehicle.id)
                                ? "fill-black text-black dark:fill-white dark:text-white"
                                : "text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors"
                        }
                    />
            </Button>        
            </div>

            <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                <h3 className="font-medium text-lg line-clamp-1 text-gray-900 dark:text-gray-100">
                    {vehicle.marca} {vehicle.modelo}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar size={14} className="opacity-70" />
                    {vehicle.anoFabricacao}/{vehicle.anoModelo} •
                    <Gauge size={14} className="opacity-70 ml-1" />
                    {vehicle.quilometragem.toLocaleString("pt-BR")} km
                </p>
                </div>

                {vehicle.vendedor && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={14} className="opacity-70" />
                    <span>{vehicle.localizacao?.cidade || "Localização"}</span>
                </div>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge
                variant="outline"
                className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                >
                {getFuelType(vehicle.tipoCombustivel)}
                </Badge>
                <Badge
                variant="outline"
                className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                >
                {getTransmissionType(vehicle.cambio)}
                </Badge>
                <Badge
                variant="outline"
                className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                >
                {vehicle.portas} portas
                </Badge>
                {vehicle.potencia && (
                <Badge
                    variant="outline"
                    className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                >
                    {vehicle.potencia} cv
                </Badge>
                )}
            </div>

            <div className="mt-2">
                <p className="text-xl font-medium text-gray-900 dark:text-white">
                {formatPrice(vehicle.precoPromocional || vehicle.preco)}
                </p>
                {vehicle.precoPromocional && (
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                    {formatPrice(vehicle.preco)}
                    </p>
                    <Badge
                    variant="destructive"
                    className="bg-black text-white dark:bg-white dark:text-black border-0 text-xs"
                    >
                    {Math.round(
                        (1 - vehicle.precoPromocional / vehicle.preco) * 100
                    )}
                    % OFF
                    </Badge>
                </div>
                )}
                {vehicle.parcelamento && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ou {vehicle.parcelamento}x de{" "}
                    {formatPrice(
                    (vehicle.precoPromocional || vehicle.preco) /
                        vehicle.parcelamento
                    )}
                </p>
                )}
            </div>
            </CardContent>

            <CardFooter className="p-5 pt-0">
            <Button
                variant="default"
                className="w-full rounded-md shadow-none bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-all duration-300 group"
                size="lg"
                onClick={() => navigateToVehicle(vehicle)}
            >
                Ver detalhes
                <ChevronRight
                size={16}
                className="ml-1 opacity-80 group-hover:translate-x-1 transition-transform duration-300"
                />
            </Button>
            </CardFooter>
        </Card>
        </motion.div>
    );
};
