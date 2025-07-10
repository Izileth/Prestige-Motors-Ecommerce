import { useFormContext } from 'react-hook-form';
import { VehicleAddressManager } from '~/components/pages/vehilce/address';
import { Card, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { MapPin } from 'lucide-react';

interface VehicleAddressSectionProps {
  vehicleId?: string;
  isEditing?: boolean;
}

interface VehicleAddressManagerProps {
  vehicleId: string;
  onSuccess: (newAddress: any) => void; // Update the type to match handleAddressChange
}

export function VehicleAddressSection({ vehicleId, isEditing }: VehicleAddressSectionProps) {
  const { setValue, watch } = useFormContext();
  const address = watch('localizacao');

  const handleAddressChange = () => {
    // Update the code to not use the newAddress argument
    setValue('localizacao', {}, { shouldValidate: true });
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span>Localização do Veículo</span>
        </CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Atualize a localização física do veículo'
            : 'Informe onde o veículo está localizado fisicamente'}
        </CardDescription>
      </CardHeader>
      
      <div className="px-6 pb-6">
        {vehicleId ? (
          <VehicleAddressManager 
            vehicleId={vehicleId}
            onSuccess={handleAddressChange}
          />
        ) : (
          <div className="text-sm text-muted-foreground">
            O endereço poderá ser adicionado após a criação inicial do veículo.
          </div>
        )}
      </div>
    </Card>
  );
}