
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ArrowRight, Trophy, Shield, Heart, Star, Users, Award } from "lucide-react"

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

export default function PrestigeMissionPage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const missionRef = useRef(null)
  const pillarsRef = useRef(null)
  const differentiatorsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroIsInView = useInView(heroRef, { once: true })
  const missionIsInView = useInView(missionRef, { once: true })
  const pillarsIsInView = useInView(pillarsRef, { once: true })
  const differentiatorsIsInView = useInView(differentiatorsRef, { once: true })
  const ctaIsInView = useInView(ctaRef, { once: true })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const pillars = [
    {
      icon: Trophy,
      title: "Excelência Inigualável",
      description:
        "Buscamos a perfeição em cada detalhe, desde a seleção dos veículos até o pós-venda. Nossos padrões superam as expectativas do mercado.",
    },
    {
      icon: Shield,
      title: "Integridade Absoluta",
      description:
        "Agimos com transparência e ética em todas as transações. Cada informação compartilhada é verificada e cada promessa é cumprida.",
    },
    {
      icon: Heart,
      title: "Paixão Automotiva",
      description:
        "Nossa equipe é formada por verdadeiros entusiastas que compartilham o mesmo amor por automóveis excepcionais que nossos clientes.",
    },
  ]

  const differentiators = [
    {
      title: "Seleção Curada",
      description:
        "Cada veículo em nosso portfólio passa por um rigoroso processo de seleção. Trabalhamos apenas com os melhores exemplares, verificando minuciosamente sua procedência, histórico de manutenção e condições.",
      features: [
        "Inspeção técnica de 212 pontos",
        "Verificação completa de histórico",
        "Avaliação por especialistas independentes",
      ],
      image:
        "https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/80c9257f-e41e-436f-9a80-8d50893c6d22/Leonardo_Kino_XL_Photorealistic_image_capturing_an_exclusive_P_1.jpg",
    },
    {
      title: "Experiência Personalizada",
      description:
        "Entendemos que cada cliente é único. Nossos consultores especializados dedicam tempo para compreender suas necessidades e preferências, oferecendo soluções sob medida.",
      features: ["Consultoria individualizada", "Test-drives em locais exclusivos", "Programa de entrega premium"],
      image:
        "https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/6c3d4134-b64b-4de3-89bf-32f2ecb862bb/Leonardo_Kino_XL_Photorealistic_image_capturing_an_exclusive_P_1.jpg",
    },
    {
      title: "Compromisso Pós-Venda",
      description:
        "Nosso relacionamento não termina na entrega das chaves. Oferecemos um programa completo de pós-venda para garantir que sua experiência com o veículo seja tão extraordinária quanto o processo de aquisição.",
      features: ["Assistência 24/7", "Programa de manutenção preferencial", "Eventos exclusivos para clientes"],
      image:
        "https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/69533692-5801-4ec0-9617-369725398cdc/Leonardo_Kino_XL_Stylized_image_of_the_Prestige_Motors_custome_3.jpg",
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
            src="https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/80c9257f-e41e-436f-9a80-8d50893c6d22/Leonardo_Kino_XL_Photorealistic_image_capturing_an_exclusive_P_2.jpg"
            alt="Prestige Motors luxury experience"
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
            MISSÃO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
          >
            NOSSA RAZÃO DE EXISTIR
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
          >
            Redefinindo padrões no universo automotivo de luxo
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
              { number: 98, label: "SATISFAÇÃO DO CLIENTE", suffix: "%" },
              { number: 212, label: "PONTOS DE INSPEÇÃO", suffix: "" },
              { number: 24, label: "ASSISTÊNCIA DISPONÍVEL", suffix: "/7" },
              { number: 100, label: "TRANSPARÊNCIA", suffix: "%" },
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

      {/* Mission Statement Section */}
      <section ref={missionRef} className="py-32 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={missionIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={missionIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-black mb-8 mx-auto max-w-16"
            />
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">NOSSA DECLARAÇÃO</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={missionIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-black mt-8 mx-auto max-w-16"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <motion.blockquote
              className="text-2xl md:text-3xl font-light text-center text-gray-800 mb-12 italic leading-relaxed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={missionIsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              "Na Prestige Motors, nossa missão é transcender as expectativas no mercado de veículos de luxo, oferecendo
              uma experiência de compra tão excepcional quanto os automóveis que representamos."
            </motion.blockquote>

            <motion.div
              initial={{ width: 0 }}
              animate={missionIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="w-24 h-px bg-gray-300 mx-auto mb-12"
            />

            <motion.p
              className="text-lg leading-relaxed text-gray-700 font-light text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={missionIsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Acreditamos que adquirir um veículo de luxo deve ser uma jornada memorável, repleta de descobertas e
              prazer. Nosso compromisso vai além da transação - cultivamos relacionamentos duradouros, oferecendo
              assessoria especializada, transparência absoluta e serviços personalizados que atendem às necessidades dos
              clientes mais exigentes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section ref={pillarsRef} className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={pillarsIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={pillarsIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-black mb-8 mx-auto max-w-16"
            />
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">PILARES DA PRESTIGE</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={pillarsIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-black mt-8 mx-auto max-w-16"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={pillarsIsInView ? "animate" : "initial"}
            className="grid md:grid-cols-3 gap-12"
          >
            {pillars.map((pillar, index) => (
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
                  <pillar.icon size={32} strokeWidth={1} className="text-gray-700 group-hover:text-black" />
                </motion.div>
                <h3 className="text-2xl font-light mb-6 tracking-wide">{pillar.title}</h3>
                <div className="w-12 h-px bg-gray-300 mx-auto mb-6 group-hover:w-24 group-hover:bg-black transition-all duration-300" />
                <p className="text-lg leading-relaxed text-gray-700 font-light">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section ref={differentiatorsRef} className="py-32 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={differentiatorsIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={differentiatorsIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-black mb-8 mx-auto max-w-16"
            />
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">O QUE NOS DIFERENCIA</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={differentiatorsIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-black mt-8 mx-auto max-w-16"
            />
          </motion.div>

          <div className="space-y-32">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`grid md:grid-cols-5 gap-16 items-center ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}
              >
                <motion.div
                  className={`md:col-span-2 relative group ${index % 2 === 1 ? "md:col-start-4" : ""}`}
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
                  className={`md:col-span-3 ${index % 2 === 1 ? "md:col-start-1" : ""}`}
                >
                  <div className="w-12 h-px bg-black mb-6" />
                  <h3 className="text-3xl font-light mb-6 tracking-wide">{item.title}</h3>
                  <p className="text-lg leading-relaxed text-gray-700 font-light mb-8">{item.description}</p>
                  <ul className="space-y-4">
                    {item.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start text-gray-600 font-light"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      >
                        <span className="text-gray-400 mr-4 mt-1">—</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence Commitment Section */}
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-white mb-4">
              COMPROMISSO COM A EXCELÊNCIA
            </h2>
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
              Cada decisão que tomamos, cada processo que implementamos e cada relacionamento que construímos é guiado
              por nosso compromisso inabalável com a excelência.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: Star, label: "Qualidade Premium" },
                { icon: Users, label: "Atendimento Personalizado" },
                { icon: Award, label: "Reconhecimento de Mercado" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 border border-white/30 rounded-full mb-4 group-hover:border-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.icon size={24} strokeWidth={1} className="text-white/70 group-hover:text-white" />
                  </motion.div>
                  <div className="w-16 h-px bg-white/30 mx-auto mb-4 group-hover:w-24 group-hover:bg-white transition-all duration-300" />
                  <h4 className="text-lg font-light tracking-wide">{item.label}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 bg-white">
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
              className="h-px bg-black mb-8 mx-auto max-w-16"
            />
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">CONHEÇA NOSSA EQUIPE</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={ctaIsInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-black mt-8 mx-auto max-w-16"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={ctaIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 mb-12 max-w-2xl mx-auto"
          >
            Por trás da Prestige Motors está um time de especialistas apaixonados por automóveis e comprometidos com a
            excelência.
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
            <div className="text-sm font-light tracking-widest text-gray-400 mb-4">NOSSA RAZÃO DE EXISTIR</div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
