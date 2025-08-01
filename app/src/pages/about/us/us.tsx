
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
    animate: {
        transition: {
        staggerChildren: 0.1,
        },
    },
}

const slideInLeft = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const slideInRight = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(() => {
        if (isInView) {
        let startTime: number
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
            requestAnimationFrame(animate)
            }
        }
        requestAnimationFrame(animate)
        }
    }, [isInView, end, duration])

    return (
        <span ref={ref}>
        {count.toLocaleString()}
        {suffix}
        </span>
    )
}

export default function PrestigeMotorsPage() {
    const { scrollYProgress } = useScroll()
    const heroRef = useRef(null)
    const timelineRef = useRef(null)
    const valuesRef = useRef(null)
    const ctaRef = useRef(null)

    const heroIsInView = useInView(heroRef, { once: true })
    const timelineIsInView = useInView(timelineRef, { once: true })
    const valuesIsInView = useInView(valuesRef, { once: true })
    const ctaIsInView = useInView(ctaRef, { once: true })

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    const timelineItems = [
        {
        year: "2005",
        title: "Fundação",
        description:
            "A Prestige Motors nasceu da visão de dois entusiastas de automóveis que buscavam criar um espaço onde a excelência e o luxo se encontrassem. Nosso primeiro showroom em São Paulo marcou o início de uma revolução no mercado de veículos premium.",
        image:
            "https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/83022ec1-b02f-4d56-a854-9e223ff6886b/Leonardo_Kino_XL_Cinematic_image_capturing_the_Prestige_Motors_2.jpg",
        },
        {
        year: "2012",
        title: "Expansão Internacional",
        description:
            "Com a abertura de nosso primeiro escritório em Miami, consolidamos nossa presença no mercado internacional, trazendo veículos exclusivos da Europa e Ásia para clientes exigentes em todo o continente americano.",
        image:
            "https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/64050fe0-c6b2-4fc7-808e-2d9992c0ac09/Leonardo_Kino_XL_Photorealistic_architectural_image_of_the_Pre_1.jpg",
        },
        {
        year: "2018",
        title: "Eventos Exclusivos",
        description:
            "Lançamos nossa série de eventos 'Prestige Experience', oferecendo aos clientes a oportunidade de dirigir os veículos mais exclusivos em locais paradisíacos, criando uma comunidade de entusiastas de alto padrão.",
        image:
            "https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/80c9257f-e41e-436f-9a80-8d50893c6d22/Leonardo_Kino_XL_Photorealistic_image_capturing_an_exclusive_P_2.jpg",
        },
        {
        year: "2023",
        title: "Plataforma Digital",
        description:
            "Com o lançamento de nossa plataforma digital, democratizamos o acesso a veículos de luxo, mantendo o padrão de excelência e personalização que nos tornou referência no setor.",
        image:
            "https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/6c3d4134-b64b-4de3-89bf-32f2ecb862bb/Leonardo_Kino_XL_Photorealistic_image_capturing_an_exclusive_P_3.jpg",
        },
    ]

    return (
        <div className="min-h-screen bg-white text-black font-light antialiased overflow-x-hidden">
        {/* Progress Bar */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-0.5 bg-black z-50 origin-left"
            style={{ scaleX: scrollYProgress }}
        />

        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <img
                src="https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/83022ec1-b02f-4d56-a854-9e223ff6886b/Leonardo_Kino_XL_Cinematic_image_capturing_the_Prestige_Motors_0.jpg"
                alt="Prestige Motors luxury showroom"
                className="object-cover object-center grayscale w-full h-full"
            />
            <div className="absolute inset-0 bg-black/70" />
            </motion.div>

            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroIsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="relative z-10 text-center px-4"
            >
            <motion.div
                initial={{ width: 0 }}
                animate={heroIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-white mb-8 mx-auto max-w-24"
            />

            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl md:text-9xl font-thin tracking-[0.2em] text-white mb-6"
            >
                PRESTIGE
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
            >
                NOSSA HISTÓRIA
            </motion.p>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
            >
                A jornada da Prestige Motors em redefinir o luxo automotivo
            </motion.p>

            <motion.div
                initial={{ width: 0 }}
                animate={heroIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 1.1 }}
                className="h-px bg-white mt-8 mx-auto max-w-24"
            />
            </motion.div>

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-px h-16 bg-white/60"
            />
            </motion.div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-black text-white">
            <div className="max-w-6xl mx-auto px-4">
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
                {[
                { number: 2005, label: "ANO DE FUNDAÇÃO", suffix: "" },
                { number: 18, label: "ANOS DE EXCELÊNCIA", suffix: "" },
                { number: 5000, label: "VEÍCULOS VENDIDOS", suffix: "+" },
                { number: 15, label: "PAÍSES ATENDIDOS", suffix: "" },
                ].map((stat, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center group">
                    <div className="text-3xl md:text-4xl font-thin mb-2">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="w-8 h-px bg-white mx-auto mb-2 group-hover:w-16 transition-all duration-300" />
                    <div className="text-xs tracking-widest text-gray-400 font-light">{stat.label}</div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-32 px-4 md:px-6 bg-white">
            <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={timelineIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={timelineIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">NOSSA TRAJETÓRIA</h2>
                <motion.div
                initial={{ width: 0 }}
                animate={timelineIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <div className="space-y-32">
                {timelineItems.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}
                >
                    <motion.div
                    className={`relative group ${index % 2 === 1 ? "md:col-start-2" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    >
                    <div className="aspect-[4/3] overflow-hidden border border-gray-200">
                        <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 w-full h-full"
                        />
                    </div>
                    </motion.div>

                    <motion.div
                    variants={index % 2 === 0 ? slideInRight : slideInLeft}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className={index % 2 === 1 ? "md:col-start-1" : ""}
                    >
                    <div className="w-12 h-px bg-black mb-6" />
                    <h3 className="text-3xl font-thin mb-4 tracking-wide">
                        {item.year} — {item.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700 font-light">{item.description}</p>
                    </motion.div>
                </motion.div>
                ))}
            </div>
            </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-32 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={valuesIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={valuesIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">NOSSOS VALORES</h2>
                <motion.div
                initial={{ width: 0 }}
                animate={valuesIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate={valuesIsInView ? "animate" : "initial"}
                className="grid md:grid-cols-3 gap-8"
            >
                {[
                {
                    title: "Excelência",
                    description:
                    "Cada veículo em nosso portfólio passa por rigorosa inspeção para garantir perfeição. Nosso padrão de qualidade é incomparável.",
                },
                {
                    title: "Discrição",
                    description:
                    "Entendemos a importância da privacidade de nossos clientes. Todas as transações são tratadas com absoluto sigilo e profissionalismo.",
                },
                {
                    title: "Personalização",
                    description:
                    "Oferecemos serviços sob medida para atender às necessidades específicas de cada cliente, desde busca por veículos raros até entregas exclusivas.",
                },
                ].map((value, index) => (
                <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="group relative"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="border-t-2 border-gray-200 p-8 h-full group-hover:border-black transition-colors duration-300">
                    <h3 className="text-2xl font-light mb-6 tracking-wide">{value.title}</h3>
                    <div className="w-12 h-px bg-black mb-6 group-hover:w-24 transition-all duration-300" />
                    <p className="text-lg leading-relaxed text-gray-700 font-light">{value.description}</p>
                    </div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* Luxury Experience Section */}
        <section className="py-32 bg-white">
            <div className="max-w-6xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">EXPERIÊNCIA PRESTIGE</h2>
                <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
            >
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 mb-8">
                Na Prestige Motors, cada cliente é único. Oferecemos uma experiência personalizada que vai além da simples
                compra de um veículo, criando relacionamentos duradouros baseados na confiança e excelência.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {["Consultoria Especializada", "Entrega VIP", "Suporte Exclusivo"].map((service, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                    >
                    <div className="w-16 h-px bg-black mx-auto mb-4 group-hover:w-24 transition-all duration-300" />
                    <h4 className="text-xl font-light tracking-wide">{service}</h4>
                    </motion.div>
                ))}
                </div>
            </motion.div>
            </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-32 bg-black text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={ctaIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={ctaIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-white mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-white mb-4">
                FAÇA PARTE DA NOSSA HISTÓRIA
                </h2>
                <motion.div
                initial={{ width: 0 }}
                animate={ctaIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-white mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={ctaIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-2xl font-light leading-relaxed text-white/80 mb-12 max-w-2xl mx-auto"
            >
                Descubra como a Prestige Motors pode transformar sua experiência automotiva.
            </motion.p>
         
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-16 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <div className="text-2xl font-thin tracking-[0.3em] mb-8">PRESTIGE MOTORS</div>
                <div className="w-16 h-px bg-white mx-auto mb-8" />
                <div className="text-sm font-light tracking-widest text-gray-400 mb-4">REDEFININDO O LUXO AUTOMOTIVO</div>
            </motion.div>
            </div>
        </footer>
        </div>
  )
}
