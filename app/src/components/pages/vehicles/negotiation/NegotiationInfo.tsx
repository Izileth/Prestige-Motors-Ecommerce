export const NegotiationInfo = ({ negotiation, getCurrentOfferPrice }: any) => (
  <div className="bg-white p-6 rounded-md border border-gray-200">
    <h3 className="font-semibold mb-4 text-gray-900">Informações</h3>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Preço solicitado:</span>
        <span className="font-medium text-gray-800">
          R$ {negotiation.precoSolicitado.toLocaleString("pt-BR")}
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
      {negotiation.precoNegociado && (
        <div className="flex justify-between">
          <span className="text-gray-600">Preço final:</span>
          <span className="font-medium text-gray-800">
            R$ {negotiation.precoNegociado.toLocaleString("pt-BR")}
          </span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-gray-600">Criada em:</span>
        <span className="text-gray-800">
          {new Date(negotiation.createdAt).toLocaleDateString("pt-BR")}
        </span>
      </div>
      {negotiation.dataExpiracao && (
        <div className="flex justify-between">
          <span className="text-gray-600">Expira em:</span>
          <span className="text-gray-800">
            {new Date(negotiation.dataExpiracao).toLocaleDateString("pt-BR")}
          </span>
        </div>
      )}
    </div>
  </div>
);
