import type { Negotiation } from '~/src/types/negociation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NegotiationHeaderProps {
  negotiation: Negotiation;
}

export const NegotiationHeader = ({ negotiation }: NegotiationHeaderProps) => {
  return (
        <div>
        <h1 className="text-2xl font-light">
            Negociação: {negotiation.vehicle?.marca} {negotiation.vehicle?.modelo}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
            Iniciada em {format(new Date(negotiation.createdAt), 'PP', { locale: ptBR })}
        </p>
        </div>
    );
};