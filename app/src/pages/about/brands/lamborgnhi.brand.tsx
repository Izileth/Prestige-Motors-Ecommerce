
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

export default function LamborghiniPage() {
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
      year: "1966",
      title: "Miura Revelado",
      description:
        "O Lamborghini Miura, considerado o primeiro verdadeiro supercarro, estabelece um novo padrão para layout de motor central e design deslumbrante.",
    },
    {
      year: "1974",
      title: "Era Countach",
      description:
        "O revolucionário Countach, com sua forma em cunha radical e portas em tesoura, define a estética dos supercarros por décadas.",
    },
    {
      year: "1990",
      title: "Diablo Ascende",
      description:
        "O Diablo assume o lugar do Countach, expandindo os limites de performance com seu potente motor V12 e estilo agressivo.",
    },
    {
      year: "2001",
      title: "Murciélago Decola",
      description:
        "O Murciélago, nomeado em homenagem a um lendário touro de lide, torna-se o modelo V12 principal, incorporando poder bruto e design dramático.",
    },
    {
      year: "2003",
      title: "Reinado do Gallardo",
      description:
        "O Gallardo, primeiro modelo V10 da Lamborghini, torna-se seu carro mais vendido, tornando a marca mais acessível enquanto mantém seu espírito essencial.",
    },
    {
      year: "2018",
      title: "Super SUV Urus",
      description:
        "O Urus, o primeiro Super Sport Utility Vehicle do mundo, combina o DNA de performance da Lamborghini com a versatilidade de um SUV.",
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
            src="https://i.pinimg.com/736x/2e/71/68/2e716836bc2c99fa4d030a77bdd847ed.jpg"
            alt="Lamborghini supercar with aggressive stance"
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
            LAMBORGHINI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-light text-white/80 tracking-widest mb-4"
          >
            LIBERTANDO O TOURO INDOMÁVEL
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm md:text-base font-light text-white/60 tracking-wide max-w-2xl mx-auto"
          >
            Onde a audácia italiana encontra a performance extrema
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">A GÊNESE DA FÚRIA</h2>
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
                A Automobili Lamborghini S.p.A. foi fundada em 1963 por Ferruccio Lamborghini, um bem-sucedido
                fabricante de tratores e queimadores industriais. A lenda diz que uma discussão com Enzo Ferrari sobre a
                qualidade das embreagens da Ferrari levou Ferruccio a declarar que ele mesmo poderia construir um carro
                melhor.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-light">
                Desse desafio audacioso, surgiu uma nova força automotiva, dedicada a criar grand tourers potentes,
                luxuosos e distintamente italianos, estabelecendo o cenário para uma rivalidade lendária e um legado de
                supercarros inovadores.
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
                  <h3 className="text-2xl font-light mb-4 tracking-wide">FERRUCCIO LAMBORGHINI</h3>
                  <div className="w-12 h-px bg-current mb-4" />
                  <p className="leading-relaxed font-light">
                    "Eu queria fazer um carro perfeito, não uma Ferrari perfeita." - O visionário industrial que ousou
                    desafiar a ordem estabelecida e criou uma marca sinônimo de performance extrema e design ousado.
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
              { number: 1963, label: "ANO DE FUNDAÇÃO", suffix: "" },
              { number: 60, label: "ANOS DE INOVAÇÃO", suffix: "+" },
              { number: 350, label: "KM/H VELOCIDADE MÁXIMA", suffix: "+" },
              { number: 14000, label: "GALLARDOS PRODUZIDOS", suffix: "+" },
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">RUGIDOS ICÔNICOS</h2>
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

      {/* Bull Heritage Section */}
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-white mb-4">🐂</h2>
            <h3 className="text-2xl md:text-3xl font-light tracking-widest text-white/80 mb-8">O TOURO INDOMÁVEL</h3>
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
              Cada Lamborghini carrega o nome de touros lendários, simbolizando força, poder e a natureza indomável que
              define a essência da marca.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {["Miura", "Diablo", "Murciélago", "Huracán"].map((bull, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-px bg-white mx-auto mb-4 group-hover:w-24 transition-all duration-300" />
                  <h4 className="text-lg font-light tracking-wide">{bull}</h4>
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
              MOLDANDO O MUNDO DOS SUPERCARROS
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
                title: "Design Revolucionário",
                description:
                  "A Lamborghini tem consistentemente expandido os limites do design automotivo, introduzindo formas radicais e futuristas, além de características icônicas como portas em tesoura. Sua estética ousada influenciou inúmeros designers.",
              },
              {
                title: "Performance Inegociável",
                description:
                  "Desde seus potentes motores V12 até aerodinâmica avançada e materiais leves, a Lamborghini sempre priorizou performance bruta e emocionante. Eles constroem carros que oferecem uma experiência de direção visceral sem paralelos.",
              },
              {
                title: "Iconografia da Marca",
                description:
                  "O emblema do 'Touro Indomável' e os nomes derivados de touros de lide famosos criaram uma identidade de marca poderosa e agressiva que ressoa globalmente, simbolizando força e poder indomável.",
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
            <h2 className="text-4xl md:text-6xl font-thin tracking-wider text-black mb-4">INOVAÇÃO EXTREMA</h2>
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
              A Lamborghini continua a redefinir os limites da performance automotiva, integrando tecnologias
              revolucionárias como hibridização, materiais compostos avançados e aerodinâmica ativa. Cada novo modelo
              representa um salto evolutivo na busca pela perfeição em engenharia e design.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {["Fibra de Carbono", "Aerodinâmica Ativa", "Hibridização"].map((tech, index) => (
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
            <div className="text-2xl font-thin tracking-[0.3em] mb-8">LAMBORGHINI</div>
            <div className="w-16 h-px bg-white mx-auto mb-8" />
            <div className="text-sm font-light tracking-widest text-gray-400 mb-4">LIBERTANDO O TOURO INDOMÁVEL</div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
