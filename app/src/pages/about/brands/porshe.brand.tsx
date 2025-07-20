
export default function PorshePage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-50 font-sans antialiased">
   
        {/* Hero Section */}
        <section className="relative h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
            <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Iconic Porsche 911 on a winding mountain road"
            className="absolute inset-0 z-0 opacity-50 grayscale transition-all duration-700 ease-in-out hover:opacity-70 hover:scale-105"
            />
            <div className="relative z-10 text-center px-4 py-12 bg-gray-900/80 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-700/50 transform transition-all duration-500 hover:scale-105">
            <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-tight text-gray-50 drop-shadow-2xl mb-4">
                Porsche
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-200 tracking-wide">
                Engineering Excellence Since 1931
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
            </div>
        </section>

        {/* History Section */}
        <section className="py-20 px-4 md:px-6 lg:py-32 bg-white text-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
            <div className="max-w-5xl mx-auto text-center relative z-10">
            <h3 className="text-5xl font-bold tracking-tight mb-12 text-gray-900 relative">
                The Birth of a Legend
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full"></div>
            </h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                <p className="text-lg leading-relaxed text-left">
                    Founded in 1931 by Ferdinand Porsche in Stuttgart, Germany, Porsche began as a consulting firm for
                    automotive design and engineering. Ferdinand Porsche's vision was to create vehicles that combined
                    innovative engineering with exceptional performance and timeless design.
                </p>
                <p className="text-lg leading-relaxed text-left">
                    The company's philosophy of "Intelligent Performance" emerged from Ferdinand's belief that true
                    automotive excellence comes from the perfect harmony of power, efficiency, and precision engineering.
                </p>
                </div>
                <div className="bg-gray-100 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">Ferdinand Porsche</h4>
                <p className="text-gray-700 leading-relaxed">
                    A visionary engineer who designed the Volkswagen Beetle and founded one of the world's most prestigious
                    sports car manufacturers, leaving an indelible mark on automotive history.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Milestones Section */}
        <section className="py-20 px-4 md:px-6 lg:py-32 bg-gray-900 text-gray-50 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
            <div className="max-w-6xl mx-auto relative z-10">
            <h3 className="text-5xl font-bold tracking-tight text-center mb-16 text-gray-50 relative">
                Legendary Milestones
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-400 rounded-full"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-600/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-gray-500">
                <h4 className="text-2xl font-semibold mb-4 text-gray-50 group-hover:text-gray-200 transition-colors">
                    1948: The 356
                </h4>
                <p className="text-gray-300 leading-relaxed">
                    The first production Porsche, the 356, debuts as a lightweight sports car that establishes Porsche's
                    reputation for exceptional handling and performance.
                </p>
                </div>
                <div className="group bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-600/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-gray-500">
                <h4 className="text-2xl font-semibold mb-4 text-gray-50 group-hover:text-gray-200 transition-colors">
                    1963: The 911 Icon
                </h4>
                <p className="text-gray-300 leading-relaxed">
                    Launch of the legendary Porsche 911, featuring the distinctive rear-engine design that would become
                    synonymous with the Porsche brand for decades.
                </p>
                </div>
                <div className="group bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-600/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-gray-500">
                <h4 className="text-2xl font-semibold mb-4 text-gray-50 group-hover:text-gray-200 transition-colors">
                    1970: Le Mans Victory
                </h4>
                <p className="text-gray-300 leading-relaxed">
                    Porsche achieves its first overall victory at the 24 Hours of Le Mans with the 917, beginning a
                    legendary racing heritage that continues today.
                </p>
                </div>
                <div className="group bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-600/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-gray-500">
                <h4 className="text-2xl font-semibold mb-4 text-gray-50 group-hover:text-gray-200 transition-colors">
                    1975: The Turbo Era
                </h4>
                <p className="text-gray-300 leading-relaxed">
                    Introduction of the 911 Turbo, pioneering turbocharged technology in sports cars and setting new
                    performance benchmarks for the industry.
                </p>
                </div>
                <div className="group bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-600/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-gray-500">
                <h4 className="text-2xl font-semibold mb-4 text-gray-50 group-hover:text-gray-200 transition-colors">
                    2002: Cayenne SUV
                </h4>
                <p className="text-gray-300 leading-relaxed">
                    Launch of the Cayenne, Porsche's first SUV, expanding the brand into new markets while maintaining its
                    performance DNA and engineering excellence.
                </p>
                </div>
                <div className="group bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl border border-gray-600/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-gray-500">
                <h4 className="text-2xl font-semibold mb-4 text-gray-50 group-hover:text-gray-200 transition-colors">
                    2019: Taycan Electric
                </h4>
                <p className="text-gray-300 leading-relaxed">
                    Introduction of the Taycan, Porsche's first fully electric sports car, demonstrating the brand's
                    commitment to sustainable high-performance mobility.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 px-4 md:px-6 lg:py-32 bg-white text-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
            <div className="max-w-5xl mx-auto relative z-10">
            <h3 className="text-5xl font-bold tracking-tight text-center mb-12 text-gray-900 relative">
                Shaping Automotive Excellence
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full"></div>
            </h3>
            <div className="space-y-8">
                <div className="bg-gray-50 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">Engineering Innovation</h4>
                <p className="text-lg leading-relaxed text-gray-700">
                    Porsche has consistently pushed the boundaries of automotive engineering, pioneering technologies like
                    turbocharging, all-wheel drive systems, and advanced aerodynamics that have been adopted across the
                    industry. Their commitment to research and development has resulted in numerous patents and innovations
                    that benefit the entire automotive sector.
                </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">Racing Heritage</h4>
                <p className="text-lg leading-relaxed text-gray-700">
                    With over 30,000 racing victories, Porsche's motorsport success is unparalleled. Their racing programs
                    have not only established the brand's performance credentials but have also served as a testing ground
                    for technologies that eventually make their way into production vehicles, benefiting everyday drivers
                    worldwide.
                </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">Sustainable Performance</h4>
                <p className="text-lg leading-relaxed text-gray-700">
                    Porsche is leading the transition to sustainable mobility without compromising performance. The Taycan
                    electric sports car proves that zero emissions and thrilling driving dynamics can coexist, setting new
                    standards for electric vehicle performance and inspiring other manufacturers to elevate their electric
                    offerings.
                </p>
                </div>
            </div>
            </div>
        </section>


        </div>
    )
}
