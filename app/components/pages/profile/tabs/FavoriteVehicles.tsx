import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Heart, Zap, ShieldCheck, Flame, Crown, Calendar, Gauge, MapPin, ChevronRight } from "lucide-react";
import type { Vehicle } from "~/types/vehicle";
import { formatPrice } from "~/utils/format";
import { getFuelType, getTransmissionType } from "~/utils/vehicle";

import { useNavigate } from "react-router";
interface FavoriteVehiclesProps {
  favorites: Vehicle[];
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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
  const navigate = useNavigate();

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
              <motion.div key={vehicle.id} variants={fadeIn} custom={index}>
                <Card className="overflow-hidden border-0 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden group">
                    {vehicle.imagens && vehicle.imagens.length > 0 ? (
                      <div className="overflow-hidden">
                        <img
                          src={vehicle.imagens.find((img) => img.isMain)?.url || vehicle.imagens[0].url}
                          alt={`${vehicle.marca} ${vehicle.modelo}`}
                          className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">Sem imagem disponível</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {vehicle.destaque && (
                        <Badge
                          variant="default"
                          className="bg-black text-white dark:bg-white dark:text-black border-0 flex items-center gap-1 shadow-md"
                        >
                          <Zap size={14} /> Destaque
                        </Badge>
                      )}
                      {vehicle.seloOriginal && (
                        <Badge
                          variant="secondary"
                          className="bg-white text-black dark:bg-black dark:text-white flex items-center gap-1 shadow-md"
                        >
                          <ShieldCheck size={14} /> Original
                        </Badge>
                      )}
                      {vehicle.classe && (
                        <Badge
                          variant="secondary"
                          className="bg-white text-black dark:bg-black dark:text-white flex items-center gap-1 shadow-md"
                        >
                          <Flame size={14} />
                          Classe {vehicle?.classe}
                        </Badge>
                      )}
                    </div>

                    {vehicle.categoria && (
                      <Badge
                        variant="secondary"
                        className="bg-zinc-950 absolute top-4 left-2 text-zinc-50 dark:bg-black dark:text-white flex items-center gap-1 shadow-md"
                      >
                        <Crown size={14} />
                        {vehicle?.categoria}
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg line-clamp-1 text-gray-900 dark:text-gray-100">
                          {vehicle.marca} {vehicle.modelo}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                          <Calendar size={14} className="opacity-70" />
                          {vehicle.anoFabricacao}/{vehicle.anoModelo} •
                          <Gauge size={14} className="opacity-70 ml-1" />
                          {vehicle.quilometragem.toLocaleString("pt-BR")} km
                        </p>
                      </div>

                      {vehicle.vendedor && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin size={14} className="opacity-70" />
                          <span>{vehicle.vendedor.id || "Localização"}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {getFuelType(vehicle.tipoCombustivel)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {getTransmissionType(vehicle.cambio)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {vehicle.portas} portas
                      </Badge>
                      {vehicle.potencia && (
                        <Badge
                          variant="outline"
                          className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {vehicle.potencia} cv
                        </Badge>
                      )}
                    </div>

                    <div className="mt-2">
                      <p className="text-xl font-medium text-gray-900 dark:text-white">
                        {formatPrice(vehicle.precoPromocional || vehicle.preco)}
                      </p>
                      {vehicle.precoPromocional && (
                        <div className="flex items-center gap-2 mt-1">
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
                  </CardContent>

                  <CardFooter className="p-5 pt-0">
                    <Button
                      variant="default"
                      className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-all duration-300 group"
                      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                    >
                      Ver detalhes
                      <ChevronRight
                        size={16}
                        className="ml-1 opacity-80 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
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
