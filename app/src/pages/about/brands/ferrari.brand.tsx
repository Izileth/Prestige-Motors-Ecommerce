
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

export default function FerrariPage() {
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
      year: "1947",
      title: "Primeira Ferrari",
      description:
        "O 125 S, primeiro carro da Ferrari, estreou com um motor V12 1.5L, estabelecendo as bases do lendário som e desempenho Ferrari.",
    },
    {
      year: "1962",
      title: "250 GTO",
      description:
        "Lançamento do icônico 250 GTO, hoje considerado um dos carros mais valiosos e bonitos já fabricados, com apenas 36 unidades produzidas.",
    },
    {
      year: "1975",
      title: "Primeiro Campeonato Mundial",
      description:
        "Niki Lauda venceu o primeiro Campeonato Mundial de Pilotos da Ferrari na Fórmula 1, iniciando uma era de domínio que continua até hoje.",
    },
    {
      year: "1987",
      title: "Supercarro F40",
      description:
        "Introdução do F40, o último carro pessoalmente aprovado por Enzo Ferrari, celebrando os 40 anos da empresa com capacidade de mais de 320 km/h.",
    },
    {
      year: "2002",
      title: "Hypercar Enzo",
      description:
        "Lançamento do Enzo, um hypercar inspirado na Fórmula 1 limitado a 400 unidades, mostrando a tecnologia mais avançada da Ferrari.",
    },
    {
      year: "2013",
      title: "Híbrido LaFerrari",
      description:
        "Estreia do LaFerrari, primeiro hypercar híbrido da Ferrari, combinando motor V12 com motores elétricos para performance sem precedentes.",
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
            src="https://i.pinimg.com/736x/aa/26/1d/aa261d416a379b4f91d7acc50b00cf37.jpg"
            alt="Ferrari supercar on racing track"
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
            FERRARI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
          >
            O LEGADO DO CAVALO EMPINADO
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
          >
            Onde a paixão italiana encontra a perfeição em engenharia
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">NASCIDA DA PAIXÃO</h2>
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
                Fundada em 1939 por Enzo Ferrari em Maranello, Itália, a Ferrari começou como Auto Avio Costruzioni
                antes de se tornar a Scuderia Ferrari. A visão de Enzo era singular: criar os carros de corrida mais
                bonitos e velozes do mundo.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-light">
                O que começou como uma equipe de corrida evoluiu para a marca automotiva mais prestigiada da história,
                onde cada carro incorpora a fusão perfeita entre arte italiana, tecnologia de ponta e paixão desenfreada
                por velocidade.
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
                  <h3 className="text-2xl font-light mb-4 tracking-wide">ENZO FERRARI</h3>
                  <div className="w-12 h-px bg-current mb-4" />
                  <p className="leading-relaxed font-light">
                    "Eu não vendo carros; eu vendo sonhos." - O visionário que transformou sua paixão por corridas na
                    marca automotiva mais cobiçada do mundo, criando máquinas que transcendem o mero transporte.
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
              { number: 1939, label: "ANO DE FUNDAÇÃO", suffix: "" },
              { number: 16, label: "TÍTULOS DE CONSTRUTORES F1", suffix: "" },
              { number: 240, label: "VITÓRIAS EM F1", suffix: "+" },
              { number: 36, label: "UNIDADES DO 250 GTO", suffix: "" },
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">MOMENTOS LENDÁRIOS</h2>
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

      {/* Racing Heritage Section */}
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-white mb-4">SCUDERIA FERRARI</h2>
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
              A equipe mais antiga e bem-sucedida da Fórmula 1, onde cada vitória nas pistas se traduz em inovação
              tecnológica para os carros de rua.
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">DEFININDO EXCELÊNCIA</h2>
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
                title: "DNA das Corridas",
                description:
                  "O legado da Ferrari na Fórmula 1 produziu 16 Campeonatos de Construtores e inúmeras inovações tecnológicas que são transferidas para os carros de rua. Cada Ferrari incorpora décadas de expertise em corridas.",
              },
              {
                title: "Arte Automotiva",
                description:
                  "A Ferrari redefiniu o design automotivo, colaborando com lendários designers como a Pininfarina para criar carros que são tanto esculturas quanto máquinas. A marca influenciou a estética automotiva por mais de sete décadas.",
              },
              {
                title: "Exclusividade & Prestígio",
                description:
                  "Mantendo produção limitada e qualidade inegociável, a Ferrari criou a marca automotiva de luxo definitiva. Possuir uma Ferrari representa a admissão em um clube exclusivo de entusiastas e colecionadores.",
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

      {/* Italian Craftsmanship Section */}
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">ARTIGIANATO ITALIANO</h2>
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
              Cada Ferrari é uma obra-prima artesanal, onde tradição italiana e inovação tecnológica se encontram em
              perfeita harmonia. Em Maranello, mestres artesãos dedicam centenas de horas para criar máquinas que
              transcendem o conceito de automóvel, tornando-se símbolos eternos de paixão e excelência.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {["Maranello", "Pininfarina", "V12"].map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-px bg-black mx-auto mb-4 group-hover:w-24 transition-all duration-300" />
                  <h4 className="text-xl font-light tracking-wide">{element}</h4>
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
            <div className="text-2xl font-thin tracking-[0.3em] mb-8">FERRARI</div>
            <div className="w-16 h-px bg-white mx-auto mb-8" />
            <div className="text-sm font-light tracking-widest text-gray-400 mb-4">O LEGADO DO CAVALO EMPINADO</div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
