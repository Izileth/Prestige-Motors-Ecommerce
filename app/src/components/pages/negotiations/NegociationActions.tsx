import { Button } from "~/src/components/ui/button";
import { Label } from "~/src/components/ui/label";
import { Textarea } from "~/src/components/ui/textarea";
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
import{ MoneyUtils } from "~/src/utils/money";

import { useMoneyInput } from "~/src/hooks/useInputValues";
import { MoneyInput } from "./NegotiationImputValue";
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
    const [rejectReason, setRejectReason] = useState("");;
    const counterPrice = useMoneyInput(currentPrice);
    const acceptPrice = useMoneyInput(currentPrice);
    const [activeAction, setActiveAction] = useState<"accept" | "reject" | "counter" | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
  

    // Reset do preço quando a oferta atual muda

    useEffect(() => {
        if (activeAction === null) {
            counterPrice.setCents(currentPrice);
            acceptPrice.setCents(currentPrice);
        }
    }, [currentPrice, activeAction]);

    // Validações
    const validateCounterPrice = (price: number): string | null => {
        if (!price || price <= 0) {
        return "O preço deve ser maior que zero";
        }
        if (price === currentPrice) {
        return "O novo preço deve ser diferente da oferta atual";
        }
        return null;
    };

    const validateAcceptPrice = (price: number): string | null => {
        if (!price || price <= 0) {
        return "O preço deve ser maior que zero";
        }
        return null;
    };

    // Cálculos de diferença
 


    const getPriceDifference = (newPriceCents: number, basePriceCents: number) => {
        const diffCents = newPriceCents - basePriceCents;
        const percentage = basePriceCents > 0 
            ? ((diffCents / basePriceCents) * 100).toFixed(1)
            : '0.0';
        
        return { 
            diffCents, 
            percentage,
            diffFormatted: MoneyUtils.formatCentsWithSymbol(Math.abs(diffCents))
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
        const error = validateCounterPrice(counterPrice.cents);
        if (error) {
        setErrors({ counter: error });
        return;
        }
        handleAction(() => onCounter(counterPrice.cents), 'counter');
    };

    const handleAcceptSubmit = () => {
        const error = validateAcceptPrice(acceptPrice.cents);
        if (error) {
        setErrors({ accept: error });
        return;
        }
        handleAction(() => onAccept(acceptPrice.cents), 'accept');
    };

    const handleRejectSubmit = () => {
        handleAction(() => onReject(rejectReason), 'reject');
    };

    

    const isDisabled = disabled || isLoading || actionLoading;

    return (
        <Card className="w-full">
        <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Ações da Negociação</h3>
            <div className="text-sm text-muted-foreground">
            Oferta Inicial - R$ {currentPrice.toLocaleString('pt-BR')}
            
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
                                Oferta {getPriceDifference(currentPrice, originalPrice).percentage}% acima do preço original
                            </span>
                        ) : (
                            <span className="text-red-600">
                                {/* CORREÇÃO: Usar Math.abs no percentage também */}
                                Oferta {Math.abs(parseFloat(getPriceDifference(currentPrice, originalPrice).percentage))}% abaixo do preço original
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
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        R$
                    </span>
                    <MoneyInput
                                id="accept-price"
                                value={acceptPrice.cents}
                                onChange={(cents) => {
                                    acceptPrice.setCents(cents);
                                    if (errors.accept) {
                                        setErrors(prev => ({ ...prev, accept: "" }));
                                    }
                                }}
                                error={errors.accept}
                            />
                    </div>
                    {acceptPrice.cents !== currentPrice && (
                        <div className="text-sm text-muted-foreground">
                            {acceptPrice.cents > currentPrice ? (
                                <span className="text-green-600">
                                    +{getPriceDifference(acceptPrice.cents, currentPrice).diffFormatted} acima da oferta
                                </span>
                            ) : (
                                <span className="text-red-600">
                                    -{getPriceDifference(currentPrice, acceptPrice.cents).diffFormatted} abaixo da oferta
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
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        R$
                    </span>
                    <MoneyInput
                                id="counter-price"
                                value={counterPrice.cents}
                                onChange={(cents) => {
                                    counterPrice.setCents(cents);
                                    if (errors.counter) {
                                        setErrors(prev => ({ ...prev, counter: "" }));
                                    }
                                }}
                                error={errors.counter}
                            />
                    </div>
                    {counterPrice.cents && counterPrice.cents !== currentPrice && (
                            <div className="text-sm">
                                {counterPrice.cents > currentPrice ? (
                                    <span className="text-green-600">
                                        <Calculator className="h-4 w-4 inline mr-1" />
                                        +{getPriceDifference(counterPrice.cents, currentPrice).diffFormatted}
                                        ({getPriceDifference(counterPrice.cents, currentPrice).percentage}%) acima da oferta atual
                                    </span>
                                ) : (
                                    <span className="text-red-600">
                                        <Calculator className="h-4 w-4 inline mr-1" />
                                        -{getPriceDifference(currentPrice, counterPrice.cents).diffFormatted}
                                        {/* CORREÇÃO: Calcular percentage corretamente para valores negativos */}
                                        ({Math.abs(parseFloat(getPriceDifference(counterPrice.cents, currentPrice).percentage))}%) abaixo da oferta atual
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