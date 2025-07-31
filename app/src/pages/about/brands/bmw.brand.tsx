
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

export default function BmwPage() {
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
        year: "1916",
        title: "Fundação da BMW",
        description:
            "A Bayerische Motoren Werke AG é estabelecida, inicialmente focada em motores de avião, preparando o terreno para uma futura gigante automotiva.",
        },
        {
        year: "1923",
        title: "Primeira Motocicleta (R32)",
        description:
            "A BMW introduz sua primeira motocicleta, a R32, estabelecendo novos padrões de engenharia e design no mundo das duas rodas.",
        },
        {
        year: "1928",
        title: "Primeiro Automóvel (Dixi 3/15)",
        description:
            "A BMW adquire a Automobilwerk Eisenach e começa a produzir carros, começando com o Dixi 3/15, um Austin Seven licenciado.",
        },
        {
        year: "1962",
        title: "A Nova Classe",
        description:
            "Introdução do BMW 1500, marcando a 'Nova Classe' de sedãs que salvou a empresa e definiu sua identidade moderna como fabricante de sedãs esportivos.",
        },
        {
        year: "1972",
        title: "Divisão BMW M",
        description:
            "A BMW Motorsport GmbH é fundada, criando versões de alta performance dos carros BMW e estabelecendo a lendária série 'M'.",
        },
        {
        year: "2013",
        title: "Série BMW i",
        description:
            "Lançamento do BMW i3 e i8, marcando a entrada significativa da BMW na tecnologia de veículos elétricos e híbridos, mostrando compromisso com mobilidade sustentável.",
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
                src="https://i.pinimg.com/1200x/76/0a/3f/760a3f6d7969fe65cacad14263429321.jpg"
                alt="BMW M series car on track"
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
                BMW
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
            >
                A MÁQUINA DEFINITIVA DE DIRIGIR
            </motion.p>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
            >
                Onde a precisão alemã encontra o prazer de dirigir
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">UM SÉCULO DE INOVAÇÃO</h2>
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
                    A Bayerische Motoren Werke AG, comumente conhecida como BMW, foi fundada em 1916 em Munique, Alemanha.
                    Inicialmente, a empresa produzia motores de avião, depois motocicletas, antes de entrar na fabricação de
                    automóveis em 1928.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 font-light">
                    Desde seus primeiros dias, a BMW estabeleceu uma reputação por excelência em engenharia, precisão e foco
                    no prazer de dirigir. Esse compromisso com desempenho e inovação tem sido a força motriz por trás de seu
                    sucesso.
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
                    <h3 className="text-2xl font-light mb-4 tracking-wide">O EMBLEMA DA BMW</h3>
                    <div className="w-12 h-px bg-current mb-4" />
                    <p className="leading-relaxed font-light">
                        O icônico logo da BMW, frequentemente associado a uma hélice girando, na verdade simboliza as cores
                        azul e branco da bandeira da Baviera, refletindo as origens da empresa na região.
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
                { number: 1916, label: "ANO DE FUNDAÇÃO", suffix: "" },
                { number: 107, label: "ANOS DE EXCELÊNCIA", suffix: "" },
                { number: 2500000, label: "VEÍCULOS PRODUZIDOS/ANO", suffix: "+" },
                { number: 140, label: "PAÍSES DE OPERAÇÃO", suffix: "+" },
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">MOMENTOS DEFINITIVOS</h2>
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

        {/* M Division Section */}
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-white mb-4">BMW M</h2>
                <h3 className="text-2xl md:text-3xl font-light tracking-widest text-white/80 mb-8">MOTORSPORT</h3>
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
                A divisão M representa o ápice da engenharia BMW, onde cada componente é refinado para entregar
                performance pura e prazer de dirigir incomparável.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {["M3", "M5", "M8"].map((model, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                    >
                    <div className="w-16 h-px bg-white mx-auto mb-4 group-hover:w-24 transition-all duration-300" />
                    <h4 className="text-xl font-light tracking-wide">{model}</h4>
                    </motion.div>
                ))}
                </div>
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">
                MOLDANDO A EXPERIÊNCIA DE DIREÇÃO
                </h2>
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
                    title: "Dinâmica de Direção & Performance",
                    description:
                    "O foco inabalável da BMW em dinâmica de direção estabeleceu um padrão para a indústria. Seu compromisso com chassi balanceado, direção precisa e motores potentes criou uma experiência de direção única.",
                },
                {
                    title: "Liderança Tecnológica",
                    description:
                    "A BMW esteve na vanguarda da tecnologia automotiva, introduzindo inovações como o iDrive, EfficientDynamics e sistemas avançados de assistência ao motorista. Continuam liderando em conectividade e direção autônoma.",
                },
                {
                    title: "Segmento de Sedãs Esportivos de Luxo",
                    description:
                    "A BMW basicamente definiu o segmento de sedãs esportivos de luxo, provando que conforto e praticidade podem coexistir com performance emocionante. Essa combinação influenciou inúmeros concorrentes.",
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

        {/* Innovation Section */}
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">INOVAÇÃO CONTÍNUA</h2>
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
                <p className="text-lg leading-relaxed text-gray-700 font-light mb-8">
                A BMW continua a liderar a transformação da mobilidade, investindo em eletrificação, direção autônoma e
                tecnologias sustentáveis. A série BMW i representa o futuro da mobilidade premium, combinando performance
                com responsabilidade ambiental.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {["Eletrificação", "Direção Autônoma", "Conectividade"].map((tech, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                    >
                    <div className="w-16 h-px bg-black mx-auto mb-4 group-hover:w-24 transition-all duration-300" />
                    <h4 className="text-xl font-light tracking-wide">{tech}</h4>
                    </motion.div>
                ))}
                </div>
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
                <div className="text-2xl font-thin tracking-[0.3em] mb-8">BMW</div>
                <div className="w-16 h-px bg-white mx-auto mb-8" />
                <div className="text-sm font-light tracking-widest text-gray-400 mb-4">A MÁQUINA DEFINITIVA DE DIRIGIR</div>
            </motion.div>
            </div>
        </footer>
        </div>
    )
}
