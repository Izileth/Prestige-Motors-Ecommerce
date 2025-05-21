
import { useState, useEffect } from "react"
import { BarChart3, Award, DollarSign, Gauge } from "lucide-react"
import useVehicle from "~/hooks/useVehicle"
import type { VehicleStatsData } from "~/types/vehicle"

const VehicleStatistics = () => {
    const { fetchVehicleStats } = useVehicle()
    const [stats, setStats] = useState<VehicleStatsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
        <div className="w-full bg-zinc-50 p-6 w-max-full">
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
            <p className="text-sm text-red-500">{error || "Não foi possível carregar as estatísticas"}</p>
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

    return (
        <div className="w-full bg-zinc-50 p-6">
        <h3 className="mb-5 text-xl font-medium text-zinc-900">Estatísticas de Veículos</h3>

        <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-4 w-full">
            {statItems.map((item, index) => (
            <div
                key={index}
                className="group relative overflow-hidden rounded border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm"
            >
                <div className="mb-2 flex items-center gap-2">
                <div className="rounded-full bg-zinc-100 p-1.5 text-zinc-700 group-hover:bg-zinc-800 group-hover:text-white">
                    {item.icon}
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">{item.title}</span>
                </div>
                <p className="text-xl font-semibold text-zinc-900" title={item.value}>
                {item.value}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-zinc-800 transition-all duration-300 group-hover:w-full" />
            </div>
            ))}
        </div>
        </div>
    )
}

export default VehicleStatistics