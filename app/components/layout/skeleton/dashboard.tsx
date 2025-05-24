import { Skeleton } from "~/components/ui/skeleton"
export default function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Nome do Usuário */}
            <div className="mb-6">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-5 w-40" />
            </div>

            {/* Grid de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
                </div>
            ))}
            </div>

            {/* Seção Principal - Informações Pessoais e Avatar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Informações Pessoais - Esquerda */}
            <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-9 w-20" />
                </div>
                
                {/* Formulário de Informações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo Nome */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                    
                    {/* Campo Sobrenome */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                    
                    {/* Campo Email */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                    
                    {/* Campo Telefone */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                    
                    {/* Campo Data de Nascimento */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                    
                    {/* Campo Gênero */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                    
                    {/* Campo Endereço - Full Width */}
                    <div className="md:col-span-2 space-y-2">
                    <Skeleton className="h-4 w-18" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                    
                    {/* Campo Cidade */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                    
                    {/* Campo CEP */}
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                
                {/* Botão Salvar */}
                <div className="mt-6 flex justify-end">
                    <Skeleton className="h-10 w-32" />
                </div>
                </div>
            </div>

            {/* Avatar e Imagem - Direita */}
            <div className="space-y-6">
                {/* Card do Avatar */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                
                {/* Avatar Principal */}
                <div className="flex flex-col items-center mb-6">
                    <Skeleton className="h-32 w-32 rounded-full mb-4" />
                    <Skeleton className="h-5 w-28 mb-2" />
                    <Skeleton className="h-4 w-36" />
                </div>
                
                {/* Botões de Upload */}
                <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-9 w-full" />
                </div>
                </div>

                {/* Card de Estatísticas Pessoais */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-12" />
                    </div>
                    <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-14" />
                    </div>
                    <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-18" />
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Seção Inferior - Senha e Exclusão */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card de Alteração de Senha */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <div className="flex items-center mb-6">
                <Skeleton className="h-5 w-5 mr-3" />
                <Skeleton className="h-6 w-32" />
                </div>
                
                <div className="space-y-4">
                {/* Senha Atual */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                
                {/* Nova Senha */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                
                {/* Confirmar Senha */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full" />
                </div>
                </div>
                
                {/* Botão Alterar Senha */}
                <div className="mt-6">
                <Skeleton className="h-10 w-36" />
                </div>
            </div>

            {/* Card de Exclusão de Conta */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <div className="flex items-center mb-4">
                <Skeleton className="h-5 w-5 mr-3" />
                <Skeleton className="h-6 w-32" />
                </div>
                
                <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                </div>
                
                {/* Campo de Confirmação */}
                <div className="mt-6 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-10 w-full" />
                </div>
                
                {/* Botão Excluir Conta */}
                <div className="mt-6 flex justify-end">
                <Skeleton className="h-10 w-32" />
                </div>
            </div>
            </div>

            {/* Atividade Recente */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
            <Skeleton className="h-6 w-36 mb-6" />
            
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
                ))}
            </div>
            </div>

        </div>
        </div>
    )
    }