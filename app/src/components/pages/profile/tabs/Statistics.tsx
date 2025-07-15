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
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Resumo Estatístico</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Principais métricas do inventário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total de Veículos:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {safeStats.totalVehicles}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Valor Total:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(safeStats.valorTotalInventario)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Preço Médio:</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(safeStats.precoMedio)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Faixa de Preços:</span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {formatCurrency(safeStats.precoMinimo)} - {formatCurrency(safeStats.precoMaximo)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Ano Médio:</span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Fab: {Math.round(safeStats.anoFabricacaoMedio)} | Mod: {Math.round(safeStats.anoModeloMedio)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;