import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { Textarea } from "~/src/components/ui/textarea";
import { MessageSquare, Phone, Mail } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle";
import { useState, useEffect } from "react";
import { useNegotiationStore } from "~/src/store/slices/negociation";

interface NegotiationFormProps {
    vehicle: Vehicle;
      messagesEndRef: React.RefObject<HTMLDivElement | null>; // Adicione o null aqui
    handleSendMessage: (vehicleId: string) => Promise<void>;
    isMessageSending: boolean;
    messageSent: boolean;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    hoveredButton?: "message" | "phone" | "email" | "whatsapp" | null;
    setHoveredButton?: (button: "message" | "phone" | "email" | "whatsapp" | null) => void;
}

export const NegotiationForm = ({ vehicle, messagesEndRef }: NegotiationFormProps) => {
    const [message, setMessage] = useState("");
    const [hoveredButton, setHoveredButton] = useState<"message" | "phone" | "email" | "whatsapp" | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    const { addMessage, currentNegotiation, createNegotiation } = useNegotiationStore();

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        
        setIsSubmitting(true);
        setSubmitSuccess(false);
        
        try {
        if (currentNegotiation) {
            // Se já existe negociação, apenas adiciona mensagem
            await addMessage(currentNegotiation.id, {
            conteudo: message,
            tipo: 'TEXTO'
            });
        } else {
            // Se não existe, cria nova negociação
            await createNegotiation({
            vehicleId: vehicle.id,
            precoOfertado: vehicle.preco, // Ou um valor padrão/editável
            comentario: message
            });
        }
        
        setSubmitSuccess(true);
        setMessage("");
        
        // Scroll para a última mensagem
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        } finally {
        setIsSubmitting(false);
        
        // Resetar mensagem de sucesso após 3 segundos
        if (submitSuccess) {
            setTimeout(() => setSubmitSuccess(false), 3000);
        }
        }
    };

    // Efeito para limpar o estado quando o componente desmontar
    useEffect(() => {
        return () => {
        setSubmitSuccess(false);
        setIsSubmitting(false);
        };
    }, []);

    return (
        <div className="p-6 space-y-4" ref={messagesEndRef}>
        <h4 className="text-sm font-light text-gray-500 dark:text-gray-400">
            Envie uma mensagem para o vendedor
        </h4>
        
        <Textarea
            placeholder="Olá, tenho interesse neste veículo. Podemos negociar o preço?"
            className="w-full p-3 border border-gray-200 dark:border-gray-800 bg-transparent text-gray-900 dark:text-gray-100 text-sm font-light resize-none focus:ring-0 focus:border-black dark:focus:border-white transition-colors disabled:opacity-50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            rows={4}
        />

        {/* Animação de confirmação de envio */}
        <AnimatePresence>
            {submitSuccess && (
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
                onClick={handleSendMessage}
                disabled={isSubmitting || !message.trim()}
            >
                <motion.div
                className="flex items-center"
                animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.8, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
                >
                {isSubmitting ? (
                    <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <MessageSquare className="mr-2 h-4 w-4" />
                )}
                </motion.div>
                {isSubmitting ? "Enviando..." : submitSuccess ? "Mensagem Enviada!" : "Enviar Mensagem"}
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
                {submitSuccess && (
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

            {/* Botões de contato (mantidos iguais) */}
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
    );
    
};