import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/button";
import { X, ChevronRight } from "lucide-react";
import { NegotiationForm } from "./NegotiationForm";
import type { Vehicle } from "~/types/vehicle";
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price);
};

export const FavoriteVehicleCard = ({ vehicle, expandedVehicle, toggleExpandVehicle, handleRemoveFavorite, ...props }) => {
    return (
        <motion.div
            key={vehicle.id}
            variants={itemVariants}
            className="border border-gray-100 dark:border-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-300"
        >
            <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-32 h-32 bg-gray-50 dark:bg-gray-900 overflow-hidden">
                        {vehicle.imagens?.length > 0 ? (
                            <img
                                src={vehicle.imagens[0].url || "/placeholder.svg"}
                                alt={vehicle.modelo}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-300 dark:text-gray-700">Sem imagem</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-light text-lg text-gray-900 dark:text-gray-100">
                                    {vehicle.marca} {vehicle.modelo}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    {vehicle.anoFabricacao}/{vehicle.anoModelo} •{" "}
                                    {vehicle.quilometragem.toLocaleString()} km
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-black dark:hover:text-white"
                                onClick={() => handleRemoveFavorite(vehicle.id)}
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="mt-auto pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <p className="font-light text-xl text-gray-900 dark:text-gray-100">
                                {formatPrice(vehicle.precoPromocional || vehicle.preco)}
                            </p>
                            <Button
                                variant="outline"
                                className="group border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-none px-4 py-2 h-auto text-sm font-light"
                                onClick={() => toggleExpandVehicle(vehicle.id)}
                            >
                                <span>{expandedVehicle === vehicle.id ? "Cancelar" : "Iniciar negociação"}</span>
                                <ChevronRight
                                    size={16}
                                    className={`ml-2 transition-transform duration-300 ${
                                        expandedVehicle === vehicle.id ? "rotate-90" : "group-hover:translate-x-1"
                                    }`}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {expandedVehicle === vehicle.id && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-gray-100 dark:border-gray-900"
                    >
                        <NegotiationForm vehicle={vehicle} {...props} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};