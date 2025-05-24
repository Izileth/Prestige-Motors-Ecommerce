
import { Skeleton } from "~/components/ui/skeleton"
export default function VehicleDetailsSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <div className="max-w-7xl mx-auto">
            {/* Header Section - Título e Descrição */}
            <div className="mb-8">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal - Imagens */}
            <div className="lg:col-span-2">
                {/* Imagem Principal */}
                <div className="mb-6">
                <Skeleton className="w-full h-96 rounded-lg mb-4" />
                
                {/* Grid de Imagens Secundárias */}
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="aspect-square rounded-md" />
                    ))}
                </div>
                </div>

                {/* Informações do Veículo */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6">
                <Skeleton className="h-7 w-48 mb-4" />
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                    ))}
                </div>
                </div>

                {/* Descrição Detalhada */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <Skeleton className="h-7 w-40 mb-4" />
                
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                </div>
            </div>

            {/* Sidebar - Preço e Contato */}
            <div className="space-y-6">
                {/* Card de Preço */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 sticky top-4">
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-10 w-40 mb-4" />
                
                {/* Financiamento */}
                <div className="border-t pt-4 mb-6">
                    <Skeleton className="h-5 w-36 mb-2" />
                    <Skeleton className="h-6 w-28 mb-1" />
                    <Skeleton className="h-4 w-32" />
                </div>

                {/* Botões de Ação */}
                <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                </div>

                {/* Card de Contato */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                
                {/* Vendedor */}
                <div className="flex items-center mb-4">
                    <Skeleton className="h-12 w-12 rounded-full mr-3" />
                    <div className="flex-1">
                    <Skeleton className="h-5 w-28 mb-1" />
                    <Skeleton className="h-4 w-20" />
                    </div>
                </div>

                {/* Informações de Contato */}
                <div className="space-y-3">
                    <div className="flex items-center">
                    <Skeleton className="h-5 w-5 mr-3" />
                    <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center">
                    <Skeleton className="h-5 w-5 mr-3" />
                    <Skeleton className="h-4 w-28" />
                    </div>
                    <div className="flex items-center">
                    <Skeleton className="h-5 w-5 mr-3" />
                    <Skeleton className="h-4 w-36" />
                    </div>
                </div>

                {/* Horário de Funcionamento */}
                <div className="mt-4 pt-4 border-t">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-32" />
                </div>
                </div>

                {/* Card de Localização */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <Skeleton className="h-6 w-28 mb-4" />
                <Skeleton className="w-full h-48 rounded-md mb-3" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
            </div>

            {/* Seção de Veículos Similares */}
            <div className="mt-12">
            <Skeleton className="h-8 w-48 mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    )
}