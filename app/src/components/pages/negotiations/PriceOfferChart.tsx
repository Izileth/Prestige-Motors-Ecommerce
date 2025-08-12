
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts"
import type { Negotiation, NegotiationMessage } from "~/src/types/negociation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState, useEffect } from "react"

interface PriceOfferChartProps {
  negotiation: Negotiation
  messages: NegotiationMessage[]
}

export const PriceOfferChart = ({ negotiation, messages }: PriceOfferChartProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getChartData = () => {
    const offerMessages = messages.filter((m) => m.tipo === "OFERTA" || m.tipo === "CONTRA_OFERTA")

    const extractPrice = (content: string): number => {
      const cleanContent = content.replace(/[^\d.,]/g, "")
      const normalizedContent =
        cleanContent.includes(",") && !cleanContent.includes(".") ? cleanContent.replace(",", ".") : cleanContent
      const price = Number.parseFloat(normalizedContent)
      return isNaN(price) ? 0 : price
    }

    const dataPoints = [
      {
        date: new Date(negotiation.createdAt),
        price: negotiation.precoSolicitado,
        label: "Preço Solicitado",
        type: "ORIGINAL",
        autor: "Sistema",
      },
      {
        date: new Date(negotiation.createdAt),
        price: negotiation.precoOfertado,
        label: "Oferta Inicial",
        type: "OFERTA_INICIAL",
        autor: "Comprador",
      },
      ...offerMessages.map((m) => ({
        date: new Date(m.createdAt),
        price: extractPrice(m.conteudo),
        label: m.tipo === "OFERTA" ? "Nova Oferta" : "Contraproposta",
        type: m.tipo,
        autor: m.autor?.nome || "Usuário",
      })),
    ].sort((a, b) => a.date.getTime() - b.date.getTime())

    const validDataPoints = dataPoints.filter((point) => point.price > 0)

    return validDataPoints.map((point, index) => ({
      date: point.date,
      dateLabel: format(point.date, "dd/MM HH:mm", { locale: ptBR }),
      price: point.price,
      name: point.label,
      type: point.type,
      autor: point.autor,
      step: index + 1,
    }))
  }

  const chartData = getChartData()

  const getColorByType = (type: string) => {
    switch (type) {
      case "ORIGINAL":
        return "hsl(var(--muted-foreground))" // Light gray
      case "OFERTA":
      case "OFERTA_INICIAL":
        return "hsl(var(--foreground))" // Dark gray
      case "CONTRA_OFERTA":
        return "hsl(var(--muted-foreground))" // Medium gray
      default:
        return "hsl(var(--muted-foreground))"
    }
  }

  const CustomLabel = (props: any) => {
    const { x, y, width, height, value, index } = props
    const isHovered = hoveredIndex === index

    return (
      <text
        x={x + width / 2}
        y={y - 8}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        fontSize={isMobile ? 10 : 11}
        fontWeight={isHovered ? "600" : "400"}
        className="transition-all duration-200"
      >
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          notation: isMobile ? "compact" : "standard",
          maximumFractionDigits: 0,
        }).format(value)}
      </text>
    )
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border border-border rounded-md p-3 shadow-lg">
          <div className="space-y-2">
            <p className="font-medium text-sm">{data.name}</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                {label} • {data.autor}
              </p>
              <p className="font-semibold text-foreground text-base">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.price)}
              </p>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  if (chartData.length < 2) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-xl font-semibold mb-6">Evolução da Negociação</h3>
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Dados insuficientes para gerar o gráfico</p>
            <p className="text-sm mt-1">Pontos de dados: {chartData.length} (mínimo: 2)</p>
          </div>
        </div>
      </div>
    )
  }

  // Calculate key statistics
  const maxPrice = Math.max(...chartData.map((d) => d.price))
  const minPrice = Math.min(...chartData.map((d) => d.price))
  const latestPrice = chartData[chartData.length - 1].price
  const priceChange = ((latestPrice - chartData[0].price) / chartData[0].price) * 100

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Evolução da Negociação</h3>
            <p className="text-sm text-muted-foreground mt-1">{chartData.length} ofertas registradas</p>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-muted-foreground">Atual</p>
              <p className="font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                }).format(latestPrice)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Variação</p>
              <p className={`font-semibold ${priceChange >= 0 ? "text-foreground" : "text-muted-foreground"}`}>
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 30,
                right: 20,
                left: 20,
                bottom: 60,
              }}
              onMouseMove={(state) => {
                if (state && state.activeTooltipIndex !== undefined) {
                  setHoveredIndex(state.activeTooltipIndex)
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CartesianGrid strokeDasharray="2 2" opacity={0.2} />

              <XAxis
                dataKey="dateLabel"
                tick={{ fontSize: isMobile ? 10 : 11, fill: "hsl(var(--muted-foreground))" }}
                angle={isMobile ? -45 : -30}
                textAnchor="end"
                height={60}
                interval={0}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    notation: isMobile ? "compact" : "standard",
                    maximumFractionDigits: 0,
                  }).format(value)
                }
                tick={{ fontSize: isMobile ? 10 : 11, fill: "hsl(var(--muted-foreground))" }}
                width={isMobile ? 70 : 90}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Bar dataKey="price" radius={[2, 2, 0, 0]} stroke="none">
                <LabelList content={<CustomLabel />} />

                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColorByType(entry.type)}
                    opacity={hoveredIndex !== null ? (hoveredIndex === index ? 0.9 : 0.6) : 0.8}
                    style={{ transition: "all 0.2s ease" }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Máximo</p>
              <p className="text-sm font-semibold mt-1">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                }).format(maxPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Mínimo</p>
              <p className="text-sm font-semibold mt-1">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                }).format(minPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Diferença</p>
              <p className="text-sm font-semibold mt-1">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                }).format(maxPrice - minPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Ofertas</p>
              <p className="text-sm font-semibold mt-1">{chartData.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
