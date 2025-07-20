
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LamborghiniPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-50 font-sans antialiased overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-800 via-zinc-900 to-black">
        <motion.div style={{ y: scrollY * 0.5 }} className="absolute inset-0 z-0">
          <img
            src="https://i.pinimg.com/736x/2e/71/68/2e716836bc2c99fa4d030a77bdd847ed.jpg"
            alt="Lamborghini supercar with aggressive stance"
            className="opacity-40 grayscale w-full h-full object-cover object-center bg-fixed"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-4 py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className=" backdrop-blur-md rounded-3xl p-12 shadow-2xl "
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-gray-50 drop-shadow-2xl mb-6"
            >
              Lamborghini
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-3xl font-light text-gray-200 tracking-wide mb-8"
            >
              Unleashing the Raging Bull
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1 bg-gradient-to-r from-zinc-600 via-zinc-950 to-zinc-800 mx-auto rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* History Section */}
      <section className="py-24 px-4 md:px-6 lg:py-32 bg-white text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-6xl font-bold tracking-tight text-center mb-16 text-gray-900 relative"
          >
            The Genesis of Fury
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 bg-gray-800 rounded-full"
            />
          </motion.h3>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp} className="space-y-8">
              <motion.p variants={fadeInUp} className="text-xl leading-relaxed">
                Automobili Lamborghini S.p.A. was founded in 1963 by Ferruccio Lamborghini, a successful manufacturer of
                tractors and industrial burners. Legend has it, a dispute with Enzo Ferrari over the quality of
                Ferrari's clutches led Ferruccio to declare he could build a better car himself.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-xl leading-relaxed">
                From this audacious challenge, a new automotive force emerged, dedicated to creating grand touring cars
                that were powerful, luxurious, and distinctively Italian, setting the stage for a legendary rivalry and
                a legacy of groundbreaking supercars.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 p-10 rounded-3xl shadow-xl"
            >
              <h4 className="text-3xl font-semibold mb-6 text-gray-900">Ferruccio Lamborghini</h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                "I wanted to make a perfect car, not a perfect Ferrari." - The visionary industrialist who dared to
                challenge the established order and created a brand synonymous with extreme performance and bold design.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Milestones Section */}
      <section className="py-24 px-4 md:px-6 lg:py-32 bg-zinc-900 text-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900" />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-6xl font-bold tracking-tight text-center mb-20 text-gray-50 relative"
          >
            Iconic Roars
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 bg-gray-400 rounded-full"
            />
          </motion.h3>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                year: "1966",
                title: "Miura Unleashed",
                description:
                  "The Lamborghini Miura, often considered the first true supercar, sets a new standard for mid-engine layout and breathtaking design.",
              },
              {
                year: "1974",
                title: "Countach Era",
                description:
                  "The revolutionary Countach, with its radical wedge shape and scissor doors, defines the supercar aesthetic for decades to come.",
              },
              {
                year: "1990",
                title: "Diablo Ascends",
                description:
                  "The Diablo takes the reins from the Countach, pushing performance boundaries with its powerful V12 engine and aggressive styling.",
              },
              {
                year: "2001",
                title: "Murciélago Takes Flight",
                description:
                  "The Murciélago, named after a legendary fighting bull, becomes the flagship V12 model, embodying raw power and dramatic design.",
              },
              {
                year: "2003",
                title: "Gallardo's Reign",
                description:
                  "The Gallardo, Lamborghini's first V10 model, becomes its best-selling car, making the brand more accessible while retaining its core spirit.",
              },
              {
                year: "2018",
                title: "Urus Super SUV",
                description:
                  "The Urus, the world's first Super Sport Utility Vehicle, combines Lamborghini's performance DNA with SUV versatility, opening new markets.",
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                transition={{ duration: 0.3 }}
                className="group bg-gradient-to-br from-zinc-950 to-zinc-800 p-8 rounded-3xl shadow-2xl border border-zinc-900/50 cursor-pointer"
              >
                <motion.h4 className="text-3xl font-bold mb-4 text-gray-50 group-hover:text-gray-200 transition-colors">
                  {milestone.year}: {milestone.title}
                </motion.h4>
                <motion.p className="text-gray-300 leading-relaxed text-lg">{milestone.description}</motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Impact Section */}
      <section className="py-24 px-4 md:px-6 lg:py-32 bg-white text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-6xl font-bold tracking-tight text-center mb-16 text-gray-900 relative"
          >
            Shaping the Supercar World
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 bg-zinc-900 rounded-full"
            />
          </motion.h3>

          <div className="space-y-12">
            {[
              {
                title: "Revolutionary Design",
                content:
                  "Lamborghini has consistently pushed the boundaries of automotive design, introducing radical, futuristic shapes and iconic features like scissor doors. Their bold aesthetic has influenced countless designers and set trends in the supercar segment.",
              },
              {
                title: "Uncompromising Performance",
                content:
                  "From its powerful V12 engines to advanced aerodynamics and lightweight materials, Lamborghini has always prioritized raw, exhilarating performance. They build cars that are not just fast, but also deliver an unparalleled visceral driving experience.",
              },
              {
                title: "Brand Iconography",
                content:
                  "The 'Raging Bull' emblem and the names derived from famous fighting bulls (Miura, Countach, Diablo, Murciélago, Aventador, Huracán) have created a powerful and aggressive brand identity that resonates globally, symbolizing strength and untamed power.",
              },
            ].map((impact, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-10 rounded-3xl shadow-xl border border-gray-200"
              >
                <motion.h4 className="text-3xl font-bold mb-6 text-gray-900">{impact.title}</motion.h4>
                <motion.p className="text-xl leading-relaxed text-gray-700">{impact.content}</motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

     
    </div>
  )
}
