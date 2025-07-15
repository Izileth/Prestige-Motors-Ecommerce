import { TableCell } from "~/src/components/ui/table";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/src/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/src/components/ui/select";
import { Heart, Zap, ShieldCheck, Gauge, Calendar, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { formatPrice } from "~/src/lib/price";
import { Link } from "react-router";
import type { Vehicle } from "~/src/types/vehicle"; // Ajuste o caminho conforme sua estrutura


interface VehicleRowProps {
    vehicle: Vehicle;
    hoveredVehicle: string | null;
    setHoveredVehicle: (vehicleId: string | null) => void;
    isFavorite: (vehicleId: string) => boolean;
    toggleFavorite: (vehicleId: string) => void;
    handleStatusChange: (vehicleId: string, status: Vehicle['status']) => void;
    setConfirmDelete: (vehicle: Vehicle) => void;
    isDeleting: string | null; // ID do veículo que está sendo deletado
}

export const VehicleRow = ({ 
    vehicle, 
    hoveredVehicle, 
    setHoveredVehicle, 
    isFavorite, 
    toggleFavorite, 
    handleStatusChange, 
    setConfirmDelete, 
    isDeleting 
}: VehicleRowProps) => {
    return (
        <>
            <TableCell onMouseEnter={() => setHoveredVehicle(vehicle.id)} onMouseLeave={() => setHoveredVehicle(null)}>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        {vehicle.imagens?.length > 0 ? (
                            <img
                                src={vehicle.imagens.find((img) => img.isMain)?.url || vehicle.imagens[0].url}
                                alt={`${vehicle.marca} ${vehicle.modelo}`}
                                className="h-16 w-24 rounded-md object-cover border border-gray-100 dark:border-gray-800"
                                loading="lazy"
                            />
                        ) : (
                            <div className="h-16 w-24 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <span className="text-xs text-gray-400 dark:text-gray-600">Sem imagem</span>
                            </div>
                        )}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`absolute -top-2 -left-2 h-8 w-8 rounded-full bg-white dark:bg-gray-900 shadow-sm transition-all ${
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
                                </TooltipTrigger>
                                <TooltipContent>
                                    {isFavorite(vehicle.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div>
                        <p className="font-medium line-clamp-1 text-gray-900 dark:text-gray-100">
                            {vehicle.marca} {vehicle.modelo}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
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
                </div>
            </TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant="outline"
                        className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-1"
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
            </TableCell>
            <TableCell className="text-right">
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatPrice(vehicle.precoPromocional || vehicle.preco)}
                    </span>
                    {vehicle.precoPromocional && (
                        <span className="text-xs text-gray-500 dark:text-gray-500 line-through">
                            {formatPrice(vehicle.preco)}
                        </span>
                    )}
                </div>
            </TableCell>
            <TableCell>
                <div className="flex flex-col gap-2">
                    {vehicle.destaque && (
                        <Badge className="w-fit bg-black text-white dark:bg-white dark:text-black border-0 flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            Destaque
                        </Badge>
                    )}
                    <Select
                        value={vehicle.status}
                        onValueChange={(value) => handleStatusChange(vehicle.id, value as Vehicle['status'])}
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
                </div>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                    asChild
                                >
                                    <Link to={`/vehicles/${vehicle.id}`}>
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Ver veículo</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
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
                            </TooltipTrigger>
                            <TooltipContent>Editar veículo</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
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
                            </TooltipTrigger>
                            <TooltipContent>Excluir veículo</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </TableCell>
        </>
    );
};