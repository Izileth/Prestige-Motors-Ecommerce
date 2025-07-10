import { useState, useEffect, useRef } from "react"
import { BarChart3, Award, DollarSign, Gauge, ChevronLeft, ChevronRight } from "lucide-react"
import useVehicle from "~/hooks/useVehicle"

export type VehicleStatsData = {
    marcas: { marca: string; quantidade: number }[];
    estatisticas: {
        precoMedio: number;
        quilometragemMedia: number;
        anoFabricacaoMedio: number;
        anoModeloMedio: number;
    };
};
const VehicleStatistics = () => {
    const { fetchVehicleStats } = useVehicle()
    const [stats, setStats] = useState<VehicleStatsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const carouselRef = useRef<HTMLDivElement>(null)
    const touchStartX = useRef(0)
    const touchEndX = useRef(0)

    // Totais e cálculos
    const totalVehicles = stats?.marcas.reduce((sum, marca) => sum + marca.quantidade, 0) || 0
    const topBrand = stats?.marcas.reduce((prev, current) => (prev.quantidade > current.quantidade ? prev : current), {
        marca: "",
        quantidade: 0,
    })

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true)
                const statsData = await fetchVehicleStats()
                setStats(statsData)
                setError(null)
            } catch (err) {
                console.error("Erro ao carregar estatísticas:", err)
                setError("Falha ao carregar estatísticas")
            } finally {
                setLoading(false)
            }
        }
        loadStats()
    }, [fetchVehicleStats])

    // Formatação
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

    const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR").format(Math.round(value))

    // Itens do carrossel
    const statItems = [
        {
            title: "Total de Veículos",
            value: totalVehicles.toString(),
            icon: <BarChart3 className="h-5 w-5" />,
            //color: "from-blue-500 to-blue-600"
        },
        {
            title: "Marca Popular",
            value: topBrand?.marca || "-",
            icon: <Award className="h-5 w-5" />,
            //color: "from-amber-500 to-amber-600"
        },
        {
            title: "Preço Médio",
            value: stats ? formatCurrency(stats.estatisticas.precoMedio) : "R$ 0",
            icon: <DollarSign className="h-5 w-5" />,
            //color: "from-green-500 to-green-600"
        },
        {
            title: "Km Médio",
            value: stats ? `${formatNumber(stats.estatisticas.quilometragemMedia)} km` : "0 km",
            icon: <Gauge className="h-5 w-5" />,
           // color: "from-purple-500 to-purple-600"
        },
    ]
   

    const infiniteItems = [...statItems, ...statItems, ...statItems]

    // Controles do carrossel
    useEffect(() => {
        if (!isAutoPlaying || loading || error) return

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % (statItems.length * 2))
        }, 3000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, statItems.length, loading, error])

    const goToNext = () => {
        setIsAutoPlaying(false)
        setCurrentIndex(prev => (prev + 1) % (statItems.length * 2))
        setTimeout(() => setIsAutoPlaying(true), 5000)
    }

    const goToPrev = () => {
        setIsAutoPlaying(false)
        setCurrentIndex(prev => (prev - 1 + statItems.length * 2) % (statItems.length * 2))
        setTimeout(() => setIsAutoPlaying(true), 5000)
    }

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
        const swipeThreshold = 50
        const swipeDistance = touchStartX.current - touchEndX.current

        if (Math.abs(swipeDistance) > swipeThreshold) {
            swipeDistance > 0 ? goToNext() : goToPrev()
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className="w-full bg-transparent p-6">
                <h3 className="mb-4 text-xl font-light text-zinc-900">Estatísticas de Veículos</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="min-w-[240px] animate-pulse rounded-xl border border-zinc-200 bg-white p-5">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-zinc-200"></div>
                                <div className="h-4 w-24 rounded bg-zinc-200"></div>
                            </div>
                            <div className="h-6 w-16 rounded bg-zinc-200"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Error state
    if (error || !stats) {
        return (
            <div className="w-full bg-transparent p-6">
                <p className="text-sm text-red-600">{error || "Não foi possível carregar as estatísticas"}</p>
            </div>
        )
    }

    return (
        <div className="w-full bg-transparent py-4">
            <div className="flex items-center justify-between w-full max-w-full mb-5">
                <h3 className="text-xl font-medium text-zinc-900">Estatísticas de Veículos</h3>
                <div className="flex md:flex gap-2">
                    <button
                        onClick={goToPrev}
                        className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="h-5 w-5 text-zinc-600" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="h-5 w-5 text-zinc-600" />
                    </button>
                </div>
            </div>

            <div
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={(e) => touchEndX.current = e.touches[0].clientX}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 25}%)` }}
                >
                    {infiniteItems.map((item, index) => (
                        <div
                            key={index}
                            className="min-w-[240px] group relative overflow-hidden rounded-none  border-none bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm mr-4"
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <div className={`rounded-full bg-gradient-to-r  text-zinc-950 p-1.5 `}>
                                    {item.icon}
                                </div>
                                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                                    {item.title}
                                </span>
                            </div>
                            <p className="text-xl font-semibold text-zinc-900 truncate">
                                {item.value}
                            </p>
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-zinc-800 transition-all duration-300 group-hover:w-full" />
                        </div>
                    ))}
                </div>

                {/* Mobile Indicators */}
                <div className="flex justify-center gap-2 mt-4 md:hidden">
                    {statItems.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentIndex % statItems.length === i ? 'w-6 bg-zinc-800' : 'w-1.5 bg-zinc-200'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VehicleStatistics