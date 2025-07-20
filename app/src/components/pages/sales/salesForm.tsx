import { useState } from "react"
import useSale from "~/src/hooks/useSale"
import VehicleSelector from "./salesVehcleSelector"
import UserSelector from "./salesUserSelector"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/src/components/ui/form"
import { Input } from "~/src/components/ui/input"
import { Textarea } from "~/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/src/components/ui/select"
import { Button } from "~/src/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardHeader, CardTitle, CardContent } from "~/src/components/ui/card"
import { Loader2, DollarSign, Car, User, CreditCard, FileText, Banknote, QrCode, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Separator } from "~/src/components/ui/separator"
import { Alert, AlertDescription } from "~/src/components/ui/alert"
import type { SaleData } from "~/src/types/sale"
import { VehicleCategory } from "~/src/types/enuns"

const formSchema = z.object({
    vehicleId: z.string().min(1, "Selecione um veículo"),
    compradorId: z.string().min(1, "Selecione um comprador"),
    precoVenda: z.number().min(1, "O preço deve ser maior que zero"),
    formaPagamento: z.enum(["À Vista", "Cartão de Crédito", "Financiamento", "Boleto", "PIX"], {
        error: "Selecione uma forma de pagamento",
    }),
    parcelas: z.number().min(1).max(36).optional(),
    categoria: z.nativeEnum(VehicleCategory),
    observacoes: z.string().optional(),
}).refine((data) => {
    // Se não for à vista, parcelas é obrigatório
    if (data.formaPagamento !== "À Vista" && !data.parcelas) {
        return false;
    }
    return true;
}, {
    message: "Número de parcelas é obrigatório para esta forma de pagamento",
    path: ["parcelas"],
});

const CreateSaleForm = () => {
    const { createSale, loadingStates } = useSale()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicleId: "",
            compradorId: "",
            precoVenda: 0,
            formaPagamento: "À Vista",
            parcelas: undefined,
            observacoes: "",
                  categoria: "HYPERCAR" // Ou qualquer valor padrão que você queira
        },
    })

    const paymentMethod = form.watch("formaPagamento")
    const selectedVehicle = form.watch("vehicleId")
    const selectedBuyer = form.watch("compradorId")

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        
        try {
            // Preparar dados para envio
            const saleData: SaleData = {
                vehicleId: values.vehicleId,
                compradorId: values.compradorId,
                precoVenda: values.precoVenda,
                formaPagamento: values.formaPagamento,
                parcelas: values.formaPagamento !== "À Vista" ? values.parcelas : undefined,
                observacoes: values.observacoes || undefined,
                categoria: values.categoria // Adiciona a categoria
            }

            await createSale(saleData)
            
            // Reset do formulário após sucesso
            form.reset({
                vehicleId: "",
                compradorId: "",
                precoVenda: 0,
                formaPagamento: "À Vista",
                parcelas: undefined,
                observacoes: "",
                categoria: "HYPERCAR" // Ou qualquer valor padrão que você queira
            })
            
            toast.success("Venda criada com sucesso!")
        } catch (error) {
            console.error("Erro ao criar venda:", error)
            toast.error("Erro ao criar venda. Tente novamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case "À Vista":
                return <Banknote className="h-4 w-4 mr-2" strokeWidth={1.5} />
            case "Cartão de Crédito":
                return <CreditCard className="h-4 w-4 mr-2" strokeWidth={1.5} />
            case "Financiamento":
                return <FileText className="h-4 w-4 mr-2" strokeWidth={1.5} />
            case "Boleto":
                return <FileText className="h-4 w-4 mr-2" strokeWidth={1.5} />
            case "PIX":
                return <QrCode className="h-4 w-4 mr-2" strokeWidth={1.5} />
            default:
                return null
        }
    }

    const handleClearForm = () => {
        form.reset({
            vehicleId: "",
            compradorId: "",
            precoVenda: 0,
            formaPagamento: "À Vista",
            parcelas: undefined,
            observacoes: "",
            categoria: "HYPERCAR" 
        })
        toast.info("Formulário limpo")
    }

    const currentYear = new Date().getFullYear()
    const isLoading = loadingStates.creating || isSubmitting

    return (
        <div className="w-full max-w-full mx-auto p-4">
            <Card className="border border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
                <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white border border-gray-200 rounded-lg">
                            <DollarSign className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                        </div>
                        <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">
                            Criar Nova Venda
                        </CardTitle>
                    </div>
                </CardHeader>
                
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Vehicle Selector */}
                            <FormField
                                control={form.control}
                                name="vehicleId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight flex items-center gap-2">
                                            <Car className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                                            Veículo *
                                        </FormLabel>
                                        <FormControl>
                                            <VehicleSelector
                                                selectedVehicle={field.value}
                                                onSelectVehicle={(vehicleId) => {
                                                    field.onChange(vehicleId)
                                                }}
                                                placeholder="Selecione o veículo para venda..."
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-gray-500 font-light">
                                            Selecione o veículo que está sendo vendido.
                                        </FormDescription>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoria"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight flex items-center gap-2">
                                            <Car className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                                            Categoria do Veículo *
                                        </FormLabel>
                                        <Select 
                                            onValueChange={field.onChange} 
                                            value={field.value}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white">
                                                    <SelectValue placeholder="Selecione a categoria" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white border-gray-200">
                                                {Object.entries(VehicleCategory).map(([key, value]) => (
                                                    <SelectItem key={key} value={value} className="hover:bg-gray-50">
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Buyer Selector */}
                            <FormField
                                control={form.control}
                                name="compradorId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                                            Comprador *
                                        </FormLabel>
                                        <FormControl>
                                            <UserSelector
                                                selectedUser={field.value}
                                                onSelectUser={(userId) => {
                                                    field.onChange(userId)
                                                }}
                                                placeholder="Selecione o comprador..."
                                                showEmail={true}
                                                showRole={false}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-gray-500 font-light">
                                            Selecione o cliente que está comprando o veículo.
                                        </FormDescription>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <Separator className="bg-gray-100 my-6" />

                            {/* Sale Price */}
                            <FormField
                                control={form.control}
                                name="precoVenda"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                                            Preço de Venda (R$) *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value) || 0
                                                    field.onChange(value)
                                                }}
                                                min="1"
                                                step="0.01"
                                                placeholder="Ex: 50000.00"
                                                disabled={isLoading}
                                                className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-gray-500 font-light">
                                            Informe o valor total da venda em reais.
                                        </FormDescription>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Payment Method */}
                            <FormField
                                control={form.control}
                                name="formaPagamento"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight flex items-center gap-2">
                                            <CreditCard className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                                            Forma de Pagamento *
                                        </FormLabel>
                                        <Select 
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                // Resetar parcelas se mudar para à vista
                                                if (value === "À Vista") {
                                                    form.setValue("parcelas", undefined)
                                                }
                                            }} 
                                            value={field.value}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white">
                                                    <SelectValue placeholder="Selecione a forma de pagamento" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white border-gray-200">
                                                <SelectItem value="À Vista" className="hover:bg-gray-50">
                                                    {getPaymentMethodIcon("À Vista")}À Vista
                                                </SelectItem>
                                                <SelectItem value="Cartão de Crédito" className="hover:bg-gray-50">
                                                    {getPaymentMethodIcon("Cartão de Crédito")}Cartão de Crédito
                                                </SelectItem>
                                                <SelectItem value="Financiamento" className="hover:bg-gray-50">
                                                    {getPaymentMethodIcon("Financiamento")}Financiamento
                                                </SelectItem>
                                                <SelectItem value="Boleto" className="hover:bg-gray-50">
                                                    {getPaymentMethodIcon("Boleto")}Boleto
                                                </SelectItem>
                                                <SelectItem value="PIX" className="hover:bg-gray-50">
                                                    {getPaymentMethodIcon("PIX")}PIX
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Number of Installments (conditional) */}
                            {paymentMethod !== "À Vista" && (
                                <FormField
                                    control={form.control}
                                    name="parcelas"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-gray-700 tracking-tight flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                                                Número de Parcelas *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value) || undefined
                                                        field.onChange(value)
                                                    }}
                                                    min="1"
                                                    max="36"
                                                    placeholder="Ex: 12"
                                                    disabled={isLoading}
                                                    className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs text-gray-500 font-light">
                                                Informe em quantas parcelas o valor será dividido (máx. 36).
                                            </FormDescription>
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* Observations */}
                            <FormField
                                control={form.control}
                                name="observacoes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                                            Observações
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                rows={4}
                                                placeholder="Informações adicionais sobre a venda, como condições especiais, detalhes de entrega, etc."
                                                disabled={isLoading}
                                                className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-gray-500 font-light">
                                            Adicione quaisquer notas ou detalhes relevantes para esta venda.
                                        </FormDescription>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Preview Card */}
                            {(selectedVehicle || selectedBuyer) && (
                                <Alert className="border-blue-200 bg-blue-50/50">
                                    <AlertCircle className="h-4 w-4 text-blue-600" />
                                    <AlertDescription className="text-blue-800">
                                        <strong>Resumo da Venda:</strong>
                                        <div className="mt-2 text-sm space-y-1">
                                            {selectedVehicle && <div>• Veículo: {selectedVehicle}</div>}
                                            {selectedBuyer && <div>• Comprador: {selectedBuyer}</div>}
                                            {form.watch("precoVenda") > 0 && (
                                                <div>• Valor: R$ {form.watch("precoVenda").toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                                            )}
                                            {paymentMethod && <div>• Pagamento: {paymentMethod}</div>}
                                            {form.watch("parcelas") && <div>• Parcelas: {form.watch("parcelas")}x</div>}
                                            {form.watch("categoria") && <div>• Categoria: {form.watch("categoria")}</div>} 
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClearForm}
                                    disabled={isLoading}
                                    className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium tracking-tight px-4 py-2.5"
                                >
                                    Limpar Formulário
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-6 py-2.5 transition-all duration-200 font-medium tracking-tight"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />
                                            Criando Venda...
                                        </>
                                    ) : (
                                        <>
                                            <DollarSign className="mr-2 h-4 w-4" strokeWidth={1.5} />
                                            Criar Venda
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Copyright Notice */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center font-light tracking-wide">
                    © {currentYear} Prestige Motors | Todos os Direitos Reservados
                </p>
            </div>
        </div>
    )
}

export default CreateSaleForm