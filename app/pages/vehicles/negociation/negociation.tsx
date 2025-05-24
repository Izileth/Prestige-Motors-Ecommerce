import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router"
import useNegotiation from "~/hooks/useNegociation"

import { Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import useVehicle from "~/hooks/useVehicle"
import { useAuth } from "~/hooks/useAuth"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Heart, MessageSquare, Phone, Mail, ChevronRight, Search, ArrowRight, X } from "lucide-react"
import { Textarea } from "~/components/ui/textarea"
import { Skeleton } from "~/components/ui/skeleton"


const NegotiationsPage = () => {
    const { user } = useAuth()
    const { fetchUserFavorites, favorites, loading, removeFavorite } = useVehicle()
    const { clearNegotiations, createNegotiation } = useNegotiation()
    const [activeTab, setActiveTab] = useState<"favorites" | "negotiations">("favorites")
    const [message, setMessage] = useState("")
    
    // Estados necessários para as animações
    const [isMessageSending, setIsMessageSending] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null)
    const [hoveredButton, setHoveredButton] = useState<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    useEffect(() => {
    if (user) {
        fetchUserFavorites()
        }
    }, [user]) // Remove fetchUserFavorites from dependency array

    const handleStartNegotiation = async (vehicleId: string) => {
        try {
        // Commented out as per original code
        // await createNegotiation(vehicleId, message);
        alert("Negociação iniciada com sucesso!")
        setMessage("")
        setExpandedVehicle(null)
        } catch (error) {
        console.error("Erro ao iniciar negociação:", error)
        }
    }

    const handleRemoveFavorite = async (vehicleId: string) => {
        try {
        await removeFavorite(vehicleId)
        fetchUserFavorites()
        } catch (error) {
        console.error("Erro ao remover favorito:", error)
        }
    }

    const handleProfile = () => {
        navigate('/dashboard')
    }

    const toggleExpandVehicle = (vehicleId: string) => {
        if (expandedVehicle === vehicleId) {
        setExpandedVehicle(null)
        } else {
        setExpandedVehicle(vehicleId)
        setMessage("")
        }
    }

    const handleSendMessage = async (vehicleId: string) => {
        if (!message.trim()) return;
        
        setIsMessageSending(true);
        
        try {
            // Simula o envio da mensagem (substitua pela sua lógica de API)
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay da API
            
            // Aqui você faria a chamada real para sua API
            // await api.sendMessage({ vehicleId, message, userId: currentUser.id });
            
            setIsMessageSending(false);
            setMessageSent(true);
            
            // Limpa a mensagem após o envio
            setMessage('');
            
            // Remove a confirmação após 3 segundos
            setTimeout(() => {
            setMessageSent(false);
            }, 3000);
            
        } catch (error) {
            setIsMessageSending(false);
            console.error('Erro ao enviar mensagem:', error);
            // Aqui você pode adicionar um toast de erro
        }
    };


    // Format price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(price)
    }

    // Scroll to message input when expanded
    useEffect(() => {
        if (expandedVehicle && messagesEndRef.current) {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 300)
        }
    }, [expandedVehicle])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
        },
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
    }

    const tabVariants = {
        inactive: { opacity: 0.7, x: 0 },
        active: { opacity: 1, x: 0 },
    }

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
            {/* Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-64 mb-8 lg:mb-0"
            >
                <div className="border-b border-gray-100 dark:border-gray-900 pb-6 mb-6">
                <h2 className="text-sm font-light text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                    Minha Atividade
                </h2>
                <div className="space-y-1">
                    <motion.div
                    variants={tabVariants}
                    animate={activeTab === "favorites" ? "active" : "inactive"}
                    className="relative"
                    >
                    <Button
                        variant="ghost"
                        className={`w-full justify-start py-2 px-3 rounded-none text-base font-light ${
                        activeTab === "favorites" ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                        }`}
                        onClick={() => setActiveTab("favorites")}
                    >
                        <Heart
                        className={`mr-3 h-4 w-4 ${
                            activeTab === "favorites" ? "fill-black dark:fill-white" : "fill-none"
                        }`}
                        />
                        Favoritos
                        {favorites.length > 0 && (
                        <Badge
                            className={`ml-auto ${
                            activeTab === "favorites"
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                            } rounded-full text-xs font-light`}
                        >
                            {favorites.length}
                        </Badge>
                        )}
                    </Button>
                    {activeTab === "favorites" && (
                        <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 w-0.5 h-full bg-black dark:bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        />
                    )}
                    </motion.div>

                    <motion.div
                    variants={tabVariants}
                    animate={activeTab === "negotiations" ? "active" : "inactive"}
                    className="relative"
                    >
                    <Button
                        variant="ghost"
                        className={`w-full justify-start py-2 px-3 rounded-none text-base font-light ${
                        activeTab === "negotiations" ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                        }`}
                        onClick={() => setActiveTab("negotiations")}
                    >
                        <MessageSquare className="mr-3 h-4 w-4" />
                        Negociações
                    </Button>
                    {activeTab === "negotiations" && (
                        <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 w-0.5 h-full bg-black dark:bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        />
                    )}
                    </motion.div>
                </div>
                </div>

                <div>
                <h2 className="text-sm font-light text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                    Minha Conta
                </h2>
                <div className="space-y-1">
                    <Button
                    variant="ghost"
                    className="w-full justify-start py-2 px-3 rounded-none text-base font-light text-gray-500 dark:text-gray-400"
                    onClick={handleProfile}
                    >
                    Perfil
                    </Button>
                    <Button
                    variant="ghost"
                    className="w-full justify-start py-2 px-3 rounded-none text-base font-light text-gray-500 dark:text-gray-400"
                    onClick={handleProfile}
                    >
                    Configurações
                    </Button>
                </div>
                </div>
            </motion.div>

            {/* Main content */}
            <div className="flex-1">
                <AnimatePresence mode="wait">
                {activeTab === "favorites" ? (
                    <motion.div
                    key="favorites"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 20 }}
                    variants={containerVariants}
                    className="space-y-8"
                    >
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                        <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100">Veículos Favoritados</h2>
                        <Link
                        to="/vehicles"
                        className="text-sm font-light text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group"
                        >
                        Explorar veículos
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>

                    {loading ? (
                        <div className="space-y-6">
                        {[...Array(3)].map((_, index) => (
                            <motion.div
                            key={index}
                            variants={itemVariants}
                            className="border border-gray-100 dark:border-gray-900 p-6"
                            >
                            <div className="flex gap-6">
                                <Skeleton className="w-32 h-32 bg-gray-100 dark:bg-gray-900" />
                                <div className="flex-1 space-y-3">
                                <Skeleton className="h-6 w-3/4 bg-gray-100 dark:bg-gray-900" />
                                <Skeleton className="h-4 w-1/4 bg-gray-100 dark:bg-gray-900" />
                                <Skeleton className="h-6 w-1/3 bg-gray-100 dark:bg-gray-900" />
                                <div className="pt-4">
                                    <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-900" />
                                </div>
                                </div>
                            </div>
                            </motion.div>
                        ))}
                        </div>
                    ) : favorites.length === 0 ? (
                        <motion.div
                        variants={itemVariants}
                        className="border border-gray-100 dark:border-gray-900 py-16 px-6 text-center"
                        >
                        <div className="max-w-md mx-auto space-y-4">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                            <Heart className="h-6 w-6 text-gray-300 dark:text-gray-700" />
                            </div>
                            <h3 className="text-xl font-light text-gray-900 dark:text-gray-100">
                            Nenhum veículo favoritado
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
                            Adicione veículos aos favoritos para acompanhar preços e iniciar negociações.
                            </p>
                            <Button
                            asChild
                            className="mt-4 bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-none px-8 py-6 h-auto font-light"
                            >
                            <Link to="/vehicles">
                                <Search className="mr-2 h-4 w-4" />
                                Explorar veículos
                            </Link>
                            </Button>
                        </div>
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                        {favorites.map((vehicle, index) => (
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
                                    <div className="p-6 space-y-4" ref={messagesEndRef}>
                                        <h4 className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Envie uma mensagem para o vendedor
                                        </h4>
                                        <Textarea
                                        placeholder="Olá, tenho interesse neste veículo. Podemos negociar o preço?"
                                        className="w-full p-3 border border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-gray-100 text-sm font-light resize-none focus:ring-0 focus:border-black dark:focus:border-white transition-colors disabled:opacity-50"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        disabled={isMessageSending}
                                        rows={4}
                                        />
                                        
                                        {/* Animação de confirmação de envio */}
                                        <AnimatePresence>
                                        {messageSent && (
                                            <motion.div
                                            className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            transition={{ duration: 0.3, ease: "backOut" }}
                                            >
                                            <motion.div
                                                className="flex items-center text-green-700 dark:text-green-300"
                                                initial={{ x: -20 }}
                                                animate={{ x: 0 }}
                                                transition={{ delay: 0.2, duration: 0.3 }}
                                            >
                                                <motion.div
                                                className="mr-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                                                >
                                                <motion.div
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ delay: 0.3, duration: 0.3 }}
                                                >
                                                    ✓
                                                </motion.div>
                                                </motion.div>
                                                <div>
                                                <p className="font-medium text-sm">Mensagem enviada com sucesso!</p>
                                                <p className="text-xs opacity-80">O vendedor receberá sua mensagem em breve.</p>
                                                </div>
                                            </motion.div>
                                            </motion.div>
                                        )}
                                        </AnimatePresence>
                                        <div className="flex flex-wrap gap-3">
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 0 }}
                                            onMouseEnter={() => setHoveredButton("message")}
                                            onMouseLeave={() => setHoveredButton(null)}
                                            className="relative"
                                        >
                                            <Button
                                            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 rounded-none px-4 py-2 h-auto text-sm font-light disabled:opacity-50"
                                            onClick={() => handleSendMessage(vehicle.id)}
                                            disabled={isMessageSending || !message.trim()}
                                            >
                                            <motion.div
                                                className="flex items-center"
                                                animate={isMessageSending ? { rotate: 360 } : { rotate: 0 }}
                                                transition={{ duration: 0.8, repeat: isMessageSending ? Infinity : 0, ease: "linear" }}
                                            >
                                                {isMessageSending ? (
                                                <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                )}
                                            </motion.div>
                                            {isMessageSending ? "Enviando..." : messageSent ? "Mensagem Enviada!" : "Enviar Mensagem"}
                                            </Button>
                                            <motion.div
                                            className="absolute -inset-px border border-black dark:border-white"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                x: hoveredButton === "message" ? 2 : 0,
                                                y: hoveredButton === "message" ? 2 : 0,
                                                opacity: hoveredButton === "message" ? 0.3 : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                            />
                                            
                                            {/* Animação de sucesso */}
                                            <AnimatePresence>
                                            {messageSent && (
                                                <motion.div
                                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                                                transition={{ duration: 0.3, ease: "backOut" }}
                                                >
                                                ✓ Enviado com sucesso!
                                                </motion.div>
                                            )}
                                            </AnimatePresence>
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 0 }}
                                            onMouseEnter={() => setHoveredButton("phone")}
                                            onMouseLeave={() => setHoveredButton(null)}
                                            className="relative"
                                        >
                                            <Button
                                            variant="outline"
                                            className="border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-none px-4 py-2 h-auto text-sm font-light"
                                            asChild
                                            >
                                            <a href={`tel:${vehicle.vendedor?.telefone || ""}`}>
                                                <Phone className="mr-2 h-4 w-4" />
                                                Ligar
                                            </a>
                                            </Button>
                                            <motion.div
                                            className="absolute -inset-px border border-black dark:border-white"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                x: hoveredButton === "phone" ? 2 : 0,
                                                y: hoveredButton === "phone" ? 2 : 0,
                                                opacity: hoveredButton === "phone" ? 0.3 : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 0 }}
                                            onMouseEnter={() => setHoveredButton("email")}
                                            onMouseLeave={() => setHoveredButton(null)}
                                            className="relative"
                                        >
                                            <Button
                                            variant="outline"
                                            className="border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-none px-4 py-2 h-auto text-sm font-light"
                                            asChild
                                            >
                                            <a 
                                                href={`mailto:${vehicle.vendedor?.email || ""}?subject=Interesse no veículo ${vehicle.marca} ${vehicle.modelo}&body=Olá, tenho interesse neste veículo. Podemos negociar?`}
                                            >
                                                <Mail className="mr-2 h-4 w-4" />
                                                Email
                                            </a>
                                            </Button>
                                            <motion.div
                                            className="absolute -inset-px border border-black dark:border-white"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                x: hoveredButton === "email" ? 2 : 0,
                                                y: hoveredButton === "email" ? 2 : 0,
                                                opacity: hoveredButton === "email" ? 0.3 : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                            />
                                        </motion.div>

                                        {/* Botão opcional para WhatsApp */}
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 0 }}
                                            onMouseEnter={() => setHoveredButton("whatsapp")}
                                            onMouseLeave={() => setHoveredButton(null)}
                                            className="relative"
                                        >
                                            <Button
                                            variant="outline"
                                            className="border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-400 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors rounded-none px-4 py-2 h-auto text-sm font-light"
                                            asChild
                                            >
                                            <a 
                                                href={`https://wa.me/55${vehicle.vendedor?.telefone?.replace(/\D/g, "") || ""}?text=Olá, tenho interesse no veículo ${vehicle.marca} ${vehicle.modelo}. Podemos negociar?`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                WhatsApp
                                            </a>
                                            </Button>
                                            <motion.div
                                            className="absolute -inset-px border border-green-500 dark:border-green-400"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                x: hoveredButton === "whatsapp" ? 2 : 0,
                                                y: hoveredButton === "whatsapp" ? 2 : 0,
                                                opacity: hoveredButton === "whatsapp" ? 0.3 : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                            />
                                        </motion.div>
                                        </div>
                                    </div>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                        </div>
                    )}
                    </motion.div>
                ) : (
                    <motion.div
                    key="negotiations"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 20 }}
                    variants={containerVariants}
                    className="space-y-8"
                    >
                    <motion.h2 variants={itemVariants} className="text-2xl font-light text-gray-900 dark:text-gray-100">
                        Minhas Negociações
                    </motion.h2>

                    <motion.div
                        variants={itemVariants}
                        className="border border-gray-100 dark:border-gray-900 py-16 px-6 text-center"
                    >
                        <div className="max-w-md mx-auto space-y-4">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                            <MessageSquare className="h-6 w-6 text-gray-300 dark:text-gray-700" />
                        </div>
                        <h3 className="text-xl font-light text-gray-900 dark:text-gray-100">
                            Sistema em desenvolvimento
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
                            Em breve você poderá acompanhar todas as suas negociações aqui.
                        </p>
                        <div className="pt-4">
                            <span className="inline-block px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs font-light">
                            Em breve
                            </span>
                        </div>
                        </div>
                    </motion.div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            </div>
        </div>
        </div>
    )
}

export default NegotiationsPage