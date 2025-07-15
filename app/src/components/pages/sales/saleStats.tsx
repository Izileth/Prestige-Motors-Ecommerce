import type React from "react"
import type { SaleStats } from "~/src/types/sale"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "~/src/components/ui/card"
import { Badge } from "~/src/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/src/components/ui/table"
import { Loader2, TrendingUp, PieChartIcon, BarChart2, Info, Car, User } from "lucide-react"

interface SalesStatsProps {
  stats: SaleStats | null
  isLoading?: boolean
  title?: string
  description?: string
}

// Monochromatic color palette for charts
const MONOCHROMATIC_COLORS = ["#333333", "#666666", "#999999", "#CCCCCC", "#EEEEEE", "#BBBBBB"]

const SalesStats: React.FC<SalesStatsProps> = ({
  stats,
  isLoading = false,
  title = "Estatísticas de Vendas",
  description = "Dados consolidados sobre o desempenho das vendas",
}) => {
  const currentYear = new Date().getFullYear()

  if (isLoading) {
    return (
      <div className="w-full max-w-full mx-auto p-4">
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <TrendingUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">{title}</CardTitle>
            </div>
            <CardDescription className="text-gray-600 font-light text-sm">{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
          </CardContent>
        </Card>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center font-light tracking-wide">
            © {currentYear} Sales Analytics. All rights reserved.
          </p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <TrendingUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">{title}</CardTitle>
            </div>
            <CardDescription className="text-gray-600 font-light text-sm">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16 px-6 bg-gray-50/50 rounded-lg border border-gray-200 text-gray-600">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-medium mb-2 text-gray-900 tracking-tight">
                Nenhum dado estatístico disponível
              </h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                Não foi possível carregar as estatísticas de vendas. Por favor, tente novamente mais tarde.
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center font-light tracking-wide">
            © {currentYear} Sales Analytics. All rights reserved.
          </p>
        </div>
      </div>
    )
  }

  // Prepare data for charts
  const paymentMethodData = Object.entries(stats.byPaymentMethod).map(([name, { count, total }]) => ({
    name,
    count,
    total,
  }))
  const statusData = Object.entries(stats.byStatus).map(([name, { count, total }]) => ({
    name: name.replace(/_/g, " "), // Format status names
    count,
    total,
  }))
  const monthlySalesData = stats.monthlySales.map((item) => ({
    name: item.month,
    vendas: item.count,
    faturamento: item.total,
  }))

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Overview Card */}
      <Card className="border border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
        <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white border border-gray-200 rounded-lg">
              <TrendingUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            </div>
            <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">{title}</CardTitle>
          </div>
          <CardDescription className="text-gray-600 font-light text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
            <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Total de Vendas</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalSales}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
            <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Faturamento Total</h3>
            <p className="text-3xl font-bold text-gray-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(stats.totalRevenue)}
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
            <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Preço Médio</h3>
            <p className="text-3xl font-bold text-gray-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(stats.averageSalePrice)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods Pie Chart */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <PieChartIcon className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Métodos de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  stroke="none" // Remove stroke from pie slices
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={MONOCHROMATIC_COLORS[index % MONOCHROMATIC_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    padding: "0.75rem",
                    fontSize: "0.875rem",
                    color: "#374151",
                  }}
                  labelStyle={{ color: "#1f2937", fontWeight: "600" }}
                  formatter={(value, name, props) => [
                    value,
                    `${props.payload.name} (${new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(props.payload.total)})`,
                  ]}
                />
                <Legend
                  wrapperStyle={{ fontSize: "0.875rem", color: "#4b5563" }}
                  formatter={(value) => <span className="text-gray-700">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Sales Bar Chart */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <BarChart2 className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Vendas Mensais
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "0.75rem", fill: "#6b7280" }}
                />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: "0.75rem", fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    padding: "0.75rem",
                    fontSize: "0.875rem",
                    color: "#374151",
                  }}
                  labelStyle={{ color: "#1f2937", fontWeight: "600" }}
                  formatter={(value, name) => {
                    if (name === "faturamento") {
                      return [
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(value)),
                        "Faturamento",
                      ]
                    }
                    return [value, "Vendas"]
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "0.875rem", color: "#4b5563" }}
                  formatter={(value) => <span className="text-gray-700">{value}</span>}
                />
                <Bar dataKey="vendas" name="Vendas" fill={MONOCHROMATIC_COLORS[0]} radius={[4, 4, 0, 0]} />
                <Bar dataKey="faturamento" name="Faturamento" fill={MONOCHROMATIC_COLORS[1]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Line Chart */}
      {stats.salesTrend !== undefined && (
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <TrendingUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Tendência de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.salesTrend.labels.map((label, i) => ({
                  name: label,
                  vendas: stats?.salesTrend?.data[i],
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "0.75rem", fill: "#6b7280" }}
                />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: "0.75rem", fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    padding: "0.75rem",
                    fontSize: "0.875rem",
                    color: "#374151",
                  }}
                  labelStyle={{ color: "#1f2937", fontWeight: "600" }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "0.875rem", color: "#4b5563" }}
                  formatter={(value) => <span className="text-gray-700">{value}</span>}
                />
                <Line
                  type="monotone"
                  dataKey="vendas"
                  stroke={MONOCHROMATIC_COLORS[0]}
                  activeDot={{ r: 6, fill: MONOCHROMATIC_COLORS[0], stroke: MONOCHROMATIC_COLORS[0], strokeWidth: 2 }}
                  name="Vendas"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Top Sellers and Top Vehicles Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sellers */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <User className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Top Vendedores
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 border-b border-gray-100">
                  <TableHead className="text-gray-700 font-medium text-sm tracking-tight pl-6">Vendedor</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-sm tracking-tight">Vendas</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-sm tracking-tight pr-6">
                    Faturamento
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.topSellers.length > 0 ? (
                  stats.topSellers.map((seller, index) => (
                    <TableRow key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50">
                      <TableCell className="py-3 pl-6">
                        <div className="font-medium text-gray-900">{seller.seller.nome}</div>
                        <div className="text-xs text-gray-500 font-light">{seller.seller.email}</div>
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 font-medium">
                          {seller.salesCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900 py-3 pr-6">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(seller.totalRevenue)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                      Nenhum vendedor encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Vehicles */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <Car className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Veículos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 border-b border-gray-100">
                  <TableHead className="text-gray-700 font-medium text-sm tracking-tight pl-6">Veículo</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-sm tracking-tight">Vendas</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-sm tracking-tight pr-6">
                    Faturamento
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.topVehicles.length > 0 ? (
                  stats.topVehicles.map((vehicle, index) => (
                    <TableRow key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50">
                      <TableCell className="py-3 pl-6">
                        <div className="font-medium text-gray-900">
                          {vehicle.brand} {vehicle.model}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 font-medium">
                          {vehicle.salesCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900 py-3 pr-6">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(vehicle.totalRevenue)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                      Nenhum veículo encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Sales Status Bar Chart (Vertical) */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-6 py-4">
          <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
            <div className="p-2 bg-white border border-gray-200 rounded-lg">
              <BarChart2 className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            </div>
            Status das Vendas
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] p-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" axisLine={false} tickLine={false} style={{ fontSize: "0.75rem", fill: "#6b7280" }} />
              <YAxis
                dataKey="name"
                type="category"
                width={120}
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "0.75rem", fill: "#6b7280" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  fontSize: "0.875rem",
                  color: "#374151",
                }}
                labelStyle={{ color: "#1f2937", fontWeight: "600" }}
                formatter={(value, name, props) => [
                  name === "total"
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(value))
                    : value,
                  name === "total" ? "Faturamento" : "Vendas",
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: "0.875rem", color: "#4b5563" }}
                formatter={(value) => <span className="text-gray-700">{value}</span>}
              />
              <Bar dataKey="count" name="Vendas" fill={MONOCHROMATIC_COLORS[0]} radius={[0, 4, 4, 0]} />
              <Bar dataKey="total" name="Faturamento" fill={MONOCHROMATIC_COLORS[1]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Copyright Notice */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center font-light tracking-wide">
          © {currentYear} Sales Analytics. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default SalesStats
