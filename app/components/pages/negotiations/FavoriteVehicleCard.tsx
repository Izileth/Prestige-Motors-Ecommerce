
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { ChevronRight, X, MessageSquare, Phone, Mail } from "lucide-react";
import type { Vehicle } from "~/types/vehicle";
import { formatPrice } from "~/utils/format";
import { useState, useRef, useEffect } from "react";

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

interface FavoriteVehicleCardProps {
  vehicle: Vehicle;
  isExpanded: boolean;
  onRemoveFavorite: (vehicleId: string) => void;
  onToggleExpand: (vehicleId: string) => void;
  onSendMessage: (vehicleId: string, message: string) => void;
}

export function FavoriteVehicleCard({
  vehicle,
  isExpanded,
  onRemoveFavorite,
  onToggleExpand,
  onSendMessage,
}: FavoriteVehicleCardProps) {
  const [message, setMessage] = useState("");
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsMessageSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSendMessage(vehicle.id, message);
      setIsMessageSending(false);
      setMessageSent(true);
      setMessage("");
      setTimeout(() => {
        setMessageSent(false);
      }, 3000);
    } catch (error) {
      setIsMessageSending(false);
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  useEffect(() => {
    if (isExpanded && messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [isExpanded]);

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
                <span className="text-gray-300 dark:text-gray-700">
                  Sem imagem
                </span>
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
                onClick={() => onRemoveFavorite(vehicle.id)}
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
                onClick={() => onToggleExpand(vehicle.id)}
              >
                <span>{isExpanded ? "Cancelar" : "Iniciar negociação"}</span>
                <ChevronRight
                  size={16}
                  className={`ml-2 transition-transform duration-300 ${
                    isExpanded ? "rotate-90" : "group-hover:translate-x-1"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
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
                        transition={{
                          delay: 0.1,
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200,
                        }}
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
                        <p className="font-medium text-sm">
                          Mensagem enviada com sucesso!
                        </p>
                        <p className="text-xs opacity-80">
                          O vendedor receberá sua mensagem em breve.
                        </p>
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
                    disabled={isMessageSending || !message.trim()}
                  >
                    <motion.div
                      className="flex items-center"
                      animate={isMessageSending ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        duration: 0.8,
                        repeat: isMessageSending ? Infinity : 0,
                        ease: "linear",
                      }}
                    >
                      {isMessageSending ? (
                        <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <MessageSquare className="mr-2 h-4 w-4" />
                      )}
                    </motion.div>
                    {isMessageSending
                      ? "Enviando..."
                      : messageSent
                      ? "Mensagem Enviada!"
                      : "Enviar Mensagem"}
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
  );
}
