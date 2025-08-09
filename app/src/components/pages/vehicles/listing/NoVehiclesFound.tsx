import { motion } from "framer-motion";

export const NoVehiclesFound = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center py-16 px-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800"
  >
    <h1 className="text-9xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
      101!
    </h1>
    <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
      Nenhum veículo encontrado
    </h3>
    <p className="text-gray-600 dark:text-gray-400">
      Tente ajustar seus filtros de busca ou volte mais tarde.
    </p>
  </motion.div>
);
