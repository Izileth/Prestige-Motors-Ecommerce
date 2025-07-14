
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { Settings, Tag } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FuelType, TransmissionType, BodyType, VehicleCategory, VehicleClass } from '~/types/enuns';
import { getFuelType, getTransmissionType, getBodyType, getCategoryType, getClassType } from '~/utils/vehicle';
import { fadeIn, staggerContainer } from '~/lib/animations';

interface TechnicalDetailsFormProps {
    onNext: () => void;
    onBack: () => void;
}

export const TechnicalDetailsForm = ({ onNext, onBack }: TechnicalDetailsFormProps) => {
    const form = useFormContext();

    return (
        <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
        <motion.div variants={fadeIn}>
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 h-full">
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                Detalhes Técnicos
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                Especificações do veículo
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="quilometragem"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Quilometragem*</FormLabel>
                        <FormControl>
                        <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                            className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                        />
                        </FormControl>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tipoCombustivel"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Tipo de Combustível*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                            <SelectValue placeholder="Selecione o combustível" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {Object.values(FuelType).map((fuel) => (
                            <SelectItem key={fuel} value={fuel}>
                                {getFuelType(fuel)}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                    )}
                />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="cambio"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Câmbio*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                            <SelectValue placeholder="Selecione o câmbio" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {Object.values(TransmissionType).map((transmission) => (
                            <SelectItem key={transmission} value={transmission}>
                                {getTransmissionType(transmission)}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="carroceria"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Carroceria*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                            <SelectValue placeholder="Selecione a carroceria" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {Object.values(BodyType).map((body) => (
                            <SelectItem key={body} value={body}>
                                {getBodyType(body)}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                    )}
                />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="cor"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Cor*</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Ex: Preto, Branco, Vermelho..."
                            {...field}
                            className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                        />
                        </FormControl>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="portas"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Portas*</FormLabel>
                        <Select
                        onValueChange={(value) => field.onChange(Number.parseInt(value))}
                        defaultValue={field.value.toString()}
                        >
                        <FormControl>
                            <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                            <SelectValue placeholder="Selecione o número de portas" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {[2, 3, 4, 5].map((doors) => (
                            <SelectItem key={doors} value={doors.toString()}>
                                {doors} portas
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                    )}
                />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="potencia"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Potência (cv)</FormLabel>
                        <FormControl>
                        <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) =>
                            field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                            className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                        />
                        </FormControl>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="motor"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Motor (opcional)</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Ex: 2.0 Turbo, V8 5.0..."
                            {...field}
                            className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                        />
                        </FormControl>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                    )}
                />
                </div>
            </CardContent>
            </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
            <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 h-full">
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                Categorização
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                Classificação do veículo
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Categoria*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                            <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {Object.values(VehicleCategory).map((category) => (
                            <SelectItem key={category} value={category}>
                            {getCategoryType(category)}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="classe"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Classe*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                            <SelectValue placeholder="Selecione a classe" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {Object.values(VehicleClass).map((classe) => (
                            <SelectItem key={classe} value={classe}>
                            {getClassType(classe)}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="finalPlaca"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                        Final da Placa (opcional)
                    </FormLabel>
                    <Select
                        onValueChange={(value) => field.onChange(value ? Number.parseInt(value) : undefined)}
                        value={field.value?.toString()}
                    >
                        <FormControl>
                        <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                            <SelectValue placeholder="Selecione o final" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="default">Não informado</SelectItem>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                            Final {num}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                )}
                />

                <div className="flex justify-between mt-8">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                >
                    Voltar: Imagens
                </Button>
                <Button
                    type="button"
                    onClick={onNext}
                    className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
                >
                    Próximo: Opções Adicionais
                </Button>
                </div>
            </CardContent>
            </Card>
        </motion.div>
        </motion.div>
    );
};