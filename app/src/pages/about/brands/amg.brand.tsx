
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

export default function AmgPage() {
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
        year: "1971",
        title: "O Porco Vermelho",
        description:
            "O icônico 300 SEL 6.3 'Porco Vermelho' garantiu uma vitória de classe e o segundo lugar geral nas 24 Horas de Spa, marcando o primeiro grande sucesso da AMG nas corridas.",
        },
        {
        year: "1986",
        title: "O Martelo",
        description:
            "O AMG Hammer, baseado no Classe E W124, tornou-se uma lenda com seu motor V8 de 5.6 litros, entregando mais de 360 cv e estabelecendo novos padrões para sedãs de alto desempenho.",
        },
        {
        year: "1990",
        title: "Acordo de Cooperação",
        description:
            "A AMG assinou um acordo de cooperação com a Daimler-Benz AG, permitindo que produtos AMG fossem vendidos através das concessionárias Mercedes-Benz.",
        },
        {
        year: "1999",
        title: "Aquisição da Maioria",
        description:
            "A DaimlerChrysler AG adquiriu a maioria das ações da AMG, integrando a marca de performance ainda mais profundamente na família Mercedes-Benz.",
        },
        {
        year: "2005",
        title: "Integração Total",
        description:
            "A AMG tornou-se uma subsidiária integral da Daimler AG, consolidando sua posição como o braço de alta performance da Mercedes-Benz.",
        },
        {
        year: "2009",
        title: "SLS AMG",
        description:
            "A introdução do Mercedes-Benz SLS AMG marcou o primeiro carro desenvolvido inteiramente pela AMG, demonstrando toda a sua capacidade de engenharia.",
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
                src="https://i.pinimg.com/1200x/19/b9/bc/19b9bcc2c38115ab8a288cc134352d98.jpg"
                alt="Mercedes-AMG Interior"
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
                AMG
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
            >
                PERFORMANCE AO VOLANTE
            </motion.p>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
            >
                A busca incansável por potência, precisão e paixão
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">A GÊNESE DO DESEMPENHO</h2>
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
                    Fundada em 1967 por Hans Werner Aufrecht e Erhard Melcher em Großaspach, Alemanha, a AMG começou como um
                    escritório de engenharia especializado no design, teste e desenvolvimento de motores de corrida. Sua
                    visão era simples porém ambiciosa: transformar veículos Mercedes-Benz comuns em máquinas de alto
                    desempenho.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 font-light">
                    De origens humildes em um antigo moinho, a AMG rapidamente ganhou reputação por seu meticuloso
                    artesanato e inovação no ajuste de motores, estabelecendo as bases para um legado de excelência
                    automotiva sem paralelo.
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
                    <h3 className="text-2xl font-light mb-4 tracking-wide">AUFRECHT & MELCHER</h3>
                    <div className="w-12 h-px bg-current mb-4" />
                    <p className="leading-relaxed font-light">
                        Dois engenheiros visionários que transformaram sua paixão por performance em uma das marcas mais
                        respeitadas do mundo automotivo, criando um legado de excelência em engenharia.
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
                { number: 1967, label: "ANO DE FUNDAÇÃO", suffix: "" },
                { number: 50, label: "ANOS DE EXCELÊNCIA", suffix: "+" },
                { number: 630, label: "CAVALOS DE POTÊNCIA", suffix: "+" },
                { number: 100, label: "MODELOS DESENVOLVIDOS", suffix: "+" },
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">MOMENTOS DEFINIDORES</h2>
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

        {/* Philosophy Section */}
        <section className="py-32 bg-black text-white">
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
                className="h-px bg-white mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-white mb-4">UM HOMEM, UM MOTOR</h2>
                <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="h-px bg-white mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
            >
                <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90 mb-8">
                Cada motor AMG é montado à mão por um único engenheiro, uma tradição que exemplifica nosso compromisso
                inabalável com a precisão e o artesanato.
                </p>
                <div className="w-24 h-px bg-white/60 mx-auto" />
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">IMPACTO NA INDÚSTRIA</h2>
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
                    title: "Pioneirismo em Performance",
                    description:
                    "A Mercedes-AMG influenciou profundamente a indústria automotiva ao empurrar constantemente os limites de desempenho, luxo e engenharia. Eles pioneiraram o conceito de versões de alta performance de sedãs de luxo.",
                },
                {
                    title: "Artesanato Excepcional",
                    description:
                    "Sua filosofia 'Um Homem, Um Motor', onde cada motor é montado à mão por um único engenheiro, exemplifica um compromisso com precisão e artesanato que é raro na produção em massa.",
                },
                {
                    title: "Integração Tecnológica",
                    description:
                    "Além da potência bruta, a AMG integrou tecnologias avançadas, aerodinâmica sofisticada e dinâmicas de direção refinadas, provando que performance extrema pode coexistir com usabilidade diária e luxo.",
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
                <div className="text-2xl font-thin tracking-[0.3em] mb-8">MERCEDES-AMG</div>
                <div className="w-16 h-px bg-white mx-auto mb-8" />
                <div className="text-sm font-light tracking-widest text-gray-400 mb-4">PERFORMANCE AO VOLANTE</div>
            </motion.div>
            </div>
        </footer>
        </div>
    )
    }
