
export default function ToyotaPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-50 font-sans antialiased">
    
        {/* Hero Section */}
        <section className="relative h-[65vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-gray-800">
            <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Modern Toyota car on a road"
            className="absolute inset-0 z-0 opacity-60 grayscale transition-opacity duration-500 ease-in-out hover:opacity-75"
            />
            <div className="relative z-10 text-center px-4 py-8 bg-gray-900 bg-opacity-70 rounded-lg shadow-2xl backdrop-blur-sm">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-gray-50 drop-shadow-lg">
                Toyota: Driving Innovation
            </h2>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
                A legacy of reliability, efficiency, and forward-thinking mobility.
            </p>
            </div>
        </section>

        {/* History Section */}
        <section className="py-16 px-4 md:px-6 lg:py-24 bg-white text-gray-800">
            <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold tracking-tight mb-8 text-gray-900">The Foundation of Excellence</h3>
            <p className="text-lg leading-relaxed mb-6">
                Toyota Motor Corporation was founded by Kiichiro Toyoda in 1937, evolving from his father&apos;s Toyoda
                Automatic Loom Works. The company&apos;s roots in precision machinery instilled a deep commitment to quality
                and efficiency, principles that would become the cornerstone of its automotive manufacturing.
            </p>
            <p className="text-lg leading-relaxed">
                From its inception, Toyota embraced a philosophy of continuous improvement, known as &quot;Kaizen,&quot; and
                developed the revolutionary Toyota Production System (TPS). These foundational elements laid the groundwork
                for Toyota to become a global leader, renowned for its reliable vehicles and innovative manufacturing
                processes.
            </p>
            </div>
        </section>

        {/* Milestones Section */}
        <section className="py-16 px-4 md:px-6 lg:py-24 bg-gray-900 text-gray-50">
            <div className="max-w-5xl mx-auto">
            <h3 className="text-4xl font-bold tracking-tight text-center mb-12 text-gray-50">Pivotal Moments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-2xl font-semibold mb-3 text-gray-50">1937: Company Establishment</h4>
                <p className="text-gray-300">
                    Toyota Motor Corporation is officially established, separating from Toyoda Automatic Loom Works to focus
                    solely on automobile manufacturing.
                </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-2xl font-semibold mb-3 text-gray-50">1957: First US Export</h4>
                <p className="text-gray-300">
                    The Toyota Crown becomes the first Japanese car to be exported to the United States, marking
                    Toyota&apos;s entry into the international market.
                </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-2xl font-semibold mb-3 text-gray-50">1966: Corolla Launch</h4>
                <p className="text-gray-300">
                    The introduction of the Toyota Corolla, which would go on to become the world&apos;s best-selling car
                    model, revolutionizing affordable and reliable transportation.
                </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-2xl font-semibold mb-3 text-gray-50">1997: Prius Hybrid</h4>
                <p className="text-gray-300">
                    Toyota launches the Prius, the world&apos;s first mass-produced hybrid vehicle, pioneering a new era of
                    environmentally conscious automotive technology.
                </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-2xl font-semibold mb-3 text-gray-50">2000s: Global Expansion</h4>
                <p className="text-gray-300">
                    Toyota solidifies its position as a global automotive powerhouse, expanding manufacturing and sales
                    operations across continents.
                </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-2xl font-semibold mb-3 text-gray-50">2014: Mirai Fuel Cell</h4>
                <p className="text-gray-300">
                    Introduction of the Toyota Mirai, one of the world&apos;s first production fuel cell electric vehicles,
                    showcasing Toyota&apos;s commitment to diverse sustainable mobility solutions.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-4 md:px-6 lg:py-24 bg-white text-gray-800">
            <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold tracking-tight mb-8 text-gray-900">Transforming the Industry</h3>
            <p className="text-lg leading-relaxed mb-6">
                Toyota&apos;s impact on the automotive industry is profound and multifaceted. The Toyota Production System
                (TPS), with its emphasis on &quot;Just-in-Time&quot; manufacturing and continuous improvement (Kaizen),
                revolutionized global manufacturing practices far beyond the automotive sector.
            </p>
            <p className="text-lg leading-relaxed mb-6">
                Furthermore, Toyota pioneered and popularized hybrid technology with the Prius, setting a new standard for
                fuel efficiency and environmental responsibility that compelled other manufacturers to follow suit. Their
                unwavering commitment to quality and reliability has earned them a reputation for building durable and
                dependable vehicles, fostering immense customer trust worldwide.
            </p>
            <p className="text-lg leading-relaxed">
                As one of the largest and most influential automakers, Toyota continues to shape the future of mobility,
                investing heavily in electric vehicles, autonomous driving, and innovative mobility services, ensuring its
                legacy of innovation endures.
            </p>
            </div>
        </section>

        </div>
    )
}
