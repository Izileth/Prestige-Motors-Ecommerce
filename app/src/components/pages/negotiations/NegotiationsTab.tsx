import { motion } from "framer-motion";
import { MessageSquare, Filter, Loader2, RefreshCw } from "lucide-react";
import { NegotiationList } from "./NegociationsList";
import { useNegotiations } from "~/src/hooks/useNegociation";
import { Button } from "../../ui/button";
import { useState, useCallback, useEffect } from "react";
import { EmptyState } from "./EmpyState";
import type { NegotiationStatus } from "~/src/types/negociation";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const NegotiationsTab = () => {
    const [statusFilter, setStatusFilter] = useState<NegotiationStatus | undefined>();
    
    const {
        negotiations,
        isLoading,
        error,
        fetchNegotiations,
        clearErrors
    } = useNegotiations({
        status: statusFilter,
        autoFetch: true
    });

    // Limpa erros quando o componente monta
    useEffect(() => {
        clearErrors();
    }, [clearErrors]);

    // Função para alterar filtro de status
    const handleStatusFilter = useCallback((status?: string) => {
        setStatusFilter(status as NegotiationStatus | undefined);
        // Não precisa chamar fetchNegotiations aqui, 
        // o hook já fará isso automaticamente quando o status mudar
    }, []);

    // Função para recarregar manualmente
    const handleRefresh = useCallback(() => {
        clearErrors();
        fetchNegotiations();
    }, [fetchNegotiations, clearErrors]);

    // Função para limpar filtros
    const handleClearFilters = useCallback(() => {
        setStatusFilter(undefined);
    }, []);

    return (
        <motion.div
            key="negotiations"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            variants={containerVariants}
            className="space-y-8"
        >
            <motion.div 
                variants={itemVariants}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100">
                    Minhas Negociações
                </h2>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isLoading}
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Atualizar
                    </Button>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearFilters}
                        disabled={!statusFilter || isLoading}
                    >
                        Limpar filtros
                    </Button>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const newFilter = statusFilter ? undefined : 'ABERTA';
                            handleStatusFilter(newFilter);
                        }}
                        disabled={isLoading}
                    >
                        <Filter className="mr-2 h-4 w-4" />
                        {statusFilter ? 'Filtrando' : 'Filtrar'}
                    </Button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                ) : error ? (
                    <div className="py-12 text-center space-y-4">
                        <div className="text-red-500 mb-4">
                            Ocorreu um erro ao carregar as negociações
                        </div>
                        <div className="text-sm text-gray-500 mb-4">
                            {error}
                        </div>
                        <Button 
                            onClick={handleRefresh}
                            variant="outline"
                            size="sm"
                        >
                            Tentar novamente
                        </Button>
                    </div>
                ) : negotiations.length === 0 ? (
                    <EmptyState
                        icon={<MessageSquare className="h-8 w-8" />}
                        title={
                            statusFilter
                                ? `Nenhuma negociação ${statusFilter.toLowerCase()} encontrada`
                                : "Nenhuma negociação encontrada"
                        }
                        description={
                            statusFilter
                                ? "Você não possui negociações com este status no momento"
                                : "Quando você iniciar negociações, elas aparecerão aqui"
                        }
                    />
                ) : (
                    <NegotiationList
                        negotiations={negotiations}
                        onStatusFilter={handleStatusFilter}
                        currentStatusFilter={statusFilter}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};