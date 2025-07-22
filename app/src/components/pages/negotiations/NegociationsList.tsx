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
        <div className="space-y-4">
        {/* Filtros de Status */}
        {onStatusFilter && (
            <div className="flex flex-wrap gap-2">
            {Object.entries({
                ABERTA: "Em Aberto",
                CONTRA_OFERTA: "Contraproposta",
                ACEITA: "Aceita",
                RECUSADA: "Recusada",
                CANCELADA: "Cancelada",
                EXPIRADA: "Expirada"
            }).map(([status, label]) => (
                <Button
                key={status}
                variant={currentStatusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusFilter(status)}
                >
                {label}
                </Button>
            ))}
            </div>
        )}

        {/* Lista de Negociações */}
        {negotiations.length === 0 ? (
            <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
                Nenhuma negociação encontrada
            </CardContent>
            </Card>
        ) : (
            <div className="grid gap-4">
            {negotiations.map((negotiation) => (
                <Link 
                to={`/vehicles/negotiations/${negotiation.id}`} 
                key={negotiation.id}
                className="hover:opacity-90 transition-opacity"
                >
                <Card>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-medium">
                        {negotiation.vehicle?.marca} {negotiation.vehicle?.modelo}
                        </CardTitle>
                        <CardDescription>
                        {negotiation.comprador?.nome || "Você"}
                        </CardDescription>
                    </div>
                    <NegotiationStatusBadge status={negotiation.status} />
                    </CardHeader>
                    <CardContent>
                    <div className="flex justify-between text-sm">
                        <div>
                        <p className="text-muted-foreground">
                            Oferta:{" "}
                            <span className="text-foreground">
                            {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(negotiation.precoOfertado)}
                            </span>
                        </p>
                        {negotiation.precoNegociado && (
                            <p className="text-muted-foreground">
                            Negociado:{" "}
                            <span className="text-foreground">
                                {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                                }).format(negotiation.precoNegociado)}
                            </span>
                            </p>
                        )}
                        </div>
                        <p className="text-muted-foreground">
                        {format(new Date(negotiation.updatedAt), "PP", { locale: ptBR })}
                        </p>
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-auto"
                        onClick={() => navigate(`/vehicles/negotiations/${negotiation.id}`)}
                    >
                        Ver detalhes
                    </Button>
                    </CardFooter>
                </Card>
                </Link>
            ))}
            </div>
        )}
        </div>
    );
};