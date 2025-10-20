import { motion } from "framer-motion";
import { Card, CardContent } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/src/components/ui/select";
import {
    Heart,
    Zap,
    ShieldCheck,
    Gauge,
    Calendar,
    Edit,
    Trash2,
    Loader2,
    MapPin,
    Flame,
    Crown,
} from "lucide-react";
import { formatPrice } from "~/src/lib/price";
import { Link } from "react-router";
import type { Vehicle } from "~/src/types/vehicle";
import { useState, useCallback } from "react";
import { useVehicleNavigation } from "~/src/hooks/useVehicleSlug";

import { toast } from "sonner";

// Interface para as props do VehicleCard
interface VehicleCardProps {
    vehicle: Vehicle;
    index: number;
    hoveredVehicle: string | null;
    setHoveredVehicle: (vehicleId: string | null) => void;
    isFavorite: (vehicleId: string) => boolean;
    toggleFavorite: (vehicleId: string) => Promise<void> | void;
    handleStatusChange: (vehicleId: string, status: Vehicle["status"]) => Promise<void> | void;
    setConfirmDelete: (vehicle: Vehicle) => void;
    isDeleting: string | null;
    vehicleUpdates: Record<string, string> 
    statusUpdating: Record<string, boolean>; 
}

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};


// Função auxiliar para formatar quilometragem com segurança
const formatKilometers = (km: number | undefined | null): string => {
    if (km === null || km === undefined || isNaN(km)) {
        return "0";
    }
    // Formatação compacta para mobile
    if (km >= 1000) {
        return `${Math.round(km / 1000)}k`;
    }
    return km.toLocaleString("pt-BR");
};

// Função auxiliar para formatar preço com segurança
const safeFormatPrice = (price: number | undefined | null): string => {
    if (price === null || price === undefined || isNaN(price)) {
        return "R$ 0,00";
    }
    try {
        return formatPrice(price);
    } catch (error) {
        console.warn("Erro ao formatar preço:", error);
        return `R$ ${price.toFixed(2).replace(".", ",")}`;
    }
};

export const VehicleCard = ({
    vehicle,
    index,
    setHoveredVehicle,
    isFavorite,
    toggleFavorite,
    handleStatusChange,
    setConfirmDelete,
    isDeleting,
}: VehicleCardProps) => {
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    
    const { navigateToVehicle, generateVehicleUrl } = useVehicleNavigation();

    const getFuelType = (type: string | undefined): string => {
        if (!type) return "N/I";
        
        const fuelTypes: Record<string, string> = {
            GASOLINA: "Gas",
            ETANOL: "Etanol",
            FLEX: "Flex",
            DIESEL: "Diesel",
            ELETRICO: "Elétrico",
            HIBRIDO: "Híbrido",
            GNV: "GNV",
        };
        return fuelTypes[type] || type;
    };

    const getTransmissionType = (type: string | undefined): string => {
        if (!type) return "N/I";
        
        const transmissionTypes: Record<string, string> = {
            MANUAL: "Manual",
            AUTOMATICO: "Auto",
            SEMI_AUTOMATICO: "Semi-auto",
            CVT: "CVT",
        };
        return transmissionTypes[type] || type;
    };

    const handleFavoriteToggle = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (isTogglingFavorite) return;
        
        setIsTogglingFavorite(true);
        
        try {
            await toggleFavorite(vehicle.id);
        } catch (error) {
            console.error("Erro ao alterar favorito:", error);
            toast.error("Erro ao alterar favorito");
        } finally {
            setIsTogglingFavorite(false);
        }
    }, [vehicle.id, toggleFavorite, isTogglingFavorite]);

    const handleStatusChangeWithLoading = useCallback(async (newStatus: Vehicle["status"]) => {
        if (isChangingStatus) return;
        
        setIsChangingStatus(true);
        
        try {
            await handleStatusChange(vehicle.id, newStatus);
        } catch (error) {
            console.error("Erro ao alterar status:", error);
            toast.error("Erro ao alterar status");
        } finally {
            setIsChangingStatus(false);
        }
    }, [vehicle.id, handleStatusChange, isChangingStatus]);

    return (
        <motion.div
            key={vehicle.id}
            variants={fadeIn}
            custom={index}
            className="relative w-full"
            onMouseLeave={() => setHoveredVehicle(null)}
        >
            <Card
            onClick={() => navigateToVehicle(vehicle)}
            className="overflow-hidden border-0 p-0 m-0  shadow-xl border-t border-border hover:shadow-md transition-all duration-300 h-full cursor-pointer">
                <div className="relative overflow-hidden group">
                    {vehicle.imagens && vehicle.imagens.length > 0 ? (
                        <div className="overflow-hidden">
                            <img
                                src={
                                    vehicle.imagens.find((img) => img.isMain)?.url ||
                                    vehicle.imagens[0].url
                                }
                                alt={`${vehicle.marca || "Veículo"} ${vehicle.modelo || ""}`}
                                className="w-full h-32 sm:h-40 md:h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className="hidden w-full h-32 sm:h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 items-center justify-center">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Imagem indisponível
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-32 sm:h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Sem imagem
                            </span>
                        </div>
                    )}

                    {/* Badges na imagem - layout otimizado para mobile */}
                    <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap max-w-[calc(100%-60px)]">
                        {vehicle.destaque && (
                            <Badge
                                variant="default"
                                className="bg-black text-white dark:bg-white dark:text-black border-0 flex items-center gap-1 shadow-md text-[10px] px-1.5 py-0.5 h-auto"
                            >
                                <Zap size={10} /> Destaque
                            </Badge>
                        )}
                        {vehicle.seloOriginal && (
                            <Badge
                                variant="secondary"
                                className="bg-white text-black dark:bg-black dark:text-white flex items-center gap-1 shadow-md text-[10px] px-1.5 py-0.5 h-auto"
                            >
                                <ShieldCheck size={10} /> Original
                            </Badge>
                        )}
                        {vehicle.classe && (
                            <Badge
                                variant="secondary"
                                className="bg-white text-black dark:bg-black dark:text-white flex items-center gap-1 shadow-md text-[10px] px-1.5 py-0.5 h-auto"
                            >
                                <Flame size={10} />
                                Classe {vehicle.classe}
                            </Badge>
                        )}
                    </div>

                    {vehicle.categoria && (
                        <Badge
                            variant="secondary"
                            className="bg-zinc-950 absolute top-2 left-2 text-zinc-50 dark:bg-black dark:text-white flex items-center gap-1 shadow-md text-[10px] px-1.5 py-0.5 h-auto"
                        >
                            <Crown size={10} />
                            {vehicle.categoria}
                        </Badge>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black shadow-sm transition-transform duration-300 transform group-hover:scale-110"
                        onClick={handleFavoriteToggle}
                        disabled={isTogglingFavorite}
                        aria-label={
                            isFavorite(vehicle.id)
                                ? "Remover dos favoritos"
                                : "Adicionar aos favoritos"
                        }
                    >
                        {isTogglingFavorite ? (
                            <Loader2 size={14} className="animate-spin text-gray-500" />
                        ) : (
                            <Heart
                                size={14}
                                className={
                                    isFavorite(vehicle.id)
                                        ? "fill-black text-black dark:fill-white dark:text-white"
                                        : "text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors"
                                }
                            />
                        )}
                    </Button>
                </div>

                <CardContent className="p-3 space-y-2.5">
                    {/* Título e informações básicas */}
                    <div className="space-y-1">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-1 text-gray-900 dark:text-gray-100 leading-tight">
                            {vehicle.marca || "Marca N/I"} {vehicle.modelo || "Modelo N/I"}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                            <div className="flex items-center gap-1">
                                <Calendar size={10} className="opacity-70 flex-shrink-0" />
                                <span>
                                    {vehicle.anoFabricacao || "0000"}/{vehicle.anoModelo || "0000"}
                                </span>
                            </div>
                            <span className="opacity-50">•</span>
                            <div className="flex items-center gap-1">
                                <Gauge size={10} className="opacity-70 flex-shrink-0" />
                                <span>{formatKilometers(vehicle.quilometragem)} km</span>
                            </div>
                        </div>
                        
                        {/* Localização */}
                        {vehicle.vendedor && vehicle.localizacao?.cidade && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <MapPin size={10} className="opacity-70 flex-shrink-0" />
                                <span className="truncate">{vehicle.localizacao.cidade}</span>
                            </div>
                        )}
                    </div>

                    {/* Tags - máximo 2 mais importantes */}
                    <div className="flex gap-1 flex-wrap">
                        <Badge
                            variant="outline"
                            className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-[10px] px-1.5 py-0.5 h-auto"
                        >
                            {getFuelType(vehicle.tipoCombustivel)}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-[10px] px-1.5 py-0.5 h-auto"
                        >
                            {getTransmissionType(vehicle.cambio)}
                        </Badge>
                    </div>

                    {/* Preços */}
                    <div className="pt-1">
                        <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-none">
                            {safeFormatPrice(vehicle.precoPromocional || vehicle.preco)}
                        </p>
                        {vehicle.precoPromocional && vehicle.preco && vehicle.precoPromocional < vehicle.preco && (
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <p className="text-xs line-through text-gray-500 dark:text-gray-400">
                                    {safeFormatPrice(vehicle.preco)}
                                </p>
                                <Badge
                                    variant="destructive"
                                    className="bg-black text-white dark:bg-white dark:text-black border-0 text-[9px] px-1 py-0 h-auto"
                                >
                                    {Math.round(
                                        (1 - vehicle.precoPromocional / vehicle.preco) * 100
                                    )}% OFF
                                </Badge>
                            </div>
                        )}
                        {vehicle.parcelamento && vehicle.parcelamento > 0 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {vehicle.parcelamento}x de{" "}
                                {safeFormatPrice(
                                    (vehicle.precoPromocional || vehicle.preco || 0) /
                                    vehicle.parcelamento
                                )}
                            </p>
                        )}
                    </div>

                    {/* Controles administrativos - layout compacto */}
                    <div className="flex justify-between items-center pt-2 gap-2">
                        <Select
                            value={vehicle.status}
                            onValueChange={handleStatusChangeWithLoading}
                            disabled={isChangingStatus}
                        >
                            <SelectTrigger className="w-20 sm:w-24 h-7 text-xs border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                                {isChangingStatus ? (
                                    <Loader2 size={12} className="animate-spin" />
                                ) : (
                                    <SelectValue placeholder="Status" />
                                )}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DISPONIVEL" className="text-xs">Disponível</SelectItem>
                                <SelectItem value="RESERVADO" className="text-xs">Reservado</SelectItem>
                                <SelectItem value="VENDIDO" className="text-xs">Vendido</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-1 flex-shrink-0">
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-7 h-7 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                asChild
                            >
                                <Link to={`/vehicles/edit/${vehicle.id}`}>
                                    <Edit className="h-3 w-3" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmDelete(vehicle);
                                }}
                                disabled={isDeleting === vehicle.id}
                                className="w-7 h-7 border-red-200 hover:bg-red-50 text-red-600 dark:border-red-800 dark:hover:bg-red-900/20 dark:text-red-400"
                            >
                                {isDeleting === vehicle.id ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Trash2 className="h-3 w-3" />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};