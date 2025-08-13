import {  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/src/components/ui/card";
import { 
    X, 
    ChevronRight, 
    Zap,
    ShieldCheck,
    Calendar,
    Gauge,
    MapPin,
    Crown,
    Flame,
    MessageSquare
} from "lucide-react";

import { NegotiationForm } from "./NegotiationForm";

import type { Vehicle } from "~/src/types/vehicle";

import { useNegotiationStore } from "~/src/store/slices/negociation";

import { useVehicleNavigation } from "~/src/hooks/useVehicleSlug";

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
    index?: number;
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
    messagesEndRef,
    index = 0
}: FavoriteVehicleCardProps) => {
    const { user } = useAuth();
    const { createNegotiation, isLoading, error, clearErrors } = useNegotiationStore();

    const [localMessage, setLocalMessage] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [hoveredButton, setHoveredButton] = useState<"message" | "phone" | "email" | "whatsapp" | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const { navigateToVehicle, generateVehicleUrl } = useVehicleNavigation();

    const getFuelType = (type: string) => {
        const fuelTypes: Record<string, string> = {
            GASOLINA: "Gas",
            ETANOL: "Etanol",
            FLEX: "Flex",
            DIESEL: "Diesel",
            ELETRICO: "Elétrico",
            HIBRIDO: "Híbrido",
            GNV: "GNV",
        };
        return fuelTypes[type] || type;
    };

    const getTransmissionType = (type: string) => {
        const transmissionTypes: Record<string, string> = {
            MANUAL: "Manual",
            AUTOMATICO: "Auto",
            SEMI_AUTOMATICO: "Semi-auto",
            CVT: "CVT",
        };
        return transmissionTypes[type] || type;
    };

    const getPrimaryBadge = () => {
        if (vehicle.destaque) return { icon: Zap, text: "Destaque", variant: "primary" };
        if (vehicle.seloOriginal) return { icon: ShieldCheck, text: "Original", variant: "secondary" };
        if (vehicle.classe) return { icon: Flame, text: `Classe ${vehicle.classe}`, variant: "secondary" };
        return null;
    };

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
                precoOfertado: vehicle.preco,
                comentario: "Tenho interesse neste veículo"
            });
            
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                toggleExpandVehicle(vehicle.id);
            }, 3000);
            
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : 'Erro ao iniciar negociação');
            setTimeout(() => {
                setLocalError(null);
                clearErrors();
            }, 5000);
        }
    };

    const primaryBadge = getPrimaryBadge();

    return (
        <motion.div
            key={vehicle.id}
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            className="w-full h-full "
        >
            <Card 
                onClick={() => navigateToVehicle(vehicle)} 
                className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-none hover:shadow-lg transition-all duration-300 h-full flex flex-col group"
            >
                {/* Header da imagem com badges sobrepostos */}
                <div className="relative overflow-hidden mt-0 pt-0">
                    {vehicle.imagens && vehicle.imagens.length > 0 ? (
                        <div className="overflow-hidden pt-0 mt-0">
                            <img
                                src={
                                    vehicle.imagens.find((img) => img.isMain)?.url ||
                                    vehicle.imagens[0].url
                                }
                                alt={`${vehicle.marca} ${vehicle.modelo}`}
                                className="w-full h-40 mt-0 pt-0 object-cover transform group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Sem imagem
                            </span>
                        </div>
                    )}

                    {/* Badge categoria no canto superior esquerdo */}
                    {vehicle.categoria && (
                        <Badge
                            variant="secondary"
                            className="absolute top-2 left-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 h-auto backdrop-blur-sm border-0"
                        >
                            <Crown size={10} className="mr-1" />
                            {vehicle.categoria}
                        </Badge>
                    )}

                    {/* Badge principal no canto inferior esquerdo */}
                    {primaryBadge && (
                        <Badge
                            variant={primaryBadge.variant === "primary" ? "default" : "secondary"}
                            className={`absolute bottom-2 left-2 text-[10px] px-1.5 py-0.5 h-auto backdrop-blur-sm border-0 ${
                                primaryBadge.variant === "primary" 
                                    ? "bg-zinc-950 text-zinc-50 font-medium" 
                                    : "bg-white/90 text-black"
                            }`}
                        >
                            <primaryBadge.icon size={10} className="mr-1" />
                            {primaryBadge.text}
                        </Badge>
                    )}

                    {/* Botão de remover favorito */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black shadow-sm transition-all duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(vehicle.id);
                        }}
                        aria-label="Remover dos favoritos"
                    >
                        <X
                            size={14}
                            className="text-gray-950 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors"
                        />
                    </Button>        
                </div>

                {/* Conteúdo principal */}
                <CardContent className="p-3 space-y-2 flex-1">
                    {/* Título do veículo */}
                    <div>
                        <h3 className="font-semibold text-lg md:text-xl leading-tight text-gray-900 dark:text-gray-100 line-clamp-1">
                            {vehicle.marca} {vehicle.modelo}
                        </h3>
                        
                        {/* Informações secundárias em uma linha compacta */}
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                            <span className="flex items-center gap-1">
                                <Calendar size={10} />
                                {vehicle.anoFabricacao}/{vehicle.anoModelo}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Gauge size={10} />
                                {vehicle.quilometragem > 1000 
                                    ? `${Math.round(vehicle.quilometragem / 1000)}k km`
                                    : `${vehicle.quilometragem.toLocaleString("pt-BR")} km`
                                }
                            </span>
                        </div>
                    </div>

                    {/* Localização se disponível */}
                    {vehicle.vendedor && vehicle.localizacao?.cidade && (
                        <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                            <MapPin size={10} />
                            <span className="truncate">{vehicle.localizacao.cidade}</span>
                        </div>
                    )}

                    {/* Tags compactas - máximo 2 principais */}
                    <div className="flex gap-1 flex-wrap">
                        <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0.5 h-auto border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                        >
                            {getFuelType(vehicle.tipoCombustivel)}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0.5 h-auto border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                        >
                            {getTransmissionType(vehicle.cambio)}
                        </Badge>
                   
                        {vehicle.aceitaNegociacao && (
                            <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0.5 h-auto border-green-300 dark:border-green-600 text-green-600 dark:text-green-300"
                            >
                                Negociável
                            </Badge>
                        )}
                    </div>

                    {/* Preço - elemento principal */}
                    <div className="pt-1">
                        <div className="flex flex-col md:flex-row items-baseline gap-1">
                            <p className="text-base font-bold text-gray-900 dark:text-white leading-none">
                                {formatPrice(vehicle.precoPromocional || vehicle.preco)}
                            </p>
                            {vehicle.precoPromocional && (
                                <div className="flex">
                                    <p className="text-[10px] line-through text-gray-400 dark:text-gray-500">
                                        {formatPrice(vehicle.preco)}
                                    </p>
                                    <Badge
                                        variant="destructive"
                                        className="bg-zinc-950 text-white text-[9px] px-1 py-0 h-auto ml-1"
                                    >
                                        -{Math.round((1 - vehicle.precoPromocional / vehicle.preco) * 100)}%
                                    </Badge>
                                </div>
                            )}
                        </div>
                        {vehicle.parcelamento && (
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                                {vehicle.parcelamento}x de {formatPrice(
                                    (vehicle.precoPromocional || vehicle.preco) / vehicle.parcelamento
                                )}
                            </p>
                        )}
                    </div>
                </CardContent>

                {/* Footer com botão de negociação */}
                <CardFooter className="p-3 pt-0">
                    <Button
                        variant="default"
                        className="w-full h-8 text-xs rounded-md bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => toggleExpandVehicle(vehicle.id)}
                        disabled={!vehicle.aceitaNegociacao}
                    >
                        <MessageSquare size={12} className="mr-2" />
                        {expandedVehicle === vehicle.id 
                            ? "Fechar negociação" 
                            : vehicle.aceitaNegociacao 
                            ? "Iniciar negociação" 
                            : "Não negociável"}
                        <ChevronRight
                            size={12}
                            className={`ml-1 transition-transform duration-300 ${
                                expandedVehicle === vehicle.id 
                                    ? "rotate-90" 
                                    : "group-hover:translate-x-0.5"
                            }`}
                        />
                    </Button>
                </CardFooter>

                {/* Formulário de negociação expandido */}
                <AnimatePresence>
                    {expandedVehicle === vehicle.id && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            onClick={() => toggleExpandVehicle(vehicle.id)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md z-50"
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
                    </>
                )}
                </AnimatePresence>
            </Card>
        </motion.div>
    );
};