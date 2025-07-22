import { useParams, useNavigate } from 'react-router';
import { useNegotiations } from '~/src/hooks/useNegociation';
import { NegotiationHeader } from '~/src/components/pages/negotiations/NegotiationHeader';
import { MessageList } from '~/src/components/pages/negotiations/MensagesList';
import { NegotiationActions } from '~/src/components/pages/negotiations/NegociationActions';
import { NegotiationTimeline } from '~/src/components/pages/negotiations/NegociationTimeLine';
import { PriceOfferChart } from '~/src/components/pages/negotiations/PriceOfferChart';
import { NegotiationStatusBadge } from '~/src/components/pages/negotiations/NegociationStatusBadge';
import { useAuth } from '~/src/hooks/useAuth';
import { Loader, ArrowLeft, AlertCircle } from 'lucide-react';
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

import { toast } from 'sonner';
export const NegotiationDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();;
    const [isProcessing, setIsProcessing] = useState(false);

    // Ações do store que precisamos adicionar
    const { 
        respondToNegotiation,
        cancelNegotiation,
        addMessage 
    } = useNegotiationStore();

    const {
        currentNegotiation,
        messages,
        history,
        isLoading,
        error,
        fetchNegotiationById,
        fetchMessages,
        fetchHistory,
        clearError
    } = useNegotiations({
        negotiationId: id,
        withMessages: true,
        withHistory: true,
        autoFetch: true
    });

    // Recarrega os dados se o ID mudar
    useEffect(() => {
        if (id) {
        fetchNegotiationById(id);
        fetchMessages(id);
        fetchHistory(id);
        }
    }, [id, fetchNegotiationById, fetchMessages, fetchHistory]);

    // Handlers para as ações da negociação
    const handleAccept = async (finalPrice?: number) => {
        if (!id) return;
        
        setIsProcessing(true);
        try {
        const payload: RespondNegotiationPayload = {
            action: 'ACCEPT',
            precoNegociado: finalPrice || currentNegotiation?.precoOfertado
        };
        
        await respondToNegotiation(id, payload);
        
        toast("A negociação foi finalizada com sucesso.");
        
        // Recarrega os dados
        fetchNegotiationById(id);
        fetchHistory(id);
        } catch (error) {
        toast("Não foi possível aceitar a oferta. Tente novamente.");
        } finally {
        setIsProcessing(false);
        }
    };

    const handleCounter = async (newPrice: number) => {
        if (!id) return;
        
        setIsProcessing(true);
        try {
        const payload: RespondNegotiationPayload = {
            action: 'COUNTER',
            precoNegociado: newPrice
        };
        
        await respondToNegotiation(id, payload);
        
        toast(`Nova oferta de R$ ${newPrice.toLocaleString('pt-BR')} enviada.`);
        
        // Recarrega os dados
        fetchNegotiationById(id);
        fetchMessages(id);
        fetchHistory(id);
        } catch (error) {
        toast("Não foi possível enviar a contraproposta. Tente novamente.");
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
            motivo: reason
        };
        
        await respondToNegotiation(id, payload);
        
        toast("A negociação foi recusada.");
        
        // Recarrega os dados
        fetchNegotiationById(id);
        fetchHistory(id);
        } catch (error) {
        toast("Não foi possível recusar a oferta. Tente novamente.");
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
        
        // Redireciona para a lista de negociações
        navigate('/negotiations');
        } catch (error) {
        toast("Não foi possível cancelar a negociação. Tente novamente.");
        } finally {
        setIsProcessing(false);
        }
    };

    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <div className="flex flex-col items-center space-y-4">
            <Loader className="h-8 w-8 animate-spin" />
            <p className="text-sm text-muted-foreground">Carregando negociação...</p>
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <ErrorMessage 
            message={error} 
            onRetry={() => {
                clearError();
                if (id) {
                fetchNegotiationById(id);
                }
            }} 
            />
        </div>
        );
    }

    if (!currentNegotiation) {
        return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Negociação não encontrada</h3>
                <p className="text-sm text-muted-foreground">
                A negociação solicitada não existe ou você não tem permissão para visualizá-la.
                </p>
            </div>
            <Button onClick={() => navigate('/negotiations')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para negociações
            </Button>
            </div>
        </div>
        );
    }

    const isSeller = currentNegotiation.vendedorId === user?.id;
    const isBuyer = currentNegotiation.compradorId === user?.id;
    const isActive = ['ABERTA', 'CONTRA_OFERTA'].includes(currentNegotiation.status);
    const canTakeAction = (isSeller || isBuyer) && isActive && !isProcessing;

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header com navegação */}
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
            </Button>
            <NegotiationHeader negotiation={currentNegotiation} />
            </div>
            <NegotiationStatusBadge status={currentNegotiation.status} />
        </div>

        {/* Indicador de processamento */}
        {isProcessing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
                <Loader className="h-4 w-4 animate-spin text-blue-600" />
                <p className="text-sm text-blue-800">Processando ação...</p>
            </div>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-6">
            {/* Gráfico de ofertas */}
            <PriceOfferChart 
                negotiation={currentNegotiation} 
                messages={messages} 
            />

            {/* Lista de mensagens */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
                <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Conversa</h3>
                    <span className="text-sm text-muted-foreground">
                    {messages.length} mensagem{messages.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <MessageList 
                    messages={messages} 
                    currentUserId={user?.id || ''} 
                    negotiationId={currentNegotiation.id}
                    canSendMessage={isActive}
                />
                </div>
            </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
            {/* Ações do vendedor */}
            {isSeller && canTakeAction && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Ações do Vendedor</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Ativo
                    </span>
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

            {/* Ações do comprador */}
            {isBuyer && canTakeAction && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Ações do Comprador</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Ativo
                    </span>
                    </div>
                    
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button 
                        variant="destructive" 
                        className="w-full"
                        disabled={isProcessing}
                        >
                        Cancelar Negociação
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Cancelar Negociação</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja cancelar esta negociação? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Não, manter</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancel}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Sim, cancelar
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                </div>
                </div>
            )}

            {/* Informações da negociação */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Informações</h3>
                <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Preço solicitado:</span>
                    <span className="font-medium">
                    R$ {currentNegotiation.precoSolicitado.toLocaleString('pt-BR')}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Oferta atual:</span>
                    <span className="font-medium text-blue-600">
                    R$ {currentNegotiation.precoOfertado.toLocaleString('pt-BR')}
                    </span>
                </div>
                {currentNegotiation.precoNegociado && (
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Preço final:</span>
                    <span className="font-medium text-green-600">
                        R$ {currentNegotiation.precoNegociado.toLocaleString('pt-BR')}
                    </span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Criada em:</span>
                    <span>
                    {new Date(currentNegotiation.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                </div>
                {currentNegotiation.dataExpiracao && (
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Expira em:</span>
                    <span>
                        {new Date(currentNegotiation.dataExpiracao).toLocaleDateString('pt-BR')}
                    </span>
                    </div>
                )}
                </div>
            </div>

            {/* Timeline da negociação */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <NegotiationTimeline history={history} />
            </div>
            </div>
        </div>
        </div>
    );
};