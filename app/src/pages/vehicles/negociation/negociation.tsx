import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "~/src/hooks/useAuth";
import {
    NegotiationsSidebar,
    FavoritesTab,
    NegotiationsTab,
} from "~/src/components/pages/negotiations";
import { useNegotiationStore } from "~/src/store/slices/negociation";
import { useVehicleStore } from "~/src/store/slices/vehicle";
import { toast } from "sonner"; 

const NegotiationsPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Stores
    const {
        favorites,
        loading: favoritesLoading,
        fetchUserFavorites,
        removeFavorite
    } = useVehicleStore();
    
    const {
        createNegotiation,
        clearErrors: clearNegotiationError,
        isLoading: negotiationLoading,
        error: negotiationError
    } = useNegotiationStore();

    // Estados da UI
    const [activeTab, setActiveTab] = useState<"favorites" | "negotiations">("favorites");
    const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Carrega favoritos quando o usuário está disponível
    useEffect(() => {
        if (user) {
        fetchUserFavorites();
        }
    }, [user, fetchUserFavorites]);

    // Tratamento de erros
    useEffect(() => {
        if (negotiationError) {
        toast.error(negotiationError);
        clearNegotiationError();
        }
    }, [negotiationError, clearNegotiationError]);

    const handleRemoveFavorite = async (vehicleId: string) => {
        try {
        await removeFavorite(vehicleId);
        toast.success("Veículo removido dos favoritos");
        
        // Se o veículo removido estava expandido, fecha o formulário
        if (expandedVehicle === vehicleId) {
            setExpandedVehicle(null);
        }
        } catch (error) {
        toast.error("Erro ao remover veículo dos favoritos");
        console.error("Erro ao remover favorito:", error);
        }
    };

    const handleProfile = () => {
        navigate("/dashboard");
    };

    const toggleExpandVehicle = (vehicleId: string) => {
        setExpandedVehicle(expandedVehicle === vehicleId ? null : vehicleId);
    };

    const handleStartNegotiation = async (vehicleId: string, message: string) => {
        if (!user) {
        toast.error("Você precisa estar logado para negociar");
        return;
        }

        try {
        await createNegotiation({
            vehicleId,
            precoOfertado: 0, // Pode ser ajustado para pegar o preço do veículo ou permitir input
            comentario: message || "Tenho interesse neste veículo"
        });

        toast.success("Negociação iniciada com sucesso!");
        setExpandedVehicle(null);
        
        // Atualiza a lista de favoritos para refletir possíveis mudanças
        fetchUserFavorites();
        } catch (error) {
        console.error("Erro ao iniciar negociação:", error);
        // O erro já é tratado pelo useEffect de erro do store
        }
    };

    // Scroll para o formulário quando expandido
    useEffect(() => {
        if (expandedVehicle && messagesEndRef.current) {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
        }
    }, [expandedVehicle]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
        <div className="container mx-auto px-4">
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-extralight tracking-tight text-gray-900 dark:text-gray-100 mb-2"
            >
            MINHA CONTA
            </motion.h1>
            <motion.div
            initial={{ width: 0 }}
            animate={{ width: "40px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-black dark:bg-white mb-12"
            />

            <div className="flex flex-col lg:flex-row gap-12">
            <NegotiationsSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                favoritesCount={favorites.length}
                handleProfile={handleProfile}
            />

            <div className="flex-1">
                <AnimatePresence mode="wait">
                {activeTab === "favorites" ? (
                    <FavoritesTab
                        loading={favoritesLoading}
                        favorites={favorites}
                        expandedVehicle={expandedVehicle}
                        toggleExpandVehicle={toggleExpandVehicle}
                        handleRemoveFavorite={handleRemoveFavorite}
                        handleStartNegotiation={handleStartNegotiation}
                        isMessageSending={negotiationLoading}
                        messagesEndRef={messagesEndRef}
                    />
                ) : (
                    <NegotiationsTab />
                )}
                </AnimatePresence>
                
            </div>
            </div>
        </div>
        </div>
    );
};

export default NegotiationsPage;