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
    
    // ✨ Refs para controlar toasts
    const hasShownNegotiationError = useRef(false);
    const lastActiveTab = useRef<"favorites" | "negotiations">("favorites");
    
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
        error: negotiationError,
        hasInitialized // ✨ NOVO estado do store
    } = useNegotiationStore();

    // Estados da UI
    const [activeTab, setActiveTab] = useState<"favorites" | "negotiations">("favorites");
    const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // ✨ Controla quando mostrar toast de erro para negociações
    useEffect(() => {
        // Só mostra toast se:
        // 1. Há erro
        // 2. A aba de negociações está ativa
        // 3. Não foi mostrado antes
        // 4. O store foi inicializado (teve pelo menos uma tentativa)
        if (
            negotiationError && 
            activeTab === "negotiations" && 
            !hasShownNegotiationError.current &&
            hasInitialized
        ) {
            // ✨ Pequeno delay para garantir que não seja um erro temporário
            const timeoutId = setTimeout(() => {
                if (negotiationError) { // Verifica se ainda há erro após delay
                    toast.error(negotiationError);
                    hasShownNegotiationError.current = true;
                }
            }, 500);

            return () => clearTimeout(timeoutId);
        }
        
        // Reset do flag quando o erro é limpo
        if (!negotiationError) {
            hasShownNegotiationError.current = false;
        }
    }, [negotiationError, activeTab, hasInitialized]);

    // ✨ Reset do flag de erro quando muda de aba
    useEffect(() => {
        if (lastActiveTab.current !== activeTab) {
            hasShownNegotiationError.current = false;
            lastActiveTab.current = activeTab;
            
            // Limpa erros quando sai da aba de negociações
            if (activeTab !== "negotiations") {
                clearNegotiationError();
            }
        }
    }, [activeTab, clearNegotiationError]);

    // Carrega favoritos quando o usuário está disponível
    useEffect(() => {
        if (user) {
            fetchUserFavorites();
        }
    }, [user, fetchUserFavorites]);

    const handleRemoveFavorite = async (vehicleId: string) => {
        console.log("🗑️ Removing favorite:", vehicleId);
        
        try {
            await removeFavorite(vehicleId);
            toast.success("Veículo removido dos favoritos");
            
            // Se o veículo removido estava expandido, fecha o formulário
            if (expandedVehicle === vehicleId) {
                console.log("🔄 Closing expanded vehicle after removal");
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
        console.log("🔄 toggleExpandVehicle called with:", vehicleId);
        console.log("🔄 Current expandedVehicle:", expandedVehicle);
        
        const newExpanded = expandedVehicle === vehicleId ? null : vehicleId;
        console.log("🔄 Setting expandedVehicle to:", newExpanded);
        
        setExpandedVehicle(newExpanded);
    };

    const handleStartNegotiation = async (vehicleId: string, message: string) => {
        console.log("💬 Starting negotiation for vehicle:", vehicleId);
        
        if (!user) {
            toast.error("Você precisa estar logado para negociar");
            return;
        }

        try {
            await createNegotiation({
                vehicleId,
                precoOfertado: 0,
                comentario: message || "Tenho interesse neste veículo"
            });

            toast.success("Negociação iniciada com sucesso!");
            console.log("✅ Negotiation successful, closing expanded vehicle");
            setExpandedVehicle(null);
            
            // Atualiza a lista de favoritos para refletir possíveis mudanças
            fetchUserFavorites();
        } catch (error) {
            console.error("❌ Erro ao iniciar negociação:", error);
        }
    };

    // ✨ Função para mudar aba com limpeza de estados
    const handleTabChange = (tab: "favorites" | "negotiations") => {
        setActiveTab(tab);
    };

    // Scroll para o formulário quando expandido
    useEffect(() => {
        if (expandedVehicle && messagesEndRef.current) {
            console.log("📜 Scrolling to expanded vehicle form");
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    }, [expandedVehicle]);

    // 🐛 DEBUG: Verifica se há duplicatas nos favoritos
    useEffect(() => {
        const ids = favorites.map(v => v.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            console.warn("⚠️ DUPLICATE VEHICLES DETECTED in favorites!");
            console.log("All IDs:", ids);
            console.log("Unique IDs:", Array.from(uniqueIds));
        }
    }, [favorites]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
            <div className="container mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl font-extralight tracking-tight text-gray-900 dark:text-gray-100 mb-2"
                >
                    MENSAGENS RECENTES
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
                        setActiveTab={handleTabChange} // ✨ Usa função personalizada
                        favoritesCount={favorites.length}
                        handleProfile={handleProfile}
                    />

                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {activeTab === "favorites" ? (
                                <FavoritesTab
                                    key="favorites"
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
                                <NegotiationsTab key="negotiations" />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NegotiationsPage;