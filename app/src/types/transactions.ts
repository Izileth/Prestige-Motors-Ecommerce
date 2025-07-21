export interface VehicleTransaction {
    id: string;
    marca: string;
    modelo: string;
    anoFabricacao: number;
    imagemPrincipal: string | null;
}

export interface UserTransaction {
    id: string;
    nome: string;
    email: string;
    telefone: string;
}

export interface SaleTransaction {
    id: string;
    vehicleId: string;
    vendedorId: string;
    compradorId: string;
    precoVenda: number;
    formaPagamento: string;
    parcelas?: number;
    observacoes?: string;
    categoria: string;
    status: "CONCLUIDA" ;
    categoriaVeiculo: string | null;
    dataVenda: string;
    dataCriacao: string;
    dataAtualizacao: string;
    vehicle: VehicleTransaction;
    vendedor?: UserTransaction;
    comprador?: UserTransaction;
    role: 'seller' | 'buyer';
}

export interface UserTransactionsResponse {
    asSeller: SaleTransaction[];
    asBuyer: SaleTransaction[];
}