import type { Route } from "./+types/id";
import VehicleDetailsPage from "~/src/pages/vehicles/id/id";
import vehicleService from "~/src/services/vehicle";


function parseSlugForMeta(slug: string) {
    try {
        const slugWithoutId = slug.substring(0, slug.lastIndexOf('-'));
        

        const parts = slugWithoutId.split('-');
        const formattedParts = parts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        );
        
 
        if (formattedParts.length >= 3) {
        const marca = formattedParts[0];
        const modelo = formattedParts.slice(1, -1).join(' '); 
        const ano = formattedParts[formattedParts.length - 1];
        
        return {
            marca,
            modelo, 
            ano,
            fullName: `${marca} ${modelo} ${ano}`
        };
        }
        
        // Fallback: apenas capitaliza tudo
        return {
        marca: formattedParts[0] || 'Veículo',
        modelo: formattedParts.slice(1).join(' ') || 'de Luxo',
        ano: '',
        fullName: formattedParts.join(' ')
        };
    } catch (error) {
        console.warn('Erro ao fazer parse do slug:', error);
        return {
        marca: 'Veículo',
        modelo: 'de Luxo', 
        ano: '',
        fullName: 'Veículo de Luxo'
        };
    }
}


export function meta({ params, data }: Route.MetaArgs) {
    const slug = params.slug;
    
    if (!slug) {
        return [
        { title: "Veículo | Prestige Motors" },
        { name: "description", content: "Confira este veículo na Prestige Motors" }
        ];
    }
  
    const vehicleInfo = parseSlugForMeta(slug);

    if (data?.vehicle) {
        const vehicle = data.vehicle;
        const vehicleTitle = `${vehicle.marca} ${vehicle.modelo} ${vehicle.anoFabricacao}`;
        const price = vehicle.precoPromocional || vehicle.preco;
        const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
        }).format(price);

        return [
        { title: `${vehicleTitle} | Prestige Motors` },
        { 
            name: "description", 
            content: `${vehicleTitle} por ${formattedPrice}. ${vehicle.descricao?.substring(0, 150) || 'Veículo de luxo disponível na Prestige Motors'}...` 
        },
        { name: "keywords", content: `${vehicle.marca}, ${vehicle.modelo}, ${vehicle.anoFabricacao}, carro de luxo` },
        

        { property: "og:title", content: `${vehicleTitle} | Prestige Motors` },
        { property: "og:description", content: `${vehicleTitle} por ${formattedPrice}` },
        { property: "og:image", content: vehicle.imagens[0]?.url || "/images/default-vehicle.jpg" },
        ];
    }

    return [
        { title: `${vehicleInfo.fullName} | Prestige Motors` },
        { 
        name: "description", 
        content: `Confira este incrível ${vehicleInfo.fullName} na Prestige Motors. Veículos de luxo e alto padrão.` 
        },
        { name: "keywords", content: `${vehicleInfo.marca}, ${vehicleInfo.modelo}, ${vehicleInfo.ano}, carro de luxo, prestige motors` },

        { property: "og:title", content: `${vehicleInfo.fullName} | Prestige Motors` },
        { property: "og:description", content: `${vehicleInfo.fullName} - Prestige Motors` },
    ];
}


export async function loader({ params }: Route.LoaderArgs) {
    const slug = params.slug;
    
    if (!slug) {
        throw new Response("Veículo não encontrado", { status: 404 });
    }

    try {
 
        const vehicle = await vehicleService.getVehicleBySlug(slug);
        return { vehicle };
    } catch (error) {
        console.error("Erro ao carregar veículo:", error);
        return { vehicle: null };
    }
}

export default function VehicleDetails() {
  return <VehicleDetailsPage />;
}