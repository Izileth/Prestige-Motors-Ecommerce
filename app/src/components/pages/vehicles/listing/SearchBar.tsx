import { Input } from "~/src/components/ui/input";
import { Button } from "~/src/components/ui/button";
import { Filter, Search, X } from "lucide-react";


export const SearchBar = ({
  searchParams,
  handleSearchChange,
  showFilters,
  setShowFilters,
}: {
  searchParams: any;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}) => (
  <div className="container mx-auto px-4 w-full">
    <div className="flex flex-col md:flex-col gap-4 items-center w-full max-w-full">
      <div className="flex-1 w-full gap-4 flex flex-col md:flex-row items-center justify-between">
        <div className="relative w-full lg:w-2/3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={18}
          />
          <Input
            placeholder="Buscar por modelo..."
            value={searchParams.modelo || ""}
            onChange={handleSearchChange}
            className="w-full pl-10 border-b-zinc-950 border-b rounded-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-900 transition-all"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 w-full sm:w-[6rem]  bg-zinc-950 text-zinc-50 shadow-none border-none hover:bg-transparent hover:border hover:border-zinc-950 dark:hover:bg-gray-900 transition-all ${
            showFilters ? "bg-transparent text-zinc-950 px-2 border border-zinc-950 dark:bg-gray-900" : ""
          }`}
        >
          <Filter size={16} />
          Filtros
          {showFilters && <X size={16} className="ml-2" />}
        </Button>
      </div>
    </div>
  </div>
);
