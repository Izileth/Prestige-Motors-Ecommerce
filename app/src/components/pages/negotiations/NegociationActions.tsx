import { Button } from "~/src/components/ui/button";
import { Label } from "~/src/components/ui/label";
import { Textarea } from "~/src/components/ui/textarea";
import { Input } from "~/src/components/ui/input";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "~/src/components/ui/card";
import { 
    Check, 
    X, 
    TrendingUp, 
    Calculator, 
    AlertCircle,
    Info
} from "lucide-react";
import { Alert, AlertDescription } from "~/src/components/ui/alert";

interface NegotiationActionsProps {
    negotiationId: string;
    currentPrice: number;
    originalPrice?: number;
    onAccept: (finalPrice?: number) => Promise<void>;
    onReject: (reason?: string) => Promise<void>;
    onCounter: (newPrice: number) => Promise<void>;
    disabled?: boolean;
    isLoading?: boolean;
}

export const NegotiationActions = ({
    negotiationId,
    currentPrice,
    originalPrice,
    onAccept,
    onReject,
    onCounter,
    disabled = false,
    isLoading = false
}: NegotiationActionsProps) => {
    const [rejectReason, setRejectReason] = useState("");
    const [counterPriceInput, setCounterPriceInput] = useState("");
    const [acceptPriceInput, setAcceptPriceInput] = useState("");
    const [activeAction, setActiveAction] = useState<"accept" | "reject" | "counter" | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Utilitários de formatação simples
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const formatCurrencyInput = (value: string): string => {
        // Remove tudo exceto números
        const numbers = value.replace(/\D/g, '');
        if (!numbers) return '';
        
        // Converte para formato com vírgula (centavos)
        const numberValue = parseInt(numbers, 10);
        const formattedValue = (numberValue / 100).toFixed(2).replace('.', ',');
        
        // Adiciona separadores de milhares
        return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const parseInputValue = (input: string): number => {
        if (!input) return 0;
        
        // Remove pontos (separadores de milhares) e substitui vírgula por ponto
        const cleanValue = input.replace(/\./g, '').replace(',', '.');
        const numericValue = parseFloat(cleanValue);
        
        return isNaN(numericValue) ? 0 : numericValue;
    };

    const handleInputChange = (value: string, setter: (value: string) => void, errorKey: string) => {
        const formatted = formatCurrencyInput(value);
        setter(formatted);
        
        // Remove erro se existir
        if (errors[errorKey]) {
            setErrors(prev => ({ ...prev, [errorKey]: "" }));
        }
    };

    // Reset dos valores quando a oferta atual muda
    useEffect(() => {
        if (activeAction === null) {
            const formattedPrice = (currentPrice ).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            setCounterPriceInput(formattedPrice);
            setAcceptPriceInput(formattedPrice);
        }
    }, [currentPrice, activeAction]);

    // Inicialização dos valores
    useEffect(() => {
        const formattedPrice = (currentPrice ).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        setCounterPriceInput(formattedPrice);
        setAcceptPriceInput(formattedPrice);
    }, []);

    // Validações
    const validateCounterPrice = (input: string): string | null => {
        const price = parseInputValue(input);
        if (!price || price <= 0) {
            return "O preço deve ser maior que zero";
        }
        if (price === currentPrice / 100) {
            return "O novo preço deve ser diferente da oferta atual";
        }
        return null;
    };

    const validateAcceptPrice = (input: string): string | null => {
        const price = parseInputValue(input);
        if (!price || price <= 0) {
            return "O preço deve ser maior que zero";
        }
        return null;
    };

    // Cálculos de diferença
    const getPriceDifference = (newPrice: number, basePrice: number) => {
        const diff = newPrice - basePrice;
        const percentage = basePrice > 0 
            ? ((diff / basePrice) * 100).toFixed(1)
            : '0.0';
        
        return { 
            diff, 
            percentage,
            diffFormatted: formatCurrency(Math.abs(diff))
        };
    };

    const handleAction = async (actionFn: () => Promise<void>, actionType: string) => {
        setActionLoading(true);
        setErrors({});

        try {
            await actionFn();
            setActiveAction(null);
            setRejectReason("");
        } catch (error) {
            setErrors({ [actionType]: "Erro ao processar ação. Tente novamente." });
        } finally {
            setActionLoading(false);
        }
    };

    const handleCounterSubmit = () => {
        const error = validateCounterPrice(counterPriceInput);
        if (error) {
            setErrors({ counter: error });
            return;
        }
        
        // Enviar valor em reais diretamente para a API
        const priceInReais = parseInputValue(counterPriceInput);
        handleAction(() => onCounter(priceInReais), 'counter');
    };

    const handleAcceptSubmit = () => {
        const error = validateAcceptPrice(acceptPriceInput);
        if (error) {
            setErrors({ accept: error });
            return;
        }
        
        // Enviar valor em reais diretamente para a API
        const priceInReais = parseInputValue(acceptPriceInput);
        handleAction(() => onAccept(priceInReais), 'accept');
    };

    const handleRejectSubmit = () => {
        handleAction(() => onReject(rejectReason), 'reject');
    };

    const isDisabled = disabled || isLoading || actionLoading;

    return (
        <Card className="w-full border-0 shadow-none px-0 mx-0">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Ações da Negociação</h3>
                    <div className="text-sm text-muted-foreground">
                        Oferta Atual - {formatCurrency(currentPrice)})
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
                {/* Informações contextuais */}
                {originalPrice && originalPrice !== currentPrice && (
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                            {currentPrice > originalPrice ? (
                                <span className="text-green-600">
                                    Oferta {getPriceDifference(currentPrice / 100, originalPrice / 100).percentage}% acima do preço original
                                </span>
                            ) : (
                                <span className="text-red-600">
                                    Oferta {Math.abs(parseFloat(getPriceDifference(currentPrice / 100, originalPrice / 100).percentage))}% abaixo do preço original
                                </span>
                            )}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Botões principais */}
                {!activeAction && (
                    <div className="grid grid-cols-1 gap-3">
                        <Button 
                            variant="outline"
                            size="lg"
                            onClick={() => setActiveAction("accept")}
                            disabled={isDisabled}
                            className="justify-start"
                        >
                            <Check className="h-4 w-4 mr-2" />
                            Aceitar Oferta
                        </Button>
                        
                        <Button 
                            variant="secondary"
                            size="lg"
                            onClick={() => setActiveAction("counter")}
                            disabled={isDisabled}
                            className="justify-start"
                        >
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Fazer Contraproposta
                        </Button>
                        
                        <Button 
                            variant="destructive" 
                            size="lg"
                            onClick={() => setActiveAction("reject")}
                            disabled={isDisabled}
                            className="justify-start"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Recusar Oferta
                        </Button>
                    </div>
                )}

                {/* Formulários expandidos */}
                <AnimatePresence>
                    {/* Aceitar */}
                    {activeAction === "accept" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden border-t pt-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="accept-price">Preço final de aceite</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground z-10">
                                        R$
                                    </span>
                                    <Input
                                        id="accept-price"
                                        value={acceptPriceInput}
                                        onChange={(e) => handleInputChange(e.target.value, setAcceptPriceInput, 'accept')}
                                        placeholder="0,00"
                                        className={`pl-10 ${errors.accept ? 'border-red-500' : ''}`}
                                        disabled={isDisabled}
                                    />
                                </div>
                                {parseInputValue(acceptPriceInput) !== currentPrice && acceptPriceInput && (
                                    <div className="text-sm text-muted-foreground">
                                        {parseInputValue(acceptPriceInput) > currentPrice  ? (
                                            <span className="text-green-600">
                                                +{getPriceDifference(parseInputValue(acceptPriceInput), currentPrice ).diffFormatted} acima da oferta
                                            </span>
                                        ) : (
                                            <span className="text-red-600">
                                                -{getPriceDifference(currentPrice , parseInputValue(acceptPriceInput)).diffFormatted} abaixo da oferta
                                            </span>
                                        )}
                                    </div>
                                )}        
                                {errors.accept && (
                                    <p className="text-sm text-red-600 flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.accept}
                                    </p>
                                )}
                            </div>
                            
                            <div className="flex gap-2">
                                <Button 
                                    onClick={handleAcceptSubmit}
                                    disabled={isDisabled}
                                    className="flex-1"
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Confirmar Aceite
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setActiveAction(null);
                                        setErrors({});
                                    }}
                                    disabled={isDisabled}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Contraproposta */}
                    {activeAction === "counter" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden border-t pt-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="counter-price">Novo valor proposto</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground z-10">
                                        R$
                                    </span>
                                    <Input
                                        id="counter-price"
                                        value={counterPriceInput}
                                        onChange={(e) => handleInputChange(e.target.value, setCounterPriceInput, 'counter')}
                                        placeholder="0,00"
                                        className={`pl-10 ${errors.counter ? 'border-red-500' : ''}`}
                                        disabled={isDisabled}
                                    />
                                </div>
                                {parseInputValue(counterPriceInput) && parseInputValue(counterPriceInput) !== currentPrice / 100 && (
                                    <div className="text-sm">
                                        {parseInputValue(counterPriceInput) > currentPrice / 100 ? (
                                            <span className="text-green-600">
                                                <Calculator className="h-4 w-4 inline mr-1" />
                                                +{getPriceDifference(parseInputValue(counterPriceInput), currentPrice / 100).diffFormatted}
                                                ({getPriceDifference(parseInputValue(counterPriceInput), currentPrice / 100).percentage}%) acima da oferta atual
                                            </span>
                                        ) : (
                                            <span className="text-red-600">
                                                <Calculator className="h-4 w-4 inline mr-1" />
                                                -{getPriceDifference(currentPrice / 100, parseInputValue(counterPriceInput)).diffFormatted}
                                                ({Math.abs(parseFloat(getPriceDifference(parseInputValue(counterPriceInput), currentPrice / 100).percentage))}%) abaixo da oferta atual
                                            </span>
                                        )}
                                    </div>
                                )}
                                {errors.counter && (
                                    <p className="text-sm text-red-600 flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.counter}
                                    </p>
                                )}
                            </div>
                            
                            <div className="flex gap-2">
                                <Button 
                                    onClick={handleCounterSubmit}
                                    disabled={isDisabled}
                                    className="flex-1"
                                >
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Enviar Contraproposta
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setActiveAction(null);
                                        setErrors({});
                                    }}
                                    disabled={isDisabled}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Recusar */}
                    {activeAction === "reject" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden border-t pt-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="reject-reason">Motivo da recusa (opcional)</Label>
                                <Textarea
                                    id="reject-reason"
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Ex: Preço abaixo do esperado, condições não adequadas..."
                                    rows={3}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Informar um motivo pode ajudar em futuras negociações
                                </p>
                            </div>
                            
                            <div className="flex gap-2">
                                <Button 
                                    variant="destructive" 
                                    onClick={handleRejectSubmit}
                                    disabled={isDisabled}
                                    className="flex-1"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Confirmar Recusa
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setActiveAction(null);
                                        setRejectReason("");
                                        setErrors({});
                                    }}
                                    disabled={isDisabled}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
};