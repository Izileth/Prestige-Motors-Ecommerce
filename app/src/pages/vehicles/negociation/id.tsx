import { useParams, useNavigate } from 'react-router';
import { useNegotiations } from '~/src/hooks/useNegociation';
import { useAuth } from '~/src/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNegotiationStore } from '~/src/store/slices/negociation';
import type { RespondNegotiationPayload } from '~/src/types/negociation';
import { NegotiationPageSkeleton } from '~/src/components/layout/skeleton/NegotiationsSkeleton';
import { toast } from 'sonner';
import {
    NegotiationHeader,
   NegotiationActions,
    ErrorMessage,
    NegotiationNotFound,
    ProcessingIndicator,
    PriceOfferChart,
    NegotiationInfo,
    CancelNegotiationDialog
} from '~/src/components/pages/vehicles/negotiation';

export const NegotiationDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [shouldShowError, setShouldShowError] = useState(false);

    const { respondToNegotiation, cancelNegotiation } = useNegotiationStore();
    const {
        currentNegotiation,
        messages,
        isLoading,
        error,
        fetchNegotiationById,
        fetchMessages,
        clearErrors,
    } = useNegotiations({
        negotiationId: id,
        withMessages: true,
        autoFetch: true,
    });

    // Buscar dados quando o componente montar
    useEffect(() => {
        if (id) {
            fetchNegotiationById(id);
            fetchMessages(id);
        }
    }, [id, fetchNegotiationById, fetchMessages]);

    // Gerenciar exibição de erro com delay
    useEffect(() => {
        let errorTimer: NodeJS.Timeout;
        
        if (error && !isLoading) {
            // Aguarda 2 segundos antes de mostrar o erro
            errorTimer = setTimeout(() => {
                setShouldShowError(true);
            }, 2000);
        } else {
            setShouldShowError(false);
        }

        return () => {
            if (errorTimer) {
                clearTimeout(errorTimer);
            }
        };
    }, [error, isLoading]);

    // Função para aceitar negociação
    const handleAccept = async (finalPrice?: number) => {
        if (!id) return;

        setIsProcessing(true);
        try {
            const payload: RespondNegotiationPayload = {
                action: 'ACCEPT',
                precoNegociado: finalPrice || currentNegotiation?.precoOfertado,
            };

            await respondToNegotiation(id, payload);
            toast.success('Negociação aceita com sucesso!');
            fetchNegotiationById(id);
        } catch (error) {
            toast.error('Erro ao aceitar a negociação');
        } finally {
            setIsProcessing(false);
        }
    };

    // Função para fazer contraproposta
    const handleCounter = async (newPrice: number) => {
        if (!id) return;

        setIsProcessing(true);
        try {
            const payload: RespondNegotiationPayload = {
                action: 'COUNTER',
                precoNegociado: newPrice,
            };

            await respondToNegotiation(id, payload);
            toast.success(`Contraproposta de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(newPrice)} enviada!`);
            fetchNegotiationById(id);
        } catch (error) {
            toast.error('Erro ao enviar contraproposta');
        } finally {
            setIsProcessing(false);
        }
    };

    // Função para recusar negociação
    const handleReject = async (reason?: string) => {
        if (!id) return;

        setIsProcessing(true);
        try {
            const payload: RespondNegotiationPayload = {
                action: 'REJECT',
                motivo: reason,
            };

            await respondToNegotiation(id, payload);
            toast.success('Negociação recusada');
            fetchNegotiationById(id);
        } catch (error) {
            toast.error('Erro ao recusar a negociação');
        } finally {
            setIsProcessing(false);
        }
    };

    // Função para cancelar negociação
    const handleCancel = async () => {
        if (!id) return;

        setIsProcessing(true);
        try {
            await cancelNegotiation(id);
            toast.success('Negociação cancelada');
            navigate('/vehicles/negotiations');
        } catch (error) {
            toast.error('Erro ao cancelar a negociação');
        } finally {
            setIsProcessing(false);
        }
    };

    // Obter preço da oferta atual
    const getCurrentOfferPrice = () => {
        if (currentNegotiation?.precoNegociado) {
            return currentNegotiation.precoNegociado;
        }
        return currentNegotiation?.precoOfertado || 0;
    };

    // Estados de loading e erro
    if (isLoading) {
        return <NegotiationPageSkeleton />;
    }

    // Só mostra erro após o delay e se não estiver carregando
    if (shouldShowError && error && !currentNegotiation) {
        return (
            <ErrorMessage 
                message={error} 
                onRetry={() => {
                    setShouldShowError(false);
                    clearErrors();
                    if (id) {
                        fetchNegotiationById(id);
                        fetchMessages(id);
                    }
                }} 
            />
        );
    }

    // Continua mostrando skeleton se ainda não tem dados e não passou do delay de erro
    if (!currentNegotiation && !shouldShowError) {
        return <NegotiationPageSkeleton />;
    }

    if (!currentNegotiation) {
        return <NegotiationNotFound />;
    }

    // Lógica de permissões
    const isSeller = currentNegotiation.vendedorId === user?.id;
    const isBuyer = currentNegotiation.compradorId === user?.id;
    const isActive = ['ABERTA', 'CONTRA_OFERTA'].includes(currentNegotiation.status);
    const canTakeAction = (isSeller || isBuyer) && isActive && !isProcessing;

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6 bg-white min-h-screen">
            {/* Header da negociação */}
            <NegotiationHeader negotiation={currentNegotiation} />

            {/* Indicador de processamento */}
            {isProcessing && <ProcessingIndicator />}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Coluna principal - Gráfico e informações */}
                <div className="space-y-6">
                    {/* Gráfico de ofertas */}
                    <PriceOfferChart 
                        negotiation={currentNegotiation} 
                        messages={messages} 
                    />
                    
                    {/* Informações da negociação */}
                    <NegotiationInfo 
                        negotiation={currentNegotiation} 
                        getCurrentOfferPrice={getCurrentOfferPrice} 
                    />
                </div>

                {/* Coluna lateral - Ações */}
                <div className="space-y-6">
                    {/* Ações do vendedor */}
                    {isSeller && canTakeAction && (
                        <NegotiationActions
                            negotiationId={currentNegotiation.id}
                            currentPrice={getCurrentOfferPrice()}
                            onAccept={handleAccept}
                            onCounter={handleCounter}
                            onReject={handleReject}
                        />
                    )}

                    {/* Ações do comprador */}
                    {isBuyer && canTakeAction && (
                        <CancelNegotiationDialog 
                            handleCancel={handleCancel} 
                            isProcessing={isProcessing} 
                        />
                    )}

                    {/* Status quando não há ações disponíveis */}
                    {(!canTakeAction && currentNegotiation) && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Status da Negociação
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {currentNegotiation.status === 'ACEITA' && 'Negociação finalizada com sucesso'}
                                {currentNegotiation.status === 'RECUSADA' && 'Negociação foi recusada'}
                                {currentNegotiation.status === 'CANCELADA' && 'Negociação foi cancelada'}
                                {currentNegotiation.status === 'EXPIRADA' && 'Negociação expirou'}
                                {!['ACEITA', 'RECUSADA', 'CANCELADA', 'EXPIRADA', 'ABERTA', 'CONTRA_OFERTA'].includes(currentNegotiation.status) && 
                                 'Aguardando ação de outro participante'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};