import type React from "react"
import type { Sale } from "~/src/types/sale"
import useSale from "~/src/hooks/useSale"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "~/src/components/ui/card"
import { Button } from "~/src/components/ui/button"
import { Separator } from "~/src/components/ui/separator"
import { Loader2, Car, User, DollarSign, Tag, Info, XCircle, CheckCircle2, Clock } from "lucide-react"

interface SaleDetailProps {
    sale: Sale
}

const SaleDetail: React.FC<SaleDetailProps> = ({ sale }) => {
    const { updateSale, loadingStates } = useSale()

    const handleStatusChange = async (newStatus: string) => {
        try {
        await updateSale(sale.id, { status: newStatus })
        } catch (error) {
        console.error("Erro ao atualizar status:", error)
        }
    }

    const getStatusBadgeClasses = (status: string) => {
        switch (status) {
        case "PENDENTE":
            return "bg-gray-50 text-gray-600 border-gray-200"
        case "EM_NEGOCIACAO":
            return "bg-gray-50 text-gray-600 border-gray-200"
        case "CONCLUIDA":
            return "bg-gray-50 text-gray-600 border-gray-200"
        case "CANCELADA":
            return "bg-gray-50 text-gray-600 border-gray-200"
        default:
            return "bg-gray-50 text-gray-600 border-gray-200"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
        case "PENDENTE":
            return <Clock className="h-4 w-4 mr-1.5" strokeWidth={1.5} />
        case "EM_NEGOCIACAO":
            return <Info className="h-4 w-4 mr-1.5" strokeWidth={1.5} />
        case "CONCLUIDA":
            return <CheckCircle2 className="h-4 w-4 mr-1.5" strokeWidth={1.5} />
        case "CANCELADA":
            return <XCircle className="h-4 w-4 mr-1.5" strokeWidth={1.5} />
        default:
            return null
        }
    }

    const currentYear = new Date().getFullYear()

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
        <Card className="border border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
            <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <Tag className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">Detalhes da Venda</CardTitle>
            </div>
            <div
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusBadgeClasses(sale.status)}`}
            >
                {getStatusIcon(sale.status)}
                {sale.status.replace(/_/g, " ")}
            </div>
            </CardHeader>

            <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vehicle Section */}
            <div className="space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
                <h3 className="text-lg font-medium text-gray-900 tracking-tight flex items-center gap-2">
                <Car className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                Veículo
                </h3>
                <Separator className="bg-gray-100" />
                {sale.vehicle?.imagem ? (
                <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                    src={sale.vehicle.imagem || "/placeholder.svg"}
                    alt={`${sale.vehicle.marca} ${sale.vehicle.modelo}`}
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
                    <dd className="font-light">{sale.vehicle?.marca || "N/A"}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Modelo:</dt>
                    <dd className="font-light">{sale.vehicle?.modelo || "N/A"}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Ano:</dt>
                    <dd className="font-light">{sale.vehicle?.anoFabricacao || "N/A"}</dd>
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
                        <dd className="font-light">{sale.comprador?.nome || "N/A"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-800">Email:</dt>
                        <dd className="font-light">{sale.comprador?.email || "N/A"}</dd>
                    </div>
                    </dl>
                </div>
                {/* Seller Info */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-2 mb-2">Vendedor</h4>
                    <dl className="space-y-1 text-sm text-gray-700">
                    <div>
                        <dt className="font-semibold text-gray-800">Nome:</dt>
                        <dd className="font-light">{sale.vendedor?.nome || "N/A"}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-800">Email:</dt>
                        <dd className="font-light">{sale.vendedor?.email || "N/A"}</dd>
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
                    <dd className="font-light">R$ {sale.precoVenda?.toLocaleString("pt-BR") || "N/A"}</dd>
                </div>
                <div>
                    <dt className="font-semibold text-gray-800">Forma de Pagamento:</dt>
                    <dd className="font-light">{sale.formaPagamento || "N/A"}</dd>
                </div>
                {sale.parcelas && (
                    <div>
                    <dt className="font-semibold text-gray-800">Parcelas:</dt>
                    <dd className="font-light">{sale.parcelas}x</dd>
                    </div>
                )}
                <div>
                    <dt className="font-semibold text-gray-800">Data:</dt>
                    <dd className="font-light">
                    {sale.dataVenda ? new Date(sale.dataVenda).toLocaleDateString("pt-BR") : "N/A"}
                    </dd>
                </div>
                {sale.observacoes && (
                    <div>
                    <dt className="font-semibold text-gray-800">Observações:</dt>
                    <dd className="font-light">{sale.observacoes}</dd>
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
                {["PENDENTE", "EM_NEGOCIACAO", "CONCLUIDA", "CANCELADA"].map((status) => (
                    <Button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={loadingStates.updating || sale.status === status}
                    className={`
                        ${
                        sale.status === status
                            ? "bg-gray-900 text-white hover:bg-gray-800"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }
                        transition-all duration-200 font-medium tracking-tight px-4 py-2.5
                    `}
                    >
                    {loadingStates.updating && sale.status !== status ? (
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

        {/* Copyright Notice */}
        <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center font-light tracking-wide">
            © {currentYear} Vehicle Sales Management. All rights reserved.
            </p>
        </div>
        </div>
  )
}

export default SaleDetail
