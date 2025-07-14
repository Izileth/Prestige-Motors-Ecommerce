
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Switch } from '~/components/ui/switch';
import { Button } from '~/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { fadeIn } from '~/lib/animations';

interface AdditionalOptionsFormProps {
    isSubmitting: boolean;
    onBack: () => void;
}

export const AdditionalOptionsForm = ({ isSubmitting, onBack }: AdditionalOptionsFormProps) => {
    const form = useFormContext();

    return (
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
            <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Plus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                Opções Adicionais
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
                Configurações extras para o anúncio
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                control={form.control}
                name="destaque"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
                    <div className="space-y-0.5">
                        <FormLabel className="text-gray-900 dark:text-gray-100">Destaque</FormLabel>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                        Destacar este veículo nos resultados de busca
                        </p>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-black data-[state=checked]:dark:bg-white"
                        />
                    </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="seloOriginal"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
                    <div className="space-y-0.5">
                        <FormLabel className="text-gray-900 dark:text-gray-100">Selo Original</FormLabel>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                        Veículo possui todas as peças originais
                        </p>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-black data-[state=checked]:dark:bg-white"
                        />
                    </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="aceitaTroca"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
                    <div className="space-y-0.5">
                        <FormLabel className="text-gray-900 dark:text-gray-100">Aceita Troca</FormLabel>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                        Disponível para troca por outro veículo
                        </p>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-black data-[state=checked]:dark:bg-white"
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </div>

            <FormField
                control={form.control}
                name="parcelamento"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Parcelamento (opcional)</FormLabel>
                    <FormControl>
                    <Input
                        type="number"
                        min="1"
                        max="60"
                        placeholder="Número máximo de parcelas"
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

            <div className="flex justify-between mt-8">
                <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                >
                Voltar: Detalhes Técnicos
                </Button>
                <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
                >
                {isSubmitting ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                    </>
                ) : (
                    "Salvar Veículo"
                )}
                </Button>
            </div>
            </CardContent>
        </Card>
        </motion.div>
    );
};