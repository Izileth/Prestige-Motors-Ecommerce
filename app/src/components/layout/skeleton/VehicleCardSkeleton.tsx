
export const VehicleCardSkeleton = () => (
    <div className="flex h-96 flex-col items-start bg-zinc-100   dark:bg-zinc-400 rounded-[0.6rem] shadow-xl p-6 animate-pulse">
        <div className="h-44 w-full bg-zinc-200 dark:bg-zinc-300 rounded-none mb-4"></div>
        <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-300 rounded"></div>
    </div>
);
