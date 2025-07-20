
export default function AmgPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-50 font-sans">

        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
            <img
                src="https://i.pinimg.com/1200x/19/b9/bc/19b9bcc2c38115ab8a288cc134352d98.jpg"
                alt="Mercedes-AMG car interior"
                className="absolute inset-0 z-0 opacity-70 grayscale w-full h-full object-cover object-center bg-fixed"
            />
            <div className="relative z-10 text-center px-4">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter drop-shadow-lg">Driving Performance</h2>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
                The relentless pursuit of power, precision, and passion.
            </p>
            </div>
        </section>

        {/* History Section */}
        <section className="py-16 px-4 md:px-6 lg:py-24 bg-white text-gray-800">
            <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold tracking-tight mb-8">The Genesis of Performance</h3>
            <p className="text-lg leading-relaxed mb-6">
                Founded in 1967 by Hans Werner Aufrecht and Erhard Melcher in Großaspach, Germany, AMG began as an
                engineering office specializing in the design, testing, and development of racing engines. Their vision was
                simple yet ambitious: to transform standard Mercedes-Benz vehicles into high-performance machines capable of
                dominating on the track and thrilling on the road.
            </p>
            <p className="text-lg leading-relaxed">
                From humble beginnings in a former mill, AMG quickly gained a reputation for its meticulous craftsmanship
                and innovative engine tuning, laying the groundwork for a legacy of unparalleled automotive excellence.
            </p>
            </div>
        </section>

        {/* Milestones Section */}
        <section className="py-16 px-4 md:px-6 lg:py-24 bg-zinc-950 text-gray-50">
            <div className="max-w-5xl mx-auto">
            <h3 className="text-4xl font-bold tracking-tight text-center mb-12">Defining Moments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                <h4 className="text-2xl font-semibold mb-3">1971: The Red Pig</h4>
                <p className="text-gray-300">
                    The iconic 300 SEL 6.3 &quot;Red Pig&quot; secured a class victory and second overall at the 24 Hours of
                    Spa, marking AMG&apos;s first major racing success and putting them on the global map.
                </p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                <h4 className="text-2xl font-semibold mb-3">1986: The Hammer</h4>
                <p className="text-gray-300">
                    The AMG Hammer, based on the W124 E-Class, became a legend with its 5.6-liter V8 engine, delivering over
                    360 hp and setting new benchmarks for performance sedans.
                </p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                <h4 className="text-2xl font-semibold mb-3">1990: Cooperation Agreement</h4>
                <p className="text-gray-300">
                    AMG signed a cooperation agreement with Daimler-Benz AG, leading to AMG products being sold through
                    Mercedes-Benz dealerships and expanding their reach significantly.
                </p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                <h4 className="text-2xl font-semibold mb-3">1999: Majority Stake Acquired</h4>
                <p className="text-gray-300">
                    DaimlerChrysler AG acquired a majority stake in AMG, integrating the performance brand even closer into
                    the Mercedes-Benz family.
                </p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                <h4 className="text-2xl font-semibold mb-3">2005: Full Integration</h4>
                <p className="text-gray-300">
                    AMG became a wholly-owned subsidiary of Daimler AG, solidifying its position as the high-performance arm
                    of Mercedes-Benz.
                </p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                <h4 className="text-2xl font-semibold mb-3">2009: SLS AMG</h4>
                <p className="text-gray-300">    
                    The introduction of the Mercedes-Benz SLS AMG marked the first car developed entirely by AMG, showcasing
                    their full engineering capabilities.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-4 md:px-6 lg:py-24 bg-white text-gray-800">
            <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold tracking-tight mb-8">Impact on the Automotive Industry</h3>
            <p className="text-lg leading-relaxed mb-6">
                Mercedes-AMG has profoundly influenced the automotive industry by consistently pushing the boundaries of
                performance, luxury, and engineering. They pioneered the concept of high-performance variants of luxury
                sedans, creating a new segment that many other manufacturers have since followed.
            </p>
            <p className="text-lg leading-relaxed mb-6">
                Their &quot;One Man, One Engine&quot; philosophy, where each engine is hand-built by a single engineer,
                exemplifies a commitment to precision and craftsmanship that is rare in mass production. This dedication has
                set a high bar for quality and performance in the industry.
            </p>
            <p className="text-lg leading-relaxed">
                Beyond raw power, AMG has integrated advanced technologies, sophisticated aerodynamics, and refined driving
                dynamics into their vehicles, proving that extreme performance can coexist with everyday usability and
                luxury. Their success has inspired a generation of performance enthusiasts and cemented their status as a
                benchmark for automotive engineering excellence.
            </p>
            </div>
        </section>

        </div>
    )
}
