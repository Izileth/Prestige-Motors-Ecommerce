import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/src/components/ui/tabs";
import { Card, CardContent, CardHeader } from "~/src/components/ui/card";
import {
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Palette,
  DoorOpen,
  Zap,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { FuelIcon as Engine } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle";
import { getFuelType, getTransmissionType } from "~/src/utils/vehicle";

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

// Componente para texto truncado
const TruncatedText: React.FC<{
  text: string;
  maxLength?: number;
  className?: string;
}> = ({ text, maxLength = 200, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  const displayText = isExpanded ? text : text.slice(0, maxLength);

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className="space-y-3">
      <motion.p
        className={className}
        initial={false}
        animate={{
          height: isExpanded ? "auto" : "auto"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {displayText}
        {!isExpanded && shouldTruncate && (
          <span className="text-gray-400">...</span>
        )}
      </motion.p>
      
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{isExpanded ? "Ler menos" : "Ler mais"}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="group-hover:text-gray-900 dark:group-hover:text-gray-200" />
        </motion.div>
      </motion.button>
    </div>
  );
};

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle }) => {
  const [activeTab, setActiveTab] = useState("details");

  // Tabs configuration
  const tabs = [
    { id: "details", label: "Detalhes" },
    { id: "specs", label: "Especificações" },
    { id: "reviews", label: "Avaliações", badge: vehicle?.reviewStats?.totalReviews || 0 }
  ];

  // Variantes de animação para as transições
  const tabVariants = {
    initial: { 
      opacity: 0, 
      x: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 15
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        {/* Custom TabsList com indicador deslizante */}
        <div className="relative bg-transparent shadow-none dark:bg-gray-900 p-1 rounded-lg">
          <div className="grid w-full grid-cols-3 relative">
            {/* Indicador deslizante de fundo */}
            <motion.div
              className="absolute inset-y-1 bg-transparent dark:bg-gray-800 rounded-md shadow-none border border-transparent dark:border-gray-700"
              initial={false}
              animate={{
                x: `${tabs.findIndex(tab => tab.id === activeTab) * 100}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
              style={{ width: "33.333%" }}
            />
            
            {/* Indicador de borda inferior */}
            <motion.div
              className="absolute bottom-0 h-[1px] bg-zinc-950 dark:bg-white"
              initial={false}
              animate={{
                x: `${tabs.findIndex(tab => tab.id === activeTab) * 100}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
                mass: 0.6
              }}
              style={{ width: "33.333%" }}
            />

            {/* Tabs personalizadas */}
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative z-10 px-3 py-2 bg-transparent text-sm font-medium rounded-md transition-colors duration-200
                  ${activeTab === tab.id 
                    ? 'text-black dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  {tab.label}
                  {tab.badge !== undefined && (
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab: Detalhes */}
        <TabsContent value="details" className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="details"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div variants={cardVariants}>
                <Card className="border-0 rounded-none shadow-none bg-transparent dark:bg-gray-900">
                  <CardHeader className="font-medium text-lg text-gray-900 dark:text-gray-100">
                    Descrição
                  </CardHeader>
                  <CardContent>
                    {vehicle.descricao ? (
                      <TruncatedText
                        text={vehicle.descricao}
                        maxLength={250}
                        className="text-gray-600 dark:text-gray-400 leading-relaxed shadow-none text-justify"
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed shadow-none text-justify">
                        Nenhuma descrição fornecida.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Tab: Especificações */}
        <TabsContent value="specs" className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="specs"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card: Informações Gerais */}
                <motion.div variants={cardVariants}>
                  <Card className="border-0 shadow-none rounded-none bg-transparent dark:bg-gray-900">
                    <CardHeader className="font-medium text-lg text-gray-900 dark:text-gray-100">
                      Informações Gerais
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Ano</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {vehicle.anoFabricacao}/{vehicle.anoModelo}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Gauge size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Quilometragem</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {vehicle?.quilometragem?.toLocaleString("pt-BR")} km
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Fuel size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Combustível</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {getFuelType(vehicle.tipoCombustivel)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Cog size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Câmbio</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {getTransmissionType(vehicle.cambio)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Palette size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Cor</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{vehicle.cor}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <DoorOpen size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Portas</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{vehicle.portas}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Card: Mecânica */}
                <motion.div variants={cardVariants}>
                  <Card className="border-0 shadow-none rounded-none bg-transparent dark:bg-gray-900">
                    <CardHeader className="font-medium text-lg text-gray-900 dark:text-gray-100">
                      Mecânica
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Engine size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Motor</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {vehicle.motor || "Não informado"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Zap size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Potência</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {vehicle.potencia ? `${vehicle.potencia} cv` : "Não informado"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span>Carroceria</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {vehicle.carroceria}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span>Categoria</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {vehicle.categoria}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span>Classe</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{vehicle.classe}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <ShieldCheck size={18} className="text-gray-400 dark:text-gray-500" />
                          <span>Selo original</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {vehicle.seloOriginal ? "Sim" : "Não"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default VehicleDetails;