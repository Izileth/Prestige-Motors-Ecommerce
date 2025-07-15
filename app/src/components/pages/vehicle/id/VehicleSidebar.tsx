import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle";
import { formatPrice } from "~/src/utils/format";

interface VehicleSidebarProps {
  vehicle: Vehicle;
}

const VehicleSidebar: React.FC<VehicleSidebarProps> = ({ vehicle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="sticky top-24">
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                {formatPrice(vehicle.precoPromocional || vehicle.preco)}
              </h2>
              {vehicle.precoPromocional && (
                <div className="flex items-center gap-2">
                  <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                    {formatPrice(vehicle.preco)}
                  </p>
                  <Badge
                    variant="destructive"
                    className="bg-black text-white dark:bg-white dark:text-black border-0 text-xs"
                  >
                    {Math.round((1 - vehicle.precoPromocional / vehicle.preco) * 100)}% OFF
                  </Badge>
                </div>
              )}
              {vehicle.parcelamento && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  ou {vehicle.parcelamento}x de{" "}
                  {formatPrice((vehicle.precoPromocional || vehicle.preco) / vehicle.parcelamento)}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-all duration-300 h-12"
                asChild
              >
                <a href={`tel:${vehicle.vendedor?.telefone || ""}`}>
                  <Phone size={18} className="mr-2" /> Entrar em contato
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300 h-12"
                asChild
              >
                <a href={`https://wa.me/55${vehicle.vendedor?.telefone?.replace(/\D/g, "") || ""}`}>
                  <MessageSquare size={18} className="mr-2" /> Enviar mensagem
                </a>
              </Button>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Localização</h3>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin size={18} className="text-gray-400 dark:text-gray-500" />
                <span>{vehicle.localizacaoId || "São Paulo, SP"}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Vendedor</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {vehicle.vendedor?.nome?.substring(0, 2).toUpperCase() || "VD"}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {vehicle.vendedor?.nome || "Vendedor não informado"}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Membro desde {new Date(vehicle.createdAt).getFullYear()}
                  </p>
                  {vehicle.vendedor?.telefone && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                      <Phone size={14} />
                      {vehicle.vendedor.telefone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default VehicleSidebar;
