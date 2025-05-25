
import { useState, useEffect, useRef } from "react"
import { BarChart3, Award, DollarSign, Gauge, ChevronLeft, ChevronRight } from "lucide-react"
import useVehicle from "~/hooks/useVehicle"
import type { VehicleStatsData } from "~/types/vehicle"

const VehicleStatistics = () => {
    const { fetchVehicleStats } = useVehicle()
    const [stats, setStats] = useState<VehicleStatsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const carouselRef = useRef(null)
    const touchStartX = useRef(0)
    const touchEndX = useRef(0)


    // Total de veículos (soma das quantidades por marca)
    const totalVehicles = stats?.marcas.reduce((sum, marca) => sum + marca.quantidade, 0) || 0

    // Encontra a marca mais popular
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

    // Formatar valores para exibição
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

    const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR").format(Math.round(value))

    if (loading) {
        return (
        <div className="w-full bg-transparent p-6 w-max-full">
            <div className="mb-4 h-6 w-48 animate-pulse rounded bg-zinc-200"></div>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-4 w-full">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-3 rounded border border-zinc-200 bg-white p-4">
                <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-zinc-200"></div>
                    <div className="h-3 w-20 rounded bg-zinc-200"></div>
                </div>
                <div className="h-6 w-16 rounded bg-zinc-200"></div>
                </div>
            ))}
            </div>
        </div>
        )
    }

    if (error || !stats) {
        return (
        <div className="w-full bg-zinc-50 p-6">
            <p className="text-sm text-zinc-950">{error || "Não foi possível carregar as estatísticas"}</p>
        </div>
        )
    }

    const statItems = [
        {
        title: "Total de Veículos",
        value: totalVehicles.toString(),
        icon: <BarChart3 className="h-5 w-5" />,
        },
        {
        title: "Marca Popular",
        value: topBrand?.marca || "-",
        icon: <Award className="h-5 w-5" />,
        },
        {
        title: "Preço Médio",
        value: formatCurrency(stats.estatisticas.precoMedio),
        icon: <DollarSign className="h-5 w-5" />,
        },
        {
        title: "Km Médio",
        value: `${formatNumber(stats.estatisticas.quilometragemMedia)} km`,
        icon: <Gauge className="h-5 w-5" />,
        },
    ]

    // Create infinite loop by duplicating items
    const infiniteItems = [...statItems, ...statItems, ...statItems]

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
        setCurrentIndex((prev) => {
            const nextIndex = prev + 1
            // Reset to beginning when reaching the end of second set
            if (nextIndex >= statItems.length * 2) {
            return statItems.length
            }
            return nextIndex
        })
        }, 3000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, statItems.length])

    // Handle navigation
    const goToNext = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => {
        const nextIndex = prev + 1
        if (nextIndex >= statItems.length * 2) {
            return statItems.length
        }
        return nextIndex
        })
        setTimeout(() => setIsAutoPlaying(true), 5000)
    }

    const goToPrev = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => {
        const prevIndex = prev - 1
        if (prevIndex < statItems.length) {
            return statItems.length * 2 - 1
        }
        return prevIndex
        })
        setTimeout(() => setIsAutoPlaying(true), 5000)
    }

    // Touch handlers for mobile
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
        const swipeThreshold = 50
        const swipeDistance = touchStartX.current - touchEndX.current

        if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            goToNext()
        } else {
            goToPrev()
        }
        }
    }

    // Reset position for infinite loop
    useEffect(() => {
        if (currentIndex === 0) {
        setTimeout(() => {
            setCurrentIndex(statItems.length)
        }, 300)
        }
    }, [currentIndex, statItems.length])

    if (loading) {
        return (
        <div className="w-full bg-transparent p-4 sm:p-6">
            <div className="mb-4 h-6 w-48 animate-pulse rounded bg-zinc-200"></div>
            <div className="flex gap-4">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="min-w-[280px] sm:min-w-[320px] animate-pulse space-y-3 rounded-xl border border-zinc-200 bg-white p-6">
                <div className="flex items-center space-x-3">
                    <div className="h-6 w-6 rounded-full bg-zinc-200"></div>
                    <div className="h-3 w-24 rounded bg-zinc-200"></div>
                </div>
                <div className="h-8 w-20 rounded bg-zinc-200"></div>
                </div>
            ))}
            </div>
        </div>
        )
    }

    if (error || !stats) {
        return (
        <div className="w-full bg-transparent p-4 sm:p-6">
            <p className="text-sm text-zinc-600">{error || "Não foi possível carregar as estatísticas"}</p>
        </div>
        )
    }

    return (
        <div className="w-full bg-transparent p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">
            Estatísticas de Veículos
            </h3>
            
            {/* Navigation buttons - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2">
            <button
                onClick={goToPrev}
                className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
                aria-label="Anterior"
            >
                <ChevronLeft className="h-4 w-4 text-zinc-600" />
            </button>
            <button
                onClick={goToNext}
                className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
                aria-label="Próximo"
            >
                <ChevronRight className="h-4 w-4 text-zinc-600" />
            </button>
            </div>
        </div>

        <div className="relative overflow-hidden">
            <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
                transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 640 ? 1 : 2))}%)`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            >
            {infiniteItems.map((item, index) => (
                <div
                key={index}
                className="w-full sm:w-1/2 flex-shrink-0 px-2"
                >
                <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg min-h-[120px]">
                    <div className="flex items-start justify-between mb-4">
                    <div className={`rounded-lg bg-gradient-to-r  p-2.5 text-white shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                        {item.icon}
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 block mb-1">
                        {item.title}
                        </span>
                    </div>
                    </div>
                    
                    <div className="space-y-1">
                    <p className="text-2xl font-bold text-zinc-900 leading-tight">
                        {item.value}
                    </p>
                    </div>

                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-zinc-50/0 group-hover:from-white/20 group-hover:to-zinc-50/10 transition-all duration-300 pointer-events-none" />
                    
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r  transition-all duration-300 group-hover:w-full`} />
                </div>
                </div>
            ))}
            </div>

            {/* Mobile indicators */}
            <div className="flex justify-center mt-4 sm:hidden">
            <div className="flex gap-1.5">
                {statItems.map((_, index) => (
                <button
                    key={index}
                    onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index + statItems.length)
                    setTimeout(() => setIsAutoPlaying(true), 5000)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                    (currentIndex % statItems.length) === index
                        ? 'w-6 bg-zinc-800'
                        : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
                    }`}
                    aria-label={`Ir para estatística ${index + 1}`}
                />
                ))}
            </div>
            </div>
        </div>

        {/* Auto-play indicator */}
        <div className="flex items-center justify-center mt-3 sm:hidden">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
            <div className={`h-1.5 w-1.5 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-zinc-400'} transition-colors`} />
            {isAutoPlaying ? 'Reprodução automática' : 'Pausado'}
            </div>
        </div>
        </div>
    )
}

export default VehicleStatistics