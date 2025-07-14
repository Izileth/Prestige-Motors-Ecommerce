
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { VehicleAddressSection } from "~/components/pages/vehilce/create/address-section";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface LocationTabProps {
  vehicleId: string;
  onBack: () => void;
  onNext: () => void;
}

export function LocationTab({ vehicleId, onBack, onNext }: LocationTabProps) {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <VehicleAddressSection vehicleId={vehicleId} isEditing />

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
        >
          Voltar: Detalhes Técnicos
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
        >
          Próximo: Opções Adicionais
        </Button>
      </div>
    </motion.div>
  );
}
