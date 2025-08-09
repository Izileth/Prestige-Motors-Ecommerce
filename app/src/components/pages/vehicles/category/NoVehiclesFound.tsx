import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "~/src/components/ui/button";

export const NoVehiclesFound = ({ resetFilters }: { resetFilters: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16 border border-gray-100 dark:border-gray-800 rounded-none"
  >
    <div className="max-w-md mx-auto space-y-4">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
        <Search className="w-6 h-6 text-gray-400 dark:text-gray-600" />
      </div>
      <h3 className="text-xl font-light text-gray-900 dark:text-gray-100">
        Nenhum veículo encontrado
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Não encontramos veículos que correspondam aos seus critérios de busca.
      </p>
      <Button
        variant="outline"
        onClick={resetFilters}
        className="mt-4 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        Limpar filtros
      </Button>
    </div>
  </motion.div>
);
