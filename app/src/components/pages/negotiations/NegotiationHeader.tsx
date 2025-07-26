import type { Negotiation } from '~/src/types/negociation';
import VehicleImages from './VehicleImageTranform';
interface NegotiationHeaderProps {
  negotiation: Negotiation;
}

export const NegotiationHeader = ({ negotiation }: NegotiationHeaderProps) => (
  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
    <VehicleImages imageUrl={negotiation.vehicle?.imagens[0]?.url}  />
    <div className='flex flex-col min-w-0'>
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {negotiation.vehicle?.marca} {negotiation.vehicle?.modelo} ({negotiation.vehicle?.anoFabricacao})
      </h2>
      <p className="text-sm text-gray-600 truncate">Negociação #{negotiation.id.slice(-8).toUpperCase()}</p>
    </div>
  </div>
)