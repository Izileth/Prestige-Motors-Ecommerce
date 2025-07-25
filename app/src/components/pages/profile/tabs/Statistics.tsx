import type React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/src/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Calendar, CalendarCheck, Car, TrendingUp } from "lucide-react";
import type { UserStats } from "~/src/types/user";

interface StatisticsProps {
  userStats: UserStats | null;
}

const Statistics: React.FC<StatisticsProps> = ({ userStats }) => {
  // Função para formatar valor em moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { 
      style: "currency", 
      currency: "BRL" 
    }).format(value);
  };

  // Dados seguros para evitar erros nulos
  const safeStats = {
    totalVehicles: userStats?.totalVehicles || 0,
    valorTotalInventario: userStats?.valorTotalInventario || 0,
    precoMedio: userStats?.precoMedio || 0,
    anoFabricacaoMedio: userStats?.anoFabricacaoMedio || 0,
    anoModeloMedio: userStats?.anoModeloMedio || 0,
    precoMinimo: userStats?.precoMinimo || 0,
    precoMaximo: userStats?.precoMaximo || 0,
  };

  // Dados para o gráfico de distribuição de preços
  const priceDistributionData = [
    { name: "Mínimo", value: safeStats.precoMinimo },
    { name: "Médio", value: safeStats.precoMedio },
    { name: "Máximo", value: safeStats.precoMaximo },
  ];

  // Dados para o gráfico de anos (usando os anos médios como exemplo)
  const yearData = [
    { name: "Ano Fabricação", value: safeStats.anoFabricacaoMedio },
    { name: "Ano Modelo", value: safeStats.anoModeloMedio },
  ];

  // Dados para resumo financeiro
  const financialData = [
    { name: "Valor Total", value: safeStats.valorTotalInventario },
    { name: "Preço Médio", value: safeStats.precoMedio },
  ];

  // Se não há dados, mostra estado vazio
  if (!userStats || safeStats.totalVehicles === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Estatísticas</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Nenhum dado disponível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                Adicione veículos para ver as estatísticas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Distribuição de Preços */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Distribuição de Preços</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Comparação entre mínimo, médio e máximo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={priceDistributionData}
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Valor"]}
                />
                <Bar 
                  dataKey="value" 
                  fill="#18181b" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Informações Gerais */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Resumo Financeiro</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Valor total e preço médio do inventário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={financialData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Valor"]}
                />
                <Bar 
                  dataKey="value" 
                  fill="#000" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Anos */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Média de Anos</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Ano médio de fabricação e modelo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={yearData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis 
                  dataKey="name" 
                  stroke="#080808" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  domain={['dataMin - 5', 'dataMax + 5']}
                  stroke="#000000" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [Math.round(value), "Ano"]}
                />
                <Bar 
                  dataKey="value" 
                  fill="#000000" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Card de Resumo Numérico */}
      {/* Card de Resumo Estatístico Aprimorado */}
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BarChart className="h-5 w-5" /> {/* Ícone para melhorar a identificação visual */}
            Resumo Estatístico
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Visão geral do seu inventário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primeira coluna */}
            <div className="space-y-4">
              {/* Total de Veículos com destaque */}
              <div className="bg-zinc-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Veículos</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {safeStats.totalVehicles}
                    </p>
                  </div>
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                    <Car className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              </div>

              {/* Faixa de Preços com mini gráfico */}
              <div className="bg-zinc-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Faixa de Preços</p>
                <div className="flex items-end h-12 gap-1 mb-2">
                  <div className="bg-zinc-950 dark:bg-gray-600 w-1/4 h-1/3 rounded-t-sm"></div>
                  <div className="bg-zinc-700 dark:bg-gray-500 w-1/4 h-2/3 rounded-t-sm"></div>
                  <div className="bg-zinc-900 w-1/4 h-full rounded-t-sm"></div>
                  <div className="bg-zinc-950 dark:bg-gray-500 w-1/4 h-2/3 rounded-t-sm"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900 dark:text-gray-100">
                    {formatCurrency(safeStats.precoMinimo)}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {formatCurrency(safeStats.precoMaximo)}
                  </span>
                </div>
              </div>
            </div>

            {/* Segunda coluna */}
            <div className="space-y-4">
              {/* Valor Total com variação */}
              <div className="bg-zinc-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(safeStats.valorTotalInventario)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 ml-1">+12% vs mês anterior</span>
                </div>
              </div>

              {/* Preço Médio com comparação */}
              <div className="bg-zinc-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Preço Médio</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(safeStats.precoMedio)}
                </p>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-gray-500 dark:text-gray-400">Mín: {formatCurrency(safeStats.precoMinimo)}</span>
                  <span className="text-gray-500 dark:text-gray-400">Máx: {formatCurrency(safeStats.precoMaximo)}</span>
                </div>
              </div>
            </div>

            {/* Anos - linha completa */}
            <div className="md:col-span-2 bg-zinc-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Média de Anos</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fabricação</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {Math.round(safeStats.anoFabricacaoMedio)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarCheck className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Modelo</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {Math.round(safeStats.anoModeloMedio)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;