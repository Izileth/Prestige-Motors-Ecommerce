import { motion } from "framer-motion";

const Loading = () => {
  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div 
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          variants={spinVariants}
          animate="animate"
          className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full"
        />
        <p className="text-sm text-black/60">Carregando...</p>
      </motion.div>
    </div>
  );
};

export default Loading;