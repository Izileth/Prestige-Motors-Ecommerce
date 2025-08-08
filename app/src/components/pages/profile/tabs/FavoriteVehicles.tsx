import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Heart } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle";
import { VehicleCard } from "~/src/components/common/VehiclesCard"; // Ajuste o caminho conforme sua estrutura

interface FavoriteVehiclesProps {
  favorites: Vehicle[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FavoriteVehicles: React.FC<FavoriteVehiclesProps> = ({ favorites }) => {
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Meus Veículos Favoritos</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Veículos que você adicionou aos favoritos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {favorites && favorites.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {favorites.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800"
          >
            <Heart className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">
              Nenhum veículo favorito
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Você ainda não adicionou nenhum veículo aos seus favoritos.
            </p>
            <Button
              className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
              onClick={() => (window.location.href = "/veiculos")}
            >
              Explorar Veículos
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoriteVehicles;
