
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Shield, Lock, Database, ArrowRight, Eye, FileText, AlertCircle, Download, Mail, Phone } from "lucide-react"

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

export default function PrestigePrivacyPolicyPage() {
    const { scrollYProgress } = useScroll()
    const heroRef = useRef(null)
    const principlesRef = useRef(null)
    const contentRef = useRef(null)
    const rightsRef = useRef(null)
    const ctaRef = useRef(null)

    const heroIsInView = useInView(heroRef, { once: true })
    const principlesIsInView = useInView(principlesRef, { once: true })
    const contentIsInView = useInView(contentRef, { once: true })
    const rightsIsInView = useInView(rightsRef, { once: true })
    const ctaIsInView = useInView(ctaRef, { once: true })

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    const [activeSection, setActiveSection] = useState("overview")

    const privacyPrinciples = [
        {
        icon: Shield,
        title: "Proteção Rigorosa",
        description:
            "Seus dados são armazenados com criptografia de nível bancário e acessíveis apenas a pessoal autorizado.",
        features: ["Criptografia AES-256", "Acesso restrito", "Monitoramento 24/7"],
        },
        {
        icon: Lock,
        title: "Controle Total",
        description: "Você pode gerenciar suas preferências de privacidade a qualquer momento em sua conta.",
        features: ["Painel de controle", "Configurações flexíveis", "Alterações instantâneas"],
        },
        {
        icon: Database,
        title: "Minimização de Dados",
        description: "Coletamos apenas o essencial para fornecer nossos serviços premium.",
        features: ["Coleta mínima", "Retenção limitada", "Exclusão automática"],
        },
    ]

    const userRights = [
        {
        icon: Eye,
        title: "Direito de Acesso",
        description: "Visualize todos os dados pessoais que mantemos sobre você",
        action: "Solicitar Acesso",
        },
        {
        icon: FileText,
        title: "Direito de Retificação",
        description: "Corrija informações incorretas ou desatualizadas",
        action: "Solicitar Correção",
        },
        {
        icon: Download,
        title: "Portabilidade de Dados",
        description: "Exporte seus dados em formato estruturado",
        action: "Exportar Dados",
        },
        {
        icon: AlertCircle,
        title: "Direito ao Esquecimento",
        description: "Solicite a exclusão de dados não necessários",
        action: "Solicitar Exclusão",
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
                src="https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/8dbcab80-6ad5-43a7-95be-d083de93f4f3/Leonardo_Kino_XL_Interior_image_of_the_executive_lounge_at_Pre_3.jpg"
                alt="Prestige Motors executive lounge privacy"
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
                PRIVACIDADE
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
            >
                POLÍTICA DE PROTEÇÃO DE DADOS
            </motion.p>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
            >
                Transparência e segurança no tratamento dos seus dados
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
                { number: 256, label: "CRIPTOGRAFIA AES", suffix: "-bit" },
                { number: 100, label: "CONFORMIDADE LGPD", suffix: "%" },
                { number: 24, label: "MONITORAMENTO", suffix: "/7" },
                { number: 30, label: "DIAS PARA RESPOSTA", suffix: "" },
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

        {/* Privacy Principles Section */}
        <section ref={principlesRef} className="py-32 px-4 md:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={principlesIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={principlesIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">NOSSOS PRINCÍPIOS</h2>
                <motion.div
                initial={{ width: 0 }}
                animate={principlesIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate={principlesIsInView ? "animate" : "initial"}
                className="grid md:grid-cols-3 gap-12"
            >
                {privacyPrinciples.map((principle, index) => (
                <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="group text-center"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 border border-gray-200 rounded-full mb-8 group-hover:border-black transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    >
                    <principle.icon size={32} strokeWidth={1} className="text-gray-700 group-hover:text-black" />
                    </motion.div>
                    <h3 className="text-2xl font-light mb-6 tracking-wide">{principle.title}</h3>
                    <div className="w-12 h-px bg-gray-300 mx-auto mb-6 group-hover:w-24 group-hover:bg-black transition-all duration-300" />
                    <p className="text-lg leading-relaxed text-gray-700 font-light mb-6">{principle.description}</p>
                    <div className="space-y-2">
                    {principle.features.map((feature, featureIndex) => (
                        <motion.div
                        key={featureIndex}
                        className="flex items-center justify-center text-sm text-gray-500 font-light"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        >
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                        <span>{feature}</span>
                        </motion.div>
                    ))}
                    </div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* Policy Content Section */}
        <section ref={contentRef} className="py-32 px-4 md:px-6 bg-white">
            <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={contentIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={contentIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">POLÍTICA COMPLETA</h2>
                <motion.div
                initial={{ width: 0 }}
                animate={contentIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <div className="grid md:grid-cols-4 gap-16">
                {/* Navigation */}
                <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, x: -30 }}
                animate={contentIsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                >
                <div className="sticky top-32">
                    <h3 className="text-lg font-light mb-8 tracking-wide">Navegação</h3>
                    <div className="w-12 h-px bg-gray-300 mb-8" />
                    <nav className="space-y-4">
                    {[
                        { id: "overview", title: "Visão Geral" },
                        { id: "collection", title: "Coleta de Dados" },
                        { id: "usage", title: "Uso dos Dados" },
                        { id: "sharing", title: "Compartilhamento" },
                        { id: "security", title: "Segurança" },
                        { id: "retention", title: "Retenção" },
                    ].map((item, index) => (
                        <motion.button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`block text-left font-light transition-colors duration-300 ${
                            activeSection === item.id ? "text-black" : "text-gray-500 hover:text-gray-700"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        >
                        {item.title}
                        </motion.button>
                    ))}
                    </nav>
                </div>
                </motion.div>

                {/* Content */}
                <motion.div
                className="md:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                animate={contentIsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                >
                <div className="space-y-16">
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                    >
                    <h3 className="text-3xl font-thin tracking-wide">1. Dados Que Coletamos</h3>
                    <div className="w-16 h-px bg-gray-300" />
                    <p className="text-lg text-gray-700 font-light leading-relaxed">
                        Para proporcionar a melhor experiência Prestige Motors, podemos coletar:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                        { title: "Informações de Contato", items: ["Nome completo", "E-mail", "Telefone", "Endereço"] },
                        {
                            title: "Dados Financeiros",
                            items: ["Informações de pagamento", "Histórico de transações", "Preferências de faturamento"],
                        },
                        {
                            title: "Dados de Navegação",
                            items: ["Páginas visitadas", "Tempo de permanência", "Dispositivo utilizado"],
                        },
                        {
                            title: "Preferências",
                            items: ["Veículos de interesse", "Configurações de conta", "Comunicações preferidas"],
                        },
                        ].map((category, index) => (
                        <motion.div
                            key={index}
                            className="border border-gray-100 p-6 group hover:border-gray-200 transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <h4 className="font-light text-lg mb-4 group-hover:text-black transition-colors duration-300">
                            {category.title}
                            </h4>
                            <div className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-start text-gray-600 font-light text-sm">
                                <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3" />
                                <span>{item}</span>
                                </div>
                            ))}
                            </div>
                        </motion.div>
                        ))}
                    </div>
                    </motion.div>

                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                    >
                    <h3 className="text-3xl font-thin tracking-wide">2. Como Utilizamos Seus Dados</h3>
                    <div className="w-16 h-px bg-gray-300" />
                    <p className="text-lg text-gray-700 font-light leading-relaxed">
                        Seus dados nos ajudam a oferecer uma experiência personalizada e segura:
                    </p>
                    <div className="space-y-4">
                        {[
                        "Personalizar sua experiência de navegação e recomendações",
                        "Processar transações com segurança e eficiência",
                        "Melhorar nossos serviços com base no feedback dos usuários",
                        "Cumprir obrigações legais e regulamentares",
                        "Comunicar ofertas e novidades relevantes",
                        "Fornecer suporte técnico e atendimento ao cliente",
                        ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start space-x-3 p-4 border border-gray-100 group hover:border-gray-200 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                        >
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 group-hover:bg-black transition-colors duration-300" />
                            <span className="font-light text-gray-700 group-hover:text-black transition-colors duration-300">
                            {item}
                            </span>
                        </motion.div>
                        ))}
                    </div>
                    </motion.div>

                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                    >
                    <h3 className="text-3xl font-thin tracking-wide">3. Compartilhamento de Dados</h3>
                    <div className="w-16 h-px bg-gray-300" />
                    <div className="bg-gray-50 p-8 border border-gray-100">
                        <div className="flex items-start space-x-4 mb-6">
                        <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
                            <Shield size={16} strokeWidth={1} className="text-gray-600" />
                        </div>
                        <div>
                            <h4 className="font-light text-lg mb-2">Compromisso de Não Venda</h4>
                            <p className="text-gray-700 font-light">
                            Seus dados pessoais nunca serão vendidos a terceiros. Compartilhamos informações apenas quando
                            necessário para:
                            </p>
                        </div>
                        </div>
                        <div className="space-y-3 ml-12">
                        {[
                            "Parceiros de pagamento certificados e seguros",
                            "Prestadores de serviços essenciais (logística, manutenção)",
                            "Autoridades legais quando exigido por lei",
                            "Empresas do grupo Prestige Motors para serviços integrados",
                        ].map((item, index) => (
                            <div key={index} className="flex items-start text-gray-600 font-light">
                            <span className="text-gray-400 mr-3">—</span>
                            <span>{item}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                    </motion.div>
                </div>
                </motion.div>
            </div>
            </div>
        </section>

        {/* User Rights Section */}
        <section ref={rightsRef} className="py-32 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={rightsIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <motion.div
                initial={{ width: 0 }}
                animate={rightsIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-black mb-8 mx-auto max-w-16"
                />
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">SEUS DIREITOS</h2>
                <motion.div
                initial={{ width: 0 }}
                animate={rightsIsInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-black mt-8 mx-auto max-w-16"
                />
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate={rightsIsInView ? "animate" : "initial"}
                className="grid md:grid-cols-2 gap-8"
            >
                {userRights.map((right, index) => (
                <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="border border-gray-200 p-8 group hover:border-black transition-all duration-300 h-auto"
                    whileHover={{ y: -5 }}
                >
                    <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-black transition-colors duration-300">
                        <right.icon size={24} strokeWidth={1} className="text-gray-600 group-hover:text-black" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-light mb-3 tracking-wide group-hover:text-black transition-colors duration-300">
                        {right.title}
                        </h3>
                        <p className="text-gray-700 font-light leading-relaxed mb-6">{right.description}</p>
                    </div>
                    </div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>

        {/* Contact DPO Section */}
        <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-4">
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
                <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">ENCARREGADO DE DADOS</h2>
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
                className="text-center"
            >
                <p className="text-xl font-light text-gray-700 mb-12 leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato com nosso Encarregado
                de Proteção de Dados:
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <motion.div
                    className="border border-gray-200 p-8 group hover:border-black transition-colors duration-300"
                    whileHover={{ y: -5 }}
                >
                    <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-black transition-colors duration-300">
                    <Mail size={24} strokeWidth={1} className="text-gray-600 group-hover:text-black" />
                    </div>
                    <h3 className="font-light text-lg mb-2">E-mail</h3>
                    <p className="text-gray-700 font-light">dpo@prestigemotors.com</p>
                </motion.div>

                <motion.div
                    className="border border-gray-200 p-8 group hover:border-black transition-colors duration-300"
                    whileHover={{ y: -5 }}
                >
                    <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-black transition-colors duration-300">
                    <Phone size={24} strokeWidth={1} className="text-gray-600 group-hover:text-black" />
                    </div>
                    <h3 className="font-light text-lg mb-2">Telefone</h3>
                    <p className="text-gray-700 font-light">+55 11 3000-0000</p>
                </motion.div>
                </div>

                <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                >
                <div className="border-t border-gray-100 pt-8">
                    <h4 className="font-light text-lg mb-4 tracking-wide">Última Atualização</h4>
                    <p className="text-gray-600 font-light mb-6">15 de Janeiro de 2024</p>
                </div>
                </motion.div>
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
                DÚVIDAS SOBRE PRIVACIDADE?
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
                Nossa equipe de proteção de dados está à disposição para esclarecimentos.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={ctaIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="inline-block"
            >
                <button className="border border-white text-white px-12 py-4 font-light tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center group">
                <span>FALAR COM ESPECIALISTA</span>
                <ArrowRight className="ml-4 transition-transform duration-300 group-hover:translate-x-2" size={20} />
                </button>
            </motion.div>
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
                <div className="text-sm font-light tracking-widest text-gray-400 mb-4">POLÍTICA DE PRIVACIDADE</div>
            </motion.div>
            </div>
        </footer>
        </div>
    )
}
