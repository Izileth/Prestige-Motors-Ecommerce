import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/src/components/ui/select";
import { X, Plus, Edit, Trash2, MapPin } from "lucide-react";
import type { Address } from "~/src/types/address";

interface AddressManagerProps {
  addresses: Address[];
  showAddressForm: boolean;
  setShowAddressForm: (show: boolean) => void;
  editAddressId: string | null;
  addressFormData: any;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAddAddress: () => void;
  handleEditAddress: (address: Address) => void;
  handleDeleteAddress: (addressId: string) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-gray-900 dark:text-gray-100">Meus Endereços</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Gerencie seus endereços de entrega e cobrança
          </CardDescription>
        </div>
        <Button
          onClick={() => setShowAddressForm(!showAddressForm)}
          className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
        >
          {showAddressForm ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Endereço
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {showAddressForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <Card className="border border-gray-100 dark:border-gray-800 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    {editAddressId ? "Editar Endereço" : "Adicionar Endereço"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cep" className="text-gray-700 dark:text-gray-300">
                        CEP
                      </Label>
                      <Input
                        id="cep"
                        name="cep"
                        value={addressFormData.cep}
                        onChange={handleAddressChange}
                        className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero" className="text-gray-700 dark:text-gray-300">
                        Número
                      </Label>
                      <Input
                        id="numero"
                        name="numero"
                        value={addressFormData.numero}
                        onChange={handleAddressChange}
                        className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logradouro" className="text-gray-700 dark:text-gray-300">
                      Logradouro
                    </Label>
                    <Input
                      id="logradouro"
                      name="logradouro"
                      value={addressFormData.logradouro}
                      onChange={handleAddressChange}
                      className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complemento" className="text-gray-700 dark:text-gray-300">
                      Complemento
                    </Label>
                    <Input
                      id="complemento"
                      name="complemento"
                      value={addressFormData.complemento}
                      onChange={handleAddressChange}
                      className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bairro" className="text-gray-700 dark:text-gray-300">
                        Bairro
                      </Label>
                      <Input
                        id="bairro"
                        name="bairro"
                        value={addressFormData.bairro}
                        onChange={handleAddressChange}
                        className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade" className="text-gray-700 dark:text-gray-300">
                        Cidade
                      </Label>
                      <Input
                        id="cidade"
                        name="cidade"
                        value={addressFormData.cidade}
                        onChange={handleAddressChange}
                        className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="estado" className="text-gray-700 dark:text-gray-300">
                        Estado
                      </Label>
                      <Select
                        value={addressFormData.estado}
                        onValueChange={(value) =>
                          handleAddressChange({ target: { name: "estado", value } } as any)
                        }
                      >
                        <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
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
                          ].map((uf) => (
                            <SelectItem key={uf} value={uf}>
                              {uf}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pais" className="text-gray-700 dark:text-gray-300">
                        País
                      </Label>
                      <Input
                        id="pais"
                        name="pais"
                        value={addressFormData.pais}
                        onChange={handleAddressChange}
                        disabled
                        className="border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
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
                    <MapPin className="w-4 h-4 mr-2" />
                    {editAddressId ? "Atualizar Endereço" : "Adicionar Endereço"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          {addresses && addresses.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {addresses.map((address, index) => (
                <motion.div key={address.id} variants={fadeIn} custom={index}>
                  <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {address.logradouro}, {address.numero}
                            {address.complemento && `, ${address.complemento}`}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {address.bairro} - {address.cidade}/{address.estado}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {address.cep}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditAddress(address)}
                            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800"
            >
              <MapPin className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">
                Nenhum endereço cadastrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Adicione um endereço para facilitar suas compras futuras.
              </p>
              <Button
                className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
                onClick={() => setShowAddressForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Endereço
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressManager;
