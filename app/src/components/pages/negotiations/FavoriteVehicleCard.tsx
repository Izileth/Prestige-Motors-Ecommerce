import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { X, ChevronRight } from "lucide-react";
import { NegotiationForm } from "./NegotiationForm";
import type { Vehicle } from "~/src/types/vehicle";
import { useNegotiationStore } from "~/src/store/slices/negociation";
import { useAuth } from "~/src/hooks/useAuth";
import { formatPrice } from "~/src/lib/price";



interface FavoriteVehicleCardProps {
    vehicle: Vehicle;
    expandedVehicle: string | null;
    toggleExpandVehicle: (vehicleId: string) => void;
    handleRemoveFavorite: (vehicleId: string) => void;
    handleStartNegotiation: (vehicleId: string, message: string) => Promise<void>;
    isMessageSending: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

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

export const FavoriteVehicleCard = ({  
    vehicle,
    expandedVehicle,
    toggleExpandVehicle,
    handleRemoveFavorite,
    handleStartNegotiation,
    isMessageSending,
    messagesEndRef
    }: FavoriteVehicleCardProps) => {
    const { user } = useAuth();
    const { createNegotiation, isLoading, error, clearError } = useNegotiationStore();
      
    const [localMessage, setLocalMessage] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [hoveredButton, setHoveredButton] = useState<"message" | "phone" | "email" | "whatsapp" | null>(null);

    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false)


    const handleSend = async () => {
        await handleStartNegotiation(vehicle.id, localMessage);
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 3000);
    };
    const handleSendMessage = async () => {
        if (!user) return;
        
        try {
        await createNegotiation({
            vehicleId: vehicle.id,
            precoOfertado: vehicle.preco, // Ou permitir que o usuário defina
            comentario: "Tenho interesse neste veículo"
        });
        
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            toggleExpandVehicle(vehicle.id); // Fecha o formulário após sucesso
        }, 3000);
        
        // Scroll para o final (útil se houver mensagens)
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        } catch (err) {
        setLocalError(err instanceof Error ? err.message : 'Erro ao iniciar negociação');
        setTimeout(() => {
            setLocalError(null);
            clearError();
        }, 5000);
        }
    };

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
                    alt={`${vehicle.marca} ${vehicle.modelo}`}
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
                <div>
                    <p className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                    {formatPrice(vehicle.precoPromocional || vehicle.preco)}
                    </p>
                    {vehicle.aceitaNegociacao && (
                    <p className="text-sm text-zinc-950 dark:text-zinc-800 py-2">
                        Disponivel para Negociação
                    </p>
                    )}
                </div>
                <Button
                    variant="outline"
                    className="group border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-none px-4 py-2 h-auto text-sm font-light"
                    onClick={() => toggleExpandVehicle(vehicle.id)}
                    disabled={!vehicle.aceitaNegociacao}
                >
                    <span>
                    {expandedVehicle === vehicle.id 
                        ? "Cancelar" 
                        : vehicle.aceitaNegociacao 
                        ? "Iniciar negociação" 
                        : "Não negociavel"}
                    </span>
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
                <NegotiationForm 
                    vehicle={vehicle}
                    messagesEndRef={messagesEndRef}
                    handleSendMessage={() => handleSend()}
                    isMessageSending={isMessageSending}
                    messageSent={messageSent}
                    message={localMessage}
                    setMessage={setLocalMessage}
                    hoveredButton={hoveredButton}
                    setHoveredButton={setHoveredButton}
                />
            </motion.div>
            )}
        </AnimatePresence>
        </motion.div>
    );
};