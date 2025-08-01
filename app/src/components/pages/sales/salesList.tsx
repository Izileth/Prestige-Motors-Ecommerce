
import type React from "react"
import type { Sale } from "~/src/types/sale"
import { Card, CardContent, CardHeader, CardTitle } from "~/src/components/ui/card"
import { Separator } from "~/src/components/ui/separator"
import { Car, User, DollarSign, CalendarDays, Tag, Search } from "lucide-react"


interface SalesListProps {
    sales: Sale[]
    onSelectSale: (sale: Sale) => void
    title?: string
}

const SalesList: React.FC<SalesListProps> = ({ sales, onSelectSale, title }) => {
    const getStatusBadgeClasses = (status: string) => {
        switch (status) {
        case "CONCLUIDA":
            return "bg-gray-50 text-gray-600 border-gray-200"
        default:
            return "bg-gray-50 text-gray-600 border-gray-200"
        }
    }
    
    return (
        <div className="w-full max-w-full mx-auto py-2 px-0">
        <Card className=" border-none shadow-none bg-white transition-all duration-200 px-0">
            <CardHeader className="border-b border-gray-100 bg-gray-50/30  py-5 flex items-center gap-2">
            <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <Tag className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            </div>
            <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">
                {title || "Vendas Recentes"}
            </CardTitle>
            </CardHeader>

            <CardContent className="py-6">
            {sales.length === 0 ? (
                <div className="text-center py-16 rounded-lg border-none shadow-none">
                <div className="max-w-sm mx-auto">
                    <div className="p-4 bg-white border border-gray-200 rounded-full w-fit mx-auto mb-6">
                    <Search className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-gray-900 tracking-tight">Nenhuma venda encontrada</h3>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">
                    Parece que não há vendas registradas no momento.
                    </p>
                </div>
                </div>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-0">
                {sales.map((sale) => (
                    <li key={sale.id}>
                    <Card
                        onClick={() => onSelectSale(sale)}
                        className="group cursor-pointer  border-none shadow-none  transition-all duration-200 bg-white h-full flex flex-col px-0"
                    >
                        <CardContent className="p-4 flex flex-col h-full px-0">
                        <div className="flex items-center gap-3 mb-3">
                            {sale.vehicle?.imagemPrincipal ? (
                            <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                                <img
                                src={sale.vehicle.imagemPrincipal || "/placeholder.svg"}
                                alt={`${sale.vehicle.marca} ${sale.vehicle.modelo}`}
                                className="transition-transform duration-300 group-hover:scale-105 object-center object-cover fill-accent-foreground"
                                />
                            </div>
                            ) : (
                            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200 text-gray-400 shrink-0">
                                <Car className="h-8 w-8" strokeWidth={1} />
                            </div>
                            )}
                            <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-base truncate">
                                {sale.vehicle?.marca} {sale.vehicle?.modelo}
                            </h4>
                            <p className="text-sm text-gray-600 font-light truncate">
                                {sale.vehicle?.anoFabricacao || "Ano N/A"}
                            </p>
                            </div>
                        </div>

                        <Separator className="bg-gray-100 my-3" />

                        <div className="flex-1 space-y-2 text-sm text-gray-700">
                            <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800 flex items-center gap-1">
                                <User className="h-3.5 w-3.5 text-gray-500" strokeWidth={1.5} />
                                Comprador:
                            </span>
                            <span className="font-light text-right truncate max-w-[60%]">
                                {sale.comprador?.nome || "Oculto"}
                            </span>
                            </div>
                            <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800 flex items-center gap-1">
                                <DollarSign className="h-3.5 w-3.5 text-gray-500" strokeWidth={1.5} />
                                Preço:
                            </span>
                            <span className="font-light">R$ {sale.precoVenda?.toLocaleString("pt-BR") || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800 flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5 text-gray-500" strokeWidth={1.5} />
                                Data:
                            </span>
                            <span className="font-light">
                                {sale.dataVenda ? new Date(sale.dataVenda).toLocaleDateString("pt-BR") : "N/A"}
                            </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                            <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClasses(sale.status)}`}
                            >
                            {sale.status.replace(/_/g, " ")}
                            </span>
                        </div>
                        </CardContent>
                    </Card>
                    </li>
                ))}
                </ul>
            )}
            </CardContent>
        </Card>
   
        </div>
    )
}

export default SalesList
