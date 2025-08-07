import type React from "react"
import type { UserSaleStats, SaleStats } from "~/src/types/sale"
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
import { Loader2, TrendingUp, PieChartIcon, BarChart2, Info, Car, User, ShoppingCart } from "lucide-react"

interface SalesStatsProps {
  stats: UserSaleStats | null
  isLoading?: boolean
  title?: string
  description?: string
}

// Monochromatic color palette for charts
const MONOCHROMATIC_COLORS = ["#333333", "#666666", "#999999", "#CCCCCC", "#EEEEEE", "#BBBBBB"]

const SalesStats: React.FC<SalesStatsProps> = ({
  stats,
  isLoading = false,
  title = "Dashboard de Vendas",
  description = "Dados consolidados sobre vendas e compras do usuário",
}) => {
  
  if (isLoading) {
    return (
      <div className="w-full max-w-full mx-auto ">
        <Card className=" bg-white">
          <CardHeader className=" py-5">
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
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="w-full max-w-full mx-auto py-4 ">
        <Card className=" bg-white shadow-none border-none">
          <CardHeader className="py-2">
            <div className="flex items-center gap-3">
              <div className="py-2 bg-white border-none shadow-none">
                <TrendingUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">{title}</CardTitle>
            </div>
            <CardDescription className="text-gray-600 font-light text-sm">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16 px-6  rounded-lg border-none text-gray-600">
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
      </div>
    )
  }

  // Prepare data for charts
  const sellerPaymentMethodData = Object.entries(stats.asSeller.byPaymentMethod).map(([name, { count, total }]) => ({
    name,
    count,
    total,
  }))

  const buyerPaymentMethodData = Object.entries(stats.asBuyer.byPaymentMethod).map(([name, { count, total }]) => ({
    name,
    count,
    total,
  }))


  const monthlySalesData = stats.asSeller.monthlySales.map((item) => ({
    name: item.month,
    vendas: item.count,
    faturamento: item.total,
  }))

  const monthlyPurchasesData = stats.asBuyer.monthlyPurchases.map((item) => ({
    name: item.month,
    compras: item.count,
    gasto: item.total,
  }))

  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="w-full max-w-full mx-auto  space-y-6">
      {/* User Info Card */}
      <Card className="border-none shadow-none bg-white">
        <CardHeader className=" px-2 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white border border-gray-200 rounded-lg">
              <User className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            </div>
            <div>
              <CardTitle className="text-gray-900 font-medium text-xl tracking-tight">
                {stats.user.nome}
              </CardTitle>
              <CardDescription className="text-gray-600 font-light text-sm">
                {stats.user.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* As Seller Overview */}
        <Card className="border-none shadow-none bg-white">
          <CardHeader className=" px-2 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border-none rounded-none">
                <TrendingUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Como Vendedor
            </CardTitle>
          </CardHeader>
          <CardContent className="py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Vendas</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.asSeller.totals.sales}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Faturamento</h3>
                <p className="text-lg md:text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(stats.asSeller.totals.revenue)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Venda Média</h3>
                <p className="text-lg font-bold text-gray-900">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(stats.asSeller.totals.averageSale)}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Ranking</h3>
                <p className="text-lg font-bold text-gray-900">
                  {stats.asSeller.ranking.position}º de {stats.asSeller.ranking.totalSellers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* As Buyer Overview */}
        <Card className="border-none shadow-none bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-2 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Como Comprador
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Compras</h3>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.asBuyer.totals.purchases}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Gasto Total</h3>
                <p className="text-lg md:text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(stats.asBuyer.totals.spent)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Compra Média</h3>
                <p className="text-lg font-bold text-gray-900">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(stats.asBuyer.totals.averagePurchase)}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/20">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-1">Maior Compra</h3>
                <p className="text-lg font-bold text-gray-900">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(stats.asBuyer.totals.maxPurchase)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seller Payment Methods */}
        {sellerPaymentMethodData.length > 0 && (
          <Card className="border-none shadow-none bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-2 py-4">
              <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
                <div className="p-2 bg-white border border-gray-200 rounded-lg">
                  <PieChartIcon className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                </div>
                Métodos de Pagamento - Vendas
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] p-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sellerPaymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    stroke="none"
                  >
                    {sellerPaymentMethodData.map((entry, index) => (
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
                    formatter={(value, name, props) => [
                      value,
                      `${props.payload.name} (${new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(props.payload.total)})`,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Buyer Payment Methods */}
        {buyerPaymentMethodData.length > 0 && (
          <Card className="border-none shadow-none bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-2 py-4">
              <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
                <div className="p-2 bg-white border border-gray-200 rounded-lg">
                  <PieChartIcon className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                </div>
                Métodos de Pagamento - Compras
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] p-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={buyerPaymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    stroke="none"
                  >
                    {buyerPaymentMethodData.map((entry, index) => (
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
                    formatter={(value, name, props) => [
                      value,
                      `${props.payload.name} (${new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(props.payload.total)})`,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Monthly Data Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales */}
        {monthlySalesData.length > 0 && (
          <Card className="border-none shadow-none bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-2 py-4">
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
                    tickFormatter={formatMonth}
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
                    labelFormatter={formatMonth}
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
                  <Bar dataKey="vendas" name="Vendas" fill={MONOCHROMATIC_COLORS[0]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="faturamento" name="Faturamento" fill={MONOCHROMATIC_COLORS[1]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Monthly Purchases */}
        {monthlyPurchasesData.length > 0 && (
          <Card className="border-none shadow-none bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-2 py-4">
              <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
                <div className="p-2 bg-white border border-gray-200 rounded-lg">
                  <BarChart2 className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
                </div>
                Compras Mensais
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPurchasesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    style={{ fontSize: "0.75rem", fill: "#6b7280" }}
                    tickFormatter={formatMonth}
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
                    labelFormatter={formatMonth}
                    formatter={(value, name) => {
                      if (name === "gasto") {
                        return [
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(value)),
                          "Gasto",
                        ]
                      }
                      return [value, "Compras"]
                    }}
                  />
                  <Bar dataKey="compras" name="Compras" fill={MONOCHROMATIC_COLORS[2]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="gasto" name="Gasto" fill={MONOCHROMATIC_COLORS[3]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Transactions Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <Card className="border-none shadow-none bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-2 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <TrendingUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Vendas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 border-b border-gray-100">
                  <TableHead className="text-gray-700 font-medium text-sm tracking-tight pl-6">Comprador</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-sm tracking-tight">Valor</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-sm tracking-tight pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.asSeller.recentSales.length > 0 ? (
                  stats.asSeller.recentSales.map((sale) => (
                    <TableRow key={sale.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50">
                      <TableCell className="py-3 pl-6">
                        <div className="font-medium text-gray-900">{sale?.vendedor?.nome}</div>
                        <div className="text-xs text-gray-500 font-light">
                          {new Date(sale.dataVenda).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900 py-3">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(sale.precoVenda)}
                      </TableCell>
                      <TableCell className="text-right py-3 pr-6">
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 font-medium">
                          {sale.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                      Nenhuma venda encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Purchases */}
        <Card className="border-none shadow-none bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/30 px-2 py-4">
            <CardTitle className="flex items-center gap-3 text-gray-900 font-medium text-lg tracking-tight">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
              </div>
              Compras Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 border-b border-gray-100">
                  <TableHead className="text-gray-700 font-medium text-sm tracking-tight pl-6">Vendedor</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-sm tracking-tight">Valor</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-sm tracking-tight pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.asBuyer.recentPurchases.length > 0 ? (
                  stats.asBuyer.recentPurchases.map((purchase) => (
                    <TableRow key={purchase.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50">
                      <TableCell className="py-3 pl-6">
                        <div className="font-medium text-gray-900">{purchase?.vendedor?.nome}</div>
                        <div className="text-xs text-gray-500 font-light">
                          {new Date(purchase.dataVenda).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900 py-3">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(purchase.precoVenda)}
                      </TableCell>
                      <TableCell className="text-right py-3 pr-6">
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 font-medium">
                          {purchase.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                      Nenhuma compra encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

   
    </div>
  )
}

export default SalesStats