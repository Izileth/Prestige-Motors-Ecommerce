import type React from "react"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Mail, Check, ArrowRight, Activity, Clock, Sparkles, Users, Bell, Gift, Crown } from "lucide-react"

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

export default function PrestigeNewsletterPage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const subscriptionRef = useRef(null)
  const benefitsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroIsInView = useInView(heroRef, { once: true })
  const subscriptionIsInView = useInView(subscriptionRef, { once: true })
  const benefitsIsInView = useInView(benefitsRef, { once: true })
  const ctaIsInView = useInView(ctaRef, { once: true })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulation of submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
    }, 1500)
  }

  const benefits = [
    {
      icon: Activity,
      title: "Acesso Antecipado",
      description: "Seja o primeiro a conhecer novos lançamentos e veículos exclusivos antes do público geral.",
    },
    {
      icon: Clock,
      title: "Eventos VIP",
      description: "Convites para test-drives exclusivos, lançamentos privativos e experiências premium.",
    },
    {
      icon: Sparkles,
      title: "Ofertas Personalizadas",
      description: "Descontos e condições especiais disponíveis apenas para assinantes.",
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
            src="https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/8dbcab80-6ad5-43a7-95be-d083de93f4f3/Leonardo_Kino_XL_Interior_image_of_the_executive_lounge_at_Pre_2.jpg"
            alt="Prestige Motors executive lounge"
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
            NEWSLETTER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
          >
            EXCLUSIVA PRESTIGE
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
          >
            Receba lançamentos, eventos VIP e ofertas personalizadas
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
              { number: 15000, label: "ASSINANTES VIP", suffix: "+" },
              { number: 52, label: "NEWSLETTERS POR ANO", suffix: "" },
              { number: 95, label: "TAXA DE ABERTURA", suffix: "%" },
              { number: 48, label: "HORAS ANTECIPAÇÃO", suffix: "h" },
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

      {/* Subscription Section */}
      <section ref={subscriptionRef} className="py-32 px-4 md:px-6 bg-white" id="newsletter-form">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={subscriptionIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={subscriptionIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-black mb-8 mx-auto max-w-16"
            />
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">
              {!isSubscribed ? "INSCREVA-SE AGORA" : "BEM-VINDO AO CLUBE"}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={subscriptionIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-black mt-8 mx-auto max-w-16"
            />
          </motion.div>

          {!isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={subscriptionIsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <motion.p
                className="text-xl font-light text-center text-gray-700 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={subscriptionIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Mantenha-se atualizado com os veículos mais exclusivos, eventos privativos e ofertas especiais
                disponíveis apenas para assinantes da Prestige Motors.
              </motion.p>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={subscriptionIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail size={20} strokeWidth={1} />
                  </motion.div>
                  <input
                    type="email"
                    placeholder="Seu endereço de e-mail"
                    className="w-full pl-14 pr-6 py-4 border border-gray-200 focus:outline-none focus:border-black transition-all duration-300 bg-transparent font-light text-lg tracking-wide"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full border border-black bg-black text-white py-4 font-light tracking-widest hover:bg-transparent hover:text-black transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <span>ASSINAR NEWSLETTER</span>
                      <ArrowRight
                        className="ml-3 transition-transform duration-300 group-hover:translate-x-2"
                        size={20}
                      />
                    </>
                  )}
                </motion.button>
              </motion.form>

              <motion.p
                className="text-sm text-gray-500 text-center mt-6 font-light"
                initial={{ opacity: 0 }}
                animate={subscriptionIsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Ao se inscrever, você concorda em receber comunicações da Prestige Motors. Cancele a qualquer momento.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 border border-black rounded-full mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Check size={32} strokeWidth={1} className="text-black" />
              </motion.div>

              <h3 className="text-3xl font-light mb-6 tracking-wide">Inscrição Confirmada</h3>
              <div className="w-16 h-px bg-black mx-auto mb-8" />
              <p className="text-lg text-gray-700 mb-8 font-light leading-relaxed">
                Obrigado por se juntar ao seleto grupo de assinantes da{" "}
                <span className="font-normal">Prestige Motors</span>. Você receberá nossas atualizações exclusivas em
                primeira mão.
              </p>

              <motion.a
                href="/"
                className="inline-block border border-black text-black px-12 py-4 font-light tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                VOLTAR À PÁGINA INICIAL
              </motion.a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={benefitsIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={benefitsIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-black mb-8 mx-auto max-w-16"
            />
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">BENEFÍCIOS EXCLUSIVOS</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={benefitsIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-black mt-8 mx-auto max-w-16"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={benefitsIsInView ? "animate" : "initial"}
            className="grid md:grid-cols-3 gap-12"
          >
            {benefits.map((benefit, index) => (
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
                  <benefit.icon size={32} strokeWidth={1} className="text-gray-700 group-hover:text-black" />
                </motion.div>
                <h3 className="text-2xl font-light mb-6 tracking-wide">{benefit.title}</h3>
                <div className="w-12 h-px bg-gray-300 mx-auto mb-6 group-hover:w-24 group-hover:bg-black transition-all duration-300" />
                <p className="text-lg leading-relaxed text-gray-700 font-light">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium Features Section */}
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">EXPERIÊNCIA VIP</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-black mt-8 mx-auto max-w-16"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                {[
                  { icon: Users, title: "Comunidade Exclusiva", desc: "Acesso a grupo privado de colecionadores" },
                  { icon: Bell, title: "Alertas Personalizados", desc: "Notificações sobre veículos do seu interesse" },
                  { icon: Gift, title: "Ofertas Especiais", desc: "Descontos e condições preferenciais" },
                  { icon: Crown, title: "Atendimento Premium", desc: "Suporte dedicado e consultoria especializada" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-black transition-colors duration-300">
                      <feature.icon size={20} strokeWidth={1} className="text-gray-600 group-hover:text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-light mb-2 tracking-wide">{feature.title}</h4>
                      <p className="text-gray-600 font-light">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gray-100 border border-gray-200 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Mail size={24} strokeWidth={1} className="text-gray-600" />
                    </div>
                    <p className="text-gray-600 font-light">Newsletter Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              NÃO PERCA NENHUMA NOVIDADE
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
            Inscreva-se agora e faça parte do seleto grupo Prestige Motors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <a
              href="#newsletter-form"
              className="border border-white text-white px-12 py-4 font-light tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center group"
            >
              <span>ASSINAR NEWSLETTER</span>
              <ArrowRight className="ml-4 transition-transform duration-300 group-hover:translate-x-2" size={20} />
            </a>
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
            <div className="text-sm font-light tracking-widest text-gray-400 mb-4">NEWSLETTER EXCLUSIVA</div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
