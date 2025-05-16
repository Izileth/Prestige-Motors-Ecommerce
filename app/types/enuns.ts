import type { Accept } from "react-dropzone";

export const FuelType = {
    GASOLINA: 'GASOLINA',
    ETANOL: 'ETANOL',
    FLEX: 'FLEX',
    DIESEL: 'DIESEL',
    ELETRICO: 'ELETRICO',
    HIBRIDO: 'HIBRIDO',
    GNV: 'GNV'
} as const;

export const TransmissionType = {
    MANUAL: 'MANUAL',
    AUTOMATICO: 'AUTOMATICO',
    SEMI_AUTOMATICO: 'SEMI_AUTOMATICO',
    CVT: 'CVT'
} as const;

export const BodyType = {
    HATCH: 'HATCH',
    SEDAN: 'SEDAN',
    SUV: 'SUV',
    PICAPE: 'PICAPE',
    COUPE: 'COUPE',
    CONVERSIVEL: 'CONVERSIVEL',
    PERUA: 'PERUA',
    MINIVAN: 'MINIVAN',
    VAN: 'VAN',
    BUGGY: 'BUGGY',
    OFFROAD: 'OFFROAD'
} as const;

export const VehicleCategory = {
    HYPERCAR: 'HYPERCAR',
    SUPERCAR: 'SUPERCAR',
    SPORTS_CAR: 'SPORTS_CAR',
    CLASSIC_MUSCLE: 'CLASSIC_MUSCLE',
    MODERN_MUSCLE: 'MODERN_MUSCLE',
    RETRO_SUPER: 'RETRO_SUPER',
    DRIFT_CAR: 'DRIFT_CAR',
    TRACK_TOY: 'TRACK_TOY',
    OFFROAD: 'OFFROAD',
    BUGGY: 'BUGGY',
    PICKUP_4X4: 'PICKUP_4X4',
    SUV: 'SUV',
    HOT_HATCH: 'HOT_HATCH',
    SALOON: 'SALOON',
    GT: 'GT',
    RALLY: 'RALLY',
    CONCEPT: 'CONCEPT'
} as const;

export const VehicleClass = {
    D: 'D',
    C: 'C',
    B: 'B',
    A: 'A',
    S1: 'S1',
    S2: 'S2',
    X: 'X'
} as const;


export const acceptedFileTypes: Accept = {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'image/webp': ['.webp']
};