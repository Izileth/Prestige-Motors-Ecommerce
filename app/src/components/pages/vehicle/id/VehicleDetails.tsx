import type React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { FuelIcon as Engine } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle";
import { getFuelType, getTransmissionType } from "~/src/utils/vehicle";

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Tabs defaultValue="details" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 bg-transparent dark:bg-gray-900 p-1 rounded-lg">
          <TabsTrigger
            value="details"
            className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none"
          >
            Detalhes
          </TabsTrigger>
          <TabsTrigger
            value="specs"
            className="data-[state=active]:border-b-zinc-950  data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none"
          >
            Especificações
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:border-b-zinc-950 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-none"
          >
            Avaliações{" "}
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
              {vehicle?.reviewStats?.totalReviews || 0}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="mt-4 border-0 shadow-none bg-transparent dark:bg-gray-900">
            <CardHeader className="font-medium text-lg text-gray-900 dark:text-gray-100">Descrição</CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed shadow-none ">
                {vehicle.descricao || "Nenhuma descrição fornecida."}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="border-0 shadow-sm bg-transparent dark:bg-gray-900">
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

            <Card className="border-0 shadow-sm bg-transparent dark:bg-gray-900">
              <CardHeader className="font-medium text-lg text-gray-900 dark:text-gray-100">Mecânica</CardHeader>
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
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default VehicleDetails;
