
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { Textarea } from "~/src/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/src/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/src/components/ui/form";
import { Info, ArrowRight } from "lucide-react";
import type { VehicleFormValues } from "~/src/schemas/schema";

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

interface BasicInfoTabProps {
  onNext: () => void;
}

export function BasicInfoTab({ onNext }: BasicInfoTabProps) {
  const form = useFormContext<VehicleFormValues>();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <motion.div variants={fadeIn} className="md:col-span-2">
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              Informações Básicas
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Detalhes essenciais sobre o veículo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="marca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Marca*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Ford, Toyota, BMW..."
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
                name="modelo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Modelo*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Mustang, Corolla, X5..."
                        {...field}
                        className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="anoFabricacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Ano de Fabricação*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1886}
                        max={new Date().getFullYear() + 1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
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
                name="anoModelo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Ano do Modelo*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1886}
                        max={new Date().getFullYear() + 1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                        className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="preco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Preço*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
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
                name="precoPromocional"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Preço Promocional (opcional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? Number.parseFloat(e.target.value)
                              : undefined
                          )
                        }
                        className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Descrição
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o veículo em detalhes..."
                      className="min-h-[120px] border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={onNext}
                className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 gap-2"
              >
                Próximo: Imagens
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
