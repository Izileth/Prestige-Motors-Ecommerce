import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import VehicleImages from "./VehicleImageTranform";
import type { Negotiation } from "~/src/types/negociation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NegotiationStatusBadge } from "./NegociationStatusBadge";
import { countByStatus } from "~/src/utils/negotiation.count";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
interface NegotiationListProps {
    negotiations: Negotiation[];
    onStatusFilter?: (status: string) => void;
    currentStatusFilter?: string;
}

export const NegotiationList = ({ 
    negotiations, 
    onStatusFilter,
    currentStatusFilter 
    }: NegotiationListProps) => {
    const statusCounts = countByStatus(negotiations);
    const totalCount = negotiations.length;

    const navigate = useNavigate();
        
    
    const statusFilters = {
        ALL: "Todos",
        ABERTA: "Em Aberto",
        CONTRA_OFERTA: "Contraproposta",
        ACEITA: "Aceita",
        RECUSADA: "Recusada",
        CANCELADA: "Cancelada",
        EXPIRADA: "Expirada",
    };


     
    return (
        <div className="space-y-6 p-4 max-w-full mx-auto">
        {/* Status Filters */}
        {onStatusFilter && (
                <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                    {Object.entries(statusFilters).map(([status, label]) => {
                        const count = status === 'ALL' ? totalCount : statusCounts[status] || 0;
                        const isActive = currentStatusFilter === status;
                        
                        return (
                            <Button
                                key={status}
                                variant={isActive ? "default" : "outline"}
                                size="sm"
                                onClick={() => onStatusFilter(status === 'ALL' ? '' : status)}
                                className={
                                    isActive
                                        ? "bg-gray-800 text-white hover:bg-gray-700"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                }
                            >
                                {label} 
                                <span className="ml-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-xs font-medium px-2 py-0.5 rounded-full">
                                    {count}
                                </span>
                            </Button>
                        );
                    })}
                </div>
            )}

        {/* Negotiation List */}
        {negotiations.length === 0 ? (
            <Card className="border border-gray-200 rounded-none shadow-sm">
            <CardContent className="py-8 text-center text-gray-600">Nenhuma negociação encontrada</CardContent>
            </Card>
        ) : (
            <div className="grid gap-4">
            {negotiations.map((negotiation) => (
                <div 
  key={negotiation.id}
  onClick={() => navigate(`/vehicles/negotiations/${negotiation.id}`)}
  className="hover:shadow-md transition-all cursor-pointer group"
>
  <Card className="border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:border-gray-300 transition-colors">
    <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-3">
      <div className="flex items-start gap-3">
        <div className="relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden border border-gray-100">
          <VehicleImages 
            imageUrl={negotiation.vehicle?.mainImage} 
          />
        </div>
        
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-gray-900 leading-tight">
            {negotiation.vehicle?.marca || 'Marca não informada'}
            <span className="text-gray-600 font-normal"> {negotiation.vehicle?.modelo || ''}</span>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <CardDescription className="text-sm text-gray-600">
              {negotiation.comprador?.nome ? (
                <>
                  <span className="font-medium">Comprador:</span> {negotiation.comprador.nome}
                </>
              ) : 'Você'}
            </CardDescription>
            
            <span className="text-gray-300">•</span>
            
            <span className="text-sm text-gray-500">
              {negotiation.vehicle?.anoFabricacao || 'Ano N/I'}
            </span>
          </div>
        </div>
      </div>
      
      <NegotiationStatusBadge status={negotiation.status} />
    </CardHeader>

    <CardContent className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Oferta:</span>{' '}
            <span className="text-gray-900 font-semibold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(negotiation.precoOfertado)}
            </span>
          </p>
          
          {negotiation.precoNegociado && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Negociado:</span>{' '}
              <span className="text-gray-900 font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(negotiation.precoNegociado)}
              </span>
            </p>
          )}
        </div>
        
        <div className="text-right">
          <p className="text-xs text-gray-500">
            {format(new Date(negotiation.updatedAt), "dd MMM yyyy", { locale: ptBR })}
          </p>
          <p className="text-xs text-gray-400">
            {format(new Date(negotiation.updatedAt), "HH:mm", { locale: ptBR })}
          </p>
        </div>
      </div>
    </CardContent>

    <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
      <Button
        variant="ghost"
        size="sm"
        className="ml-auto text-gray-700 hover:bg-gray-100 px-3 py-1 h-auto"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/vehicles/negotiations/${negotiation.id}`);
        }}
      >
        Ver detalhes
        <ArrowRight className="ml-2 h-3.5 w-3.5" />
      </Button>
    </CardFooter>
  </Card>
</div>
            ))}
            </div>
        )}
    
        </div>
  )
};