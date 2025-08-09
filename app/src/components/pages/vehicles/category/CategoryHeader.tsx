import { motion } from "framer-motion";

const formatCategoryName = (id: string) => {
  const map: Record<string, string> = {
    SUV: "SUV",
    SPORTS_CAR: "Esportivos",
    PICKUP_4X4: "Picapes",
    HOT_HATCH: "Hot Hatches",
    ELECTRIC: "Elétricos",
    CLASSIC: "Clássicos",
    RETRO_SUPER: "Retro Super",
  };

  const formatted = map[id] || id.replace(/_/g, " ");
  return formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const CategoryHeader = ({
  filters,
  vehiclesCount,
  loading,
}: {
  filters: any;
  vehiclesCount: number;
  loading: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex justify-center text-center md:text-left flex-col gap-2"
  >
    <div className="flex  justify-center items-center gap-2 border-0 shadow-none flex-wrap">
      <h1 className="text-4xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        {filters.categoria ? "VEÍCULOS" : "TODOS OS VEÍCULOS"}
      </h1>

      {filters.categoria && (
        <div className="relative">
          <span className="inline-flex items-center px-4 py-2 rounded-none text-2xl md:text-3xl uppercase font-medium bg-gradient-to-r from-zinc-950 to-zinc-900 text-white">
            {formatCategoryName(filters.categoria)}
            <motion.span
              className="absolute -inset-1 -z-10 rounded-none bg-gradient-to-r from-primary/30 to-secondary/30 "
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 10,
              }}
            />
          </span>
        </div>
      )}
    </div>

    {vehiclesCount > 0 && !loading && (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {vehiclesCount} {vehiclesCount === 1 ? "resultado" : "resultados"}{" "}
        encontrados
      </p>
    )}
  </motion.div>
);
