
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { VehicleBrands } from "~/src/data/brands"

export function PartnerBrands() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })

    return (
        <section className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-full" ref={containerRef}>
            <div className="text-center mb-24">
            <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "60px" } : { width: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-gray-900 dark:bg-gray-100 mx-auto mb-6"
            />
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 dark:text-gray-100 mb-4"
            >
                MARCAS PARCEIRAS
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 dark:text-gray-400 font-light text-lg"
            >
                Trabalhamos com as melhores marcas do mercado
            </motion.p>
            </div>

            <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                transition: {
                    staggerChildren: 0.1,
                },
                },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12"
            >
            {VehicleBrands.map((brand, i) => (
                <motion.a
                key={brand.id}
                href={brand.link}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col items-center"
                >
                <div className="relative bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700 w-full aspect-square flex items-center justify-center transition-all duration-500 group-hover:border-gray-900 dark:group-hover:border-gray-300">
                    <motion.img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 w-auto object-contain grayscale opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    />
                </div>
                <motion.span
                    className="mt-6 text-base font-light text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                >
                    {brand.name}
                </motion.span>
                </motion.a>
            ))}
            </motion.div>
        </div>
        </section>
    )
}
