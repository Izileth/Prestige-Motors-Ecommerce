import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuickEditSkeleton } from "~/src/components/layout/skeleton/edit";
import {
  UpdateVehicleHeader,
  PageTitle,
  FormProgress,
  FormAlerts,
  FormTabs,
  BasicInfoTab,
  ImagesTab,
  TechnicalDetailsTab,
  AdditionalOptionsTab,
  LocationTab,
  CancelationDialog,
  ImageViewer,
} from "~/src/components/pages/vehicle/edit";
import { Button } from "~/src/components/ui/button";
import { Form } from "~/src/components/ui/form";
import { Tabs, TabsContent } from "~/src/components/ui/tabs";
import useVehicle from "~/src/hooks/useVehicle";
import type { VehicleFormValues } from "~/src/schemas/schema";
import { vehicleFormSchema } from "~/src/schemas/schema";
import type { Resolver } from "react-hook-form";
import type { VehicleImage } from "~/src/types/vehicle";
import { ChevronLeft } from "lucide-react";

export function EditVehiclePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentVehicle,
    fetchVehicleById,
    updateVehicle,
    uploadVehicleImages,
    deleteVehicleImage,
    loading,
    error: apiError,
  } = useVehicle();

  const [existingImages, setExistingImages] = useState<VehicleImage[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formProgress, setFormProgress] = useState(25);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(
      vehicleFormSchema
    ) as unknown as Resolver<VehicleFormValues>,
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

  const loadVehicleData = useCallback(() => {
    if (id && !isDataLoaded) {
      fetchVehicleById(id);
      setIsDataLoaded(true);
    }
  }, [id, fetchVehicleById, isDataLoaded]);

  useEffect(() => {
    loadVehicleData();
  }, [loadVehicleData]);

  useEffect(() => {
    if (currentVehicle) {
      form.reset({
        marca: currentVehicle.marca,
        modelo: currentVehicle.modelo,
        anoFabricacao: currentVehicle.anoFabricacao,
        anoModelo: currentVehicle.anoModelo,
        preco: currentVehicle.preco,
        precoPromocional: currentVehicle.precoPromocional || undefined,
        descricao: currentVehicle.descricao || "",
        quilometragem: currentVehicle.quilometragem,
        tipoCombustivel: currentVehicle.tipoCombustivel,
        cambio: currentVehicle.cambio,
        cor: currentVehicle.cor,
        portas: currentVehicle.portas,
        finalPlaca: currentVehicle.finalPlaca || undefined,
        carroceria: currentVehicle.carroceria,
        potencia: currentVehicle.potencia || undefined,
        motor: currentVehicle.motor || "",
        categoria: currentVehicle.categoria,
        classe: currentVehicle.classe,
        destaque: currentVehicle.destaque || false,
        seloOriginal: currentVehicle.seloOriginal || false,
        aceitaTroca: currentVehicle.aceitaTroca || false,
        parcelamento: currentVehicle.parcelamento || undefined,
      });

      if (currentVehicle.imagens?.length !== existingImages.length) {
        setExistingImages(currentVehicle.imagens || []);
      }
    }
  }, [currentVehicle, form]);

  useEffect(() => {
    const values = form.getValues();
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

    if (existingImages.length > 0 || files.length > 0) {
      completedFields++;
    }
    totalFields++;

    const progress = Math.round((completedFields / totalFields) * 100);
    setFormProgress(progress);
  }, [form, files, existingImages]);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleRemoveExistingImage = async (imageId: string) => {
    if (!id) return;

    try {
      await deleteVehicleImage(id, imageId);
      setExistingImages(existingImages.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Erro ao remover imagem:", error);
      setFormError("Erro ao remover imagem. Por favor, tente novamente.");
    }
  };

  const onSubmit = async (data: VehicleFormValues) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      setFormError(null);
      setFormSuccess(null);

      const { imagens, ...vehicleData } = data;
      await updateVehicle(id, vehicleData);

      const newImages = files.filter((file) => file instanceof File);
      if (newImages.length > 0) {
        await uploadVehicleImages(id, newImages);
      }

      const currentImageIds =
        currentVehicle?.imagens?.map((img) => img.id) || [];
      const remainingImageIds = existingImages.map((img) => img.id);
      const imagesToRemove = currentImageIds.filter(
        (id) => !remainingImageIds.includes(id)
      );

      await Promise.all(
        imagesToRemove.map((imageId) => deleteVehicleImage(id, imageId))
      );

      setFormSuccess("Veículo atualizado com sucesso!");
      setTimeout(() => {
        navigate(`/vehicles/${id}`);
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      setFormError(
        "Ocorreu um erro ao atualizar o veículo. Por favor, tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (form.formState.isDirty || files.length > 0) {
      setConfirmCancel(true);
    } else {
      navigate(`/vehicles/${id}`);
    }
  };

  if (loading && !currentVehicle) {
    return <QuickEditSkeleton />;
  }

  if (!currentVehicle && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-center">
          <div className="text-gray-900 dark:text-gray-100 mb-4 text-lg">
            Veículo não encontrado
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            O veículo que você está procurando não está disponível ou foi
            removido.
          </p>
          <Button
            onClick={() => navigate("/vehicles")}
            className="bg-black text-white dark:bg-white dark:text-black"
          >
            <ChevronLeft size={16} className="mr-2" /> Voltar para a listagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      <UpdateVehicleHeader
        onCancel={handleCancel}
        onSubmit={() => form.handleSubmit(onSubmit)()}
        isSubmitting={isSubmitting}
        formProgress={formProgress}
      />

      <div className="container mx-auto px-4 py-8">
        <PageTitle
          title="Editar Veículo"
          subtitle={
            <>
              Atualize os detalhes do veículo{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {currentVehicle?.marca} {currentVehicle?.modelo}
              </span>
            </>
          }
        />

        <FormProgress progress={formProgress} />

        <FormAlerts formError={formError} formSuccess={formSuccess} />

        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <FormTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <TabsContent value="basic">
                  <BasicInfoTab onNext={() => setActiveTab("images")} />
                </TabsContent>

                <TabsContent value="images">
                  <ImagesTab
                    existingImages={existingImages}
                    files={files}
                    onFileChange={handleFileChange}
                    onRemoveExistingImage={handleRemoveExistingImage}
                    onPreviewImage={setPreviewImage}
                    onBack={() => setActiveTab("basic")}
                    onNext={() => setActiveTab("technical")}
                  />
                </TabsContent>

                <TabsContent value="technical">
                  <TechnicalDetailsTab
                    onBack={() => setActiveTab("images")}
                    onNext={() => setActiveTab("additional")}
                  />
                </TabsContent>

                <TabsContent value="additional">
                  <AdditionalOptionsTab
                    isSubmitting={isSubmitting}
                    onBack={() => setActiveTab("technical")}
                  />
                </TabsContent>

                <TabsContent value="location">
                  <LocationTab
                    vehicleId={id?.toString() || ""}
                    onBack={() => setActiveTab("technical")}
                    onNext={() => setActiveTab("additional")}
                  />
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </FormProvider>
      </div>

      <CancelationDialog
        open={confirmCancel}
        onOpenChange={setConfirmCancel}
        onConfirm={() => navigate(`/vehicles/${id}`)}
      />

      <ImageViewer
        open={!!previewImage}
        onOpenChange={() => setPreviewImage(null)}
        imageUrl={previewImage}
      />
    </div>
  );
}