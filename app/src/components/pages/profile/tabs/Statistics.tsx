import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/src/components/ui/card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts"
import { Car, TrendingUp, DollarSign, Package, ShoppingCart, Activity, Zap } from "lucide-react"
import type { UserStats } from "~/src/types/user"

interface StatisticsProps {
  userStats: UserStats | null
}

const Statistics: React.FC<StatisticsProps> = ({ userStats }) => {
  // Função para formatar valor em moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { month: "short", day: "numeric" })
  }

  // Dados seguros para evitar erros nulos
  const safeStats = {
    totalVehicles: userStats?.totalVehicles || 0,
    valorTotalInventario: userStats?.valorTotalInventario || 0,
    precoMedio: userStats?.precoMedio || 0,
    anoFabricacaoMedio: userStats?.anoFabricacaoMedio || 0,
    anoModeloMedio: userStats?.anoModeloMedio || 0,
    precoMinimo: userStats?.precoMinimo || 0,
    precoMaximo: userStats?.precoMaximo || 0,
  }

  // Se não há dados, mostra estado vazio
  if (!userStats || safeStats.totalVehicles === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100 font-light">Estatísticas</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 font-light">
              Nenhum dado disponível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-500 font-light">Adicione veículos para ver as estatísticas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Processar timeline para gráfico de evolução
  const timelineData =
    userStats.vehicleTimeline
      ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .reduce(
        (acc, item) => {
          const date = formatDate(item.createdAt)
          const existing = acc.find((d) => d.date === date)
          if (existing) {
            existing.veiculos += item._count.id
          } else {
            const previousTotal = acc.length > 0 ? acc[acc.length - 1].total : 0
            acc.push({
              date,
              veiculos: item._count.id,
              total: previousTotal + item._count.id,
            })
          }
          return acc
        },
        [] as Array<{ date: string; veiculos: number; total: number }>,
      ) || []

  const COLORS = ["#000000", "#262626", "#404040", "#525252", "#737373", "#a3a3a3"]

  // Processar distribuição de preços para linha
  const priceLineData =
    userStats.priceDistribution
      ?.sort((a, b) => a.preco - b.preco)
      .map((item, index) => ({
        index: index + 1,
        preco: item.preco,
        label: formatCurrency(item.preco),
      })) || []

  // Dados de marcas para gráfico de pizza
  const brandPieData =
    userStats.brandDistribution?.map((item) => ({
      name: item.marca.trim(),
      value: item._count.id,
    })) || []

  // Dados de status
  const statusData =
    userStats.statusDistribution?.map((item) => ({
      name: item.status === "DISPONIVEL" ? "Disponível" : "Vendido",
      value: item._count.id,
    })) || []

  // Dados de categorias
  const categoryData =
    userStats.categoryDistribution?.map((item) => ({
      name: item.categoria.replace(/_/g, " "),
      quantidade: item._count.id,
    })) || []

  const disponiveisCount = userStats.statusDistribution?.find((s) => s.status === "DISPONIVEL")?._count.id || 0
  const vendidosCount = userStats.statusDistribution?.find((s) => s.status === "VENDIDO")?._count.id || 0
  const taxaVenda = safeStats.totalVehicles > 0 ? ((vendidosCount / safeStats.totalVehicles) * 100).toFixed(1) : "0"

  const totalSalesValue = userStats.salesStats?.totalSalesValue || 0
  const totalVehiclesSold = userStats.salesStats?.totalVehiclesSold || 0
  const ticketMedio = totalVehiclesSold > 0 ? totalSalesValue / totalVehiclesSold : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border rounded-none border-gray-900 dark:border-gray-100 shadow-sm bg-black dark:bg-white text-white dark:text-black transition-colors hover:bg-gray-900 dark:hover:bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-gray-300 dark:text-gray-600">Total de Veículos</p>
                <p className="text-3xl font-light mt-2">{safeStats.totalVehicles}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-light">
                  {disponiveisCount} disponíveis
                </p>
              </div>
              <div className="border border-gray-700 dark:border-gray-300 p-3 rounded-full">
                <Car className="h-6 w-6 text-gray-300 dark:text-gray-700" strokeWidth={1} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 rounded-none dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">Valor Total</p>
                <p className="text-3xl font-light text-gray-900 dark:text-white mt-2">
                  {formatCurrency(safeStats.valorTotalInventario)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-gray-600 dark:text-gray-400" strokeWidth={1.5} />
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-1 font-light">Inventário ativo</span>
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-gray-700 dark:text-gray-300" strokeWidth={1} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 rounded-none dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">Vendas</p>
                <p className="text-3xl font-light text-gray-900 dark:text-white mt-2">
                  {formatCurrency(totalSalesValue)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-light">
                  {totalVehiclesSold} veículos vendidos
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" strokeWidth={1} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 rounded-none dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">Taxa de Venda</p>
                <p className="text-3xl font-light text-gray-900 dark:text-white mt-2">{taxaVenda}%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-light">
                  {vendidosCount} de {safeStats.totalVehicles} veículos
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 p-3 rounded-full">
                <Activity className="h-6 w-6 text-gray-700 dark:text-gray-300" strokeWidth={1} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Evolução Timeline */}
        {timelineData.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 font-light flex items-center gap-2">
                <Zap className="h-5 w-5" strokeWidth={1} />
                Evolução do Inventário
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 font-light">
                Crescimento acumulado ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000000" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" strokeWidth={0.5} />
                    <XAxis
                      dataKey="date"
                      stroke="#a3a3a3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ strokeWidth: 0.5 }}
                    />
                    <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={{ strokeWidth: 0.5 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e5e5",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 300,
                      }}
                      formatter={(value: number) => [value, "Veículos"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#000000"
                      strokeWidth={1.5}
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Distribuição de Marcas (Pizza) */}
        {brandPieData.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 font-light">Distribuição por Marca</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 font-light">
                Portfólio de marcas no inventário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={brandPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={1}
                    >
                      {brandPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e5e5",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 300,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Status */}
        {statusData.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 font-light">Status dos Veículos</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 font-light">
                Disponíveis vs Vendidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" strokeWidth={0.5} />
                    <XAxis
                      dataKey="name"
                      stroke="#a3a3a3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ strokeWidth: 0.5 }}
                    />
                    <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={{ strokeWidth: 0.5 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e5e5",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 300,
                      }}
                    />
                    <Bar dataKey="value" fill="#000000" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Categorias */}
        {categoryData.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 font-light">Distribuição por Categoria</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 font-light">
                Tipos de veículos no portfólio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ left: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" strokeWidth={0.5} />
                    <XAxis
                      type="number"
                      stroke="#a3a3a3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ strokeWidth: 0.5 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#a3a3a3"
                      fontSize={10}
                      tickLine={false}
                      width={80}
                      axisLine={{ strokeWidth: 0.5 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e5e5",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 300,
                      }}
                    />
                    <Bar dataKey="quantidade" fill="#000000" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Distribuição de Preços (Linha) */}
        {priceLineData.length > 0 && (
          <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 font-light">Distribuição de Preços</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 font-light">
                Faixa de valores do inventário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceLineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" strokeWidth={0.5} />
                    <XAxis
                      dataKey="index"
                      stroke="#a3a3a3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ strokeWidth: 0.5 }}
                      label={{
                        value: "Veículos",
                        position: "insideBottom",
                        offset: -5,
                        style: { fontSize: 11, fill: "#a3a3a3" },
                      }}
                    />
                    <YAxis
                      stroke="#a3a3a3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ strokeWidth: 0.5 }}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e5e5",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 300,
                      }}
                      formatter={(value: number) => [formatCurrency(value), "Preço"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="preco"
                      stroke="#000000"
                      strokeWidth={1.5}
                      dot={{ fill: "#000000", r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 font-light flex items-center gap-2">
            <Package className="h-5 w-5" strokeWidth={1} />
            Resumo Financeiro Detalhado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">Preço Médio</p>
              <p className="text-2xl font-light text-gray-900 dark:text-white">
                {formatCurrency(safeStats.precoMedio)}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 font-light">
                <span>Min: {formatCurrency(safeStats.precoMinimo)}</span>
                <span>Max: {formatCurrency(safeStats.precoMaximo)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">Média de Anos</p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-light">Fabricação</p>
                  <p className="text-xl font-light text-gray-900 dark:text-white">
                    {Math.round(safeStats.anoFabricacaoMedio)}
                  </p>
                </div>
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-light">Modelo</p>
                  <p className="text-xl font-light text-gray-900 dark:text-white">
                    {Math.round(safeStats.anoModeloMedio)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">Performance</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-light">Taxa de Conversão</span>
                  <span className="font-light text-gray-900 dark:text-white">{taxaVenda}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-light">Ticket Médio (Vendas)</span>
                  <span className="font-light text-gray-900 dark:text-white">{formatCurrency(ticketMedio)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

       </div>
  )
}

export default Statistics
