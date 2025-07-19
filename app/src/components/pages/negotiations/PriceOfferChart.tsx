import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Negotiation, NegotiationMessage } from "~/src/types/negociation";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PriceOfferChartProps {
  negotiation: Negotiation;
  messages: NegotiationMessage[];
}

export const PriceOfferChart = ({ negotiation, messages }: PriceOfferChartProps) => {
  // Processa os dados para o gráfico
  const getChartData = () => {
    const offerMessages = messages.filter(
      m => m.tipo === "OFERTA" || m.tipo === "CONTRA_OFERTA"
    );

    const dataPoints = [
      {
        date: new Date(negotiation.createdAt),
        price: negotiation.precoSolicitado,
        label: "Preço Original",
        type: "ORIGINAL",
      },
      ...offerMessages.map(m => ({
        date: new Date(m.createdAt),
        price: parseFloat(m.conteudo.replace(/[^\d.,]/g, "").replace(",", ".")),
        label: m.tipo === "OFERTA" ? "Oferta Inicial" : "Contraproposta",
        type: m.tipo,
      })),
    ].sort((a, b) => a.date.getTime() - b.date.getTime());

    return dataPoints.map(point => ({
      date: point.date,
      dateLabel: format(point.date, 'dd/MM HH:mm', { locale: ptBR }),
      price: point.price,
      name: point.label,
      type: point.type,
    }));
  };

  const chartData = getChartData();

  if (chartData.length < 2) return null;

  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-4">Evolução da Negociação</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="dateLabel" 
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tickFormatter={(value) => 
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(value)
              }
              tick={{ fontSize: 12 }}
              width={100}
            />
            <Tooltip
              formatter={(value: number) => [
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(value),
                'Valor'
              ]}
              labelFormatter={(label) => `Data: ${label}`}
              contentStyle={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              activeDot={{ r: 6 }}
              name="Valor"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};