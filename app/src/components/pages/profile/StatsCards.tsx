import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "~/src/components/ui/card";
import { Car, FileText, Star, ShoppingCart } from "lucide-react";
import type { UserStats } from "~/src/types/user";

interface StatsCardsProps {
  userStats: UserStats | null;
  totalVehicles: number;
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

const StatsCards: React.FC<StatsCardsProps> = ({ userStats, totalVehicles }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      <motion.div variants={fadeIn}>
        <Card className="border-0 shadow-sm rounded-none bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total de Veículos
            </CardTitle>
            <Car className="w-4 h-4 text-gray-500 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-gray-900 dark:text-gray-100">
              {userStats?.totalVehicles || 0}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {((userStats?.totalVehicles || 0) / (totalVehicles || 1)) * 100 > 0
                ? ((userStats?.totalVehicles || 0) / (totalVehicles || 1)) * 100 < 0.1
                  ? "< 0.1% do catálogo"
                  : `${((
                      (userStats?.totalVehicles || 0) /
                      (totalVehicles || 1)
                    ) * 100).toFixed(1)}% do catálogo`
                : "0% do catálogo"}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card className="border-0 shadow-sm rounded-none bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Valor Total
            </CardTitle>
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-gray-900 dark:text-gray-100">
              R$ {userStats?.valorTotalInventario?.toLocaleString("pt-BR") || 0}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Em inventário</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card className="border-0 shadow-sm rounded-none bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Preço Médio
            </CardTitle>
            <Star className="w-4 h-4 text-gray-500 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-gray-900 dark:text-gray-100">
              R$ {userStats?.precoMedio?.toLocaleString("pt-BR") || 0}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Por veículo</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card className="border-0 shadow-sm rounded-none bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Faixa de Preços
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-gray-500 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium text-gray-900 dark:text-gray-100">
              R$ {userStats?.precoMinimo?.toLocaleString("pt-BR") || 0} - R${" "}
              {userStats?.precoMaximo?.toLocaleString("pt-BR") || 0}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Min - Max</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StatsCards;
