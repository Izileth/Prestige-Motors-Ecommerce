
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/src/components/ui/card"
import { Button } from "~/src/components/ui/button"
import { Input } from "~/src/components/ui/input"
import { Label } from "~/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/src/components/ui/select"
import { X, Plus, Edit, Trash2, MapPin, Home, Building2 } from "lucide-react"
import type { Address } from "~/src/types/address"

interface AddressManagerProps {
  addresses: Address[]
  showAddressForm: boolean
  setShowAddressForm: (show: boolean) => void
  editAddressId: string | null
  addressFormData: any
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleAddAddress: () => void
  handleEditAddress: (address: Address) => void
  handleDeleteAddress: (addressId: string) => void
}

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const formSlide = {
  hidden: { opacity: 0, height: 0, marginBottom: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginBottom: 24,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
}

const AddressManager: React.FC<AddressManagerProps> = ({
  addresses,
  showAddressForm,
  setShowAddressForm,
  editAddressId,
  addressFormData,
  handleAddressChange,
  handleAddAddress,
  handleEditAddress,
  handleDeleteAddress,
}) => {
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  const brazilianStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ]

  return (
    <div className="w-full max-w-full mx-auto p-1">
      <Card className="bg-white shadow-none border-0 rounded-none transition-all duration-200">
        <CardHeader className=" bg-gray-50/30 px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-xl tracking-tight">
                <div className="p-2 bg-white border border-gray-200">
                  <Home className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                </div>
                Meus Endereços
              </CardTitle>
              <CardDescription className="text-gray-600 font-light text-sm">
                Gerencie seus endereços de entrega e cobrança
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-4 py-2 transition-all duration-200 font-medium tracking-tight shrink-0"
            >
              {showAddressForm ? (
                <>
                  <X className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Cancelar
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Adicionar Endereço
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 border-none shadow-none rounded-none">
          <AnimatePresence>
            {showAddressForm && (
              <motion.div
                variants={formSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden"
              >
                <Card className=" bg-gray-50/20 border-0 rounded-none shadow-none">
                  <CardHeader className="border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white border border-gray-200 rounded-lg">
                        <Building2 className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                      </div>
                      <div>
                        <CardTitle className="text-gray-900 font-medium text-lg tracking-tight">
                          {editAddressId ? "Editar Endereço" : "Adicionar Endereço"}
                        </CardTitle>
                        <p className="text-sm text-gray-600 font-light mt-1">Preencha os dados do endereço</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-5">
                      {/* CEP and Number Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cep" className="text-sm font-medium text-gray-700 tracking-tight">
                            CEP
                          </Label>
                          <Input
                            id="cep"
                            name="cep"
                            value={formatCEP(addressFormData.cep || "")}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "")
                              handleAddressChange({ target: { name: "cep", value } } as any)
                            }}
                            placeholder="00000-000"
                            maxLength={9}
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
                            value={addressFormData.numero || ""}
                            onChange={handleAddressChange}
                            placeholder="123"
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* Street Address */}
                      <div className="space-y-2">
                        <Label htmlFor="logradouro" className="text-sm font-medium text-gray-700 tracking-tight">
                          Logradouro
                        </Label>
                        <Input
                          id="logradouro"
                          name="logradouro"
                          value={addressFormData.logradouro || ""}
                          onChange={handleAddressChange}
                          placeholder="Rua, Avenida, Travessa..."
                          className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                        />
                      </div>

                      {/* Complement */}
                      <div className="space-y-2">
                        <Label htmlFor="complemento" className="text-sm font-medium text-gray-700 tracking-tight">
                          Complemento
                        </Label>
                        <Input
                          id="complemento"
                          name="complemento"
                          value={addressFormData.complemento || ""}
                          onChange={handleAddressChange}
                          placeholder="Apto, Bloco, Sala... (opcional)"
                          className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                        />
                      </div>

                      {/* Neighborhood and City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bairro" className="text-sm font-medium text-gray-700 tracking-tight">
                            Bairro
                          </Label>
                          <Input
                            id="bairro"
                            name="bairro"
                            value={addressFormData.bairro || ""}
                            onChange={handleAddressChange}
                            placeholder="Centro, Vila..."
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
                            value={addressFormData.cidade || ""}
                            onChange={handleAddressChange}
                            placeholder="São Paulo"
                            className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white"
                          />
                        </div>
                      </div>

                      {/* State and Country */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="estado" className="text-sm font-medium text-gray-700 tracking-tight">
                            Estado
                          </Label>
                          <Select
                            value={addressFormData.estado || ""}
                            onValueChange={(value) => handleAddressChange({ target: { name: "estado", value } } as any)}
                          >
                            <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-0 transition-colors duration-200 bg-white">
                              <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200">
                              {brazilianStates.map((uf) => (
                                <SelectItem key={uf} value={uf} className="hover:bg-gray-50">
                                  {uf}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pais" className="text-sm font-medium text-gray-700 tracking-tight">
                            País
                          </Label>
                          <Input
                            id="pais"
                            name="pais"
                            value={addressFormData.pais || "Brasil"}
                            onChange={handleAddressChange}
                            disabled
                            className="border-gray-200 bg-gray-50 text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-gray-100 px-6 py-4">
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 py-2.5 transition-all duration-200 font-medium tracking-tight"
                      onClick={handleAddAddress}
                      disabled={
                        !addressFormData.cep ||
                        !addressFormData.logradouro ||
                        !addressFormData.numero ||
                        !addressFormData.bairro ||
                        !addressFormData.cidade ||
                        !addressFormData.estado
                      }
                    >
                      <MapPin className="w-4 h-4 mr-2" strokeWidth={1.5} />
                      {editAddressId ? "Atualizar Endereço" : "Adicionar Endereço"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Address List */}
          <div className="space-y-4">
            {addresses && addresses.length > 0 ? (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
                {addresses.map((address, index) => (
                  <motion.div key={address.id} variants={fadeIn} custom={index}>
                    <Card className=" transition-all duration-200 bg-white shadow-none rounded-none border-0">
                      <CardContent className="p-5 border-t border-zinc-200">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 bg-gray-100 border border-gray-200 rounded-md mt-0.5">
                                <MapPin className="h-3.5 w-3.5 text-gray-600" strokeWidth={1.5} />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm leading-relaxed">
                                  {address.logradouro}, {address.numero}
                                  {address.complemento && `, ${address.complemento}`}
                                </p>
                                <p className="text-sm text-gray-600 font-light">
                                  {address.bairro} - {address.cidade}/{address.estado}
                                </p>
                                <p className="text-sm text-gray-500 font-light mt-1">CEP: {formatCEP(address.cep)}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditAddress(address)}
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all duration-200 px-3 py-2"
                            >
                              <Edit className="w-4 h-4" strokeWidth={1.5} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all duration-200 px-3 py-2"
                            >
                              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center py-16 px-6 bg-gray-50/50 border border-gray-200"
              >
                <div className="max-w-sm mx-auto">
                  <div className="p-4 bg-white border border-gray-200 rounded-full w-fit mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 tracking-tight">Nenhum endereço cadastrado</h3>
                  <p className="text-gray-600 font-light text-sm mb-8 leading-relaxed">
                    Adicione um endereço para facilitar suas compras e entregas futuras.
                  </p>
                  <Button
                    className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-6 py-2.5 transition-all duration-200 font-medium tracking-tight"
                    onClick={() => setShowAddressForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Adicionar Primeiro Endereço
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddressManager