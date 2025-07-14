
import { motion } from "framer-motion";

interface PageTitleProps {
  title: string;
  subtitle: React.ReactNode;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
    </motion.div>
  );
}
