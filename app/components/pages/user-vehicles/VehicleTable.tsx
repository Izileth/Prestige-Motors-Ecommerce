import { motion, AnimatePresence } from "framer-motion";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { VehicleRow } from "./VehicleRow";
import type { Vehicle } from "~/types/vehicle"; // Ajuste o caminho conforme sua estrutura

// Defina o tipo das props do componente
interface VehicleTableProps {
    vehicles: Vehicle[];
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

export const VehicleTable = ({ vehicles, ...props }: VehicleTableProps) => {
    return (
        <div className="rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <TableHead className="text-gray-700 dark:text-gray-300 font-medium">Veículo</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-medium">Detalhes</TableHead>
                        <TableHead className="text-right text-gray-700 dark:text-gray-300 font-medium">Preço</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-medium">Status</TableHead>
                        <TableHead className="text-right text-gray-700 dark:text-gray-300 font-medium">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence>
                        {vehicles.map((vehicle, index) => (
                            <motion.tr
                                key={vehicle.id}
                                variants={fadeIn}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                <VehicleRow vehicle={vehicle} {...props} />
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>
        </div>
    );
};