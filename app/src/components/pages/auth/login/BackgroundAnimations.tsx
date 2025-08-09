import { motion } from "framer-motion";

export const BackgroundAnimations = () => (
  <>
    <div className="absolute inset-0 opacity-[0.02]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                              linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
    <motion.div
      className="absolute top-20 left-20 w-1 h-20 bg-black opacity-10"
      animate={{
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    <motion.div
      className="absolute bottom-32 right-32 w-20 h-1 bg-black opacity-10"
      animate={{
        rotate: [0, -180, -360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </>
);
