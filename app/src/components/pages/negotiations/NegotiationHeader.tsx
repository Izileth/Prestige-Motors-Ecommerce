import type { Negotiation } from '~/src/types/negociation';

interface NegotiationHeaderProps {
  negotiation: Negotiation;
}



export const NegotiationHeader = ({ negotiation }: NegotiationHeaderProps) => (
  <div className="flex items-center gap-3">
    <img
      src={negotiation.vehicle?.imagens?.[0]?.url || "/placeholder.svg?height=40&width=60&text=Car"}
      alt={`${negotiation.vehicle?.marca} ${negotiation.vehicle?.modelo}`}
      className="h-10 w-10 object-cover rounded-md border border-gray-200"
    />
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        {negotiation.vehicle?.marca} {negotiation.vehicle?.modelo} ({negotiation.vehicle?.anoFabricacao})
      </h2>
      <p className="text-sm text-gray-600">Negociação #{negotiation.id.slice(-8).toUpperCase()}</p>
    </div>
  </div>
)