import { motion } from "framer-motion";

export const ErrorState = ({ fetchVehicles, filters }: any) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="max-w-2xl mx-auto text-center p-8 md:p-12 bg-transparent dark:bg-gray-900 "
  >
    <div className="flex flex-col items-center gap-6">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 dark:text-gray-600"
      >
        <h1 className="text-8xl font-semibold text-gray-900 dark:text-gray-100">
          104!
        </h1>
      </motion.div>

      <div className="px-6 gap-4 flex flex-col items-center">
        <h3 className="text-lg font-light text-gray-800 dark:text-gray-200">
          Falha ao carregar veículos
        </h3>
        <p className="text-gray-500 text-md dark:text-gray-400 font-light">
          Não foi possível carregar os veículos no momento. Por favor, tente
          novamente.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="px-6 py-2 text-sm bg-transparent text-gray-800 dark:text-gray-200 font-light rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
        onClick={() => fetchVehicles(filters)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Tentar novamente...
      </motion.button>
    </div>
  </motion.div>
);
