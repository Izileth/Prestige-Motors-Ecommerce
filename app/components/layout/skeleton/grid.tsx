import { Skeleton } from "~/components/ui/skeleton"

export function VehicleGridSkeleton() {
    return (
        <div className="bg-gray-50 dark:bg-gray-950 p-4">
        <div className="max-w-7xl mx-auto">
            {/* Header com filtros */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-28" />
            </div>
            </div>

            {/* Grid de Veículos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <div className="flex justify-between items-center mb-3">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex gap-2 mb-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-14" />
                    </div>
                    <Skeleton className="h-9 w-full mt-3" />
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}