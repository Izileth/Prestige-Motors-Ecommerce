import { NegotiationActions as Actions } from "~/src/components/pages/negotiations/NegociationActions";

export const NegotiationActions = ({
  negotiationId,
  currentPrice,
  onAccept,
  onCounter,
  onReject,
}: any) => (
  <div className="bg-white p-6 rounded-md border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900">Ações do Vendedor</h3>
      <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
        Ativo
      </span>
    </div>
    <Actions
      negotiationId={negotiationId}
      currentPrice={currentPrice}
      onAccept={onAccept}
      onCounter={onCounter}
      onReject={onReject}
    />
  </div>
);
