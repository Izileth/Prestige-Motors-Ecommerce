
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { FileUpload } from '~/components/template/file/file';
import { ImageIcon, CheckCircle2 } from 'lucide-react';
import { acceptedFileTypes } from '~/types/enuns';
import { fadeIn } from '~/lib/animations';

interface ImageFormProps {
    files: File[];
    onFileChange: (files: File[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export const ImageForm = ({ files, onFileChange, onNext, onBack }: ImageFormProps) => (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
    <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            Imagens
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
            Adicione fotos do veículo (até 10 imagens)
        </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-6">
            <FileUpload
            value={files.map((file) => URL.createObjectURL(file))}
            onChange={onFileChange}
            onRemove={(url) => {
                onFileChange(files.filter((file) => URL.createObjectURL(file) !== url))
            }}
            maxFiles={10}
            accept={acceptedFileTypes}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Formatos aceitos: JPEG, PNG, WEBP. A primeira imagem será a principal.
            </p>
            {files.length > 0 && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-4 flex items-center">
                <CheckCircle2 className="h-4 w-4 text-black dark:text-white mr-2" />
                {files.length} {files.length === 1 ? "imagem adicionada" : "imagens adicionadas"}
            </p>
            )}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row justify-between">
            <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
            >
            Voltar: Informações Básicas
            </Button>
            <Button
            type="button"
            onClick={onNext}
            className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
            Próximo: Detalhes Técnicos
            </Button>
        </div>
        </CardContent>
    </Card>
    </motion.div>
);