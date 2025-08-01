import type React from "react"
import type { Sale } from "~/src/types/sale"
import useSale from "~/src/hooks/useSale"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "~/src/components/ui/card"
import { Button } from "~/src/components/ui/button"
import { Separator } from "~/src/components/ui/separator"
import { Loader2, Car, User, DollarSign, Tag, Info, XCircle, CheckCircle2, Clock } from "lucide-react"
import { useEffect } from "react"

interface SaleDetailProps {
    sale: Sale
}

const SaleDetail: React.FC<SaleDetailProps> = ({ sale }) => {
    const { updateSale, loadingStates, currentSale, fetchSaleById } = useSale()
   
    const displaySale = currentSale || sale

    const handleStatusChange = async (newStatus: string) => {
        try {
            const updatedSale = await updateSale(sale.id, { status: newStatus })
 
            if (updatedSale) {
                await fetchSaleById(sale.id)
            }
            
            console.log("Status atualizado com sucesso:", newStatus)
        } catch (error) {
            console.error("Erro ao atualizar status:", error)
        }
    }

    // Sincronizar currentSale quando o componente monta
    useEffect(() => {
        if (sale && (!currentSale || currentSale.id !== sale.id)) {
            fetchSaleById(sale.id)
        }
    }, [sale.id])

    const getStatusBadgeClasses = (status: string) => {
        switch (status) {
        case "CONCLUIDA":
            return "bg-green-50 text-green-600 border-green-200"
        default:
            return "bg-gray-50 text-gray-600 border-gray-200"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
        case "CONCLUIDA":
            return <CheckCircle2 className="h-4 w-4 mr-1.5" strokeWidth={1.5} />
        default:
            return null
        }
    }

    const currentYear = new Date().getFullYear()

    return (
        <div className="w-full max-w-full mx-auto px-0 py-4">
        <Card className=" border-none shadow-none bg-white transition-all duration-200 px-0 py-4 ">
            <CardHeader className="border-none border-gray-100 bg-gray-50/30 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <Tag className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">
                    Detalhes da Venda #{displaySale.id.slice(-8)}
                </CardTitle>
            </div>
            <div
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusBadgeClasses(displaySale.status)}`}
            >
                {getStatusIcon(displaySale.status)}
                {displaySale.status.replace(/_/g, " ")}
            </div>
            </CardHeader>

            <CardContent className="px-0 py-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vehicle Section */}
            <div className="space-y-4 border-none lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <h3 className="text-lg font-medium text-gray-900 tracking-tight flex items-center gap-2">
                <Car className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                Veículo
                </h3>
                <Separator className="bg-gray-100" />
                {displaySale.vehicle?.imagemPrincipal ? (
                <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                    src={displaySale.vehicle.imagemPrincipal || "/placeholder.svg"}
                    alt={`${displaySale.vehicle.marca} ${displaySale.vehicle.modelo}`}
                    className="transition-transform duration-300 hover:scale-105 h-full w-full object-cover"
                    />
                </div>
                ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200 text-gray-400">
                    <Car className="h-12 w-12" strokeWidth={1} />
                </div>
                )}
                <dl className="space-y-2 text-sm text-gray-700">
                <div>
                    <dt className="font-semibold text-gray-800">Marca:</dt>
                    <dd className="font-light">{displaySale.vehicle?.marca || "N/A"}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Modelo:</dt>
                    <dd className="font-light">{displaySale.vehicle?.modelo || "N/A"}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Ano:</dt>
                    <dd className="font-light">{displaySale.vehicle?.anoFabricacao || "N/A"}</dd>
                </div>
                </dl>
            </div>

            {/* Parties Section */}
            <div className="space-y-6 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <h3 className="text-lg font-medium text-gray-900 tracking-tight flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                Partes Envolvidas
                </h3>
                <Separator className="bg-gray-100" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Buyer Info */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-2 mb-2">Comprador</h4>
                    <dl className="space-y-1 text-sm text-gray-700">
                    <div>
                        <dt className="font-semibold text-gray-800">Nome:</dt>
                        <dd className="font-light">{displaySale.comprador?.nome || "Não informado"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-800">Email:</dt>
                        <dd className="font-light text-sm">{displaySale.comprador?.email || "Não informado"}</dd>
                    </div>
                    </dl>
                </div>
                {/* Seller Info */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-2 mb-2">Vendedor</h4>
                    <dl className="space-y-1 text-xs text-gray-700">
                    <div>
                        <dt className="font-semibold text-gray-800">Nome:</dt>
                        <dd className="font-light">{displaySale.vendedor?.nome || "Não informado"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-800">Email:</dt>
                        <dd className="font-light">{displaySale.vendedor?.email || "Não informado"}</dd>
                    </div>
                    </dl>
                </div>
                </div>
            </div>

            {/* Transaction Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 tracking-tight flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                Transação
                </h3>
                <Separator className="bg-gray-100" />
                <dl className="space-y-2 text-sm text-gray-700">
                <div>
                    <dt className="font-semibold text-gray-800">Preço:</dt>
                    <dd className="font-light">R$ {displaySale.precoVenda?.toLocaleString("pt-BR") || "N/A"}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Forma de Pagamento:</dt>
                    <dd className="font-light">{displaySale.formaPagamento || "N/A"}</dd>
                </div>
                {displaySale.parcelas && (
                    <div>
                    <dt className="font-semibold text-gray-800">Parcelas:</dt>
                    <dd className="font-light">{displaySale.parcelas}x</dd>
                    </div>
                )}
                <div>
                    <dt className="font-semibold text-gray-800">Data:</dt>
                    <dd className="font-light">
                    {displaySale.dataVenda ? new Date(displaySale.dataVenda).toLocaleDateString("pt-BR") : "N/A"}
                    </dd>
                </div>
                {displaySale.observacoes && (
                    <div>
                    <dt className="font-semibold text-gray-800">Observações:</dt>
                    <dd className="font-light">{displaySale.observacoes}</dd>
                    </div>
                )}
                </dl>
            </div>
            </CardContent>

            <CardFooter className="border-t border-gray-100 px-6 py-5">
            <div className="w-full space-y-4">
                <h3 className="text-lg font-medium text-gray-900 tracking-tight flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                Ações de Status
                </h3>
                <Separator className="bg-gray-100" />
                <div className="flex flex-wrap gap-3">
                {["CONCLUIDA"].map((status) => (
                    <Button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={loadingStates.updating || displaySale.status === status}
                    className={`
                        ${
                        displaySale.status === status
                            ? "bg-gray-900 text-white hover:bg-gray-800"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }
                        transition-all duration-200 font-medium tracking-tight px-4 py-2.5
                    `}
                    >
                    {loadingStates.updating ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" strokeWidth={1.5} />
                    ) : (
                        getStatusIcon(status)
                    )}
                    {status.replace(/_/g, " ")}
                    </Button>
                ))}
                </div>
            </div>
            </CardFooter>
        </Card>

   
        </div>
  )
}

export default SaleDetail