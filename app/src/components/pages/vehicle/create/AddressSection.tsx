import { useFormContext } from "react-hook-form";
import { VehicleAddressManager } from "~/src/components/pages/vehicle/create/AddressManager";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/src/components/ui/card";
import { MapPin } from "lucide-react";

interface VehicleAddressSectionProps {
  vehicleId?: string;
  isEditing?: boolean;
}

export function VehicleAddressSection({
  vehicleId,
  isEditing,
}: VehicleAddressSectionProps) {
  const { setValue, watch } = useFormContext();
  const address = watch("localizacao");

  // Função simplificada que não espera parâmetros
  const handleAddressSuccess = () => {
    // Força uma re-validação do formulário após mudanças no endereço
    setValue("localizacao", {}, { shouldValidate: true });

    // Opcional: Disparar um refresh dos dados do formulário
    // Isso ajuda a sincronizar o estado do formulário com os dados atualizados
    console.log("✅ Endereço atualizado com sucesso!");
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
            ? "Atualize a localização física do veículo"
            : "Informe onde o veículo está localizado fisicamente"}
        </CardDescription>
      </CardHeader>

      <div className="px-6 pb-6">
        {vehicleId ? (
          <VehicleAddressManager
            vehicleId={vehicleId}
            onSuccess={handleAddressSuccess}
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
