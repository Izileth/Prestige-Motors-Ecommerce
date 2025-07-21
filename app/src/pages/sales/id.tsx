import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useSale from '~/src/hooks/useSale';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardFooter 
} from '~/src/components/ui/card';
import { Button } from '~/src/components/ui/button';
import { Separator } from '~/src/components/ui/separator';
import { 
    Loader2, 
    Car, 
    User, 
    DollarSign, 
    Tag, 
    Info, 
    CheckCircle2,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import DashboardSkeleton from '~/src/components/layout/skeleton/dashboard';

const SaleDetailPage = () => {
    const { saleId } = useParams<{ saleId: string }>();
    const { 
        currentSale, 
        fetchSaleById, 
        loadingStates,
        updateSale
    } = useSale();
    const navigate = useNavigate();


    useEffect(() => {
        if (saleId) {
        fetchSaleById(saleId);
        }
        
    }, [saleId]);

    const handleStatusChange = async (newStatus: string) => {
        if (!saleId) return;
        
        try {
        await updateSale(saleId, { status: newStatus });
        await fetchSaleById(saleId);
        } catch (error) {
        console.error("Erro ao atualizar status:", error);
        }
    };
    

    // Formata a data da venda
    const formattedDate = useMemo(() => {
        if (!currentSale?.dataVenda) return "N/A";
        return format(new Date(currentSale.dataVenda), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }, [currentSale?.dataVenda]);

    // Formata o preço
    const formattedPrice = useMemo(() => {
        if (!currentSale?.precoVenda) return "N/A";
        return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
        }).format(currentSale.precoVenda);
    }, [currentSale?.precoVenda]);

    if (loadingStates.fetchingSale) {
        return (
            <DashboardSkeleton />
        );
    }

    if (!currentSale) {
        return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Venda não encontrada</h2>
            <p className="text-gray-600 mt-2">
                A venda solicitada não foi encontrada ou você não tem permissão para acessá-la.
            </p>
            </div>
            <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
            </Button>
        </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
            <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
            >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para vendas
            </Button>
        </div>

        <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                    <Tag className="h-5 w-5 text-gray-600" />
                </div>
                <CardTitle className="text-gray-900 font-medium text-xl">
                    Venda #{currentSale.id.slice(-8).toUpperCase()}
                </CardTitle>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${
                currentSale.status === 'CONCLUIDA' 
                    ? 'bg-green-50 text-green-600 border-green-200' 
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                {currentSale.status === 'CONCLUIDA' && (
                    <CheckCircle2 className="inline mr-1.5 h-4 w-4" />
                )}
                {currentSale.status.replace(/_/g, " ")}
                </div>
            </div>
            </CardHeader>

            <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Seção do Veículo */}
            <div className="space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Car className="h-5 w-5 text-gray-600" />
                Veículo
                </h3>
                <Separator className="bg-gray-100" />
                {currentSale.vehicle?.imagens?.find(img => img.isMain)?.url ? (
                    <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                            src={currentSale.vehicle.imagens.find(img => img.isMain)?.url}
                            alt={`${currentSale.vehicle.marca} ${currentSale.vehicle.modelo}`}
                            className="transition-transform duration-300 hover:scale-105 h-full w-full object-cover"
                        />
                    </div>
                ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                    <Car className="h-12 w-12 text-gray-400" />
                </div>
                )}
                <dl className="space-y-2 text-sm">
                <div>
                    <dt className="font-semibold text-gray-800">Marca:</dt>
                    <dd>{currentSale.vehicle?.marca || "N/A"}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Modelo:</dt>
                    <dd>{currentSale.vehicle?.modelo || "N/A"}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Ano:</dt>
                    <dd>{currentSale.vehicle?.anoFabricacao || "N/A"}</dd>
                </div>
                </dl>
            </div>

            {/* Seção das Partes Envolvidas */}
            <div className="space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                Partes Envolvidas
                </h3>
                <Separator className="bg-gray-100" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">
                    Comprador
                    </h4>
                    <dl className="space-y-1 text-sm">
                    <div>
                        <dt className="font-semibold text-gray-800">Nome:</dt>
                        <dd>{currentSale.comprador?.nome || "N/A"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-800">Email:</dt>
                        <dd>{currentSale.comprador?.email || "N/A"}</dd>
                    </div>
                    </dl>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">
                    Vendedor
                    </h4>
                    <dl className="space-y-1 text-sm">
                    <div>
                        <dt className="font-semibold text-gray-800">Nome:</dt>
                        <dd>{currentSale.vendedor?.nome || "N/A"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-800">Email:</dt>
                        <dd>{currentSale.vendedor?.email || "N/A"}</dd>
                    </div>
                    </dl>
                </div>
                </div>
            </div>

            {/* Seção da Transação */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-600" />
                Transação
                </h3>
                <Separator className="bg-gray-100" />
                <dl className="space-y-2 text-sm">
                <div>
                    <dt className="font-semibold text-gray-800">Preço:</dt>
                    <dd>{formattedPrice}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Forma de Pagamento:</dt>
                    <dd>{currentSale.formaPagamento || "N/A"}</dd>
                </div>
                {currentSale.parcelas && (
                    <div>
                    <dt className="font-semibold text-gray-800">Parcelas:</dt>
                    <dd>{currentSale.parcelas}x</dd>
                    </div>
                )}
                <div>
                    <dt className="font-semibold text-gray-800">Data:</dt>
                    <dd>{formattedDate}</dd>
                </div>
                {currentSale.observacoes && (
                    <div>
                    <dt className="font-semibold text-gray-800">Observações:</dt>
                    <dd className="whitespace-pre-line">{currentSale.observacoes}</dd>
                    </div>
                )}
                </dl>
            </div>
            </CardContent>

            {/* Seção de Ações */}
            <CardFooter className="border-t border-gray-100 px-6 py-5">
            <div className="w-full space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-600" />
                Ações
                </h3>
                <Separator className="bg-gray-100" />
                <div className="flex flex-wrap gap-3">
                <Button
                    onClick={() => handleStatusChange('CONCLUIDA')}
                    disabled={loadingStates.updating || currentSale.status === 'CONCLUIDA'}
                    variant={currentSale.status === 'CONCLUIDA' ? 'default' : 'outline'}
                >
                    {loadingStates.updating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    )}
                    Marcar como Concluída
                </Button>
                <Button variant="outline" onClick={() => navigate(-1)}>
                    Voltar
                </Button>
                </div>
            </div>
            </CardFooter>
        </Card>
        </div>
    );
};

export default SaleDetailPage;