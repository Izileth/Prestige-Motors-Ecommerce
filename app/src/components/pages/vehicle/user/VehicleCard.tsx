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
import { useNavigate } from "react-router";
import { useState, useCallback } from "react";

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
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const getStatusBadgeVariant = (status: Vehicle["status"]): string => {
    switch (status) {
        case "DISPONIVEL":
            return "bg-black text-white dark:bg-white dark:text-black border-0";
        case "RESERVADO":
            return "bg-gray-500 text-white border-0";
        case "VENDIDO":
            return "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-0";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-0";
    }
};

const getStatusLabel = (status: Vehicle["status"]): string => {
    switch (status) {
        case "DISPONIVEL":
            return "Disponível";
        case "RESERVADO":
            return "Reservado";
        case "VENDIDO":
            return "Vendido";
        default:
            return status;
    }
};

// Função auxiliar para formatar quilometragem com segurança
const formatKilometers = (km: number | undefined | null): string => {
    if (km === null || km === undefined || isNaN(km)) {
        return "0";
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
    hoveredVehicle,
    setHoveredVehicle,
    isFavorite,
    toggleFavorite,
    handleStatusChange,
    setConfirmDelete,
    isDeleting,
}: VehicleCardProps) => {
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const navigate = useNavigate();

    const getFuelType = (type: string | undefined): string => {
        if (!type) return "Não informado";
        
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

    const getTransmissionType = (type: string | undefined): string => {
        if (!type) return "Não informado";
        
        const transmissionTypes: Record<string, string> = {
            MANUAL: "Manual",
            AUTOMATICO: "Automático",
            SEMI_AUTOMATICO: "Semi-automático",
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
            className="relative"
            onMouseEnter={() => setHoveredVehicle(vehicle.id)}
            onMouseLeave={() => setHoveredVehicle(null)}
        >
            <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="relative overflow-hidden group">
                    {vehicle.imagens && vehicle.imagens.length > 0 ? (
                        <div className="overflow-hidden">
                            <img
                                src={
                                    vehicle.imagens.find((img) => img.isMain)?.url ||
                                    vehicle.imagens[0].url
                                }
                                alt={`${vehicle.marca || "Veículo"} ${vehicle.modelo || ""}`}
                                className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className="hidden w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900  items-center justify-center">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Imagem não disponível
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">
                                Sem imagem disponível
                            </span>
                        </div>
                    )}

                    <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
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
                                Classe {vehicle.classe}
                            </Badge>
                        )}
                    </div>

                    {vehicle.categoria && (
                        <Badge
                            variant="secondary"
                            className="bg-zinc-950 absolute top-4 left-2 text-zinc-50 dark:bg-black dark:text-white flex items-center gap-1 shadow-md"
                        >
                            <Crown size={14} />
                            {vehicle.categoria}
                        </Badge>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black shadow-sm transition-transform duration-300 transform group-hover:scale-110"
                        onClick={handleFavoriteToggle}
                        disabled={isTogglingFavorite}
                        aria-label={
                            isFavorite(vehicle.id)
                                ? "Remover dos favoritos"
                                : "Adicionar aos favoritos"
                        }
                    >
                        {isTogglingFavorite ? (
                            <Loader2 size={18} className="animate-spin text-gray-500" />
                        ) : (
                            <Heart
                                size={18}
                                className={
                                    isFavorite(vehicle.id)
                                        ? "fill-black text-black dark:fill-white dark:text-white"
                                        : "text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors"
                                }
                            />
                        )}
                    </Button>
                </div>

                <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-lg line-clamp-1 text-gray-900 dark:text-gray-100">
                                {vehicle.marca || "Marca não informada"} {vehicle.modelo || "Modelo não informado"}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 flex-wrap">
                                <Calendar size={14} className="opacity-70 flex-shrink-0" />
                                <span>
                                    {vehicle.anoFabricacao || "0000"}/{vehicle.anoModelo || "0000"}
                                </span>
                                <span className="mx-1">•</span>
                                <Gauge size={14} className="opacity-70 flex-shrink-0" />
                                <span>{formatKilometers(vehicle.quilometragem)} km</span>
                            </p>
                        </div>

                        {vehicle.vendedor && vehicle.localizacao?.cidade && (
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                                <MapPin size={14} className="opacity-70" />
                                <span className="truncate max-w-20">{vehicle.localizacao.cidade}</span>
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
                            {vehicle.portas || 0} portas
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
                            {safeFormatPrice(vehicle.precoPromocional || vehicle.preco)}
                        </p>
                        {vehicle.precoPromocional && vehicle.preco && vehicle.precoPromocional < vehicle.preco && (
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                                    {safeFormatPrice(vehicle.preco)}
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
                        {vehicle.parcelamento && vehicle.parcelamento > 0 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                ou {vehicle.parcelamento}x de{" "}
                                {safeFormatPrice(
                                    (vehicle.precoPromocional || vehicle.preco || 0) /
                                    vehicle.parcelamento
                                )}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-2 gap-2">
                        <Select
                            value={vehicle.status}
                            onValueChange={handleStatusChangeWithLoading}
                            disabled={isChangingStatus}
                        >
                            <SelectTrigger className="w-[120px] border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                                {isChangingStatus ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <SelectValue placeholder="Status" />
                                )}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                                <SelectItem value="RESERVADO">Reservado</SelectItem>
                                <SelectItem value="VENDIDO">Vendido</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-2 flex-shrink-0">
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                asChild
                            >
                                <Link to={`/vehicles/edit/${vehicle.id}`}>
                                    <Edit className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setConfirmDelete(vehicle)}
                                disabled={isDeleting === vehicle.id}
                                className="border-red-200 hover:bg-red-50 text-red-600 dark:border-red-800 dark:hover:bg-red-900/20 dark:text-red-400"
                            >
                                {isDeleting === vehicle.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};