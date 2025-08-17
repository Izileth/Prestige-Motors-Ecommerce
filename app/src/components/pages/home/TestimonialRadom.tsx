import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CustomerTestimonials } from "~/src/data/testmonial"

export function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })

    return (
        <section className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-7xl" ref={containerRef}>
            <div className="text-center mb-20">
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
                DEPOIMENTOS
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 dark:text-gray-400 font-light text-lg max-w-md mx-auto"
            >
                O que nossos clientes dizem sobre nós
            </motion.p>
            </div>

            <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                transition: {
                    staggerChildren: 0.15,
                },
                },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            >
            {CustomerTestimonials.map((testimonial, index) => (
                <motion.div
                key={testimonial.id}
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    },
                    },
                }}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.4 }}
                className="group bg-white dark:bg-gray-800 p-8 lg:p-10 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300 transition-all duration-500"
                >
                <div className="flex items-center mb-8">
                    {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 mr-1 ${
                        i < testimonial.rating ? "text-gray-900 dark:text-gray-100" : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ))}
                </div>

                <div className="mb-10">
                    <p className="text-xl font-light text-gray-700 dark:text-gray-300 leading-relaxed">
                    "{testimonial.text}"
                    </p>
                </div>

                <div className="flex items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="relative mr-5">
                    <div className="w-14 h-14 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-gray-900 dark:group-hover:border-gray-300 transition-colors duration-300">
                        <span className="text-lg font-light text-gray-900 dark:text-gray-100">
                        {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                    </div>
                    </div>
                    <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-lg mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light">{testimonial.role}</p>
                    </div>
                </div>
                </motion.div>
            ))}
            </motion.div>
        </div>
        </section>
    )
}
