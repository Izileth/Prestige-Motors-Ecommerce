import { Skeleton } from "~/src/components/ui/skeleton"
// 2. Skeleton Simplificado para Edição Rápida
export function QuickEditSkeleton() {
    return (
        <div className="bg-gray-50 dark:bg-gray-950 p-4">
        <div className="max-w-4xl mx-auto">
            <Skeleton className="h-7 w-48 mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                ))}
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="w-full h-32 rounded mb-4" />
                <Skeleton className="h-10 w-full" />
            </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-20" />
            </div>
        </div>
        </div>
    )
}