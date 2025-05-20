import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";

import type { VehicleSearchParams } from "~/types/vehicle";

import { CAMBIO_OPTIONS, CARROCERIA_OPTIONS, CATEGORIA_OPTIONS, CLASSE_OPTIONS, COMBUSTIVEL_OPTIONS } from "~/types/filter";
interface VehicleFiltersProps {
    searchParams: VehicleSearchParams;
    onFilterChange: (
        field: keyof VehicleSearchParams,
        value: string | number | boolean | undefined
    ) => void;
    onReset: () => void;
}

export const VehicleFilters = ({
    searchParams,
    onFilterChange,
    onReset,
}: VehicleFiltersProps) => {
    const maxPrice = 1000000; // 1 milhão como teto de preço
    const currentYear = new Date().getFullYear();
    const oldestYear = 1900;
    
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-none shadow-none border border-none dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Filtrar veículos</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                    <X size={16} className="mr-1" /> Limpar
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Filtro de Preço */}
                <div>
                    <label className="block text-sm font-medium mb-2">Preço</label>
                    <Slider
                        defaultValue={[
                            searchParams.precoMin || 0,
                            searchParams.precoMax || maxPrice,
                        ]}
                        max={maxPrice}
                        step={5000}
                        onValueChange={(value) => {
                            onFilterChange("precoMin", value[0]);
                            onFilterChange("precoMax", value[1]);
                        }}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>
                            R$ {searchParams.precoMin?.toLocaleString("pt-BR") || "0"}
                        </span>
                        <span>
                            R$ {searchParams.precoMax?.toLocaleString("pt-BR") || maxPrice.toLocaleString("pt-BR")}
                        </span>
                    </div>
                </div>

                {/* Filtro de Ano */}
                <div>
                    <label className="block text-sm font-medium mb-2">Ano</label>
                    <Slider
                        defaultValue={[
                            searchParams.anoMin || oldestYear,
                            searchParams.anoMax || currentYear,
                        ]}
                        min={oldestYear}
                        max={currentYear}
                        step={1}
                        onValueChange={(value) => {
                            onFilterChange("anoMin", value[0]);
                            onFilterChange("anoMax", value[1]);
                        }}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{searchParams.anoMin || oldestYear}</span>
                        <span>{searchParams.anoMax || currentYear}</span>
                    </div>
                </div>

                {/* Filtro de Marca */}
                <div>
                    <label className="block text-sm font-medium mb-2">Marca</label>
                    <Select
                        value={searchParams.marca || ""}
                        onValueChange={(value) => onFilterChange("marca", value === "All" ? undefined : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todas as marcas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Todas as marcas</SelectItem>
                            {/* Aqui viriam as marcas dinâmicas do backend */}
                        </SelectContent>
                    </Select>
                </div>

                {/* Filtro de Modelo (depende da marca selecionada) */}
                {searchParams.marca && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Modelo</label>
                        <Select
                            value={searchParams.modelo || ""}
                            onValueChange={(value) => onFilterChange("modelo", value === "All" ? undefined : value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Todos os modelos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">Todos os modelos</SelectItem>
                                {/* Aqui viriam os modelos dinâmicos do backend */}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Filtro de Combustível */}
                <div>
                    <label className="block text-sm font-medium mb-2">Combustível</label>
                    <Select
                        value={searchParams.combustivel || ""}
                        onValueChange={(value) => onFilterChange("combustivel", value === "All" ? undefined : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Todos</SelectItem>
                            {COMBUSTIVEL_OPTIONS.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Filtro de Câmbio */}
                <div>
                    <label className="block text-sm font-medium mb-2">Câmbio</label>
                    <Select
                        value={searchParams.cambio || ""}
                        onValueChange={(value) => onFilterChange("cambio", value === "All" ? undefined : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Todos</SelectItem>
                            {CAMBIO_OPTIONS.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Filtro de Carroceria */}
                <div>
                    <label className="block text-sm font-medium mb-2">Carroceria</label>
                    <Select
                        value={searchParams.carroceria || ""}
                        onValueChange={(value) => onFilterChange("carroceria", value === "All" ? undefined : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Todos</SelectItem>
                            {CARROCERIA_OPTIONS.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Filtro de Categoria */}
                <div>
                    <label className="block text-sm font-medium mb-2">Categoria</label>
                    <Select
                        value={searchParams.categoria || ""}
                        onValueChange={(value) => onFilterChange("categoria", value === "All" ? undefined : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Todos</SelectItem>
                            {CATEGORIA_OPTIONS.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Filtro de Classe */}
                <div>
                    <label className="block text-sm font-medium mb-2">Classe</label>
                    <Select
                        value={searchParams.classe || ""}
                        onValueChange={(value) => onFilterChange("classe", value === "All" ? undefined : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Todos</SelectItem>
                            {CLASSE_OPTIONS.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Filtro de Destaque */}
                <div>
                    <label className="block text-sm font-medium mb-2">Destaque</label>
                    <Select
                        value={searchParams.destaque?.toString() || ""}
                        onValueChange={(value) => {
                            if (value === "All") {
                                onFilterChange("destaque", undefined);
                            } else {
                                onFilterChange("destaque", value === "true");
                            }
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">Todos</SelectItem>
                            <SelectItem value="true">Em destaque</SelectItem>
                            <SelectItem value="false">Sem destaque</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};