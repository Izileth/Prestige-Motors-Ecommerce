
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { CardTitle, CardDescription } from "~/src/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/src/components/ui/select";
import { Input } from "~/src/components/ui/input";
import { PlusCircle, Filter, Search, X } from "lucide-react";
import { Link } from "react-router";
import type { Vehicle } from "~/src/types/vehicle"; // Ajuste o caminho conforme sua estrutura
import type { UserStats } from "~/src/types/user";

// Definindo os tipos para o viewMode e statusFilter
type ViewMode = "table" | "grid";
export type StatusFilter = Vehicle['status'] | "all" | null;

// Interface para as props do componente
interface VehicleListHeaderProps {
    userVehicles: Vehicle[];
    userStats: UserStats | null;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: StatusFilter;
    setStatusFilter: (filter: StatusFilter) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

export const VehicleListHeader = ({ 
    userVehicles, 
    userStats, 
    showFilters, 
    setShowFilters, 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter, 
    viewMode, 
    setViewMode 
}: VehicleListHeaderProps) => {
    return (
        <div className="flex flex-col space-y-4 pb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <CardTitle className="text-2xl font-medium text-gray-900 dark:text-gray-100">Meus Veículos</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        {userVehicles.length} veículo{userVehicles.length !== 1 ? "s" : ""} cadastrado
                        {userVehicles.length !== 1 ? "s" : ""}
                        {userStats && <span className="ml-2">• {userStats.totalVehicles} no total</span>}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowFilters(!showFilters)}
                        className={`border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                            showFilters ? "bg-gray-100 dark:bg-gray-800" : ""
                        }`}
                    >
                        <Filter className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    </Button>
                    <Button
                        asChild
                        className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 gap-2"
                    >
                        <Link to="/vehicles/create">
                            <PlusCircle className="h-4 w-4" />
                            Adicionar Veículo
                        </Link>
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row gap-4 pt-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-600" />
                                <Input
                                    placeholder="Buscar por marca ou modelo..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        <X className="h-4 w-4 text-gray-400 dark:text-gray-600" />
                                    </button>
                                )}
                            </div>
                            <Select 
                                value={statusFilter || ""} 
                                onValueChange={(value) => setStatusFilter(value === "all" ? null : value as StatusFilter)}
                            >
                                <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400">
                                    <SelectValue placeholder="Filtrar por status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos os status</SelectItem>
                                    <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                                    <SelectItem value="RESERVADO">Reservado</SelectItem>
                                    <SelectItem value="VENDIDO">Vendido</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex gap-2">
                                <Button
                                    variant={viewMode === "table" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("table")}
                                    className={
                                        viewMode === "table"
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "border-gray-200 dark:border-gray-800"
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <path d="M3 9h18" />
                                        <path d="M3 15h18" />
                                        <path d="M9 3v18" />
                                        <path d="M15 3v18" />
                                    </svg>
                                </Button>
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("grid")}
                                    className={
                                        viewMode === "grid"
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "border-gray-200 dark:border-gray-800"
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};