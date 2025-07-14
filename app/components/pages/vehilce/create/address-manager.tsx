import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Loader2, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

import { useAddressStore } from '~/store/slices/address';
interface VehicleAddressManagerProps {
  vehicleId: string;
  onSuccess?: () => void;
}

export function VehicleAddressManager({ vehicleId, onSuccess }: VehicleAddressManagerProps) {

  const {
    currentAddress,
    loading,
    error,
    success,
    getAddress,
    updateAddress,
    removeAddress,
    reset: resetAddressState
  } = useAddressStore();;
  

  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: 'Brasil'
  });

  // Carrega o endereço ao montar o componente
  useEffect(() => {
    getAddress(vehicleId);
  }, [vehicleId, getAddress]);

  // Preenche o formulário quando o endereço é carregado
  useEffect(() => {
    if (currentAddress) {
      setFormData({
        cep: currentAddress.cep || '',
        logradouro: currentAddress.logradouro || '',
        numero: currentAddress.numero || '',
        complemento: currentAddress.complemento || '',
        bairro: currentAddress.bairro || '',
        cidade: currentAddress.cidade || '',
        estado: currentAddress.estado || '',
        pais: currentAddress.pais || 'Brasil'
      });
    }
  }, [currentAddress]);

  // Feedback visual para operações
  useEffect(() => {
    if (success) {
      toast.success('Operação realizada com sucesso!');
      onSuccess?.();
      resetAddressState();
    }
  }, [success, onSuccess, resetAddressState]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      resetAddressState();
    }
  }, [error, resetAddressState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAddress({
        vehicleId,
        address: formData
      });
    } catch {
      toast.error('Falha ao atualizar endereço');
    }
  };

  const handleRemove = async () => {
    toast.promise(
      removeAddress({
        vehicleId
      }),
      {
        loading: 'Removendo endereço...',
        success: 'Endereço removido com sucesso!',
        error: 'Falha ao remover endereço'
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>Localização do Veículo</span>
          </CardTitle>
          {currentAddress && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={loading}
              className="text-destructive hover:text-destructive"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Remover'}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="00000-000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logradouro">Logradouro</Label>
              <Input
                id="logradouro"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleInputChange}
                placeholder="Rua, Avenida, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                placeholder="123"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complemento">Complemento</Label>
              <Input
                id="complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleInputChange}
                placeholder="Apto, Bloco, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleInputChange}
                placeholder="Centro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="São Paulo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                placeholder="SP"
                required
                maxLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pais">País</Label>
              <Input
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleInputChange}
                placeholder="Brasil"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  {currentAddress ? 'Atualizar Endereço' : 'Adicionar Endereço'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}