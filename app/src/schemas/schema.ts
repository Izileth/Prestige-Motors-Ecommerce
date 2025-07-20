
import { z } from 'zod';
import { FuelType, TransmissionType, BodyType, VehicleCategory, VehicleClass } from '~/src/types/enuns';

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

export const addressSchema = z.object({
    cep: z.string()
        .min(8, "CEP deve ter 8 dígitos")
        .max(8, "CEP deve ter 8 dígitos")
        .regex(/^\d{8}$/, "CEP deve conter apenas números"),
    logradouro: z.string()
        .min(1, "Logradouro é obrigatório")
        .max(255, "Logradouro muito longo"),
    numero: z.string()
        .min(1, "Número é obrigatório")
        .max(20, "Número muito longo"),
    complemento: z.string().max(100, "Complemento muito longo").optional(),
    bairro: z.string()
        .min(1, "Bairro é obrigatório")
        .max(100, "Bairro muito longo"),
    cidade: z.string()
        .min(1, "Cidade é obrigatória")
        .max(100, "Cidade muito longa"),
    estado: z.string()
        .min(2, "Estado deve ter 2 caracteres")
        .max(2, "Estado deve ter 2 caracteres")
        .regex(/^[A-Z]{2}$/, "Estado deve conter apenas letras maiúsculas"),
    pais: z.string()
        .min(1, "País é obrigatório")
        .max(100, "País muito longo"),
})

export type AddressFormData = z.infer<typeof addressSchema>;

export const formSchema = z.object({
    vehicleId: z.string().min(1, "Selecione um veículo"),
    compradorId: z.string().min(1, "Selecione um comprador"),
    precoVenda: z.number().min(1, "O preço deve ser maior que zero"),
    formaPagamento: z.enum(["À Vista", "Cartão de Crédito", "Financiamento", "Boleto", "PIX"], {
        error: "Selecione uma forma de pagamento",
    }),
    parcelas: z.number().min(1).max(36).optional(),
    categoria: z.nativeEnum(VehicleCategory),
    observacoes: z.string().optional(),
}).refine((data) => {
    // Se não for à vista, parcelas é obrigatório
    if (data.formaPagamento !== "À Vista" && !data.parcelas) {
        return false;
    }
    return true;
}, {
    message: "Número de parcelas é obrigatório para esta forma de pagamento",
    path: ["parcelas"],
});

export type SaleFormValues = z.infer<typeof formSchema>;