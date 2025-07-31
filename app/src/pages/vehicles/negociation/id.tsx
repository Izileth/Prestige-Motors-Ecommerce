import { useParams, useNavigate } from 'react-router';
import { useNegotiations } from '~/src/hooks/useNegociation';
import { NegotiationHeader } from '~/src/components/pages/negotiations/NegotiationHeader';
import { MessageList } from '~/src/components/pages/negotiations/MensagesList';
import { NegotiationActions } from '~/src/components/pages/negotiations/NegociationActions';
import { NegotiationTimeline } from '~/src/components/pages/negotiations/NegociationTimeLine';
import { PriceOfferChart } from '~/src/components/pages/negotiations/PriceOfferChart';
import { NegotiationStatusBadge } from '~/src/components/pages/negotiations/NegociationStatusBadge';
import { useAuth } from '~/src/hooks/useAuth';
import { Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { ErrorMessage } from '~/src/components/pages/negotiations/ErrrorMensage';
import { useEffect, useState } from 'react';
import { Button } from '~/src/components/ui/button';

import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/src/components/ui/alert-dialog';
import { useNegotiationStore } from '~/src/store/slices/negociation';
import type { RespondNegotiationPayload } from '~/src/types/negociation';

import { NegotiationPageSkeleton } from '~/src/components/layout/skeleton/NegotiationsSkeleton';

import { toast } from 'sonner';

export const NegotiationDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [isProcessing, setIsProcessing] = useState(false)

    const { respondToNegotiation, cancelNegotiation, addMessage } = useNegotiationStore()
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
    })

    // Reload data if ID changes
    useEffect(() => {
        if (id) {
        fetchNegotiationById(id)
        fetchMessages(id)
        fetchHistory(id)
        }
    }, [id, fetchNegotiationById, fetchMessages, fetchHistory])

    // Handlers for negotiation actions
    const handleAccept = async (finalPrice?: number) => {
        if (!id) return

        setIsProcessing(true)
        try {
        const payload: RespondNegotiationPayload = {
            action: "ACCEPT",
            precoNegociado: finalPrice || currentNegotiation?.precoOfertado,
        }

        await respondToNegotiation(id, payload)
        toast("A negociação foi finalizada com sucesso.")
        // Reload data
        fetchNegotiationById(id)
        fetchHistory(id)
        } catch (error) {
        toast("Não foi possível aceitar a oferta. Tente novamente.")
        } finally {
        setIsProcessing(false)
        }
    }
    const handleSendOffer = async (price: number, messageType: 'OFERTA' | 'CONTRA_OFERTA') => {
        if (!id) return

        if (messageType === 'CONTRA_OFERTA') {
            await handleCounter(price);
        } else {
            // Para OFERTA simples
            setIsProcessing(true)
            try {
                await addMessage(id, {
                    conteudo: `R$ ${price.toLocaleString("pt-BR")}`,
                    tipo: messageType,
                })
                toast(`Oferta de R$ ${price.toLocaleString("pt-BR")} enviada.`)
                fetchMessages(id)
            } catch (error) {
                toast("Não foi possível enviar a oferta. Tente novamente.")
            } finally {
                setIsProcessing(false)
            }
        }
    }
    
    const messagesToDisplay = currentNegotiation?.mensagens || messages || [];

    const handleCounter = async (newPrice: number) => {
        if (!id) return

        setIsProcessing(true)
        try {
            const payload: RespondNegotiationPayload = {
                action: "COUNTER",
                precoNegociado: newPrice,
            }

            await respondToNegotiation(id, payload)
            
            // Adicionar mensagem também
            await addMessage(id, {
                conteudo: `R$ ${newPrice.toLocaleString("pt-BR")}`,
                tipo: 'CONTRA_OFERTA',
            })

            toast(`Nova oferta de R$ ${newPrice.toLocaleString("pt-BR")} enviada.`)
            
            // Reload data
            fetchNegotiationById(id)
            fetchMessages(id)
            fetchHistory(id)
        } catch (error) {
            toast("Não foi possível enviar a contraproposta. Tente novamente.")
        } finally {
            setIsProcessing(false)
        }
    }

    const handleReject = async (reason?: string) => {
        if (!id) return

        setIsProcessing(true)
        try {
        const payload: RespondNegotiationPayload = {
            action: "REJECT",
            motivo: reason,
        }

        await respondToNegotiation(id, payload)
        toast("A negociação foi recusada.")
        // Reload data
        fetchNegotiationById(id)
        fetchHistory(id)
        } catch (error) {
        toast("Não foi possível recusar a oferta. Tente novamente.")
        } finally {
        setIsProcessing(false)
        }
    }

    const handleCancel = async () => {
        if (!id) return

        setIsProcessing(true)
        try {
        await cancelNegotiation(id)

        toast("Negociação cancelada com sucesso.")
        navigate("/vehicles/negotiations")
        } catch (error) {
        toast("Não foi possível cancelar a negociação. Tente novamente.")
        } finally {
        setIsProcessing(false)
        }
    }

    const getCurrentOfferPrice = () => {
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
        
        return currentNegotiation?.precoOfertado;
    };


    if (isLoading) {
        return (
            <NegotiationPageSkeleton/>
        )
    }

    if (error) {
        return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <ErrorMessage
            message={error}
            onRetry={() => {
                clearErrors()
                if (id) {
                fetchNegotiationById(id)
                }
            }}
            />
        </div>
        )
    }

    if (!currentNegotiation) {
        return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center space-y-4 p-6 border border-gray-200 rounded-md bg-white">
            <AlertCircle className="h-12 w-12 text-gray-500 mx-auto" />
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Negociação não encontrada</h3>
                <p className="text-sm text-gray-600">
                A negociação solicitada não existe ou você não tem permissão para visualizá-la.
                </p>
            </div>
            <Button
                onClick={() => navigate("/vehicles/negotiations")}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para negociações
            </Button>
            </div>
        </div>
        )
    }

    const isSeller = currentNegotiation.vendedorId === user?.id
    const isBuyer = currentNegotiation.compradorId === user?.id
    const isActive = ["ABERTA", "CONTRA_OFERTA"].includes(currentNegotiation.status)
    const canTakeAction = (isSeller || isBuyer) && isActive && !isProcessing

    return (
        <div className="max-w-full mx-auto p-4 space-y-6 bg-gray-50 min-h-screen md:px-8 ">
        {/* Header with navigation */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap items-start sm:items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex flex-col xs:flex-row gap-3 xs:items-center w-full sm:w-auto">
            <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/vehicles/negotiations")}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full xs:w-auto justify-center xs:justify-start"
            >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
            </Button>
            <NegotiationHeader negotiation={currentNegotiation} />
        </div>
        
        <div className="w-full sm:w-auto flex justify-start sm:justify-end">
            <NegotiationStatusBadge status={currentNegotiation.status} />
        </div>
        </div>

        {/* Processing indicator */}
        {isProcessing && (
            <div className="bg-gray-100 border border-gray-200 rounded-md p-4">
            <div className="flex items-center space-x-3">
                <Loader2 className="h-4 w-4 animate-spin text-gray-700" />
                <p className="text-sm text-gray-800">Processando ação...</p>
            </div>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
            {/* Offer Chart */}
            <PriceOfferChart negotiation={currentNegotiation} messages={messages} />

            {/* Message List */}
            <div className="bg-white rounded-md border border-gray-200">
                <div className="py-2 px-2">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-lg font-semibold text-gray-900">Conversa</h3>
                    <span className="text-sm text-gray-600">
                    {messages.length} mensagem{messages.length !== 1 ? "s" : ""}
                    </span>
                </div>
                <MessageList
                    messages={messagesToDisplay} // FIX: Garantir que sempre seja um array
                    currentUserId={user?.id || ""}
                    negotiationId={currentNegotiation.id}
                    canSendMessage={isActive}
                    isNegotiationActive={isActive} // FIX: Adicionar esta prop que estava faltando
                    canSendOffer={canTakeAction} // NOVA PROP
                    currentPrice={currentNegotiation.precoOfertado} // NOVA PROP
                     onSendOffer={handleSendOffer} // NOVA PROP
                />
                </div>
            </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
            {/* Seller Actions */}
            {isSeller && canTakeAction && (
                <div className="bg-white p-6 rounded-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Ações do Vendedor</h3>
                    <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">Ativo</span>
                </div>
                <NegotiationActions
                    negotiationId={currentNegotiation.id}
                    currentPrice={currentNegotiation.precoOfertado}
                    onAccept={handleAccept}
                    onCounter={handleCounter}
                    onReject={handleReject}
                />
                </div>
            )}

            {/* Buyer Actions */}
            {isBuyer && canTakeAction && (
                <div className="bg-white p-6 rounded-md border border-gray-200">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Ações do Comprador</h3>
                    <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">Ativo</span>
                    </div>

                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                        disabled={isProcessing}
                        >
                        Cancelar Negociação
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white border border-gray-200 rounded-md">
                        <AlertDialogHeader>
                        <AlertDialogTitle className="text-gray-900">Cancelar Negociação</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-700">
                            Tem certeza que deseja cancelar esta negociação? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100">
                            Não, manter
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancel} className="bg-gray-900 text-white hover:bg-gray-800">
                            Sim, cancelar
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                </div>
                </div>
            )}

            {/* Negotiation Information */}
            <div className="bg-white p-6 rounded-md border border-gray-200">
                <h3 className="font-semibold mb-4 text-gray-900">Informações</h3>
                <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Preço solicitado:</span>
                    <span className="font-medium text-gray-800">
                    R$ {currentNegotiation.precoSolicitado.toLocaleString("pt-BR")}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Oferta atual:</span>
                    <span className="font-medium text-gray-800">
                        <span className="font-medium text-gray-800">
                        R$ {getCurrentOfferPrice()?.toLocaleString("pt-BR")}
                    </span>
                    </span>
                </div>
                {currentNegotiation.precoNegociado && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Preço final:</span>
                    <span className="font-medium text-gray-800">
                        R$ {currentNegotiation.precoNegociado.toLocaleString("pt-BR")}
                    </span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="text-gray-600">Criada em:</span>
                    <span className="text-gray-800">
                    {new Date(currentNegotiation.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                </div>
                {currentNegotiation.dataExpiracao && (
                    <div className="flex justify-between">
                    <span className="text-gray-600">Expira em:</span>
                    <span className="text-gray-800">
                        {new Date(currentNegotiation.dataExpiracao).toLocaleDateString("pt-BR")}
                    </span>
                    </div>
                )}
                </div>
            </div>

            {/* Negotiation Timeline */}
            <div className="bg-white p-6 rounded-md border border-gray-200">
                <NegotiationTimeline history={history} />
            </div>
            </div>
        </div>
        </div>
    )
}
