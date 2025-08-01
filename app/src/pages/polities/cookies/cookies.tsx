
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Cookie, Settings, Shield, ArrowRight, Eye, Lock, Users, CheckCircle, AlertCircle, Info } from "lucide-react"

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

export default function PrestigeCookiePolicyPage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const tabsRef = useRef(null)
  const contentRef = useRef(null)
  const ctaRef = useRef(null)

  const heroIsInView = useInView(heroRef, { once: true })
  const tabsIsInView = useInView(tabsRef, { once: true })
  const contentIsInView = useInView(contentRef, { once: true })
  const ctaIsInView = useInView(ctaRef, { once: true })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const [activeTab, setActiveTab] = useState<"essenciais" | "analytics" | "marketing">("essenciais")
  const [cookieConsent, setCookieConsent] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  })
  const [isSettingsSaved, setIsSettingsSaved] = useState(false)

  const handleConsentChange = (type: keyof typeof cookieConsent) => {
    setCookieConsent((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleSaveSettings = () => {
    setIsSettingsSaved(true)
    setTimeout(() => setIsSettingsSaved(false), 3000)
  }

  const cookieTypes = [
    {
      id: "essenciais" as const,
      icon: Shield,
      title: "Cookies Essenciais",
      description: "Necessários para funcionamento básico",
      required: true,
    },
    {
      id: "analytics" as const,
      icon: Settings,
      title: "Cookies de Analytics",
      description: "Análise de performance e uso",
      required: false,
    },
    {
      id: "marketing" as const,
      icon: Cookie,
      title: "Cookies de Marketing",
      description: "Personalização e publicidade",
      required: false,
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
            COOKIES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
          >
            POLÍTICA DE PRIVACIDADE
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
          >
            Transparência no uso de tecnologias para melhorar sua experiência
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
              { number: 100, label: "TRANSPARÊNCIA", suffix: "%" },
              { number: 3, label: "TIPOS DE COOKIES", suffix: "" },
              { number: 12, label: "MESES MÁXIMO", suffix: "" },
              { number: 24, label: "CONTROLE TOTAL", suffix: "/7" },
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

      {/* Cookie Types Navigation */}
      <section ref={tabsRef} className="py-8 border-b border-gray-100 sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tabsIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="flex overflow-x-auto scrollbar-hide space-x-8">
              {cookieTypes.map((type, index) => (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center px-8 py-4 whitespace-nowrap font-light text-sm transition-all duration-300 border-b-2 ${
                    activeTab === type.id
                      ? "text-black border-black"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-200"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <type.icon size={18} className="mr-3" strokeWidth={1} />
                  <div className="text-left">
                    <div className="tracking-wide">{type.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{type.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Content */}
      <section ref={contentRef} className="py-32 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Main Content */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={contentIsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {activeTab === "essenciais" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center">
                      <Shield size={24} strokeWidth={1} className="text-gray-700" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-thin tracking-wide">Cookies Essenciais</h2>
                      <div className="w-16 h-px bg-gray-300 mt-2" />
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 font-light leading-relaxed">
                    Esses cookies são necessários para o funcionamento básico do site e não podem ser desativados. Eles
                    garantem funcionalidades fundamentais como:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: Lock, title: "Segurança e prevenção de fraudes" },
                      { icon: Users, title: "Manutenção de sessão do usuário" },
                      { icon: Settings, title: "Carregamento balanceado do servidor" },
                      { icon: CheckCircle, title: "Preferências de consentimento" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3 p-4 border border-gray-100 group hover:border-gray-200 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-black transition-colors duration-300">
                          <item.icon size={16} strokeWidth={1} className="text-gray-600 group-hover:text-black" />
                        </div>
                        <span className="font-light text-gray-700 group-hover:text-black transition-colors duration-300">
                          {item.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-8 mt-12">
                    <h3 className="text-xl font-light mb-6 tracking-wide flex items-center">
                      <Info size={20} className="mr-3 text-gray-600" strokeWidth={1} />
                      Exemplo de Uso
                    </h3>
                    <div className="bg-gray-50 p-6 border border-gray-100">
                      <p className="text-gray-700 font-light leading-relaxed">
                        Quando você adiciona um veículo à sua lista de favoritos, utilizamos cookies essenciais para
                        manter essa informação durante sua navegação, garantindo que suas preferências sejam preservadas
                        enquanto explora nosso catálogo.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "analytics" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center">
                      <Settings size={24} strokeWidth={1} className="text-gray-700" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-thin tracking-wide">Cookies de Analytics</h2>
                      <div className="w-16 h-px bg-gray-300 mt-2" />
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 font-light leading-relaxed">
                    Esses cookies nos ajudam a entender como os visitantes interagem com nosso site, fornecendo
                    informações valiosas sobre:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: Eye, title: "Páginas mais visitadas" },
                      { icon: ArrowRight, title: "Padrões de navegação" },
                      { icon: Settings, title: "Desempenho de carregamento" },
                      { icon: AlertCircle, title: "Possíveis erros encontrados" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3 p-4 border border-gray-100 group hover:border-gray-200 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-black transition-colors duration-300">
                          <item.icon size={16} strokeWidth={1} className="text-gray-600 group-hover:text-black" />
                        </div>
                        <span className="font-light text-gray-700 group-hover:text-black transition-colors duration-300">
                          {item.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-8 mt-12">
                    <h3 className="text-xl font-light mb-6 tracking-wide flex items-center">
                      <Info size={20} className="mr-3 text-gray-600" strokeWidth={1} />
                      Como Utilizamos Esses Dados
                    </h3>
                    <div className="bg-gray-50 p-6 border border-gray-100">
                      <p className="text-gray-700 font-light leading-relaxed">
                        As informações são agregadas e anônimas, nos permitindo melhorar a organização do conteúdo, a
                        performance técnica do site e oferecer uma experiência mais fluida e personalizada para nossos
                        visitantes.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "marketing" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center">
                      <Cookie size={24} strokeWidth={1} className="text-gray-700" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-thin tracking-wide">Cookies de Marketing</h2>
                      <div className="w-16 h-px bg-gray-300 mt-2" />
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 font-light leading-relaxed">
                    Esses cookies são usados para personalizar anúncios e conteúdo de acordo com seus interesses, tanto
                    em nosso site como em outras plataformas:
                  </p>

                  <div className="space-y-4">
                    {[
                      "Exibição de veículos alinhados ao seu perfil",
                      "Limitação da frequência de anúncios",
                      "Medição da eficácia de campanhas",
                      "Personalização de ofertas especiais",
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3 p-4 border border-gray-100 group hover:border-gray-200 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 group-hover:bg-black transition-colors duration-300" />
                        <span className="font-light text-gray-700 group-hover:text-black transition-colors duration-300">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-8 mt-12">
                    <h3 className="text-xl font-light mb-6 tracking-wide flex items-center">
                      <Info size={20} className="mr-3 text-gray-600" strokeWidth={1} />
                      Controle Personalizado
                    </h3>
                    <div className="bg-gray-50 p-6 border border-gray-100">
                      <p className="text-gray-700 font-light leading-relaxed">
                        Você pode ajustar essas preferências a qualquer momento através do nosso Painel de Privacidade,
                        mantendo controle total sobre sua experiência de navegação.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Consent Manager */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={contentIsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="border border-gray-200 p-8 sticky top-32">
                <h3 className="text-xl font-light mb-8 tracking-wide flex items-center">
                  <Settings className="mr-3" size={20} strokeWidth={1} />
                  Gerenciar Preferências
                </h3>
                <div className="w-16 h-px bg-gray-300 mb-8" />

                <div className="space-y-8">
                  {/* Essential Cookies */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-light text-lg">Essenciais</h4>
                      <p className="text-sm text-gray-500 font-light mt-1">Sempre ativos</p>
                    </div>
                    <div className="text-gray-400">
                      <Shield size={20} strokeWidth={1} />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="border-t border-gray-100 pt-8">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <h4 className="font-light text-lg group-hover:text-black transition-colors duration-300">
                          Analytics
                        </h4>
                        <p className="text-sm text-gray-500 font-light mt-1">Melhorar nosso site</p>
                      </div>
                      <motion.div
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                          cookieConsent.analytics ? "bg-black" : "bg-gray-200"
                        }`}
                        onClick={() => handleConsentChange("analytics")}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300"
                          animate={{
                            x: cookieConsent.analytics ? 24 : 2,
                          }}
                        />
                      </motion.div>
                    </label>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="border-t border-gray-100 pt-8">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <h4 className="font-light text-lg group-hover:text-black transition-colors duration-300">
                          Marketing
                        </h4>
                        <p className="text-sm text-gray-500 font-light mt-1">Conteúdo personalizado</p>
                      </div>
                      <motion.div
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                          cookieConsent.marketing ? "bg-black" : "bg-gray-200"
                        }`}
                        onClick={() => handleConsentChange("marketing")}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300"
                          animate={{
                            x: cookieConsent.marketing ? 24 : 2,
                          }}
                        />
                      </motion.div>
                    </label>
                  </div>
                </div>

                <motion.button
                  className="mt-12 w-full border border-black text-black px-6 py-4 font-light tracking-widest hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group"
                  onClick={handleSaveSettings}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSettingsSaved ? (
                    <>
                      <CheckCircle size={18} className="mr-2" strokeWidth={1} />
                      <span>CONFIGURAÇÕES SALVAS</span>
                    </>
                  ) : (
                    <>
                      <span>SALVAR CONFIGURAÇÕES</span>
                      <ArrowRight
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        size={18}
                        strokeWidth={1}
                      />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="py-32 bg-gray-50">
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">DETALHES TÉCNICOS</h2>
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
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-light mb-8 tracking-wide text-center">Tempo de Armazenamento</h3>
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-12 text-center">
              Os cookies podem ser armazenados por períodos variados, dependendo de sua função:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-6 font-light text-black tracking-wide text-left">Tipo</th>
                    <th className="pb-6 font-light text-black tracking-wide text-left">Duração</th>
                    <th className="pb-6 font-light text-black tracking-wide text-left">Fornecedor</th>
                    <th className="pb-6 font-light text-black tracking-wide text-left">Finalidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      type: "Sessão",
                      duration: "Enquanto o navegador estiver aberto",
                      provider: "Prestige Motors",
                      purpose: "Funcionalidade básica",
                    },
                    {
                      type: "Persistentes",
                      duration: "Até 12 meses",
                      provider: "Google Analytics",
                      purpose: "Análise de uso",
                    },
                    {
                      type: "Publicitários",
                      duration: "Até 6 meses",
                      provider: "Meta Pixel",
                      purpose: "Personalização",
                    },
                  ].map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group hover:bg-gray-50 transition-colors duration-300"
                    >
                      <td className="py-6 font-light text-gray-700 group-hover:text-black transition-colors duration-300">
                        {row.type}
                      </td>
                      <td className="py-6 font-light text-gray-700 group-hover:text-black transition-colors duration-300">
                        {row.duration}
                      </td>
                      <td className="py-6 font-light text-gray-700 group-hover:text-black transition-colors duration-300">
                        {row.provider}
                      </td>
                      <td className="py-6 font-light text-gray-700 group-hover:text-black transition-colors duration-300">
                        {row.purpose}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-white mb-4">DÚVIDAS SOBRE COOKIES?</h2>
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
            <div className="text-sm font-light tracking-widest text-gray-400 mb-4">POLÍTICA DE COOKIES</div>          </motion.div>
        </div>
      </footer>
    </div>
  )
}