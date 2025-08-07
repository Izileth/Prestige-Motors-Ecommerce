import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '~/src/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/src/components/ui/popover';
import { Button } from '~/src/components/ui/button';
import { Badge } from '~/src/components/ui/badge';
import { Check, ChevronsUpDown, Car, Search, Zap, Crown } from 'lucide-react';
import { cn } from '~/src/lib/cn';
import useVehicle from '~/src/hooks/useVehicle';

interface VehicleSelectorProps {
    selectedVehicle: string;
    placeholder?: string;
    onSelectVehicle: (vehicleId: string) => void;
    disabled?: boolean;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = React.memo(({ 
    selectedVehicle, 
    onSelectVehicle,
    placeholder = "Selecione um veículo",
    disabled = false
}) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { userVehicles, fetchUserVehicles, loading } = useVehicle();

    // Memoize fetch function
    const loadUserVehicles = useCallback(async () => {
        try {
            await fetchUserVehicles();
        } catch (error) {
            console.error("Error loading vehicles:", error);
        }
    }, [fetchUserVehicles]);

    useEffect(() => {
        loadUserVehicles();
    }, [loadUserVehicles]);

    // Utility functions
    const formatPrice = useCallback((price: number) => {
        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL',
            maximumFractionDigits: 0
        }).format(price);
    }, []);

    const getCategoryLabel = useCallback((categoria: string) => {
        const categoryMap: Record<string, string> = {
            'HYPERCAR': 'Hypercar',
            'SUPERCAR': 'Supercar',
            'SPORTS_CAR': 'Esportivo',
            'CLASSIC_MUSCLE': 'Muscle Clássico',
            'MODERN_MUSCLE': 'Muscle Moderno',
            'RETRO_SUPER': 'Retro Super',
            'DRIFT_CAR': 'Drift',
            'TRACK_TOY': 'Track Day',
            'OFFROAD': 'Off-Road',
            'BUGGY': 'Buggy',
            'PICKUP_4X4': 'Pickup 4x4',
            'SUV': 'SUV',
            'HOT_HATCH': 'Hot Hatch',
            'SALOON': 'Sedan',
            'GT': 'Gran Turismo',
            'RALLY': 'Rally',
            'CONCEPT': 'Concept'
        };
        return categoryMap[categoria] || categoria;
    }, []);

    // Memoize filtered vehicles based on search
    const filteredVehicles = useMemo(() => {
        if (!searchValue.trim()) return userVehicles;
        
        const search = searchValue.toLowerCase().trim();
        return userVehicles.filter(vehicle => 
            `${vehicle.marca} ${vehicle.modelo}`.toLowerCase().includes(search) ||
            vehicle.categoria.toLowerCase().includes(search) ||
            vehicle.anoFabricacao.toString().includes(search)
        );
    }, [userVehicles, searchValue]);

    // Memoize selected vehicle
    const selectedVehicleData = useMemo(() => {
        if (!selectedVehicle) return null;
        return userVehicles.find(v => v.id === selectedVehicle);
    }, [selectedVehicle, userVehicles]);

    // Memoize button content
    const buttonContent = useMemo(() => {
        if (loading) return "Carregando veículos...";
        if (selectedVehicleData) {
            return (
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    {selectedVehicleData.imagens?.length > 0 && (
                        <img 
                            src={selectedVehicleData.imagens.find(img => img.isMain)?.url || selectedVehicleData.imagens[0].url} 
                            alt={selectedVehicleData.marca} 
                            className="w-6 h-6 object-cover rounded"
                        />
                    )}
                    <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium">
                            {selectedVehicleData.marca} {selectedVehicleData.modelo}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {selectedVehicleData.anoFabricacao} • {formatPrice(selectedVehicleData.precoPromocional || selectedVehicleData.preco)}
                        </p>
                    </div>
                </div>
            );
        }
        if (userVehicles.length > 0) return placeholder;
        return "Nenhum veículo disponível";
    }, [loading, selectedVehicleData, userVehicles.length, placeholder, formatPrice]);

    const handleSelect = useCallback((vehicleId: string) => {
        onSelectVehicle(vehicleId);
        setOpen(false);
        setSearchValue('');
    }, [onSelectVehicle]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between h-auto min-h-[44px] px-3 py-2",
                        selectedVehicleData ? "text-left" : "justify-center"
                    )}
                    disabled={disabled || loading || userVehicles.length === 0}
                >
                    {buttonContent}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            
            <PopoverContent className="w-[420px] p-0" align="start">
                <Command shouldFilter={false}>
                    <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <CommandInput 
                            placeholder="Buscar por marca, modelo ou ano..." 
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0"
                            value={searchValue}
                            onValueChange={setSearchValue}
                        />
                    </div>

                    <CommandList  className={cn(
                            "max-h-[300px]",
                            // Scrollbar customizada
                            "[&::-webkit-scrollbar]:w-1.5",
                            "[&::-webkit-scrollbar-track]:bg-transparent",
                            "[&::-webkit-scrollbar-thumb]:bg-border/60",
                            "[&::-webkit-scrollbar-thumb]:rounded-full",
                            "[&::-webkit-scrollbar-thumb]:transition-all",
                            "[&::-webkit-scrollbar-thumb]:duration-200",
                            
                            // Hover effects
                            "hover:[&::-webkit-scrollbar-thumb]:bg-border",
                            "hover:[&::-webkit-scrollbar]:w-2",
                            
                            // Firefox support
                            "scrollbar-thin",
                            "scrollbar-track-transparent", 
                            "scrollbar-thumb-border/60",
                            // Smooth scrolling
                            "scroll-smooth"
                        )}  >
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
                                    Carregando veículos...
                                </div>
                            </div>
                        ) : filteredVehicles.length === 0 ? (
                            <CommandEmpty className="py-8">
                                {searchValue ? 'Nenhum veículo encontrado' : 'Nenhum veículo cadastrado'}
                            </CommandEmpty>
                        ) : (
                            <CommandGroup className="px-0 mx-0" >
                                {filteredVehicles.map((vehicle) => (
                                    <CommandItem 
                                        key={vehicle.id}
                                        value={vehicle.id}
                                        onSelect={() => handleSelect(vehicle.id)}
                                        className="flex items-center gap-2  cursor-pointer hover:bg-accent/50 px-0 mx-0"
                                    >
                                        <Check
                                            className={cn(
                                                "h-4 w-4 shrink-0",
                                                selectedVehicle === vehicle.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        
                                        {/* Imagem do veículo */}
                                        <div className="relative shrink-0">
                                            {vehicle.imagens?.length > 0 ? (
                                                <img 
                                                    src={vehicle.imagens.find(img => img.isMain)?.url || vehicle.imagens[0].url} 
                                                    alt={`${vehicle.marca} ${vehicle.modelo}`} 
                                                    className="w-12 h-12 object-cover rounded-md"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                                                    <Car className="w-6 h-6 text-muted-foreground" />
                                                </div>
                                            )}
                                            
                                            {/* Badge de destaque */}
                                            {vehicle.destaque && (
                                                <div className="absolute -top-1 -right-1">
                                                    <Badge variant="default" className="bg-zinc-950 text-zinc-50 p-0 w-4 h-4 rounded-full flex items-center justify-center">
                                                        <Zap size={4} />
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>

                                        {/* Informações do veículo */}
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-sm truncate">
                                                    {vehicle.marca} {vehicle.modelo}
                                                </p>
                                                {vehicle.categoria && (
                                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-auto">
                                                        <Crown size={8} className="mr-1" />
                                                        {getCategoryLabel(vehicle.categoria)}
                                                    </Badge>
                                                )}
                                            </div>
                                            
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    {vehicle.anoFabricacao}
                                                    {vehicle.classe && (
                                                        <>
                                                            <span>•</span>
                                                            <span>Classe {vehicle.classe}</span>
                                                        </>
                                                    )}
                                                </p>
                                                
                                                <div className="text-right">
                                                    {vehicle.precoPromocional ? (
                                                        <div className="space-y-0.5">
                                                            <p className="text-sm font-semibold text-zinc-950">
                                                                {formatPrice(vehicle.precoPromocional)}
                                                            </p>
                                                            <p className="text-[10px] line-through text-muted-foreground">
                                                                {formatPrice(vehicle.preco)}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm font-semibold">
                                                            {formatPrice(vehicle.preco)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Status e localização */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        vehicle.status === 'DISPONIVEL' ? "bg-zinc-950" :
                                                        vehicle.status === 'RESERVADO' ? "bg-yellow-500" :
                                                        vehicle.status === 'VENDIDO' ? "bg-red-500" : "bg-red-500"
                                                    )} />
                                                    <span className="text-[10px] text-muted-foreground capitalize">
                                                        {vehicle.status.toLowerCase()}
                                                    </span>
                                                </div>
                                                
                                                {vehicle.localizacao?.cidade && (
                                                    <span className="text-[10px] text-muted-foreground truncate max-w-20">
                                                        {vehicle.localizacao.cidade}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});

VehicleSelector.displayName = 'VehicleSelector';

export default VehicleSelector;