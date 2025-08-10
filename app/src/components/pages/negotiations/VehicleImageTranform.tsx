
const VehicleImages = ({ imageUrl }: { imageUrl?: string }) => {
    if (!imageUrl) {
        return (
        <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">Sem imagem</span>
        </div>
        );
    }

    return (
        <div className="w-full h-full rounded-none overflow-hidden">
        <img
            src={imageUrl}
            alt="Veículo"
            width={64}
            height={48}
             className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
        />
        </div>
    );
};

export default VehicleImages