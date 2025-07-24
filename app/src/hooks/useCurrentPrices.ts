import { useMemo } from 'react';
import type { NegotiationMessage, Negotiation } from '~/src/types/negociation';

interface UseCurrentPriceProps {
    negotiation: Negotiation;
    messages: NegotiationMessage[];
}

export const useCurrentPrice = ({ negotiation, messages }: UseCurrentPriceProps) => {
    const currentPrice = useMemo(() => {
        const offerMessages = messages
            .filter(msg => msg.tipo === 'OFERTA' || msg.tipo === 'CONTRA_OFERTA')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        if (offerMessages.length > 0) {
            const latestOffer = offerMessages[0];
            const priceMatch = latestOffer.conteudo.match(/R\$\s*([\d.,]+)/);
            if (priceMatch) {
                return parseFloat(priceMatch[1].replace(/\./g, '').replace(',', '.'));
            }
        }
        
        return negotiation.precoOfertado;
    }, [messages, negotiation.precoOfertado]);

    const offerHistory = useMemo(() => {
        return messages
            .filter(msg => msg.tipo === 'OFERTA' || msg.tipo === 'CONTRA_OFERTA')
            .map(msg => {
                const priceMatch = msg.conteudo.match(/R\$\s*([\d.,]+)/);
                const price = priceMatch ? parseFloat(priceMatch[1].replace(/\./g, '').replace(',', '.')) : 0;
                
                return {
                    id: msg.id,
                    price,
                    type: msg.tipo,
                    authorId: msg.autorId,
                    createdAt: msg.createdAt,
                    author: msg.autor
                };
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [messages]);

    const priceStats = useMemo(() => {
        const prices = offerHistory.map(offer => offer.price);
        
        return {
            current: currentPrice,
            initial: negotiation.precoOfertado,
            requested: negotiation.precoSolicitado,
            final: negotiation.precoNegociado,
            highest: prices.length > 0 ? Math.max(...prices) : negotiation.precoOfertado,
            lowest: prices.length > 0 ? Math.min(...prices) : negotiation.precoOfertado,
            totalOffers: offerHistory.length,
            lastOffer: offerHistory[0] || null,
            trend: prices.length >= 2 ? (prices[0] > prices[1] ? 'increasing' : 'decreasing') : 'stable'
        };
    }, [currentPrice, negotiation, offerHistory]);

    const getPriceDifference = (newPrice: number, basePrice: number = currentPrice) => {
        const diff = newPrice - basePrice;
        const percentage = basePrice > 0 ? ((diff / basePrice) * 100) : 0;
        
        return {
            diff,
            percentage: Number(percentage.toFixed(1)),
            isIncrease: diff > 0,
            isDecrease: diff < 0,
            formattedDiff: Math.abs(diff).toLocaleString('pt-BR'),
            formattedPercentage: `${Math.abs(percentage).toFixed(1)}%`
        };
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('pt-BR');
    };

    return {
        currentPrice,
        offerHistory,
        priceStats,
        getPriceDifference,
        formatPrice,
        hasOffers: offerHistory.length > 0,
        isNegotiationActive: ['ABERTA', 'CONTRA_OFERTA'].includes(negotiation.status)
    };
};