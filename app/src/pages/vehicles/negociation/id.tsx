import { useParams, useNavigate } from 'react-router-dom';
import { useNegotiations } from '~/src/hooks/useNegociation';
import { useAuth } from '~/src/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNegotiationStore } from '~/src/store/slices/negociation';
import type { RespondNegotiationPayload } from '~/src/types/negociation';
import { NegotiationPageSkeleton } from '~/src/components/layout/skeleton/NegotiationsSkeleton';
import { toast } from 'sonner';
import {
    NegotiationHeader,
    MessageList,
    NegotiationActions,
    NegotiationTimeline,
    PriceOfferChart,
    ErrorMessage,
    NegotiationNotFound,
    ProcessingIndicator,
    NegotiationInfo,
    CancelNegotiationDialog
} from '~/src/components/pages/vehicles/negotiation';

export const NegotiationDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    const { respondToNegotiation, cancelNegotiation, addMessage } = useNegotiationStore();
    const {
        currentNegotiation,
        messages,
        history,
        isLoading,
        error,
        fetchNegotiationById,
        fetchMessages,
        fetchHistory,
        clearErrors,
    } = useNegotiations({
        negotiationId: id,
        withMessages: true,
        withHistory: true,
        autoFetch: true,
    });

    useEffect(() => {
        if (id) {
            fetchNegotiationById(id);
            fetchMessages(id);
            fetchHistory(id);
        }
    }, [id, fetchNegotiationById, fetchMessages, fetchHistory]);

    const handleAccept = async (finalPrice?: number) => {
        if (!id) return;

        setIsProcessing(true);
        try {
            const payload: RespondNegotiationPayload = {
                action: 'ACCEPT',
                precoNegociado: finalPrice || currentNegotiation?.precoOfertado,
            };

            await respondToNegotiation(id, payload);
            toast('A negociação foi finalizada com sucesso.');
            fetchNegotiationById(id);
            fetchHistory(id);
        } catch (error) {
            toast('Não foi possível aceitar a oferta. Tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSendOffer = async (price: number, messageType: 'OFERTA' | 'CONTRA_OFERTA') => {
        if (!id) return;

        if (messageType === 'CONTRA_OFERTA') {
            await handleCounter(price);
        } else {
            setIsProcessing(true);
            try {
                await addMessage(id, {
                    conteudo: `R$ ${price.toLocaleString('pt-BR')}`,
                    tipo: messageType,
                });
                toast(`Oferta de R$ ${price.toLocaleString('pt-BR')} enviada.`);
                fetchMessages(id);
            } catch (error) {
                toast('Não foi possível enviar a oferta. Tente novamente.');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const messagesToDisplay = currentNegotiation?.mensagens || messages || [];

    const handleCounter = async (newPrice: number) => {
        if (!id) return;

        setIsProcessing(true);
        try {
            const payload: RespondNegotiationPayload = {
                action: 'COUNTER',
                precoNegociado: newPrice,
            };

            await respondToNegotiation(id, payload);

            await addMessage(id, {
                conteudo: `R$ ${newPrice.toLocaleString('pt-BR')}`,
                tipo: 'CONTRA_OFERTA',
            });

            toast(`Nova oferta de R$ ${newPrice.toLocaleString('pt-BR')} enviada.`);

            fetchNegotiationById(id);
            fetchMessages(id);
            fetchHistory(id);
        } catch (error) {
            toast('Não foi possível enviar a contraproposta. Tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async (reason?: string) => {
        if (!id) return;

        setIsProcessing(true);
        try {
            const payload: RespondNegotiationPayload = {
                action: 'REJECT',
                motivo: reason,
            };

            await respondToNegotiation(id, payload);
            toast('A negociação foi recusada.');
            fetchNegotiationById(id);
            fetchHistory(id);
        } catch (error) {
            toast('Não foi possível recusar a oferta. Tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancel = async () => {
        if (!id) return;

        setIsProcessing(true);
        try {
            await cancelNegotiation(id);
            toast('Negociação cancelada com sucesso.');
            navigate('/vehicles/negotiations');
        } catch (error) {
            toast('Não foi possível cancelar a negociação. Tente novamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    const getCurrentOfferPrice = () => {
        const offerMessages = messages
            .filter((msg) => msg.tipo === 'OFERTA' || msg.tipo === 'CONTRA_OFERTA')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        if (offerMessages.length > 0) {
            const latestOffer = offerMessages[0];
            const priceMatch = latestOffer.conteudo.match(/R\$\s*([\d.,]+)/);
            if (priceMatch) {
                return parseFloat(priceMatch[1].replace(/\./g, '').replace(',', '.'));
            }
        }

        return currentNegotiation?.precoOfertado;
    };

    if (isLoading) {
        return <NegotiationPageSkeleton />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            clearErrors();
            if (id) {
                fetchNegotiationById(id);
            }
        }} />;
    }

    if (!currentNegotiation) {
        return <NegotiationNotFound />;
    }

    const isSeller = currentNegotiation.vendedorId === user?.id;
    const isBuyer = currentNegotiation.compradorId === user?.id;
    const isActive = ['ABERTA', 'CONTRA_OFERTA'].includes(currentNegotiation.status);
    const canTakeAction = (isSeller || isBuyer) && isActive && !isProcessing;

    return (
        <div className="max-w-full mx-auto p-4 space-y-6 bg-gray-50 min-h-screen md:px-8 ">
            <NegotiationHeader negotiation={currentNegotiation} />

            {isProcessing && <ProcessingIndicator />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <PriceOfferChart negotiation={currentNegotiation} messages={messages} />
                    <MessageList
                        messages={messagesToDisplay}
                        currentUserId={user?.id || ''}
                        negotiationId={currentNegotiation.id}
                        canSendMessage={isActive}
                        isNegotiationActive={isActive}
                        canSendOffer={canTakeAction}
                        currentPrice={currentNegotiation.precoOfertado}
                        onSendOffer={handleSendOffer}
                    />
                </div>

                <div className="space-y-6">
                    {isSeller && canTakeAction && (
                        <NegotiationActions
                            negotiationId={currentNegotiation.id}
                            currentPrice={currentNegotiation.precoOfertado}
                            onAccept={handleAccept}
                            onCounter={handleCounter}
                            onReject={handleReject}
                        />
                    )}

                    {isBuyer && canTakeAction && (
                        <CancelNegotiationDialog handleCancel={handleCancel} isProcessing={isProcessing} />
                    )}

                    <NegotiationInfo negotiation={currentNegotiation} getCurrentOfferPrice={getCurrentOfferPrice} />

                    <NegotiationTimeline history={history} />
                </div>
            </div>
        </div>
    );
};