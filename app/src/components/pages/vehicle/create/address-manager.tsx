import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "~/src/components/ui/button"
import { Input } from "~/src/components/ui/input"
import { Label } from "~/src/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "~/src/components/ui/card"
import { Loader2, MapPin, CheckCircle2, Trash2, Building2 } from "lucide-react"
import { toast } from "sonner"
import { useVehicleAddress } from "~/src/hooks/useVehiclesAddress"
import type { FormEvent } from "react"

import { useNavigate } from "react-router"
interface VehicleAddressManagerProps {
  vehicleId: string
  onSuccess?: () => void
}

export function VehicleAddressManager({ vehicleId, onSuccess }: VehicleAddressManagerProps) {
  const { currentAddress, success, loading, error, createAddress, updateAddress, removeAddress, getAddress } =
    useVehicleAddress()

  const router = useNavigate()  

  const [forceRefresh, setForceRefresh] = useState(Date.now())
  const [formData, setFormData] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
  })

  // Load address on component mount
  useEffect(() => {
    if (vehicleId) {
      getAddress(vehicleId)
    }
  }, [vehicleId, forceRefresh])

  // Populate form when address is loaded

  useEffect(() => {
    if (currentAddress) {
      setFormData({
        cep: currentAddress.cep || "",
        logradouro: currentAddress.logradouro || "",
        numero: currentAddress.numero || "",
        complemento: currentAddress.complemento || "",
        bairro: currentAddress.bairro || "",
        cidade: currentAddress.cidade || "",
        estado: currentAddress.estado || "",
        pais: currentAddress.pais || "Brasil",
      });
    } else {
      // Reseta o formulário quando não há endereço
      setFormData({
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "Brasil",
      });
    }
  }, [currentAddress]);

  // Visual feedback for operations
    
  useEffect(() => {
    if (success) {
      toast.success("Operação realizada com sucesso!", {
        action: {
          label: "Ver veículo",
          onClick: () => router(`/vehicles/${vehicleId}`)
        },
        duration: 3000
      });
      onSuccess?.();
      // Redireciona após 3 segundos
      setTimeout(() => router(`/vehicles/${vehicleId}`), 3000);
    }
  }, [success, onSuccess, router, vehicleId]);


  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('✅ preventDefault executed');
    
    // Use o estado formData que já está sincronizado com os inputs
    // (não precisa criar novo FormData, pois você já tem tudo no state)
    const addressData = {
      cep: formData.cep,
      logradouro: formData.logradouro,
      numero: formData.numero,
      complemento: formData.complemento || undefined,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado,
      pais: formData.pais,
    };

    console.log('📋 Form data:', addressData);

    try {
      if (currentAddress?.id) {
        console.log('🔄 Updating address with ID:', currentAddress.id);
        await updateAddress({
          vehicleId,
          address: {
            id: currentAddress.id,
            ...addressData
          }
        });
      } else {
        console.log('➕ Creating new address');
        await createAddress({
          vehicleId,
          address: addressData
        });
      }
      
      setForceRefresh(Date.now());
      onSuccess?.();
    } catch (error) {
      console.error('❌ Operation failed:', error);
    }
  };


  const handleRemove = async () => {
    toast.promise(
      removeAddress({
        vehicleId,
      }),
      {
        loading: "Removendo endereço...",
        success: "Endereço removido com sucesso!",
        error: "Falha ao remover endereço",
      },
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  return (
    <div className="w-full max-w-full mx-auto p-1">
      <Card className="border border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
        <CardHeader className="border-b border-gray-100 bg-gray-50/30 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <MapPin className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              <span className="tracking-tight">Localização do Veículo</span>
            </CardTitle>
            {currentAddress && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={loading}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all duration-200"
              >
                {loading ? (
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Address Icon and Description */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <Building2 className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
              <p className="text-sm text-gray-600 font-light">Preencha os dados de localização do veículo</p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep" className="text-sm font-medium text-gray-700 tracking-tight">
                  CEP
                </Label>
                <Input
                  id="cep"
                  name="cep"
                  value={formatCEP(formData.cep)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setFormData((prev) => ({
                      ...prev,
                      cep: value,
                    }))
                  }}
                  placeholder="00000-000"
                  maxLength={9}
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                />
              </div>

              <div className="space-y-2 sm:col-span-2 lg:col-span-2">
                <Label htmlFor="logradouro" className="text-sm font-medium text-gray-700 tracking-tight">
                  Logradouro
                </Label>
                <Input
                  id="logradouro"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleInputChange}
                  placeholder="Rua, Avenida, Travessa..."
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numero" className="text-sm font-medium text-gray-700 tracking-tight">
                  Número
                </Label>
                <Input
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complemento" className="text-sm font-medium text-gray-700 tracking-tight">
                  Complemento
                </Label>
                <Input
                  id="complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleInputChange}
                  placeholder="Apto, Bloco, Sala..."
                  className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bairro" className="text-sm font-medium text-gray-700 tracking-tight">
                  Bairro
                </Label>
                <Input
                  id="bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleInputChange}
                  placeholder="Centro, Vila..."
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade" className="text-sm font-medium text-gray-700 tracking-tight">
                  Cidade
                </Label>
                <Input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="São Paulo"
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado" className="text-sm font-medium text-gray-700 tracking-tight">
                  Estado
                </Label>
                <Input
                  id="estado"
                  name="estado"
                  value={formData.estado.toUpperCase()}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, estado: e.target.value.toUpperCase() }))
                  }}
                  placeholder="SP"
                  required
                  maxLength={2}
                  className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pais" className="text-sm font-medium text-gray-700 tracking-tight">
                  País
                </Label>
                <Input
                  id="pais"
                  name="pais"
                  value={formData.pais}
                  onChange={handleInputChange}
                  placeholder="Brasil"
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}

            <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
              <Button
                type="button"
                onClick={() => router(`/vehicles/${vehicleId}`)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-6 py-2 transition-all duration-200 font-medium tracking-tight"
              >
                {loading ? (
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
        </CardContent>
      </Card>
      
    </div>
  )
}
