import { useState, useEffect } from 'react';
import useVehicle from '~/hooks/useVehicle';
import type { VehicleStatsData } from '~/types/vehicle';



const VehicleStatistics = () => {
    const { fetchVehicleStats } = useVehicle();
    const [stats, setStats] = useState<VehicleStatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Total de veículos (soma das quantidades por marca)
    const totalVehicles = stats?.marcas.reduce((sum, marca) => sum + marca.quantidade, 0) || 0;
    
    // Encontra a marca mais popular
    const topBrand = stats?.marcas.reduce(
        (prev, current) => (prev.quantidade > current.quantidade ? prev : current),
        { marca: '', quantidade: 0 }
    );

    useEffect(() => {
        const loadStats = async () => {
        try {
            setLoading(true);
            const statsData = await fetchVehicleStats();
            setStats(statsData);
            setError(null);
        } catch (err) {
            console.error('Erro ao carregar estatísticas:', err);
            setError('Falha ao carregar estatísticas');
        } finally {
            setLoading(false);
        }
        };

        loadStats();
    }, [fetchVehicleStats]);

    if (loading) {
        return (
        <div className="bg-zinc-50 rounded-none shadow-none p-4 w-80">
            <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
        </div>
        );
    }

    if (error || !stats) {
        return (
        <div className="bg-zinc-50 rounded-none shadow-none p-4 w-full max-w-sm">
            <p className="text-red-500 text-sm">
            {error || 'Não foi possível carregar as estatísticas'}
            </p>
        </div>
        );
    }

    // Formatar valores para exibição
    const formatCurrency = (value: number) => 
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    
    const formatNumber = (value: number) => 
        new Intl.NumberFormat('pt-BR').format(Math.round(value));

    return (
        <div className="bg-zinc-50 rounded-none shadow-none p-4 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-3 text-gray-800">Estatísticas de Veículos</h3>
        
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-2 rounded">
            <p className="text-xs text-gray-500">Total de Veículos</p>
            <p className="text-lg font-semibold">{totalVehicles}</p>
            </div>
            
            <div className="bg-green-50 p-2 rounded">
            <p className="text-xs text-gray-500">Marca Popular</p>
            <p className="text-lg font-semibold truncate" title={topBrand?.marca || ''}>
                {topBrand?.marca || '-'}
            </p>
            </div>
            
            <div className="bg-yellow-50 p-2 rounded">
            <p className="text-xs text-gray-500">Preço Médio</p>
            <p className="text-lg font-semibold">{formatCurrency(stats.estatisticas.precoMedio)}</p>
            </div>
            
            <div className="bg-purple-50 p-2 rounded">
            <p className="text-xs text-gray-500">Km Médio</p>
            <p className="text-lg font-semibold">{formatNumber(stats.estatisticas.quilometragemMedia)} km</p>
            </div>
        </div>
        </div>
    );
};

export default VehicleStatistics;