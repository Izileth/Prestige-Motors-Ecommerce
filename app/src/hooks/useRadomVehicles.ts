import { useMemo } from 'react';
import { useVehicleStore } from '../store/slices/vehicle';
import type { Vehicle } from '~/src/types/vehicle';

interface RecommendationScore {
    vehicle: Vehicle;
    score: number;
    reasons: string[];
}

interface UseVehicleRecommendationsOptions {
    limit?: number;
    minScore?: number;
    excludeCurrentVehicle?: boolean;
}

export const useVehicleRecommendations = (
    currentVehicle: Vehicle | null,
    options: UseVehicleRecommendationsOptions = {}
    ) => {
    const { 
        limit = 6, 
        minScore = 0.1, 
        excludeCurrentVehicle = true 
    } = options;
    
    const vehicles = useVehicleStore((state) => state.vehicles);
    const featuredVehicles = useVehicleStore((state) => state.featuredVehicles);

    const recommendations = useMemo(() => {
        if (!currentVehicle) return [];

        // Combine todos os veículos disponíveis
        const allVehicles = [...vehicles, ...featuredVehicles]
        .filter((vehicle, index, self) => 
            // Remove duplicatas por ID
            index === self.findIndex(v => v.id === vehicle.id)
        )
        .filter(vehicle => 
            // Exclui o veículo atual se necessário
            excludeCurrentVehicle ? vehicle.id !== currentVehicle.id : true
        );

        const scoredVehicles: RecommendationScore[] = allVehicles.map(vehicle => {
        let score = 0;
        const reasons: string[] = [];

        // 1. MESMA MARCA (peso alto - 30%)
        if (vehicle.marca?.toLowerCase() === currentVehicle.marca?.toLowerCase()) {
            score += 0.3;
            reasons.push('Mesma marca');
        }

        // 2. MESMA CATEGORIA (peso alto - 25%)
        if (vehicle.categoria?.toLowerCase() === currentVehicle.categoria?.toLowerCase()) {
            score += 0.25;
            reasons.push('Mesma categoria');
        }

        // 3. MESMO MODELO (peso médio - 20%)
        if (vehicle.modelo?.toLowerCase() === currentVehicle.modelo?.toLowerCase()) {
            score += 0.2;
            reasons.push('Mesmo modelo');
        }

        // 4. FAIXA DE PREÇO SIMILAR (peso médio - 15%)
        if (vehicle.preco && currentVehicle.preco) {
            const priceDifference = Math.abs(vehicle.preco - currentVehicle.preco);
            const averagePrice = (vehicle.preco + currentVehicle.preco) / 2;
            const priceVariation = priceDifference / averagePrice;
            
            if (priceVariation <= 0.2) { // 20% de diferença
            score += 0.15;
            reasons.push('Faixa de preço similar');
            } else if (priceVariation <= 0.5) { // 50% de diferença
            score += 0.08;
            reasons.push('Preço compatível');
            }
        }

        // 5. ANO SIMILAR (peso baixo - 10%)
        if (vehicle.anoModelo && currentVehicle.anoModelo) {
            const yearDifference = Math.abs(vehicle.anoModelo - currentVehicle.anoModelo);
            if (yearDifference <= 2) {
            score += 0.1;
            reasons.push('Ano similar');
            } else if (yearDifference <= 5) {
            score += 0.05;
            reasons.push('Geração similar');
            }
        }

        // 6. MESMO COMBUSTÍVEL (peso baixo - 8%)
        if (vehicle.tipoCombustivel?.toLowerCase() === currentVehicle.tipoCombustivel?.toLowerCase()) {
            score += 0.08;
            reasons.push('Mesmo combustível');
        }

        // 7. MESMA TRANSMISSÃO (peso baixo - 7%)
        if (vehicle.cambio?.toLowerCase() === currentVehicle.cambio?.toLowerCase()) {
            score += 0.07;
            reasons.push('Mesma transmissão');
        }

        // 8. COR SIMILAR (peso muito baixo - 3%)
        if (vehicle.cor?.toLowerCase() === currentVehicle.cor?.toLowerCase()) {
            score += 0.03;
            reasons.push('Mesma cor');
        }

        // 9. BONUS PARA VEÍCULOS EM DESTAQUE (peso baixo - 5%)
        if (vehicle.destaque) {
            score += 0.05;
            reasons.push('Veículo em destaque');
        }

        // 10. BONUS PARA VEÍCULOS COM SELO ORIGINAL (peso baixo - 3%)
        if (vehicle.seloOriginal) {
            score += 0.03;
            reasons.push('Selo original');
        }

        // 11. PENALTY para veículos sem imagens (reduz score)
        if (!vehicle.imagens || vehicle.imagens.length === 0) {
            score *= 0.7; // Reduz 30% do score
        }

        // 12. BONUS para veículos com mais visualizações (popularidade)
        if (vehicle.visualizacoes && vehicle.visualizacoes > 100) {
            score += 0.02;
            reasons.push('Popular');
        }

        return {
            vehicle,
            score: Math.min(score, 1), // Limita score máximo em 1
            reasons
        };
        });

        // Filtra veículos com score mínimo e ordena por score
        return scoredVehicles
        .filter(item => item.score >= minScore)
        .sort((a, b) => {
            // Primeiro ordena por score
            if (b.score !== a.score) {
            return b.score - a.score;
            }
            
            // Em caso de empate, prioriza veículos em destaque
            if (a.vehicle.destaque && !b.vehicle.destaque) return -1;
            if (!a.vehicle.destaque && b.vehicle.destaque) return 1;
            
            // Em caso de empate, prioriza veículos com mais visualizações
            const aViews = a.vehicle.visualizacoes || 0;
            const bViews = b.vehicle.visualizacoes || 0;
            return bViews - aViews;
        })
        .slice(0, limit);
    }, [currentVehicle, vehicles, featuredVehicles, limit, minScore, excludeCurrentVehicle]);

    // Estatísticas das recomendações
    const recommendationStats = useMemo(() => {
        if (recommendations.length === 0) return null;

        const avgScore = recommendations.reduce((sum, item) => sum + item.score, 0) / recommendations.length;
        const topReasons = recommendations
        .flatMap(item => item.reasons)
        .reduce((acc, reason) => {
            acc[reason] = (acc[reason] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
        averageScore: avgScore,
        totalRecommendations: recommendations.length,
        topReasons: Object.entries(topReasons)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([reason, count]) => ({ reason, count }))
        };
    }, [recommendations]);

    return {
        recommendations: recommendations.map(item => item.vehicle),
        recommendationsWithScores: recommendations,
        stats: recommendationStats,
        hasRecommendations: recommendations.length > 0
    };
};

// Hook simplificado para uso básico
export const useSimpleVehicleRecommendations = (currentVehicle: Vehicle | null, limit = 6) => {
    const { recommendations, hasRecommendations } = useVehicleRecommendations(currentVehicle, { limit });
    return { recommendations, hasRecommendations };
};

// Utilitário para debug das recomendações
export const useRecommendationDebug = (currentVehicle: Vehicle | null) => {
    const { recommendationsWithScores, stats } = useVehicleRecommendations(currentVehicle, {
        limit: 10,
        minScore: 0
    });

    const debugInfo = useMemo(() => {
        if (!currentVehicle || recommendationsWithScores.length === 0) return null;

        return {
        currentVehicle: {
            id: currentVehicle.id,
            marca: currentVehicle.marca,
            modelo: currentVehicle.modelo,
            categoria: currentVehicle.categoria,
            preco: currentVehicle.preco,
            ano: currentVehicle.anoFabricacao
        },
        recommendations: recommendationsWithScores.map(item => ({
            id: item.vehicle.id,
            marca: item.vehicle.marca,
            modelo: item.vehicle.modelo,
            score: item.score.toFixed(3),
            reasons: item.reasons
        })),
        stats
        };
    }, [currentVehicle, recommendationsWithScores, stats]);

    return debugInfo;
};