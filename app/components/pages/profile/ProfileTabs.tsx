import type React from "react";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { User, Car, ShoppingCart, MapPin, BarChart2 } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs
      defaultValue="perfil"
      value={activeTab}
      onValueChange={onTabChange}
      className="space-y-6"
    >
      <TabsList className="bg-transparent dark:bg-transparent p-1 rounded-lg w-full">
        <TabsTrigger
          value="perfil"
          className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent rounded-none dark:data-[state=active]:bg-transparent data-[state=active]:text-black dark:data-[state=active]:text-white transition-all"
        >
          <User className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Perfil</span>
        </TabsTrigger>
        <TabsTrigger
          value="veiculos"
          className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent rounded-none dark:data-[state=active]:bg-transparent data-[state=active]:text-black dark:data-[state=active]:text-white transition-all"
        >
          <Car className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Veículos</span>
        </TabsTrigger>
        <TabsTrigger
          value="compras"
          className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent rounded-none dark:data-[state=active]:bg-transparent data-[state=active]:text-black dark:data-[state=active]:text-white transition-all"
        >
          <ShoppingCart className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Compras</span>
        </TabsTrigger>
        <TabsTrigger
          value="enderecos"
          className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent rounded-none dark:data-[state=active]:bg-transparent data-[state=active]:text-black dark:data-[state=active]:text-white transition-all"
        >
          <MapPin className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Endereços</span>
        </TabsTrigger>
        <TabsTrigger
          value="estatisticas"
          className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent rounded-none dark:data-[state=active]:bg-transparent data-[state=active]:text-black dark:data-[state=active]:text-white transition-all"
        >
          <BarChart2 className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Estatísticas</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProfileTabs;
