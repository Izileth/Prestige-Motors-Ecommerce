
import React, { useEffect, useCallback, useMemo, useRef } from "react";
import useSale from "~/src/hooks/useSale";
import { useAuth } from "~/src/hooks/useAuth";
import SalesStats from "~/src/components/pages/sales/saleStats";
import SalesList from "~/src/components/pages/sales/salesList";
import SaleDetail from "~/src/components/pages/sales/salesDetail";
import CreateSaleForm from "~/src/components/pages/sales/salesForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/src/components/ui/tabs";
import { Loader2, LayoutDashboard, BarChart2, ListOrdered, PlusCircle } from "lucide-react";
import DashboardSkeleton from "~/src/components/layout/skeleton/dashboard";
const SalesDashboard = () => {
    const {
        currentSale,
        stats,
        transactions,
        loadingStates,
        fetchGlobalSalesStats,
        fetchUserSalesStats,
        getUserTransactions,
        setCurrentSale,
    } = useSale();
    
    const { user } = useAuth();
    
    // Refs para controlar carregamento
    const hasLoadedGlobalStats = useRef(false);
    const hasLoadedUserStats = useRef(false);
    const hasLoadedTransactions = useRef(false);
    const lastUserIdRef = useRef("");
    const isMountedRef = useRef(true);
    
    // Cleanup no unmount
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Memoize user data to prevent unnecessary re-renders
    const { id: userId, role } = useMemo(() => ({
        id: user?.id || "",
        role: user?.role || "USER"
    }), [user]);

    const isAdmin = useMemo(() => role === "ADMIN", [role]);

    // Reset flags quando usuário muda
    useEffect(() => {
        if (userId && lastUserIdRef.current !== userId) {
            hasLoadedGlobalStats.current = false;
            hasLoadedUserStats.current = false;
            hasLoadedTransactions.current = false;
            lastUserIdRef.current = userId;
        }
    }, [userId]);

    // Função para buscar stats globais - REMOVIDO stats.global das dependências
    const fetchAdminData = useCallback(async () => {
        if (!userId || !isMountedRef.current) return;
        
        try {
            // Verifica se já tem dados E se já carregou - APENAS STATS GLOBAIS
            if (!stats.global && !hasLoadedGlobalStats.current && !loadingStates.fetchingStats) {
                console.log("Buscando stats globais...");
                hasLoadedGlobalStats.current = true;
                await fetchGlobalSalesStats();
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
            // Reset em caso de erro
            hasLoadedGlobalStats.current = false;
        }
    }, [userId, fetchGlobalSalesStats, loadingStates.fetchingStats]);

    // Função para buscar dados do usuário - REMOVIDO transactions das dependências
    const fetchUserData = useCallback(async () => {
        if (!userId || !isMountedRef.current) return;
        
        try {
            const hasTransactions = transactions.asBuyer.length > 0 || transactions.asSeller.length > 0;
            
            // Busca transações
            if (!hasTransactions && !hasLoadedTransactions.current && !loadingStates.fetchingTransactions) {
                console.log("Buscando transações do usuário...");
                hasLoadedTransactions.current = true;
                await getUserTransactions(userId);
            }
            
            // Busca stats do usuário (necessário para usuários não-admin também)
            if (!stats.user && !hasLoadedUserStats.current && !loadingStates.fetchingStats) {
                console.log("Buscando stats do usuário...");
                hasLoadedUserStats.current = true;
                await fetchUserSalesStats(userId);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            hasLoadedTransactions.current = false;
            hasLoadedUserStats.current = false;
        }
    }, [userId, getUserTransactions, fetchUserSalesStats, loadingStates.fetchingTransactions, loadingStates.fetchingStats]);

    // Effect para carregar dados iniciais
    useEffect(() => {
        if (!userId) return;
        
        const loadData = async () => {
            if (isAdmin) {
                await fetchAdminData();
            }
            await fetchUserData();
        };
        
        loadData();
    }, [userId, isAdmin, fetchAdminData, fetchUserData]);

    // Memoized loading state
    const isLoading = useMemo(() => {
        const hasAnyData = stats.global || stats.user || 
                          transactions.asBuyer.length > 0 || 
                          transactions.asSeller.length > 0;
        
        return !hasAnyData && (
            loadingStates.fetchingStats || 
            loadingStates.fetchingTransactions
        );
    }, [
        loadingStates.fetchingStats, 
        loadingStates.fetchingTransactions,
        stats.global,
        stats.user,
        transactions.asBuyer.length,
        transactions.asSeller.length
    ]);

    // Memoized current year
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-auto w-full max-w-full">
                <DashboardSkeleton />
            </div>
        );
    }

    return (
        <div className="w-full max-w-full mx-auto p-4 space-y-6">
            <Card className="border border-gray-200 shadow-sm bg-white transition-all duration-200">
                <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-5 flex items-center gap-3">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg">
                        <LayoutDashboard className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">
                        {isAdmin ? "Dashboard de Vendas (Admin)" : "Meu Dashboard de Vendas"}
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6">
                    <div className="mb-8">
                        <SalesStats stats={stats.user} />
                    </div>

                    <Tabs defaultValue="transactions" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 h-auto p-1 bg-gray-100 border border-gray-200 rounded-lg">
                            <TabsTrigger
                                value="transactions"
                                className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:font-medium transition-all duration-200 py-2.5"
                            >
                                <ListOrdered className="h-4 w-4" strokeWidth={1.5} />
                                Minhas Transações
                            </TabsTrigger>
                            
                            {isAdmin && (
                                <TabsTrigger
                                    value="global-stats"
                                    className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:font-medium transition-all duration-200 py-2.5"
                                >
                                    <BarChart2 className="h-4 w-4" strokeWidth={1.5} />
                                    Estatísticas Globais
                                </TabsTrigger>
                            )}
                            
                            <TabsTrigger
                                value="create"
                                className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:font-medium transition-all duration-200 py-2.5"
                            >
                                <PlusCircle className="h-4 w-4" strokeWidth={1.5} />
                                Criar Nova Venda
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="transactions" className="mt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1">
                                    <Card className="border border-gray-200 shadow-sm bg-white">
                                        <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-4">
                                            <CardTitle className="text-gray-900 font-medium text-lg tracking-tight">
                                                Minhas Transações
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <Tabs defaultValue="purchases" className="w-full">
                                                <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-gray-100 border-b border-gray-200 rounded-none">
                                                    <TabsTrigger
                                                        value="purchases"
                                                        className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:font-medium transition-all duration-200 py-2.5"
                                                    >
                                                        Compras
                                                    </TabsTrigger>
                                                    <TabsTrigger
                                                        value="sales"
                                                        className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 data-[state=active]:font-medium transition-all duration-200 py-2.5"
                                                    >
                                                        Vendas
                                                    </TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="purchases" className="mt-0 p-4">
                                                    <SalesList
                                                        sales={transactions.asBuyer}
                                                        onSelectSale={setCurrentSale}
                                                        title="Minhas Compras"
                                                    />
                                                </TabsContent>
                                                <TabsContent value="sales" className="mt-0 p-4">
                                                    <SalesList
                                                        sales={transactions.asSeller}
                                                        onSelectSale={setCurrentSale}
                                                        title="Minhas Vendas"
                                                    />
                                                </TabsContent>
                                            </Tabs>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="lg:col-span-2">
                                    {currentSale ? (
                                        <SaleDetail sale={currentSale} />
                                    ) : (
                                        <Card className="border border-gray-200 shadow-sm bg-white h-full flex items-center justify-center">
                                            <CardContent className="text-center py-16 px-6 bg-gray-50/50 rounded-lg border border-gray-200 text-gray-600">
                                                <ListOrdered className="w-12 h-12 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
                                                <h3 className="text-lg font-medium mb-2 text-gray-900 tracking-tight">
                                                    Nenhum detalhe de venda selecionado
                                                </h3>
                                                <p className="text-gray-600 font-light text-sm leading-relaxed">
                                                    Selecione uma transação na lista à esquerda para ver seus detalhes completos.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {isAdmin && (
                            <TabsContent value="global-stats" className="mt-6">
                           
                            </TabsContent>
                        )}

                        <TabsContent value="create" className="mt-6">
                            <CreateSaleForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center font-light tracking-wide">
                    © {currentYear} Sales Dashboard. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SalesDashboard;