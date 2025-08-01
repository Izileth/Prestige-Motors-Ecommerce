
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import {
  ArrowRight,
  FileText,
  Shield,
  Scale,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Mail,
  Phone,
} from "lucide-react"


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

export default function PrestigeTermsPage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const overviewRef = useRef(null)
  const contentRef = useRef(null)
  const ctaRef = useRef(null)

  const heroIsInView = useInView(heroRef, { once: true })
  const overviewIsInView = useInView(overviewRef, { once: true })
  const contentIsInView = useInView(contentRef, { once: true })
  const ctaIsInView = useInView(ctaRef, { once: true })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const [activeSection, setActiveSection] = useState("uso")

  const legalPrinciples = [
    {
      icon: Scale,
      title: "Transparência Legal",
      description: "Todos os termos são apresentados de forma clara e compreensível, sem linguagem jurídica complexa.",
      features: ["Linguagem acessível", "Estrutura organizada", "Exemplos práticos"],
    },
    {
      icon: Shield,
      title: "Proteção Mútua",
      description: "Nossos termos protegem tanto os direitos dos clientes quanto os da Prestige Motors.",
      features: ["Direitos equilibrados", "Responsabilidades claras", "Proteção de dados"],
    },
    {
      icon: CheckCircle,
      title: "Conformidade Total",
      description: "Todos os termos estão em conformidade com a legislação brasileira e internacional.",
      features: ["LGPD compliant", "Código do Consumidor", "Normas internacionais"],
    },
  ]

  const sections = [
    { id: "uso", title: "Termos de Uso", icon: FileText },
    { id: "vendas", title: "Condições de Venda", icon: Scale },
    { id: "privacidade", title: "Política de Privacidade", icon: Shield },
    { id: "garantia", title: "Garantias", icon: CheckCircle },
    { id: "devolucao", title: "Política de Devolução", icon: Clock },
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
            alt="Prestige Motors executive lounge legal"
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
            TERMOS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
          >
            CONDIÇÕES & POLÍTICAS
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
          >
            Conheça os princípios que regem nossa relação com você
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
              { number: 2024, label: "ÚLTIMA ATUALIZAÇÃO", suffix: "" },
              { number: 100, label: "CONFORMIDADE LEGAL", suffix: "%" },
              { number: 7, label: "DIAS ARREPENDIMENTO", suffix: "" },
              { number: 24, label: "SUPORTE JURÍDICO", suffix: "/7" },
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

      {/* Legal Principles Section */}
      <section ref={overviewRef} className="py-32 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={overviewIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={overviewIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-black mb-8 mx-auto max-w-16"
            />
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">NOSSOS PRINCÍPIOS</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={overviewIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-black mt-8 mx-auto max-w-16"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={overviewIsInView ? "animate" : "initial"}
            className="grid md:grid-cols-3 gap-12"
          >
            {legalPrinciples.map((principle, index) => (
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

      {/* Terms Content Section */}
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">TERMOS COMPLETOS</h2>
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
                <h3 className="text-lg font-light mb-8 tracking-wide">Seções</h3>
                <div className="w-12 h-px bg-gray-300 mb-8" />
                <nav className="space-y-6">
                  {sections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center space-x-3 w-full text-left font-light transition-all duration-300 group ${
                        activeSection === section.id
                          ? "text-black border-l-2 border-black pl-4"
                          : "text-gray-500 hover:text-gray-700 pl-4 hover:border-l-2 hover:border-gray-200"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <section.icon
                        size={16}
                        strokeWidth={1}
                        className={`transition-colors duration-300 ${
                          activeSection === section.id ? "text-black" : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      <span>{section.title}</span>
                    </motion.button>
                  ))}
                </nav>

                <motion.div
                  className="mt-12 pt-8 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.button
                    className="flex items-center space-x-2 text-gray-600 font-light text-sm hover:text-black transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <Download size={16} strokeWidth={1} />
                    <span>Baixar PDF</span>
                    <ArrowRight
                      size={14}
                      strokeWidth={1}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={contentIsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Termos de Uso */}
              {activeSection === "uso" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  <div>
                    <h3 className="text-3xl font-thin tracking-wide mb-8">Termos de Uso</h3>
                    <div className="w-16 h-px bg-gray-300 mb-8" />
                    <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
                      Ao acessar e utilizar os serviços da Prestige Motors, você concorda com estes Termos de Uso e se
                      compromete a respeitá-los integralmente.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                      className="border border-gray-100 p-8 group hover:border-gray-200 transition-colors duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="text-xl font-light mb-6 tracking-wide group-hover:text-black transition-colors duration-300">
                        1. Uso Permitido
                      </h4>
                      <div className="space-y-3">
                        {[
                          "Navegação e consulta de veículos",
                          "Solicitação de informações",
                          "Agendamento de test-drives",
                          "Comunicação com nossa equipe",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start text-gray-600 font-light">
                            <CheckCircle size={16} strokeWidth={1} className="text-green-500 mr-3 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="border border-gray-100 p-8 group hover:border-gray-200 transition-colors duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="text-xl font-light mb-6 tracking-wide group-hover:text-black transition-colors duration-300">
                        2. Uso Proibido
                      </h4>
                      <div className="space-y-3">
                        {[
                          "Finalidades ilegais ou não autorizadas",
                          "Violação de direitos de propriedade",
                          "Transmissão de conteúdo malicioso",
                          "Interferência nos sistemas",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start text-gray-600 font-light">
                            <AlertTriangle size={16} strokeWidth={1} className="text-red-500 mr-3 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-gray-50 p-8 border border-gray-100">
                    <h4 className="text-xl font-light mb-6 tracking-wide">Propriedade Intelectual</h4>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Todo o conteúdo, logotipos, imagens e softwares presentes no site são propriedade exclusiva da
                      Prestige Motors ou de seus licenciadores, protegidos por leis de direitos autorais e marcas
                      registradas. É vedada a reprodução, distribuição ou modificação sem autorização expressa.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Condições de Venda */}
              {activeSection === "vendas" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  <div>
                    <h3 className="text-3xl font-thin tracking-wide mb-8">Condições de Venda</h3>
                    <div className="w-16 h-px bg-gray-300 mb-8" />
                    <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
                      Estas condições regulam todas as transações realizadas através da Prestige Motors, garantindo
                      transparência e segurança em todo o processo.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="border-l-2 border-gray-200 pl-8 py-6 hover:border-black transition-colors duration-300">
                      <h4 className="text-xl font-light mb-4 tracking-wide">Processo de Compra</h4>
                      <p className="text-gray-700 font-light leading-relaxed mb-4">
                        A finalização da compra está sujeita às seguintes etapas:
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { step: "1", title: "Disponibilidade", desc: "Verificação do veículo" },
                          { step: "2", title: "Documentação", desc: "Análise de documentos" },
                          { step: "3", title: "Pagamento", desc: "Aprovação financeira" },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="text-center p-4 border border-gray-100 group hover:border-gray-200 transition-colors duration-300"
                            whileHover={{ y: -2 }}
                          >
                            <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:border-black transition-colors duration-300">
                              <span className="text-sm font-light">{item.step}</span>
                            </div>
                            <h5 className="font-light mb-2">{item.title}</h5>
                            <p className="text-sm text-gray-600 font-light">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="border-l-2 border-gray-200 pl-8 py-6 hover:border-black transition-colors duration-300">
                      <h4 className="text-xl font-light mb-4 tracking-wide">Preços e Pagamento</h4>
                      <p className="text-gray-700 font-light leading-relaxed mb-6">
                        Todos os preços são exibidos em Reais (R$) e incluem impostos quando aplicável. Oferecemos
                        diversas modalidades de pagamento para sua conveniência.
                      </p>
                      <div className="bg-gray-50 p-6 border border-gray-100">
                        <h5 className="font-light mb-4">Formas de Pagamento Aceitas:</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Transferência bancária",
                            "Financiamento próprio",
                            "Consórcio contemplado",
                            "Permuta por outro veículo",
                          ].map((payment, index) => (
                            <div key={index} className="flex items-center text-gray-600 font-light">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
                              <span>{payment}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Política de Privacidade */}
              {activeSection === "privacidade" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  <div>
                    <h3 className="text-3xl font-thin tracking-wide mb-8">Política de Privacidade</h3>
                    <div className="w-16 h-px bg-gray-300 mb-8" />
                    <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
                      Sua privacidade é fundamental para nós. Esta política explica como coletamos, utilizamos e
                      protegemos suas informações pessoais.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-8">
                    <div className="flex items-start space-x-4">
                      <Shield size={24} strokeWidth={1} className="text-blue-600 mt-1" />
                      <div>
                        <h4 className="text-xl font-light mb-4 tracking-wide">Compromisso com a LGPD</h4>
                        <p className="text-gray-700 font-light leading-relaxed">
                          Estamos em total conformidade com a Lei Geral de Proteção de Dados (LGPD), garantindo que
                          todos os seus direitos sejam respeitados e que seus dados sejam tratados com máxima segurança
                          e transparência.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h4 className="text-xl font-light tracking-wide">Dados Coletados</h4>
                      <div className="space-y-4">
                        {[
                          { category: "Dados de Contato", items: ["Nome completo", "E-mail", "Telefone"] },
                          {
                            category: "Dados Financeiros",
                            items: ["Informações de pagamento", "Histórico de compras"],
                          },
                          { category: "Dados de Navegação", items: ["Cookies", "Endereço IP", "Páginas visitadas"] },
                        ].map((data, index) => (
                          <motion.div
                            key={index}
                            className="border border-gray-100 p-4 group hover:border-gray-200 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <h5 className="font-light mb-2 group-hover:text-black transition-colors duration-300">
                              {data.category}
                            </h5>
                            <div className="space-y-1">
                              {data.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center text-sm text-gray-600 font-light">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xl font-light tracking-wide">Seus Direitos</h4>
                      <div className="space-y-4">
                        {[
                          "Acessar seus dados pessoais",
                          "Corrigir informações incorretas",
                          "Solicitar exclusão de dados",
                          "Revogar consentimentos",
                          "Portabilidade de dados",
                        ].map((right, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start space-x-3 p-4 border border-gray-100 group hover:border-gray-200 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <CheckCircle size={16} strokeWidth={1} className="text-green-500 mt-0.5" />
                            <span className="text-gray-700 font-light group-hover:text-black transition-colors duration-300">
                              {right}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Garantias */}
              {activeSection === "garantia" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  <div>
                    <h3 className="text-3xl font-thin tracking-wide mb-8">Garantias</h3>
                    <div className="w-16 h-px bg-gray-300 mb-8" />
                    <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
                      Todos os veículos Prestige Motors possuem garantia abrangente, oferecendo tranquilidade e
                      segurança em sua aquisição.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                      className="border border-gray-100 p-8 group hover:border-black transition-colors duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="text-xl font-light mb-6 tracking-wide">Cobertura Completa</h4>
                      <div className="space-y-4">
                        {[
                          { item: "Defeitos de fabricação", period: "24 meses" },
                          { item: "Problemas mecânicos", period: "12 meses" },
                          { item: "Componentes elétricos", period: "18 meses" },
                          { item: "Sistema de freios", period: "24 meses" },
                        ].map((coverage, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-gray-700 font-light">{coverage.item}</span>
                            <span className="text-sm text-gray-500 font-light">{coverage.period}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="border border-gray-100 p-8 group hover:border-black transition-colors duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="text-xl font-light mb-6 tracking-wide">Exclusões</h4>
                      <div className="space-y-3">
                        {[
                          "Desgaste natural de peças",
                          "Danos por uso inadequado",
                          "Modificações não autorizadas",
                          "Acidentes ou colisões",
                        ].map((exclusion, index) => (
                          <div key={index} className="flex items-start text-gray-600 font-light">
                            <AlertTriangle size={16} strokeWidth={1} className="text-orange-500 mr-3 mt-0.5" />
                            <span>{exclusion}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-green-50 border border-green-100 p-8">
                    <h4 className="text-xl font-light mb-4 tracking-wide flex items-center">
                      <CheckCircle size={24} strokeWidth={1} className="text-green-600 mr-3" />
                      Garantia Estendida Disponível
                    </h4>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Oferecemos opções de garantia estendida para maior tranquilidade, com cobertura de até 5 anos ou
                      100.000 km, incluindo assistência 24 horas e carro reserva.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Política de Devolução */}
              {activeSection === "devolucao" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  <div>
                    <h3 className="text-3xl font-thin tracking-wide mb-8">Política de Devolução</h3>
                    <div className="w-16 h-px bg-gray-300 mb-8" />
                    <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
                      Em casos específicos, aceitamos a devolução de veículos conforme as condições estabelecidas pelo
                      Código de Defesa do Consumidor.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-8">
                    <div className="flex items-start space-x-4">
                      <Clock size={24} strokeWidth={1} className="text-blue-600 mt-1" />
                      <div>
                        <h4 className="text-xl font-light mb-4 tracking-wide">Direito de Arrependimento</h4>
                        <p className="text-gray-700 font-light leading-relaxed mb-4">
                          Você tem até <strong>7 dias corridos</strong>, a partir da entrega, para desistir da compra
                          sem necessidade de justificativa, conforme previsto no Código de Defesa do Consumidor.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                          <div>
                            <h5 className="font-light mb-2">Condições para Devolução:</h5>
                            <div className="space-y-2">
                              {[
                                "Veículo em perfeito estado",
                                "Documentação completa",
                                "Quilometragem máxima: 200km",
                              ].map((condition, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600 font-light">
                                  <CheckCircle size={14} strokeWidth={1} className="text-green-500 mr-2" />
                                  <span>{condition}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-light mb-2">Processo de Devolução:</h5>
                            <div className="space-y-2">
                              {["Contato via e-mail/telefone", "Agendamento de vistoria", "Reembolso em 10 dias"].map(
                                (step, index) => (
                                  <div key={index} className="flex items-center text-sm text-gray-600 font-light">
                                    <div className="w-4 h-4 border border-blue-300 rounded-full flex items-center justify-center mr-2">
                                      <span className="text-xs">{index + 1}</span>
                                    </div>
                                    <span>{step}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Last Updated */}
              <motion.div
                className="mt-16 pt-8 border-t border-gray-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 font-light mb-2">Última atualização:</p>
                    <p className="text-gray-700 font-light">15 de Janeiro de 2024</p>
                  </div>
                  <motion.button
                    className="flex items-center space-x-2 text-gray-600 font-light text-sm hover:text-black transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <span>Ver histórico de alterações</span>
                    <ArrowRight
                      size={14}
                      strokeWidth={1}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Support Section */}
      <section className="py-32 bg-gray-50">
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">SUPORTE JURÍDICO</h2>
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
              Nossa equipe jurídica está à disposição para esclarecimentos sobre termos, condições e políticas.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <motion.div
                className="border border-gray-200 p-8 group hover:border-black transition-colors duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-black transition-colors duration-300">
                  <Mail size={24} strokeWidth={1} className="text-gray-600 group-hover:text-black" />
                </div>
                <h3 className="font-light text-lg mb-2">E-mail Jurídico</h3>
                <p className="text-gray-700 font-light">juridico@prestigemotors.com</p>
              </motion.div>

              <motion.div
                className="border border-gray-200 p-8 group hover:border-black transition-colors duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-black transition-colors duration-300">
                  <Phone size={24} strokeWidth={1} className="text-gray-600 group-hover:text-black" />
                </div>
                <h3 className="font-light text-lg mb-2">Telefone</h3>
                <p className="text-gray-700 font-light">+55 11 3000-0001</p>
              </motion.div>
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-white mb-4">AINDA COM DÚVIDAS?</h2>
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
            Nossa equipe jurídica está à disposição para esclarecimentos sobre todos os aspectos legais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <button className="border border-white text-white px-12 py-4 font-light tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center group">
              <span>CONTATAR JURÍDICO</span>
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
            <div className="text-sm font-light tracking-widest text-gray-400 mb-4">TERMOS & CONDIÇÕES</div>
    
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
