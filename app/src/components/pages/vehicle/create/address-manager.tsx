import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/src/components/ui/button"
import { Input } from "~/src/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/src/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/src/components/ui/form"
import { Loader2, MapPin, CheckCircle2, Trash2, Building2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { useVehicleAddress } from "~/src/hooks/useVehiclesAddress"
import { useNavigate } from "react-router"
import { addressSchema } from "~/src/schemas/schema"
import type { AddressFormData } from "~/src/schemas/schema"

interface VehicleAddressManagerProps {
  vehicleId: string
  onSuccess?: () => void
}

export function VehicleAddressManager({ vehicleId, onSuccess }: VehicleAddressManagerProps) {
  const { currentAddress, success, loading, error, createAddress, updateAddress, removeAddress, getAddress } =
    useVehicleAddress()

  const router = useNavigate()

  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [hasLoadError, setHasLoadError] = useState(false)

  // Configuração do React Hook Form
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "Brasil",
    },
  })

  // Load address on component mount
  useEffect(() => {
    const loadAddress = async () => {
      if (vehicleId) {
        setIsInitialLoading(true)
        setHasLoadError(false)
        
        try {
          await getAddress(vehicleId)
          setHasLoadError(false)
        } catch (err: any) {
          // Apenas mostra erro se não for "endereço não encontrado"
          if (err?.message && !err.message.includes('não encontrado') && !err.message.includes('not found')) {
            setHasLoadError(true)
            toast.error("Erro ao carregar dados do endereço")
          }
        } finally {
          setIsInitialLoading(false)
        }
      }
    }

    loadAddress()
  }, [vehicleId, getAddress])

  // Populate form when address is loaded
  useEffect(() => {
    if (currentAddress) {
      form.reset({
        cep: currentAddress.cep || "",
        logradouro: currentAddress.logradouro || "",
        numero: currentAddress.numero || "",
        complemento: currentAddress.complemento || "",
        bairro: currentAddress.bairro || "",
        cidade: currentAddress.cidade || "",
        estado: currentAddress.estado || "",
        pais: currentAddress.pais || "Brasil",
      })
    } else {
      form.reset({
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "Brasil",
      })
    }
  }, [currentAddress, form])

  // Visual feedback for operations
  useEffect(() => {
    if (success && (isSubmitting || isRemoving)) {
      const message = isRemoving ? "Endereço removido com sucesso!" : 
                     currentAddress ? "Endereço atualizado com sucesso!" : "Endereço adicionado com sucesso!"
      
      toast.success(message, {
        action: {
          label: "Ver veículo",
          onClick: () => router(`/vehicles/${vehicleId}`)
        },
        duration: 3000
      })
      
      onSuccess?.()
      
      // Reset estados
      setIsSubmitting(false)
      setIsRemoving(false)
      
      // Redireciona após delay
      setTimeout(() => router(`/vehicles/${vehicleId}`), 1500)
    }
  }, [success, isSubmitting, isRemoving, currentAddress, onSuccess, router, vehicleId])

  // Tratamento de erro
  useEffect(() => {
    if (error && (isSubmitting || isRemoving)) {
      toast.error(error)
      setIsSubmitting(false)
      setIsRemoving(false)
    }
  }, [error, isSubmitting, isRemoving])

  // Submit handler
  const onSubmit = async (data: AddressFormData) => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    const addressData = {
      cep: data.cep,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento || undefined,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      pais: data.pais,
    }

    try {
      if (currentAddress?.id) {
        await updateAddress({
          vehicleId,
          address: {
            id: currentAddress.id,
            ...addressData
          }
        })
      } else {
        await createAddress({
          vehicleId,
          address: addressData
        })
      }
    } catch (error) {
      console.error('❌ Operation failed:', error)
      setIsSubmitting(false)
    }
  }

  const handleRemove = async () => {
    if (isRemoving) return
    
    setIsRemoving(true)
    
    try {
      await removeAddress({ vehicleId })
    } catch (error) {
      console.error('❌ Remove failed:', error)
      setIsRemoving(false)
    }
  }

  // Função para formatar CEP
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  // Estados de loading
  const isFormDisabled = isInitialLoading || isSubmitting || isRemoving
  const showLoadingSpinner = isInitialLoading
  const showRemoveButton = currentAddress && !isInitialLoading

  return (
    <div className="w-full max-w-full mx-auto ">
      <Card className="border border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
        <CardHeader className="border-b border-gray-100 bg-gray-50/30 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <MapPin className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              <span className="tracking-tight">
                {currentAddress ? "Editar Localização" : "Adicionar Localização"}
              </span>
            </CardTitle>
            
            {showRemoveButton && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={isFormDisabled}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all duration-200"
              >
                {isRemoving ? (
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" strokeWidth={1.5} />
                    Remover
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Loading inicial */}
          {showLoadingSpinner && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
                <span>Carregando dados do endereço...</span>
              </div>
            </div>
          )}

          {/* Erro de carregamento */}
          {hasLoadError && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle className="h-5 w-5 text-red-500" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-sm text-red-700 font-medium">Erro ao carregar endereço</p>
                <p className="text-xs text-red-600 mt-1">Tente novamente ou adicione um novo endereço</p>
              </div>
            </div>
          )}

          {/* Formulário */}
          {!showLoadingSpinner && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Address Icon and Description */}
                <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                  <Building2 className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
                  <p className="text-sm text-gray-600 font-light">
                    {currentAddress ? "Edite os dados de localização do veículo" : "Preencha os dados de localização do veículo"}
                  </p>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* CEP */}
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight">CEP</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="00000-000"
                            maxLength={9}
                            disabled={isFormDisabled}
                            value={formatCEP(field.value)}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "")
                              field.onChange(value)
                            }}
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Logradouro */}
                  <div className="sm:col-span-2 lg:col-span-2">
                    <FormField
                      control={form.control}
                      name="logradouro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 tracking-tight">Logradouro</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Rua, Avenida, Travessa..."
                              disabled={isFormDisabled}
                              className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Número */}
                  <FormField
                    control={form.control}
                    name="numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight">Número</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="123"
                            disabled={isFormDisabled}
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Complemento */}
                  <FormField
                    control={form.control}
                    name="complemento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight">Complemento</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Apto, Bloco, Sala..."
                            disabled={isFormDisabled}
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bairro */}
                  <FormField
                    control={form.control}
                    name="bairro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight">Bairro</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Centro, Vila..."
                            disabled={isFormDisabled}
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cidade */}
                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight">Cidade</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="São Paulo"
                            disabled={isFormDisabled}
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Estado */}
                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight">Estado</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="SP"
                            maxLength={2}
                            disabled={isFormDisabled}
                            value={field.value.toUpperCase()}
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* País */}
                  <FormField
                    control={form.control}
                    name="pais"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 tracking-tight">País</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Brasil"
                            disabled={isFormDisabled}
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
                  <Button
                    type="button"
                    onClick={() => router(`/vehicles/${vehicleId}`)}
                    variant="outline"
                    disabled={isFormDisabled}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isFormDisabled}
                    className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-6 py-2 transition-all duration-200 font-medium tracking-tight disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        {currentAddress ? "Atualizar Endereço" : "Adicionar Endereço"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}