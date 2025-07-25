import { motion } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/src/components/ui/card";
import { FileUpload } from "~/src/components/common/VehicleFile";
import { ImageIcon, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { VehicleImage } from "~/src/types/vehicle";
import { acceptedFileTypes } from "~/src/types/enuns";
import { ExistingImages } from "./ExistingImages";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface ImagesTabProps {
  existingImages: VehicleImage[];
  files: File[];
  onFileChange: (files: File[]) => void;
  onRemoveExistingImage: (imageId: string) => void;
  onPreviewImage: (url: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function ImagesTab({
  existingImages,
  files,
  onFileChange,
  onRemoveExistingImage,
  onPreviewImage,
  onBack,
  onNext,
}: ImagesTabProps) {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            Imagens
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Gerencie as imagens do veículo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ExistingImages
            images={existingImages}
            onRemove={onRemoveExistingImage}
            onPreview={onPreviewImage}
          />

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
              Adicionar novas imagens
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-6">
              <FileUpload
                value={files.map((file) => URL.createObjectURL(file))}
                onChange={onFileChange}
                onRemove={(url) => {
                  onFileChange(
                    files.filter((file) => URL.createObjectURL(file) !== url)
                  );
                }}
                maxFiles={10 - existingImages.length}
                accept={acceptedFileTypes}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Formatos aceitos: JPEG, PNG, WEBP. Você pode adicionar até{" "}
                {10 - existingImages.length} imagens adicionais.
              </p>
              {files.length > 0 && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-4 flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-black dark:text-white mr-2" />
                  {files.length}{" "}
                  {files.length === 1
                    ? "nova imagem adicionada"
                    : "novas imagens adicionadas"}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar: Informações Básicas
            </Button>
            <Button
              type="button"
              onClick={onNext}
              className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 gap-2"
            >
              Próximo: Detalhes Técnicos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
