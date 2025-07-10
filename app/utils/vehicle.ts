export const getFuelType = (type: string) => {
  const fuelTypes: Record<string, string> = {
    GASOLINA: "Gasolina",
    ETANOL: "Etanol",
    FLEX: "Flex",
    DIESEL: "Diesel",
    ELETRICO: "Elétrico",
    HIBRIDO: "Híbrido",
    GNV: "GNV",
  };
  return fuelTypes[type] || type;
};

export const getTransmissionType = (type: string) => {
  const transmissionTypes: Record<string, string> = {
    MANUAL: "Manual",
    AUTOMATICO: "Automático",
    SEMI_AUTOMATICO: "Semi-automático",
    CVT: "CVT",
  };
  return transmissionTypes[type] || type;
};
