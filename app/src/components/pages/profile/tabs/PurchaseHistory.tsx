import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/src/components/ui/table";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import type { Sale } from "~/src/types/sale";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PurchaseHistoryProps {
  purchases: Sale[];
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ purchases }) => {
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Minhas Compras</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Histórico de compras de veículos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {purchases && purchases.length > 0 ? (
          <div className="rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900">
                  <TableHead className="text-gray-700 dark:text-gray-300 font-medium">Veículo</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-medium">Data</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-medium">Valor</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-medium">Pagamento</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300 font-medium">Status</TableHead>
                  <TableHead className="text-right text-gray-700 dark:text-gray-300 font-medium">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchases.map((sale) => (
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
                    <TableCell className="text-gray-700 dark:text-gray-300"></TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">
                      <Badge
                        variant="outline"
                        className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {/*{sale?.metodoPagamento}*/}
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
                        onClick={() => (window.location.href = `/compras/${sale.id}`)}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
              Nenhuma compra realizada
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Você ainda não realizou nenhuma compra em nosso site.
            </p>
            <Button
              className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
              onClick={() => (window.location.href = "/veiculos")}
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
