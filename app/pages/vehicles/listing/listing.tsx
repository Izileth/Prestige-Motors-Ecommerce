
import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router"
import useVehicle from "~/hooks/useVehicle"

// Components
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

import { VehicleFilters } from "~/components/template/filter/filter"
import VehicleStatistics from "~/components/template/statistics/statistcs"
import { VehicleCard, VehicleCardSkeleton } from "~/components/template/card/card" // Componente extraído de card

// Icons
import { Filter, Search, X } from "lucide-react"

// Types
import type { Vehicle, VehicleSearchParams, VehicleError } from "~/types/vehicle"

// Motion
import { motion, AnimatePresence } from "framer-motion"

// Data
import { Carousel } from "~/components/template/carousel/carousel"
import { PrincipalCars } from "~/data/carousel"

const VehicleListingPage = () => {
  const {
    vehicles,
    loading,
    fetchVehicles,
    addFavorite,
    removeFavorite,
    fetchUserFavorites,
    favorites,
  } = useVehicle()

  const [searchParams, setSearchParams] = useState<VehicleSearchParams>({})
  const [showFilters, setShowFilters] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [error, setError] = useState<VehicleError | null>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Fetch user favorites on component mount
  useEffect(() => {
    fetchUserFavorites()
  }, [])

  // Fetch vehicles when search params change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVehicles(searchParams)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchParams, fetchVehicles])

  // Track scroll position for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node) && showFilters) {
        setShowFilters(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showFilters])

  // Auto-hide error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, modelo: e.target.value })
  }

  const handleFilterChange = (field: keyof VehicleSearchParams, value: string | number | boolean | undefined) => {
    if (value === "All" || value === undefined) {
      // Remove o campo dos parâmetros de busca se o valor for "All" ou undefined
      const newParams = { ...searchParams }
      delete newParams[field]
      setSearchParams(newParams)
    } else {
      // Define o novo valor
      setSearchParams({ ...searchParams, [field]: value })
    }
  }

  const handlePriceChange = (value: number[]) => {
    setSearchParams({
      ...searchParams,
      precoMin: value[0],
      precoMax: value[1],
    })
  }

  const resetFilters = () => {
    setSearchParams({})
  }

  const toggleFavorite = async (vehicle: Vehicle) => {
    try {
      if (isFavorite(vehicle.id)) {
        await removeFavorite(vehicle.id)
      } else {
        await addFavorite(vehicle.id)
      }
      await fetchUserFavorites()
      setError(null) // Limpa o erro se a operação for bem-sucedida
    } catch (err) {
      const error = err as Error
      
      if (error.message === 'User not authenticated') {
        setError({
          message: 'Você precisa fazer login para adicionar aos favoritos',
          type: 'auth'
        })
      } else {
        setError({
          message: 'Ocorreu um erro ao atualizar seus favoritos',
          type: 'api'
        })
        console.error("Erro ao atualizar favoritos:", error)
      }
    }
  }

  const isFavorite = (vehicleId: string) => {
    return Array.isArray(favorites) && favorites.some((v) => v.id === vehicleId)
  }

  const retryFetch = () => {
    fetchVehicles(searchParams)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header de busca com sticky */}
      <div
        className={`sticky top-0 z-10 bg-white dark:bg-gray-950 transition-all duration-300 ${
          scrolled ? "shadow-md py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-col gap-4 items-center w-full max-w-full">
            <div className="flex-1 w-full flex flex-row items-center justify-between">
              <div className="relative w-auto">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18}
                />
                <Input
                  placeholder="Buscar por modelo..."
                  value={searchParams.modelo || ""}
                  onChange={handleSearchChange}
                  className="w-full pl-10 border-b-zinc-950 rounded-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-900 transition-all"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 shadow-none border-none hover:bg-gray-100 dark:hover:bg-gray-900 transition-all ${
                  showFilters ? "bg-gray-100 dark:bg-gray-900" : ""
                }`}
              >
                <Filter size={16} />
                Filtros
                {showFilters && <X size={16} className="ml-2" />}
              </Button>
            </div>
            <div className="flex flex-row w-full max-w-full items-center justify-center">
              <VehicleStatistics/>
            </div>
          </div>
        </div>
      </div>

      {/* Painel de filtros (mostra/esconde) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            ref={filtersRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="container mx-auto px-2 lg:px-4 relative z-10"
          >
            <VehicleFilters 
              searchParams={searchParams} 
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-0 py-0">
        {/* Carousel destacado */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium mb-2 text-gray-900 dark:text-gray-100"
          >
            <Carousel items={PrincipalCars} className="w-full max-w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium mb-2 bg-zinc-100 h-18 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Estado de carregamento */}
        {loading && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full p-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <VehicleCardSkeleton />
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Estado de erro */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-50 max-w-md"
          >
            <Alert variant={error.type === 'auth' ? 'default' : 'destructive'}>
              <div className="flex justify-between items-start">
                <div>
                  <AlertTitle>
                    {error.type === 'auth' ? 'Ação requerida' : 'Erro'}
                  </AlertTitle>
                  <AlertDescription>
                    {error.message}
                    {error.type === 'auth' && (
                      <Button
                        variant="link"
                        className="h-auto p-0 ml-2 text-inherit underline"
                        onClick={() => navigate('/login', { state: { from: location.pathname } })}
                      >
                        Fazer login
                      </Button>
                    )}
                  </AlertDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setError(null)}
                >
                  <X size={16} />
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}

        {/* Estado de erro na busca */}
        {!loading && !Array.isArray(vehicles) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="max-w-2xl mx-auto text-center p-8 md:p-12 bg-gray-50 dark:bg-gray-900 "
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 dark:text-gray-600"
              >
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </motion.div>

              <div className="space-y-3">
                <h3 className="text-xl font-light text-gray-800 dark:text-gray-200">
                  Falha ao carregar veículos
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-light">
                  Não foi possível carregar os veículos no momento. Por favor, tente novamente.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2 text-sm bg-transparent text-gray-800 dark:text-gray-200 font-light rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
                onClick={retryFetch}
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
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Tentar novamente
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Lista de veículos */}
        {!loading && Array.isArray(vehicles) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 px-2 sm:px-4"
            >
              {vehicles.map((vehicle, index) => (
                <VehicleCard 
                  key={vehicle.id}
                  vehicle={vehicle}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Mensagem quando não há veículos */}
            {vehicles.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800"
              >
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">Nenhum veículo encontrado</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tente ajustar seus filtros de busca ou volte mais tarde.
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default VehicleListingPage