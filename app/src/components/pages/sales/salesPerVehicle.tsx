import React, { useEffect, useCallback, useMemo } from "react";
import useSale from "~/src/hooks/useSale";
import SalesList from "./salesList";
import { Card, CardHeader, CardTitle, CardContent } from "~/src/components/ui/card";
import { History } from "lucide-react";

interface VehicleSalesProps {
  vehicleId: string;
}

const VehicleSales: React.FC<VehicleSalesProps> = ({ vehicleId }) => {
  const { vehicleSales, fetchSalesByVehicle, setCurrentSale } = useSale();

  // Memoize fetch function to prevent unnecessary recreations
  const fetchVehicleSales = useCallback(async () => {
    try {
      await fetchSalesByVehicle(vehicleId);
    } catch (error) {
      console.error("Error fetching vehicle sales:", error);
    }
  }, [vehicleId, fetchSalesByVehicle]);

  useEffect(() => {
    fetchVehicleSales();
  }, [fetchVehicleSales]);

  // Memoize current year to avoid recalculating
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="w-full max-w-full mx-auto p-4">
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
          <SalesList 
            sales={vehicleSales} 
            onSelectSale={setCurrentSale} 
            title="Vendas Anteriores" 
          />
        </CardContent>
      </Card>

    </div>
  );
};

export default React.memo(VehicleSales);