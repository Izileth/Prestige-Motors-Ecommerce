import { useNavigate } from "react-router";
import { createSlug } from "~/src/utils/slugify";
import type { Vehicle } from "~/src/types/vehicle";




export const useVehicleNavigation = () => {
    const navigate = useNavigate();

    const navigateToVehicle = (vehicle: Vehicle) => {
        const slug = createSlug(
            vehicle.marca,
            vehicle.modelo,
            vehicle.anoFabricacao?.toString() || vehicle.anoModelo?.toString() || 'unknown',
            vehicle.id
        );
        navigate(`/vehicles/${slug}`);
    };

    const generateVehicleUrl = (vehicle: Vehicle): string => {
        const slug = createSlug(
            vehicle.marca,
            vehicle.modelo,
            vehicle.anoFabricacao?.toString() || vehicle.anoModelo?.toString() || 'unknown',
            vehicle.id
        );
        return `/vehicles/${slug}`;
    };

    return { navigateToVehicle, generateVehicleUrl };
};