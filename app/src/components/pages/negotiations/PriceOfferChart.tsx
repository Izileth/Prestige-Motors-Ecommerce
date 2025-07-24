import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Negotiation, NegotiationMessage } from "~/src/types/negociation";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useEffect } from 'react';

interface PriceOfferChartProps {
  negotiation: Negotiation;
  messages: NegotiationMessage[];
}

export const PriceOfferChart = ({ negotiation, messages }: PriceOfferChartProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

   const getChartData = () => {
      const offerMessages = messages.filter(
          m => m.tipo === "OFERTA" || m.tipo === "CONTRA_OFERTA"
      );

      // Função melhorada para extrair preço
      const extractPrice = (content: string): number => {
          // Remove tudo exceto números, vírgulas e pontos
          const cleanContent = content.replace(/[^\d.,]/g, '');
          
          // Converte vírgula para ponto se necessário
          const normalizedContent = cleanContent.includes(',') && !cleanContent.includes('.') 
              ? cleanContent.replace(',', '.') 
              : cleanContent;
              
          const price = parseFloat(normalizedContent);
          
          // Debug para verificar extração
          console.log('Extraindo preço:', { content, cleanContent, normalizedContent, price });
          
          return isNaN(price) ? 0 : price;
      };

      const dataPoints = [
          {
              date: new Date(negotiation.createdAt),
              price: negotiation.precoSolicitado,
              label: "Preço Solicitado",
              type: "ORIGINAL",
              autor: "Sistema"
          },
          {
              date: new Date(negotiation.createdAt),
              price: negotiation.precoOfertado,
              label: "Oferta Inicial",
              type: "OFERTA_INICIAL", 
              autor: "Comprador"
          },
          ...offerMessages.map(m => ({
              date: new Date(m.createdAt),
              price: extractPrice(m.conteudo),
              label: m.tipo === "OFERTA" ? "Nova Oferta" : "Contraproposta",
              type: m.tipo,
              autor: m.autor?.nome || "Usuário"
          })),
      ].sort((a, b) => a.date.getTime() - b.date.getTime());

      // Filtrar pontos com preço válido
      const validDataPoints = dataPoints.filter(point => point.price > 0);

      return validDataPoints.map((point, index) => ({
          date: point.date,
          dateLabel: format(point.date, 'dd/MM HH:mm', { locale: ptBR }),
          price: point.price,
          name: point.label,
          type: point.type,
          autor: point.autor,
          step: index + 1
      }));
  };


  const chartData = getChartData();

  if (chartData.length < 2) {
    return (
      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Evolução da Negociação</h3>
        <div className="h-[200px] sm:h-[300px] flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-sm">Dados insuficientes para gerar o gráfico</p>
            <p className="text-xs mt-1">
              Pontos de dados: {chartData.length} (mínimo: 2)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-4">Evolução da Negociação</h3>
      <div className="h-[250px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout={isMobile ? "vertical" : "horizontal"}
            margin={{
              top: 20,
              right: 30,
              left: isMobile ? 0 : 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
            
            {isMobile ? (
              // Layout vertical para mobile
              <>
                <XAxis 
                  type="number"
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0
                    }).format(value)
                  }
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  type="category"
                  dataKey="dateLabel"
                  tick={{ fontSize: 10 }}
                  width={80}
                />
              </>
            ) : (
              // Layout horizontal para desktop
              <>
                <XAxis 
                  dataKey="dateLabel"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(value)
                  }
                  tick={{ fontSize: 12 }}
                />
              </>
            )}
            
            <Tooltip
              formatter={(value: number) => [
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(value)),
                'Valor'
              ]}
              labelFormatter={(label) => `Data: ${label}`}
              contentStyle={{
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                fontSize: isMobile ? 12 : 14,
              }}
            />
            
            <Legend 
              wrapperStyle={{
                paddingTop: isMobile ? '10px' : '0'
              }}
            />
            
            <Bar
              dataKey="price"
              name="Valor da Oferta"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => {
                let fillColor = "hsl(var(--primary))";
                
                if (entry.type === "ORIGINAL") fillColor = "hsl(var(--muted-foreground))";
                else if (entry.type === "OFERTA") fillColor = "hsl(var(--success))";
                else if (entry.type === "CONTRA_OFERTA") fillColor = "hsl(var(--warning))";
                
                return (
                  <rect
                    key={`bar-${index}`}
                    fill={fillColor}
                    stroke="white"
                    strokeWidth={1}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};