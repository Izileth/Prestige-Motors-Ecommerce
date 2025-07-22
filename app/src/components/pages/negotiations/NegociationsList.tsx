import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Link } from "react-router";
import type { Negotiation } from "~/src/types/negociation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NegotiationStatusBadge } from "./NegociationStatusBadge";

import { useNavigate } from "react-router";

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
        
    const navigate = useNavigate();
     
    return (
        <div className="space-y-6 p-4 max-w-full mx-auto">
        {/* Status Filters */}
        {onStatusFilter && (
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
            {Object.entries({
                ALL: "Todos", // Added an 'All' filter option
                ABERTA: "Em Aberto",
                CONTRA_OFERTA: "Contraproposta",
                ACEITA: "Aceita",
                RECUSADA: "Recusada",
                CANCELADA: "Cancelada",
                EXPIRADA: "Expirada",
            }).map(([status, label]) => (
                <Button
                key={status}
                variant={currentStatusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusFilter(status)}
                className={
                    currentStatusFilter === status
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }
                >
                {label}
                </Button>
            ))}
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
                // Replaced Link with a div that calls navigate
                <div
                key={negotiation.id}
                onClick={() => navigate(`/vehicles/negotiations/${negotiation.id}`)}
                className="hover:opacity-90 transition-opacity cursor-pointer"
                >
                <Card className="border border-gray-200 rounded-none shadow-sm">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 border-b border-gray-100">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-medium text-gray-900">
                        {negotiation.vehicle?.marca} {negotiation.vehicle?.modelo}
                        </CardTitle>
                        <CardDescription className="text-gray-600">{negotiation.comprador?.nome || "Você"}</CardDescription>
                    </div>
                    <NegotiationStatusBadge status={negotiation.status} />
                    </CardHeader>
                    <CardContent className="pt-4">
                    <div className="flex justify-between text-sm">
                        <div>
                        <p className="text-gray-600">
                            Oferta:{" "}
                            <span className="text-gray-800 font-medium">
                            {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(negotiation.precoOfertado)}
                            </span>
                        </p>
                        {negotiation.precoNegociado && (
                            <p className="text-gray-600">
                            Negociado:{" "}
                            <span className="text-gray-800 font-medium">
                                {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                }).format(negotiation.precoNegociado)}
                            </span>
                            </p>
                        )}
                        </div>
                        <p className="text-gray-600">{format(new Date(negotiation.updatedAt), "PP", { locale: ptBR })}</p>
                    </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-100 pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                        onClick={(e) => {
                        e.stopPropagation() // Prevent parent div's onClick from firing
                        navigate(`/vehicles/negotiations/${negotiation.id}`)
                        }}
                    >
                        Ver detalhes
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