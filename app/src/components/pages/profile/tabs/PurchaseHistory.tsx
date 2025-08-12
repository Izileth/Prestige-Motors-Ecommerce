import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSale from "~/src/hooks/useSale";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/src/components/ui/table";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { ShoppingCart, Loader2, Filter, ChevronDown, ChevronUp } from "lucide-react";
import type { Sale } from "~/src/types/sale";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input } from "~/src/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/src/components/ui/dropdown-menu";

import { useNavigate } from "react-router";

import { useIsMobile } from "~/src/hooks/use-mobile";
interface PurchaseHistoryProps {
  purchases: Sale[];
  userId: string;
  initialPurchases?: Sale[]; 
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ userId, initialPurchases = [] }) => {
  const { purchases, fetchPurchasesByUser, loadingStates } = useSale();
  const [filteredPurchases, setFilteredPurchases] = useState<Sale[]>(initialPurchases);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const isMobile = useIsMobile();

  const router = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchPurchasesByUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    let result = purchases || initialPurchases;
    
    // Aplicar filtro de busca
    if (searchTerm) {
      result = result.filter(purchase => 
        purchase.vehicle?.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.vehicle?.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.formaPagamento.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aplicar filtro de status
    if (statusFilter) {
      result = result.filter(purchase => purchase.status === statusFilter);
    }
    
    // Aplicar ordenação
    if (sortConfig !== null) {
      result = [...result].sort((a, b) => {
        if (sortConfig.key === 'dataVenda') {
          const dateA = new Date(a.dataVenda).getTime();
          const dateB = new Date(b.dataVenda).getTime();
          return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
        } else if (sortConfig.key === 'precoVenda') {
          return sortConfig.direction === 'ascending' 
            ? a.precoVenda - b.precoVenda 
            : b.precoVenda - a.precoVenda;
        }
        return 0;
      });
    }
    
    setFilteredPurchases(result);
  }, [purchases, initialPurchases, searchTerm, statusFilter, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const statusOptions = [
    { value: null, label: 'Todos' },
    { value: 'PENDENTE', label: 'Pendentes' },
    { value: 'CONCLUIDA', label: 'Concluídas' },
    { value: 'CANCELADA', label: 'Canceladas' },
    { value: 'EM_NEGOCIACAO', label: 'Em Negociação' },
  ];

  if (loadingStates.fetchingStats) {
    return (
      <Card className="border-0 shadow-none  bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Minhas Compras</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gray-400 dark:text-gray-600" size={32} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none bg-white dark:bg-gray-900 px-0 mx-0">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-gray-900 dark:text-gray-100">Minhas Compras</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Histórico de compras de veículos
            </CardDescription>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              placeholder="Buscar veículo ou pagamento..."
              className="max-w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter size={16} />
                  {statusOptions.find(opt => opt.value === statusFilter)?.label || 'Filtrar'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {statusOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value || 'all'} 
                    onClick={() => setStatusFilter(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredPurchases && filteredPurchases.length > 0 ? (
          <div className="rounded-lg border-none shadow-none border-gray-100 dark:border-gray-800 overflow-hidden">
            {isMobile ? (
              <div className="space-y-4 border-t border-gray-200">
                {filteredPurchases.map((sale) => (
                  <Card key={sale.id} className="p-4 border-0 shadow-none dark:bg-gray-900">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {sale.vehicle
                            ? `${sale.vehicle.marca} ${sale.vehicle.modelo}`
                            : "Veículo não encontrado"}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {format(new Date(sale.dataVenda), "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      </div>
                      <Badge
                        variant={
                          sale.status === "CONCLUIDA"
                            ? "default"
                            : sale.status === "CANCELADA"
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          sale.status === "CONCLUIDA"
                            ? "bg-black text-white dark:bg-white dark:text-black border-0"
                            : sale.status === "CANCELADA"
                            ? "bg-red-600 text-white border-0"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-0"
                        }
                      >
                        {sale.status}
                      </Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Valor</p>
                        <p className="font-medium">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(sale.precoVenda)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pagamento</p>
                        <Badge variant="outline" className="border-gray-200 dark:border-gray-800">
                          {sale.formaPagamento}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 w-full bg-zinc-950 text-white"
                      onClick={() => router(`/sale/details/${sale.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900">
                    <TableHead 
                      className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer"
                      onClick={() => requestSort('dataVenda')}
                    >
                      <div className="flex items-center gap-1">
                        Veículo
                        {getSortIcon('dataVenda')}
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-medium">
                      Data
                    </TableHead>
                    <TableHead 
                      className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer"
                      onClick={() => requestSort('precoVenda')}
                    >
                      <div className="flex items-center gap-1">
                        Valor
                        {getSortIcon('precoVenda')}
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-medium">
                      Pagamento
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="text-right text-gray-700 dark:text-gray-300 font-medium">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPurchases.map((sale) => (
                    <TableRow
                      key={sale.id}
                      className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {sale.vehicle
                          ? `${sale.vehicle.marca} ${sale.vehicle.modelo} (${sale.vehicle.anoFabricacao})`
                          : "Veículo não encontrado"}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {format(new Date(sale.dataVenda), "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(sale.precoVenda)}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        <Badge
                          variant="outline"
                          className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {sale.formaPagamento}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sale.status === "CONCLUIDA"
                              ? "default"
                              : sale.status === "CANCELADA"
                              ? "destructive"
                              : "secondary"
                          }
                          className={
                            sale.status === "CONCLUIDA"
                              ? "bg-black text-white dark:bg-white dark:text-black border-0"
                              : sale.status === "CANCELADA"
                              ? "bg-red-600 text-white border-0"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-0"
                          }
                        >
                          {sale.status}

                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router(`/sale/details/${sale.id}`)}
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800"
          >
            <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">
              {searchTerm || statusFilter ? 'Nenhuma compra encontrada' : 'Nenhuma compra realizada'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || statusFilter
                ? 'Tente ajustar seus filtros de busca'
                : 'Você ainda não realizou nenhuma compra em nosso site.'}
            </p>
            <Button
              className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter(null);
                window.location.href = "/veiculos";
              }}
            >
              Explorar Veículos
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseHistory;