import { Badge } from "~/src/components/ui/badge";
import type { NegotiationStatus } from "~/src/types/negociation";


const statusVariantMap: Record<NegotiationStatus, 
    "default" | "secondary" | "destructive" | "outline"
    > = {
    ABERTA: "secondary",
    CONTRA_OFERTA: "destructive",
    ACEITA: "default",
    RECUSADA: "destructive",
    CANCELADA: "outline",
    EXPIRADA: "outline"
};


const statusTextMap: Record<NegotiationStatus, string> = {
    ABERTA: "Em Aberto",
    CONTRA_OFERTA: "Contraproposta",
    ACEITA: "Aceita",
    RECUSADA: "Recusada",
    CANCELADA: "Cancelada",
    EXPIRADA: "Expirada"
};

interface NegotiationStatusBadgeProps {
    status: NegotiationStatus;
    className?: string;
}

export const NegotiationStatusBadge = ({ status, className }: NegotiationStatusBadgeProps) => {
    return (
        <Badge 
        variant={statusVariantMap[status]}
        className={`whitespace-nowrap ${className}`}
        >
        {statusTextMap[status]}
        </Badge>
    );
};