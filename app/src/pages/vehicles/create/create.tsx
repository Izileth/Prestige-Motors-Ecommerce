import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useVehicle from "~/src/hooks/useVehicle";
import {
  vehicleFormSchema,
  type VehicleFormValues,
} from "../../../schemas/schema";

import {
  FormHeader,
  FormNotifications,
  FormTabs,
  ImageForm,
  BasicInfoForm,
  TechnicalDetailsForm,
  AdditionalOptionsForm,
  PageHeader,
  ProgressBar
} from "~/src/components/pages/vehicle/create"

import { TabsContent, Tabs } from "~/src/components/ui/tabs";
import { Form } from "~/src/components/ui/form";

const CreateVehiclePage = () => {
  const { createVehicle, uploadVehicleImages, loading } = useVehicle();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [formProgress, setFormProgress] = useState(25);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tipagem explícita para resolver o conflito
  const resolver = zodResolver(
    vehicleFormSchema
  ) as Resolver<VehicleFormValues>;

  const form = useForm<VehicleFormValues>({
    resolver,
    defaultValues: {
      marca: "",
      modelo: "",
      anoFabricacao: new Date().getFullYear(),
      anoModelo: new Date().getFullYear(),
      preco: 0,
      quilometragem: 0,
      tipoCombustivel: "GASOLINA",
      cambio: "MANUAL",
      cor: "",
      portas: 4,
      carroceria: "SEDAN",
      categoria: "SPORTS_CAR",
      classe: "B",
      destaque: false,
      seloOriginal: false,
      aceitaTroca: false,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      let completedFields = 0;
      let totalFields = 0;

      Object.entries(values).forEach(([key, value]) => {
        if (
          key !== "imagens" &&
          key !== "precoPromocional" &&
          key !== "descricao" &&
          key !== "finalPlaca"
        ) {
          totalFields++;
          if (value !== undefined && value !== "" && value !== 0) {
            completedFields++;
          }
        }
      });

      if (files.length > 0) {
        completedFields++;
      }
      totalFields++;

      const progress = Math.round((completedFields / totalFields) * 100);
      setFormProgress(progress);
    });
    return () => subscription.unsubscribe();
  }, [form, files]);

  const onSubmit = async (data: VehicleFormValues) => {
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const vehicle = await createVehicle(data);

      if (files.length > 0 && vehicle?.id) {
        await uploadVehicleImages(vehicle.id, files);
      }

      setFormSuccess("Veículo criado com sucesso!");
      setTimeout(() => {
        navigate(`/vehicles/${vehicle.id}`);
      }, 1500);
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
      setFormError(
        "Ocorreu um erro ao criar o veículo. Por favor, tente novamente."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-2 md:py-8  px-0 md:px-8">
      <FormProvider {...form}>
        <FormHeader
          formProgress={formProgress}
          isSubmitting={isSubmitting}
          onSave={form.handleSubmit(onSubmit)}
        />

        <div className="container mx-auto px-4 py-8">
          <PageHeader />
          <ProgressBar formProgress={formProgress} />
          <FormNotifications formError={formError} formSuccess={formSuccess} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Envolver tudo em um Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <FormTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <TabsContent value="basic">
                  <BasicInfoForm onNext={() => setActiveTab("images")} />
                </TabsContent>

                <TabsContent value="images">
                  <ImageForm
                    files={files}
                    onFileChange={setFiles}
                    onNext={() => setActiveTab("technical")}
                    onBack={() => setActiveTab("basic")}
                  />
                </TabsContent>

                <TabsContent value="technical">
                  <TechnicalDetailsForm
                    onNext={() => setActiveTab("additional")}
                    onBack={() => setActiveTab("images")}
                  />
                </TabsContent>

                <TabsContent value="additional">
                  <AdditionalOptionsForm
                    isSubmitting={isSubmitting}
                    onBack={() => setActiveTab("technical")}
                  />
                </TabsContent>
     
              </Tabs>
            </form>
          </Form>
        </div>
      </FormProvider>
    </div>
  );
};

export default CreateVehiclePage;
