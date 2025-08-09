import { VehicleCardSkeleton } from "~/src/components/layout/skeleton/VehicleCardSkeleton";

export const LoadingSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {[...Array(6)].map((_, i) => (
      <VehicleCardSkeleton key={i} />
    ))}
  </div>
);
