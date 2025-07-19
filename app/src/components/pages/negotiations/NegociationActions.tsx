import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "~/src/components/ui/card";

interface NegotiationActionsProps {
    negotiationId: string;
    currentPrice: number;
    onAccept: (finalPrice?: number) => Promise<void>;
    onReject: (reason?: string) => Promise<void>;
    onCounter: (newPrice: number) => Promise<void>;
}

export const NegotiationActions = ({
    negotiationId,
    currentPrice,
    onAccept,
    onReject,
    onCounter,
    }: NegotiationActionsProps) => {
    const [newPrice, setNewPrice] = useState(currentPrice);
    const [rejectReason, setRejectReason] = useState("");
    const [activeAction, setActiveAction] = useState<"accept" | "reject" | "counter" | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (actionFn: () => Promise<void>) => {
        setIsLoading(true);
        try {
        await actionFn();
        setActiveAction(null);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <Card>
        <CardHeader className="pb-2">
            <h3 className="text-lg font-semibold">Ações da Negociação</h3>
        </CardHeader>
        <CardContent className="space-y-4">
            {!activeAction && (
            <div className="flex flex-wrap gap-2">
                <Button 
                variant="outline"
                onClick={() => setActiveAction("accept")}
                disabled={isLoading}
                >
                Aceitar Oferta
                </Button>
                <Button 
                variant="destructive" 
                onClick={() => setActiveAction("reject")}
                disabled={isLoading}
                >
                Recusar
                </Button>
                <Button 
                variant="secondary"
                onClick={() => setActiveAction("counter")}
                disabled={isLoading}
                >
                Contraproposta
                </Button>
            </div>
            )}

            <AnimatePresence>
            {activeAction === "accept" && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
                >
                <Label>Preço final (opcional)</Label>
                <Input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                />
                <div className="flex gap-2 pt-2">
                    <Button 
                    onClick={() => handleAction(() => onAccept(newPrice))} 
                    >
                    Confirmar Aceite
                    </Button>
                    <Button 
                    variant="outline" 
                    onClick={() => setActiveAction(null)}
                    disabled={isLoading}
                    >
                    Cancelar
                    </Button>
                </div>
                </motion.div>
            )}

            {activeAction === "counter" && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
                >
                <Label>Novo valor proposto</Label>
                <Input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                />
                <div className="flex gap-2 pt-2">
                    <Button 
                    onClick={() => handleAction(() => onCounter(newPrice))} 
                    
                    >
                    Enviar Contraproposta
                    </Button>
                    <Button 
                    variant="outline" 
                    onClick={() => setActiveAction(null)}
                    disabled={isLoading}
                    >
                    Cancelar
                    </Button>
                </div>
                </motion.div>
            )}

            {activeAction === "reject" && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
                >
                <Label>Motivo da recusa (opcional)</Label>
                <Input
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Ex: Preço abaixo do esperado"
                />
                <div className="flex gap-2 pt-2">
                    <Button 
                    variant="destructive" 
                    onClick={() => handleAction(() => onReject(rejectReason))}
                
                    >
                    Confirmar Recusa
                    </Button>
                    <Button 
                    variant="outline" 
                    onClick={() => setActiveAction(null)}
                    disabled={isLoading}
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