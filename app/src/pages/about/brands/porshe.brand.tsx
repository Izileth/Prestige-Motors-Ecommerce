
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

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

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
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

    return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function PorschePage() {
    const { scrollYProgress } = useScroll()
    const heroRef = useRef(null)
    const historyRef = useRef(null)
    const milestonesRef = useRef(null)
    const impactRef = useRef(null)

    const heroIsInView = useInView(heroRef, { once: true })
    const historyIsInView = useInView(historyRef, { once: true })
    const milestonesIsInView = useInView(milestonesRef, { once: true })
    const impactIsInView = useInView(impactRef, { once: true })

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    const milestones = [
        {
        year: "1948",
        title: "O 356",
        description:
            "O primeiro Porsche de produção, o 356, estreia como um carro esportivo leve que estabelece a reputação da Porsche por dirigibilidade excepcional e desempenho.",
        },
        {
        year: "1963",
        title: "O Ícone 911",
        description:
            "Lançamento do lendário Porsche 911, apresentando o design característico de motor traseiro que se tornaria sinônimo da marca Porsche por décadas.",
        },
        {
        year: "1970",
        title: "Vitória em Le Mans",
        description:
            "Porsche conquista sua primeira vitória geral nas 24 Horas de Le Mans com o 917, iniciando um legado lendário nas corridas que continua até hoje.",
        },
        {
        year: "1975",
        title: "A Era Turbo",
        description:
            "Introdução do 911 Turbo, pioneiro na tecnologia turboalimentada em carros esportivos e estabelecendo novos benchmarks de desempenho para a indústria.",
        },
        {
        year: "2002",
        title: "SUV Cayenne",
        description:
            "Lançamento do Cayenne, primeiro SUV da Porsche, expandindo a marca para novos mercados enquanto mantinha seu DNA de desempenho e excelência em engenharia.",
        },
        {
        year: "2019",
        title: "Elétrico Taycan",
        description:
            "Introdução do Taycan, primeiro carro esportivo totalmente elétrico da Porsche, demonstrando o compromisso da marca com mobilidade sustentável de alto desempenho.",
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
                src="https://i.pinimg.com/1200x/44/c9/83/44c98379e836c6751c3846f87ad28ea7.jpg"
                alt="Porsche 911 on mountain road"
                className="object-cover object-center grayscale w-full h-full"
            />
            <div className="absolute inset-0 bg-black/60" />
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
                PORSCHE
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl font-light text-white/80 tracking-widest"
            >
                EXCELÊNCIA EM ENGENHARIA DESDE 1931
            </motion.p>

            <motion.div
                initial={{ width: 0 }}
                animate={heroIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.9 }}
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

        {/* History Section */}
        <section ref={historyRef} className="py-32 px-4 md:px-6 bg-white relative">
            <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={historyIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={historyIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">O NASCIMENTO DE UMA LENDA</h2>
                <motion.div
                initial={{ width: 0 }}
                animate={historyIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                variants={slideInLeft}
                initial="initial"
                animate={historyIsInView ? "animate" : "initial"}
                className="space-y-8"
                >
                <p className="text-lg leading-relaxed text-gray-700 font-light">
                    Fundada em 1931 por Ferdinand Porsche em Stuttgart, Alemanha, a Porsche começou como uma empresa de
                    consultoria em design e engenharia automotiva. A visão de Ferdinand Porsche era criar veículos que
                    combinassem engenharia inovadora com desempenho excepcional e design atemporal.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 font-light">
                    A filosofia da empresa de "Performance Inteligente" surgiu da crença de Ferdinand que a verdadeira
                    excelência automotiva vem da harmonia perfeita entre potência, eficiência e engenharia de precisão.
                </p>
                </motion.div>

                <motion.div
                variants={slideInRight}
                initial="initial"
                animate={historyIsInView ? "animate" : "initial"}
                className="relative"
                >
                <div className="bg-gray-50 p-8 border border-gray-200 relative group hover:border-black transition-colors duration-300">
                    <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                    <h3 className="text-2xl font-light mb-4 tracking-wide">FERDINAND PORSCHE</h3>
                    <div className="w-12 h-px bg-current mb-4" />
                    <p className="leading-relaxed font-light">
                        Um engenheiro visionário que projetou o Fusca e fundou uma das fabricantes de carros esportivos mais
                        prestigiadas do mundo, deixando uma marca indelével na história automotiva.
                    </p>
                    </div>
                </div>
                </motion.div>
            </div>
            </div>
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
                { number: 30000, label: "VITÓRIAS EM CORRIDAS", suffix: "+" },
                { number: 1931, label: "ANO DE FUNDAÇÃO", suffix: "" },
                { number: 19, label: "VITÓRIAS EM LE MANS", suffix: "" },
                { number: 90, label: "ANOS DE EXCELÊNCIA", suffix: "+" },
                ].map((stat, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center group">
                    <div className="text-3xl md:text-4xl font-thin mb-2">
                    <AnimatedCounter end={stat.number} />
                    {stat.suffix}
                    </div>
                    <div className="w-8 h-px bg-white mx-auto mb-2 group-hover:w-16 transition-all duration-300" />
                    <div className="text-xs tracking-widest text-gray-400 font-light">{stat.label}</div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* Milestones Section */}
        <section ref={milestonesRef} className="py-32 px-4 md:px-6 bg-white">
            <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={milestonesIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={milestonesIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">MARCOS HISTÓRICOS</h2>
                <motion.div
                initial={{ width: 0 }}
                animate={milestonesIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate={milestonesIsInView ? "animate" : "initial"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {milestones.map((milestone, index) => (
                <motion.div key={index} variants={fadeInUp} className="group relative">
                    <div className="border border-gray-200 p-8 h-full relative overflow-hidden group-hover:border-black transition-colors duration-300">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-black origin-bottom"
                        initial={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                        <div className="text-3xl font-thin mb-4 tracking-wider">{milestone.year}</div>
                        <div className="w-12 h-px bg-current mb-4" />
                        <h3 className="text-xl font-light mb-4 tracking-wide">{milestone.title}</h3>
                        <p className="text-sm leading-relaxed font-light opacity-80">{milestone.description}</p>
                    </div>
                    </div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* Impact Section */}
        <section ref={impactRef} className="py-32 px-4 md:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={impactIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={impactIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">MOLDANDO A EXCELÊNCIA</h2>
                <motion.div
                initial={{ width: 0 }}
                animate={impactIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate={impactIsInView ? "animate" : "initial"}
                className="space-y-8"
            >
                {[
                {
                    title: "Inovação em Engenharia",
                    description:
                    "A Porsche tem consistentemente expandido os limites da engenharia automotiva, pioneira em tecnologias como turboalimentação, sistemas de tração integral e aerodinâmica avançada que foram adotados em toda a indústria.",
                },
                {
                    title: "Legado nas Corridas",
                    description:
                    "Com mais de 30.000 vitórias em corridas, o sucesso da Porsche no automobilismo é incomparável. Seus programas de corrida não apenas estabeleceram as credenciais de desempenho da marca, mas também serviram como campo de testes para tecnologias.",
                },
                {
                    title: "Performance Sustentável",
                    description:
                    "A Porsche está liderando a transição para mobilidade sustentável sem comprometer o desempenho. O carro esportivo elétrico Taycan prova que emissões zero e dinâmica de direção emocionante podem coexistir.",
                },
                ].map((impact, index) => (
                <motion.div key={index} variants={fadeInUp} className="group">
                    <div className="border-l-2 border-gray-200 pl-8 py-6 group-hover:border-black transition-colors duration-300">
                    <h3 className="text-2xl font-light mb-4 tracking-wide">{impact.title}</h3>
                    <div className="w-12 h-px bg-black mb-4 group-hover:w-24 transition-all duration-300" />
                    <p className="text-lg leading-relaxed text-gray-700 font-light">{impact.description}</p>
                    </div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-16">
            <div className="max-w-6xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <div className="text-2xl font-thin tracking-[0.3em] mb-8">PORSCHE</div>
                <div className="w-16 h-px bg-white mx-auto mb-8" />
                <div className="text-sm font-light tracking-widest text-gray-400 mb-4">EXCELÊNCIA EM ENGENHARIA</div>
            </motion.div>
            </div>
        </footer>
        </div>
    )
}
