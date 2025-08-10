import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import VehicleImages from "./VehicleImageTranform";
import type { Negotiation } from "~/src/types/negociation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NegotiationStatusBadge } from "./NegociationStatusBadge";
import { countByStatus } from "~/src/utils/negotiation.count";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { 
    Calendar,
    User,
    Clock,
    ChevronRight
} from "lucide-react";

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

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            ABERTA: "bg-blue-500 text-white border-blue-200",
            CONTRA_OFERTA: "bg-orange-500 text-white border-orange-200",
            ACEITA: "bg-green-500 text-white border-green-200",
            RECUSADA: "bg-red-500 text-white border-red-200",
            CANCELADA: "bg-gray-500 text-white border-gray-200",
            EXPIRADA: "bg-yellow-500 text-white border-yellow-200",
        };
        return colors[status] || "bg-gray-500/10 text-gray-700 border-gray-200";
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
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                    <CardContent className="py-8 text-center text-gray-600">
                        Nenhuma negociação encontrada
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {negotiations.map((negotiation, index) => (
                        <motion.div
                            key={negotiation.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.05 * index }}
                            className="w-full h-full"
                        >
                            <Card 
                                onClick={() => navigate(`/vehicles/negotiations/${negotiation.id}`)}
                                className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-none hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer group"
                            >
                                {/* Header com imagem */}
                                <div className="relative overflow-hidden mt-0 pt-0">
                                    <div className="overflow-hidden pt-0 mt-0">
                                        <VehicleImages 
                                            imageUrl={negotiation.vehicle?.mainImage}
                                        />
                                    </div>

                                    {/* Badge de status no canto superior esquerdo */}
                                    <Badge
                                        variant="secondary"
                                        className={`absolute top-2 left-2 text-[10px] px-1.5 py-0.5 h-auto backdrop-blur-sm border-0 ${getStatusColor(negotiation.status)}`}
                                    >
                                        {statusFilters[negotiation.status as keyof typeof statusFilters] || negotiation.status}
                                    </Badge>

                                    {/* Data no canto superior direito */}
                                    <Badge
                                        variant="secondary"
                                        className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 h-auto backdrop-blur-sm border-0"
                                    >
                                        <Clock size={10} className="mr-1" />
                                        {format(new Date(negotiation.updatedAt), "dd/MM", { locale: ptBR })}
                                    </Badge>
                                </div>

                                {/* Conteúdo principal */}
                                <CardContent className="p-3 space-y-2 flex-1">
                                    {/* Título do veículo */}
                                    <div>
                                        <h3 className="font-semibold text-lg md:text-xl leading-tight text-gray-900 dark:text-gray-100 line-clamp-1">
                                            {negotiation.vehicle?.marca || 'Marca não informada'} {negotiation.vehicle?.modelo || ''}
                                        </h3>
                                        
                                        {/* Informações secundárias em uma linha compacta */}
                                        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={10} />
                                                {negotiation.vehicle?.anoFabricacao || 'N/I'}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 truncate">
                                                <User size={10} />
                                                {negotiation.comprador?.nome ? negotiation.comprador.nome : 'Você'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Preços - elemento principal */}
                                    <div className="pt-1 space-y-2">
                                        {/* Preço ofertado */}
                                        <div>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                                                Oferta
                                            </p>
                                            <p className="text-base font-bold text-gray-900 dark:text-white leading-none">
                                                {formatPrice(negotiation.precoOfertado)}
                                            </p>
                                        </div>

                                        {/* Preço negociado (se existir) */}
                                        {negotiation.precoNegociado && (
                                            <div>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                                                    Negociado
                                                </p>
                                                <div className="flex items-baseline gap-1">
                                                    <p className="text-base font-bold text-green-600 dark:text-green-400 leading-none">
                                                        {formatPrice(negotiation.precoNegociado)}
                                                    </p>
                                                    {negotiation.precoNegociado !== negotiation.precoOfertado && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-green-500/10 text-green-700 text-[9px] px-1 py-0 h-auto"
                                                        >
                                                            {negotiation.precoNegociado > negotiation.precoOfertado ? '+' : ''}
                                                            {((negotiation.precoNegociado - negotiation.precoOfertado) / negotiation.precoOfertado * 100).toFixed(1)}%
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Data de atualização compacta */}
                                    <div className="pt-1">
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                            Atualizado em {format(new Date(negotiation.updatedAt), "dd/MM/yy 'às' HH:mm", { locale: ptBR })}
                                        </p>
                                    </div>
                                </CardContent>

                                {/* Footer com botão */}
                                <CardFooter className="p-3 pt-0">
                                    <Button
                                        variant="default"
                                        className="w-full h-8 text-xs rounded-md bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-all duration-300 group"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/vehicles/negotiations/${negotiation.id}`);
                                        }}
                                    >
                                        Ver detalhes
                                        <ChevronRight
                                            size={12}
                                            className="ml-1 group-hover:translate-x-0.5 transition-transform duration-300"
                                        />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};