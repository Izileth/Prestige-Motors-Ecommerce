
const VehicleImages = ({ imageUrl }: { imageUrl?: string }) => {
    if (!imageUrl) {
        return (
        <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">Sem imagem</span>
        </div>
        );
    }

    return (
        <div className="w-16 h-12 rounded overflow-hidden">
        <img
            src={imageUrl}
            alt="Veículo"
            width={64}
            height={48}
            className="object-cover w-full h-full"
            loading="lazy"
        />
        </div>
    );
};

export default VehicleImages