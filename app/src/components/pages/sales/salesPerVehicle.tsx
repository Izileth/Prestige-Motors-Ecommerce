import type React from "react"
import { useEffect } from "react"
import useSale from "~/src/hooks/useSale"
import SalesList from "./salesList"
import { Card, CardHeader, CardTitle, CardContent } from "~/src/components/ui/card"
import { History } from "lucide-react"

interface VehicleSalesProps {
  vehicleId: string
}

const VehicleSales: React.FC<VehicleSalesProps> = ({ vehicleId }) => {
  const { vehicleSales, fetchSalesByVehicle, setCurrentSale } = useSale()

  useEffect(() => {
    fetchSalesByVehicle(vehicleId)
  }, [vehicleId])

  const currentYear = new Date().getFullYear()

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="border border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
        <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-5 flex items-center gap-3">
          <div className="p-2 bg-white border border-gray-200 rounded-lg">
            <History className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
          </div>
          <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">
            Histórico de Vendas deste Veículo
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <SalesList sales={vehicleSales} onSelectSale={setCurrentSale} title="Vendas Anteriores" />
        </CardContent>
      </Card>

      {/* Copyright Notice */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center font-light tracking-wide">
          © {currentYear} Vehicle Sales History. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default VehicleSales
