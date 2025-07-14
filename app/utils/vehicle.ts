
export const getFuelType = (type: string) => {
  const labels: Record<string, string> = {
    GASOLINA: "Gasolina",
    ETANOL: "Etanol",
    FLEX: "Flex",
    DIESEL: "Diesel",
    ELETRICO: "Elétrico",
    HIBRIDO: "Híbrido",
    GNV: "GNV",
  };
  return labels[type] || type;
};

export const getTransmissionType = (type: string) => {
  const labels: Record<string, string> = {
    MANUAL: "Manual",
    AUTOMATICO: "Automático",
    SEMI_AUTOMATICO: "Semi-automático",
    CVT: "CVT",
  };
  return labels[type] || type;
};

export const getBodyType = (type: string) => {
  const labels: Record<string, string> = {
    HATCH: "Hatch",
    SEDAN: "Sedã",
    SUV: "SUV",
    PICAPE: "Picape",
    COUPE: "Cupê",
    CONVERSIVEL: "Conversível",
    PERUA: "Perua",
    MINIVAN: "Minivan",
    VAN: "Van",
    BUGGY: "Buggy",
    OFFROAD: "Off-road",
  };
  return labels[type] || type;
};

export const getCategoryType = (category: string) => {
  const labels: Record<string, string> = {
    HYPERCAR: "Hypercar",
    SUPERCAR: "Supercar",
    SPORTS_CAR: "Sports Car",
    CLASSIC_MUSCLE: "Classic Muscle",
    MODERN_MUSCLE: "Modern Muscle",
    RETRO_SUPER: "Retro Super",
    DRIFT_CAR: "Drift Car",
    TRACK_TOY: "Track Toy",
    OFFROAD: "Offroad",
    BUGGY: "Buggy",
    PICKUP_4X4: "Pickup 4x4",
    SUV: "SUV",
    HOT_HATCH: "Hot Hatch",
    SALOON: "Saloon",
    GT: "GT",
    RALLY: "Rally",
    CONCEPT: "Concept",
  };
  return labels[category] || category;
};

export const getClassType = (vehicleClass: string) => {
  const labels: Record<string, string> = {
    D: "Classe D (Básico)",
    C: "Classe C (Intermediário)",
    B: "Classe B (Avançado)",
    A: "Classe A (Especialista)",
    S1: "Classe S1 (Super)",
    S2: "Classe S2 (Ultra)",
    X: "Classe X (Extremo)",
  };
  return labels[vehicleClass] || vehicleClass;
};