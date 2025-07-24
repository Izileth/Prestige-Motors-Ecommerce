import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { NegotiationHistory } from "~/src/types/negociation";

interface NegotiationTimelineProps {
  history: NegotiationHistory[];
}

const getActionDetails = (action: string) => {
    switch (action) {
        case 'CREATED':
        case 'CREATE':
            return {
                icon: '🚀',
                color: 'bg-blue-500',
                label: 'Negociação Iniciada',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                borderColor: 'border-blue-200 dark:border-blue-800'
            };
        case 'ACCEPT':
        case 'ACCEPTED':
            return {
                icon: '✅',
                color: 'bg-green-500',
                label: 'Oferta Aceita',
                bgColor: 'bg-green-50 dark:bg-green-900/20',
                borderColor: 'border-green-200 dark:border-green-800'
            };
        case 'REJECT':
        case 'REJECTED':
            return {
                icon: '❌',
                color: 'bg-red-500',
                label: 'Oferta Recusada',
                bgColor: 'bg-red-50 dark:bg-red-900/20',
                borderColor: 'border-red-200 dark:border-red-800'
            };
        case 'COUNTER':
        case 'COUNTER_OFFER':
            return {
                icon: '🔄',
                color: 'bg-orange-500',
                label: 'Contraproposta Enviada',
                bgColor: 'bg-orange-50 dark:bg-orange-900/20',
                borderColor: 'border-orange-200 dark:border-orange-800'
            };
        case 'MESSAGE':
        case 'MESSAGE_SENT':
            return {
                icon: '💬',
                color: 'bg-blue-400',
                label: 'Mensagem Enviada',
                bgColor: 'bg-gray-50 dark:bg-gray-800',
                borderColor: 'border-gray-200 dark:border-gray-700'
            };
        case 'OFFER':
        case 'OFFER_SENT':
            return {
                icon: 'O',
                color: 'bg-yellow-500',
                label: 'Nova Oferta',
                bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
                borderColor: 'border-yellow-200 dark:border-yellow-800'
            };
        case 'CANCEL':
        case 'CANCELLED':
            return {
                icon: 'C',
                color: 'bg-gray-600',
                label: 'Negociação Cancelada',
                bgColor: 'bg-gray-50 dark:bg-gray-800',
                borderColor: 'border-gray-300 dark:border-gray-600'
            };
        case 'EXPIRED':
            return {
                icon: 'E',
                color: 'bg-red-400',
                label: 'Negociação Expirada',
                bgColor: 'bg-red-50 dark:bg-red-900/20',
                borderColor: 'border-red-200 dark:border-red-800'
            };
        default:
            return {
                icon: 'D',
                color: 'bg-zinc-950',
                label: 'Ação Desconhecida',
                bgColor: 'bg-zinc-50 dark:bg-zinc-800',
                borderColor: 'border-gray-200 dark:border-gray-700'
            };
    }
};

const formatActionDetails = (item: NegotiationHistory) => {
    const details = item.detalhes || {};
    
    switch (item.acao) {
        case 'COUNTER':
        case 'COUNTER_OFFER':
            return details.precoNegociado 
                ? `Nova proposta: R$ ${Number(details.precoNegociado).toLocaleString('pt-BR')}`
                : 'Contraproposta enviada';
                
        case 'ACCEPT':
        case 'ACCEPTED':
            return details.precoFinal 
                ? `Acordo fechado por R$ ${Number(details.precoFinal).toLocaleString('pt-BR')}`
                : 'Oferta aceita';
                
        case 'REJECT':
        case 'REJECTED':
            return details.motivo 
                ? `Motivo: ${details.motivo}`
                : 'Oferta recusada';
                
        case 'OFFER':
        case 'OFFER_SENT':
            return details.valor 
                ? `Oferta de R$ ${Number(details.valor).toLocaleString('pt-BR')}`
                : 'Nova oferta enviada';
                
        case 'MESSAGE':
        case 'MESSAGE_SENT':
            return details.tipo === 'OFERTA' 
                ? 'Oferta enviada via mensagem'
                : details.tipo === 'CONTRA_OFERTA'
                ? 'Contraproposta enviada via mensagem'
                : details.conteudo || 'Mensagem enviada';
                
        default:
            return details.message || item.acao;
    }
};
export const NegotiationTimeline = ({ history }: NegotiationTimelineProps) => {
  
    const sortedHistory = [...history].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (sortedHistory.length === 0) {
        return (
            <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Histórico da Negociação</h3>
                <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📋</div>
                    <p className="text-sm">Nenhum histórico disponível ainda</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Histórico da Negociação</h3>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {sortedHistory.length} evento{sortedHistory.length !== 1 ? 's' : ''}
                </span>
            </div>
            
            <div className="relative">
                {/* Linha vertical */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                
                <div className="space-y-6">
                    {sortedHistory.map((item, index) => {
                        const actionDetails = getActionDetails(item.acao);
                        const isLast = index === sortedHistory.length - 1;
                        
                        return (
                            <div key={item.id} className="relative flex items-start gap-4">
                                {/* Ícone da timeline */}
                                <div className={`
                                    relative z-10 flex items-center justify-center w-8 h-8 
                                    ${actionDetails.color} rounded-full text-white text-sm
                                    shadow-lg border-2 border-white dark:border-gray-900
                                `}>
                                    <span>{actionDetails.icon}</span>
                                </div>
                                
                                {/* Conteúdo */}
                                <div className={`
                                    flex-1 min-w-0 p-4 rounded-lg border
                                    ${actionDetails.bgColor} ${actionDetails.borderColor}
                                    ${isLast ? 'mb-0' : 'mb-2'}
                                `}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                    {actionDetails.label}
                                                </h4>
                                                {item.usuario?.nome && (
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                                        por {item.usuario.nome}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                                {formatActionDetails(item)}
                                            </p>
                                            
                                            <time className="text-xs text-gray-500 dark:text-gray-400">
                                                {format(new Date(item.createdAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};