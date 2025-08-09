import { motion } from "framer-motion";

export const ProgressBar = ({
  formProgress,
  itemVariants,
}: {
  formProgress: number;
  itemVariants: any;
}) => (
  <motion.div variants={itemVariants} className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-black/60 font-light tracking-wide">
        PROGRESSO
      </span>
      <span className="text-xs text-black/60 font-light">
        {formProgress}%
      </span>
    </div>
    <div className="relative h-[1px] bg-black/10">
      <motion.div
        className="absolute left-0 top-0 h-full bg-black origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: formProgress / 100 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);
