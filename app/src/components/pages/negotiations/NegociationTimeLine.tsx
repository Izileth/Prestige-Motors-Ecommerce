import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { NegotiationHistory } from "~/src/types/negociation";

interface NegotiationTimelineProps {
  history: NegotiationHistory[];
}

const getActionIcon = (action: string) => {
    switch (action) {
        case 'ACCEPT':
        return '✅';
        case 'REJECT':
        return '❌';
        case 'COUNTER':
        return '🔄';
        case 'MESSAGE':
        return '💬';
        case 'CANCEL':
        return '🚫';
        default:
        return '⚡';
    }
};

export const NegotiationTimeline = ({ history }: NegotiationTimelineProps) => {
  return (
        <div className="space-y-4">
        <h3 className="font-medium">Histórico da Negociação</h3>
        <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-4">
            {history.map((item) => (
            <div key={item.id} className="relative">
                <div className="absolute -left-[18px] top-1 h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-500" />
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{getActionIcon(item.acao)}</span>
                    <div>
                    <p className="font-medium">{item.usuario?.nome || 'Sistema'}</p>
                    <p className="text-sm text-gray-500">
                        {format(new Date(item.createdAt), "PPpp", { locale: ptBR })}
                    </p>
                    </div>
                </div>
                <p className="mt-1 text-sm">{item.detalhes?.message || item.acao}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};