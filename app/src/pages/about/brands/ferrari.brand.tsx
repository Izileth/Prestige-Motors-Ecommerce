
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FearriPage() {
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
    <div className="min-h-screen bg-zinc900 text-gray-50 font-sans antialiased overflow-x-hidden">


      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-800 via-zinc-900 to-black">
        <motion.div style={{ y: scrollY * 0.5 }} className="absolute inset-0 z-0">
          <img
            src="https://i.pinimg.com/736x/aa/26/1d/aa261d416a379b4f91d7acc50b00cf37.jpg"
            alt="Ferrari supercar on racing track"
            className="opacity-40 grayscale w-full h-full object-cover object-center"
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
            className="bg-transparent backdrop-blur-lg rounded-3xl p-12 shadow-2xl "
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-gray-50 drop-shadow-2xl mb-6"
            >
              Ferrari
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-3xl font-light text-gray-200 tracking-wide mb-8"
            >
              The Prancing Horse Legacy
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 mx-auto rounded-full"
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
            Born from Passion
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
                Founded in 1939 by Enzo Ferrari in Maranello, Italy, Ferrari began as Auto Avio Costruzioni before
                becoming Scuderia Ferrari. Enzo's vision was singular: to create the most beautiful and fastest racing
                cars in the world.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-xl leading-relaxed">
                What started as a racing team evolved into the most prestigious automotive brand in history, where every
                car embodies the perfect fusion of Italian artistry, cutting-edge technology, and unbridled passion for
                speed.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 p-10 rounded-3xl shadow-xl"
            >
              <h4 className="text-3xl font-semibold mb-6 text-gray-900">Enzo Ferrari</h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                "I don't sell cars; I sell dreams." - The visionary who transformed his passion for racing into the
                world's most coveted automotive brand, creating machines that transcend mere transportation to become
                works of art.
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
            Legendary Moments
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
                year: "1947",
                title: "First Ferrari",
                description:
                  "The 125 S, Ferrari's first car, debuts with a 1.5L V12 engine, establishing the foundation of the legendary Ferrari sound and performance.",
              },
              {
                year: "1962",
                title: "250 GTO",
                description:
                  "Launch of the iconic 250 GTO, now considered one of the most valuable and beautiful cars ever made, with only 36 units produced.",
              },
              {
                year: "1975",
                title: "First World Championship",
                description:
                  "Niki Lauda wins Ferrari's first Formula 1 Drivers' Championship, beginning an era of F1 dominance that continues today.",
              },
              {
                year: "1987",
                title: "F40 Supercar",
                description:
                  "Introduction of the F40, the last car personally approved by Enzo Ferrari, celebrating the company's 40th anniversary with 200+ mph capability.",
              },
              {
                year: "2002",
                title: "Enzo Hypercar",
                description:
                  "Launch of the Enzo, a Formula 1-inspired hypercar limited to 400 units, showcasing Ferrari's most advanced technology.",
              },
              {
                year: "2013",
                title: "LaFerrari Hybrid",
                description:
                  "Debut of LaFerrari, Ferrari's first hybrid hypercar, combining a V12 engine with electric motors for unprecedented performance.",
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
                className="group bg-gradient-to-br from-zinc-800 to-zinc-700 p-8 rounded-3xl shadow-2xl border border-zinc-800/50 cursor-pointer"
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
            Defining Excellence
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 bg-gray-800 rounded-full"
            />
          </motion.h3>

          <div className="space-y-12">
            {[
              {
                title: "Racing DNA",
                content:
                  "Ferrari's Formula 1 heritage has produced 16 Constructors' Championships and countless technological innovations that filter down to road cars. Every Ferrari embodies decades of racing expertise, from aerodynamics to engine technology.",
              },
              {
                title: "Automotive Artistry",
                content:
                  "Ferrari has redefined automotive design, collaborating with legendary designers like Pininfarina to create cars that are as much sculptures as they are machines. The brand has influenced automotive aesthetics for over seven decades.",
              },
              {
                title: "Exclusivity & Prestige",
                content:
                  "By maintaining limited production and uncompromising quality, Ferrari has created the ultimate luxury automotive brand. Owning a Ferrari represents membership in an exclusive club of automotive enthusiasts and collectors worldwide.",
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
