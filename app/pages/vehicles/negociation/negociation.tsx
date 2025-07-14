
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import useNegotiation from "~/hooks/useNegociation";
import { motion, AnimatePresence } from "framer-motion";
import useVehicle from "~/hooks/useVehicle";
import { useAuth } from "~/hooks/useAuth";
import {
    NegotiationsSidebar,
    FavoritesTab,
    NegotiationsTab,
} from "~/components/pages/negotiations";

const NegotiationsPage = () => {
    const { user } = useAuth();
    const { fetchUserFavorites, favorites, loading, removeFavorite } = useVehicle();
    const { clearNegotiations, createNegotiation } = useNegotiation();
    const [activeTab, setActiveTab] = useState<"favorites" | "negotiations">(
        "favorites"
    );
    const [message, setMessage] = useState("");

    // Estados necessários para as animações
    const [isMessageSending, setIsMessageSending] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchUserFavorites();
        }
    }, [user]); // Remove fetchUserFavorites from dependency array

    const handleStartNegotiation = async (vehicleId: string) => {
        try {
            // Commented out as per original code
            // await createNegotiation(vehicleId, message);
            alert("Negociação iniciada com sucesso!");
            setMessage("");
            setExpandedVehicle(null);
        } catch (error) {
            console.error("Erro ao iniciar negociação:", error);
        }
    };

    const handleRemoveFavorite = async (vehicleId: string) => {
        try {
            await removeFavorite(vehicleId);
            fetchUserFavorites();
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        }
    };

    const handleProfile = () => {
        navigate("/dashboard");
    };

    const toggleExpandVehicle = (vehicleId: string) => {
        if (expandedVehicle === vehicleId) {
            setExpandedVehicle(null);
        } else {
            setExpandedVehicle(vehicleId);
            setMessage("");
        }
    };

    const handleSendMessage = async (vehicleId: string) => {
        if (!message.trim()) return;

        setIsMessageSending(true);

        try {
            // Simula o envio da mensagem (substitua pela sua lógica de API)
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula delay da API

            // Aqui você faria a chamada real para sua API
            // await api.sendMessage({ vehicleId, message, userId: currentUser.id });

            setIsMessageSending(false);
            setMessageSent(true);

            // Limpa a mensagem após o envio
            setMessage("");

            // Remove a confirmação após 3 segundos
            setTimeout(() => {
                setMessageSent(false);
            }, 3000);
        } catch (error) {
            setIsMessageSending(false);
            console.error("Erro ao enviar mensagem:", error);
            // Aqui você pode adicionar um toast de erro
        }
    };

    // Scroll to message input when expanded
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
                                    loading={loading}
                                    favorites={favorites}
                                    expandedVehicle={expandedVehicle}
                                    toggleExpandVehicle={toggleExpandVehicle}
                                    handleRemoveFavorite={handleRemoveFavorite}
                                    message={message}
                                    setMessage={setMessage}
                                    isMessageSending={isMessageSending}
                                    messageSent={messageSent}
                                    handleSendMessage={handleSendMessage}
                                    hoveredButton={hoveredButton}
                                    setHoveredButton={setHoveredButton}
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
