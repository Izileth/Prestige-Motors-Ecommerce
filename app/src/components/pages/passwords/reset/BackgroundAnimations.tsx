import { motion } from "framer-motion";

export const BackgroundAnimations = () => (
  <>
    <div className="absolute inset-0 opacity-[0.02]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                              linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
    <motion.div
      className="absolute top-32 left-16 w-1 h-32 bg-black opacity-5"
      animate={{
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 12,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
    <motion.div
      className="absolute bottom-40 right-20 w-24 h-1 bg-black opacity-5"
      animate={{
        rotate: [0, -90, -180, -270, -360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 15,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  </>
);
