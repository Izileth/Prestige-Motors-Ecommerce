
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function BmwPage() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
    }

    const staggerContainer = {
        animate: {
        transition: {
            staggerChildren: 0.2,
        },
        },
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-50 font-sans antialiased overflow-x-hidden">


        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black">
            <motion.div style={{ y: scrollY * 0.5 }} className="absolute inset-0 z-0">
            <img
                src="/placeholder.svg?height=1080&width=1920&text=BMW+M+series+car+on+track"
                alt="BMW M series car on track"
                className="opacity-40 grayscale"
            />
            </motion.div>

            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 text-center px-4 py-16"
            >
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-gray-900/90 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-gray-700/50"
            >
                <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-gray-50 drop-shadow-2xl mb-6"
                >
                BMW
                </motion.h2>
                <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl md:text-3xl font-light text-gray-200 tracking-wide mb-8"
                >
                The Ultimate Driving Machine
                </motion.p>
                <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1, delay: 1 }}
                className="h-1 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 mx-auto rounded-full"
                />
            </motion.div>
            </motion.div>
        </section>

        {/* History Section */}
        <section className="py-24 px-4 md:px-6 lg:py-32 bg-white text-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

            <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto relative z-10"
            >
            <motion.h3
                variants={fadeInUp}
                className="text-6xl font-bold tracking-tight text-center mb-16 text-gray-900 relative"
            >
                A Century of Innovation
                <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 bg-gray-800 rounded-full"
                />
            </motion.h3>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div variants={fadeInUp} className="space-y-8">
                <motion.p variants={fadeInUp} className="text-xl leading-relaxed">
                    Bayerische Motoren Werke AG, commonly known as BMW, was founded in 1916 in Munich, Germany. Initially,
                    the company produced aircraft engines, then motorcycles, before venturing into automobile manufacturing
                    in 1928.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-xl leading-relaxed">
                    From its early days, BMW established a reputation for engineering excellence, precision, and a focus on
                    driving pleasure. This commitment to performance and innovation has been the driving force behind its
                    success, shaping its identity as a leading luxury and performance automotive brand.
                </motion.p>
                </motion.div>

                <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-100 to-gray-200 p-10 rounded-3xl shadow-xl"
                >
                <h4 className="text-3xl font-semibold mb-6 text-gray-900">The BMW Roundel</h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                    The iconic BMW logo, often thought to represent a spinning propeller, actually symbolizes the Bavarian
                    flag's blue and white colors, reflecting the company's origins in Bavaria.
                </p>
                </motion.div>
            </div>
            </motion.div>
        </section>

        {/* Milestones Section */}
        <section className="py-24 px-4 md:px-6 lg:py-32 bg-gray-900 text-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

            <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto relative z-10"
            >
            <motion.h3
                variants={fadeInUp}
                className="text-6xl font-bold tracking-tight text-center mb-20 text-gray-50 relative"
            >
                Defining Moments
                <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 bg-gray-400 rounded-full"
                />
            </motion.h3>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                {
                    year: "1916",
                    title: "Founding of BMW",
                    description:
                    "Bayerische Motoren Werke AG is established, initially focusing on aircraft engines, laying the groundwork for a future automotive giant.",
                },
                {
                    year: "1923",
                    title: "First Motorcycle (R32)",
                    description:
                    "BMW introduces its first motorcycle, the R32, setting new standards for engineering and design in the two-wheeled world.",
                },
                {
                    year: "1928",
                    title: "First Automobile (Dixi 3/15)",
                    description:
                    "BMW acquires Automobilwerk Eisenach and begins producing cars, starting with the Dixi 3/15, a licensed Austin Seven.",
                },
                {
                    year: "1962",
                    title: "The New Class",
                    description:
                    "Introduction of the BMW 1500, marking the 'New Class' of sedans that saved the company and defined its modern identity as a sports sedan manufacturer.",
                },
                {
                    year: "1972",
                    title: "BMW M Division",
                    description:
                    "BMW Motorsport GmbH is founded, creating high-performance versions of BMW cars and establishing the legendary 'M' series.",
                },
                {
                    year: "2013",
                    title: "BMW i Series",
                    description:
                    "Launch of the BMW i3 and i8, marking BMW's significant entry into electric and hybrid vehicle technology, showcasing a commitment to sustainable mobility.",
                },
                ].map((milestone, index) => (
                <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="group bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-3xl shadow-2xl border border-gray-600/50 cursor-pointer"
                >
                    <motion.h4 className="text-3xl font-bold mb-4 text-gray-50 group-hover:text-gray-200 transition-colors">
                    {milestone.year}: {milestone.title}
                    </motion.h4>
                    <motion.p className="text-gray-300 leading-relaxed text-lg">{milestone.description}</motion.p>
                </motion.div>
                ))}
            </motion.div>
            </motion.div>
        </section>

        {/* Impact Section */}
        <section className="py-24 px-4 md:px-6 lg:py-32 bg-white text-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

            <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto relative z-10"
            >
            <motion.h3
                variants={fadeInUp}
                className="text-6xl font-bold tracking-tight text-center mb-16 text-gray-900 relative"
            >
                Shaping the Driving Experience
                <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 bg-gray-800 rounded-full"
                />
            </motion.h3>

            <div className="space-y-12">
                {[
                {
                    title: "Driving Dynamics & Performance",
                    content:
                    "BMW's unwavering focus on driving dynamics has set a benchmark for the industry. Their commitment to balanced chassis, precise steering, and powerful, refined engines has created a unique driving experience that is often imitated but rarely replicated.",
                },
                {
                    title: "Technological Leadership",
                    content:
                    "BMW has been at the forefront of automotive technology, introducing innovations like iDrive, EfficientDynamics for fuel efficiency, and advanced driver-assistance systems. They continue to lead in areas like connectivity and autonomous driving.",
                },
                {
                    title: "Luxury Sports Sedan Segment",
                    content:
                    "BMW largely defined the luxury sports sedan segment, proving that comfort and practicality could coexist with exhilarating performance. This blend has influenced countless competitors and shaped consumer expectations for premium vehicles.",
                },
                ].map((impact, index) => (
                <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 p-10 rounded-3xl shadow-xl border border-gray-200"
                >
                    <motion.h4 className="text-3xl font-bold mb-6 text-gray-900">{impact.title}</motion.h4>
                    <motion.p className="text-xl leading-relaxed text-gray-700">{impact.content}</motion.p>
                </motion.div>
                ))}
            </div>
            </motion.div>
        </section>

   
        </div>
    )
}