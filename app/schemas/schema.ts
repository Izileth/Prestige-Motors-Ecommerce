
import { z } from 'zod';
import { FuelType, TransmissionType, BodyType, VehicleCategory, VehicleClass } from '~/types/enuns';

export const vehicleFormSchema = z.object({
    marca: z.string().min(1, 'Marca é obrigatória'),
    modelo: z.string().min(1, 'Modelo é obrigatório'),
    anoFabricacao: z.number().int().min(1886, 'Ano inválido').max(new Date().getFullYear() + 1),
    anoModelo: z.number().int().min(1886, 'Ano inválido').max(new Date().getFullYear() + 1),
    preco: z.number().positive('Preço deve ser positivo'),
    precoPromocional: z.number().positive('Preço promocional deve ser positivo').optional(),
    descricao: z.string().optional(),
    quilometragem: z.number().min(0, 'Quilometragem não pode ser negativa'),
    tipoCombustivel: z.nativeEnum(FuelType),
    cambio: z.nativeEnum(TransmissionType),
    cor: z.string().min(1, 'Cor é obrigatória'),
    portas: z.number().int().min(2).max(5),
    finalPlaca: z.number().int().min(0).max(9).optional(),
    carroceria: z.nativeEnum(BodyType),
    potencia: z.number().int().positive().optional(),
    motor: z.string().optional(),
    categoria: z.nativeEnum(VehicleCategory),
    classe: z.nativeEnum(VehicleClass),
    destaque: z.boolean().default(false),
    seloOriginal: z.boolean().default(false),
    aceitaTroca: z.boolean().default(false),
    parcelamento: z.number().int().positive().optional(),

    imagens: z.array(z.union([z.object({
        id: z.string(),
        url: z.string()
    }), z.instanceof(File)])).optional(),

    localizacao: z.object({
    cep: z.string().min(8, 'CEP inválido').max(9),
    logradouro: z.string().min(3, 'Endereço muito curto'),
    numero: z.string().min(1, 'Número é obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string().min(3, 'Bairro muito curto'),
    cidade: z.string().min(3, 'Cidade muito curta'),
    estado: z.string().length(2, 'UF deve ter 2 caracteres'),
    pais: z.string().default('Brasil'),
    latitude: z.number().optional(),
    longitude: z.number().optional()
    }).optional()

});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;