import React, { useState, useEffect } from 'react';
import {
  Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '~/src/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/src/components/ui/popover';
import { Button } from '~/src/components/ui/button';
import { Check, ChevronsUpDown, Car } from 'lucide-react';
import { cn } from '~/src/lib/cn';
import useVehicle from '~/src/hooks/useVehicle';
import type { Vehicle } from '~/src/types/vehicle';

interface VehicleSelectorProps {
    selectedVehicle: string;
    onSelectVehicle: (vehicleId: string) => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ selectedVehicle, onSelectVehicle }) => {
  const [open, setOpen] = useState(false);
    const { userVehicles, fetchUserVehicles, loading } = useVehicle();

    // Carrega os veículos do usuário quando o componente é montado
    useEffect(() => {
        fetchUserVehicles();
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={loading || userVehicles.length === 0}
            >
            {selectedVehicle
                ? userVehicles.find((v) => v.id === selectedVehicle)?.marca + ' ' + 
                userVehicles.find((v) => v.id === selectedVehicle)?.modelo
                : loading 
                ? "Carregando veículos..."
                : userVehicles.length > 0
                    ? "Selecione um veículo"
                    : "Nenhum veículo disponível"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[400px] p-0">
            <Command>
            <CommandList>
                {loading ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                    Carregando veículos...
                </div>
                ) : userVehicles.length === 0 ? (
                <CommandEmpty>Nenhum veículo cadastrado</CommandEmpty>
                ) : (
                <CommandGroup>
                    {userVehicles.map((vehicle) => (
                    <CommandItem
                        key={vehicle.id}
                        value={vehicle.id}
                        onSelect={() => {
                        onSelectVehicle(vehicle.id);
                        setOpen(false);
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            selectedVehicle === vehicle.id ? "opacity-100" : "opacity-0"
                        )}
                        />
                        <div className="flex items-center gap-2">
                        {vehicle.imagens?.length > 0 && (
                            <img 
                            src={vehicle.imagens.find(img => img.isMain)?.url || vehicle.imagens[0].url} 
                            alt={vehicle.marca} 
                            className="w-8 h-8 object-cover rounded"
                            />
                        )}
                        <div>
                            <p>{vehicle.marca} {vehicle.modelo}</p>
                            <p className="text-xs text-muted-foreground">
                            {vehicle.anoFabricacao} • {vehicle.preco.toLocaleString('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                            })}
                            </p>
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
};

export default VehicleSelector;