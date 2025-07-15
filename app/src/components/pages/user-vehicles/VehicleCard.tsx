
import { motion } from "framer-motion";
import { Card, CardContent } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/src/components/ui/select";
import { Heart, Zap, ShieldCheck, Gauge, Calendar, Edit, Trash2, Loader2 } from "lucide-react";
import { formatPrice } from "~/src/lib/price";
import { Link } from "react-router";
import type { Vehicle } from "~/src/types/vehicle"; // Ajuste o caminho conforme sua estrutura

// Interface para as props do VehicleCard
interface VehicleCardProps {
    vehicle: Vehicle;
    index: number;
    hoveredVehicle: string | null;
    setHoveredVehicle: (vehicleId: string | null) => void;
    isFavorite: (vehicleId: string) => boolean;
    toggleFavorite: (vehicleId: string) => void;
    handleStatusChange: (vehicleId: string, status: Vehicle['status']) => void;
    setConfirmDelete: (vehicle: Vehicle) => void;
    isDeleting: string | null;
}

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const getStatusBadgeVariant = (status: Vehicle['status']): string => {
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

const getStatusLabel = (status: Vehicle['status']): string => {
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

export const VehicleCard = ({ 
    vehicle, 
    index, 
    hoveredVehicle, 
    setHoveredVehicle, 
    isFavorite, 
    toggleFavorite, 
    handleStatusChange, 
    setConfirmDelete, 
    isDeleting 
}: VehicleCardProps) => {
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
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {vehicle.imagens?.length > 0 ? (
                        <img
                            src={vehicle.imagens.find((img) => img.isMain)?.url || vehicle.imagens[0].url}
                            alt={`${vehicle.marca} ${vehicle.modelo}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-600">Sem imagem disponível</span>
                        </div>
                    )}

                    <div className="absolute top-2 left-2 flex gap-2">
                        {vehicle.destaque && (
                            <Badge className="bg-black text-white dark:bg-white dark:text-black border-0 flex items-center gap-1 shadow-sm">
                                <Zap className="h-3 w-3" />
                                Destaque
                            </Badge>
                        )}
                        <Badge className={`${getStatusBadgeVariant(vehicle.status)} shadow-sm`}>
                            {getStatusLabel(vehicle.status)}
                        </Badge>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black shadow-sm transition-all ${
                            hoveredVehicle === vehicle.id ? "opacity-100" : "opacity-0"
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(vehicle.id);
                        }}
                    >
                        <Heart
                            className={`h-4 w-4 transition-colors ${
                                isFavorite(vehicle.id)
                                    ? "fill-black text-black dark:fill-white dark:text-white"
                                    : "text-gray-400 dark:text-gray-600"
                            }`}
                        />
                    </Button>
                </div>

                <CardContent className="p-5 space-y-4">
                    <div>
                        <h3 className="font-medium text-lg line-clamp-1 text-gray-900 dark:text-gray-100">
                            {vehicle.marca} {vehicle.modelo}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {vehicle.anoFabricacao}/{vehicle.anoModelo}
                            </span>
                            <span className="flex items-center gap-1">
                                <Gauge className="h-3 w-3" />
                                {vehicle.quilometragem?.toLocaleString("pt-BR")} km
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                        >
                            {vehicle.tipoCombustivel}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                        >
                            {vehicle.cambio}
                        </Badge>
                        {vehicle.seloOriginal && (
                            <Badge
                                variant="outline"
                                className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-1"
                            >
                                <ShieldCheck className="h-3 w-3" />
                                Original
                            </Badge>
                        )}
                    </div>

                    <div>
                        <p className="text-xl font-medium text-gray-900 dark:text-gray-100">
                            {formatPrice(vehicle.precoPromocional || vehicle.preco)}
                        </p>
                        {vehicle.precoPromocional && (
                            <p className="text-sm text-gray-500 dark:text-gray-500 line-through">
                                {formatPrice(vehicle.preco)}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <Select 
                            value={vehicle.status} 
                            onValueChange={(value: Vehicle['status']) => handleStatusChange(vehicle.id, value)}
                        >
                            <SelectTrigger className="w-[120px] border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                                <SelectItem value="RESERVADO">Reservado</SelectItem>
                                <SelectItem value="VENDIDO">Vendido</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                asChild
                            >
                                <Link to={`/vehicles/update/${vehicle.id}`}>
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