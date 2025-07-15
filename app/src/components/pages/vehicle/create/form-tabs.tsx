
import { Tabs, TabsList, TabsTrigger } from "~/src/components/ui/tabs"
import { Car, ImageIcon, Settings, Tag, MapPin } from 'lucide-react';

interface FormTabsProps {
    activeTab: string;
    onTabChange: (value: string) => void;
}

export const FormTabs = ({ activeTab, onTabChange }: FormTabsProps) => (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full  grid-cols-5 grid-rows-5 bg-transparent dark:bg-gray-900 p-2 rounded-lg mb-6">
            <TabsTrigger
            value="basic"
            className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white  flex items-center gap-2 h-10"
            >
            <Car className="h-4 w-4" />
            <span className="hidden sm:inline">Informações Básicas</span>
            <span className="sm:hidden">Básico</span>
            </TabsTrigger>
            <TabsTrigger
            value="images"
            className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white  flex items-center gap-2 h-10"
            >
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Imagens</span>
            <span className="sm:hidden">Fotos</span>
            </TabsTrigger>
            <TabsTrigger
            value="technical"
            className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white  flex items-center gap-2 h-10"
            >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Detalhes Técnicos</span>
            <span className="sm:hidden">Técnico</span>
            </TabsTrigger>
            <TabsTrigger
            value="additional"
            className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white  flex items-center gap-2 h-10"
            >
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline">Opções Adicionais</span>
            <span className="sm:hidden">Opções</span>
            </TabsTrigger>
            <TabsTrigger
                value="location"
                className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white flex items-center gap-2 h-10"
            >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Localização <span className="text-xs text-zinc-950 bg-zinc-200 p-2 rounded-full ">Opcional</span> </span>
                <span className="sm:hidden">Local</span>
            </TabsTrigger>
            
        </TabsList>
    </Tabs>
);