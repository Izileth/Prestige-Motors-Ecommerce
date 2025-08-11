import type React from "react";
import { motion } from "framer-motion";
import { Tabs } from "~/src/components/ui/tabs";
import { User, Car, ShoppingCart, MapPin, BarChart2 } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  // Configuração das tabs
  const tabs = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "veiculos", label: "Veículos", icon: Car },
    { id: "compras", label: "Compras", icon: ShoppingCart },
    { id: "enderecos", label: "Endereços", icon: MapPin },
    { id: "estatisticas", label: "Estatísticas", icon: BarChart2 }
  ];

  return (
    <Tabs
      defaultValue="perfil"
      value={activeTab}
      onValueChange={onTabChange}
      className="space-y-6 mb-6"
    >
      {/* Custom TabsList com indicador deslizante */}
      <div className="relative bg-transparent dark:bg-transparent p-1 rounded-lg w-full">
        <div className="grid w-full grid-cols-5 relative">
          {/* Indicador deslizante de fundo */}
          <motion.div
            className="absolute inset-y-1 bg-white dark:bg-gray-800 rounded-none shadow-none border-0 dark:border-gray-700"
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
            style={{ width: "20%" }}
          />
          
          {/* Indicador de borda inferior */}
          <motion.div
            className="absolute bottom-0 h-[2px] bg-zinc-950 dark:bg-white"
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
            style={{ width: "20%" }}
          />

          {/* Tabs personalizadas */}
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative z-10 px-3 py-2 bg-transparent text-sm font-medium rounded-md transition-colors duration-200 flex items-center justify-center gap-2
                  ${activeTab === tab.id 
                    ? 'text-black dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;