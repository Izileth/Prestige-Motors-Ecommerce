import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, 
    DollarSign, 
    TrendingUp, 
    Clock,
    User,
    Bot,
    MessageSquare,
} from 'lucide-react';
import { Button } from '~/src/components/ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '~/src/components/ui/avatar';
import { Badge } from '~/src/components/ui/badge';
import { Card } from '~/src/components/ui/card';
import { Textarea } from '~/src/components/ui/textarea';
import { useNegotiationStore } from '~/src/store/slices/negociation';
import { toast } from 'sonner';
import type { NegotiationMessage, MessageType, AddMessagePayload } from '~/src/types/negociation';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { MoneyUtils } from '~/src/utils/money';
import { useMoneyInput } from '~/src/hooks/useInputValues';
import { MoneyInput } from './NegotiationImputValue';
interface MessageListProps {
    messages: NegotiationMessage[];
    currentUserId: string;
    negotiationId: string;
    canSendMessage?: boolean;
    isNegotiationActive?: boolean;

    canSendOffer?: boolean
    currentPrice?: number
    onSendOffer?: (price: number, messageType: "CONTRA_OFERTA" | "OFERTA") => Promise<void>
}

interface MessageBubbleProps {
    message: NegotiationMessage;
    isOwn: boolean;
    showAvatar?: boolean;
    isLast?: boolean;
}


const getMessageTypeIcon = (type: MessageType) => {
    switch (type) {
        case "OFERTA":
        return <DollarSign className="h-4 w-4" />
        case "CONTRA_OFERTA":
        return <TrendingUp className="h-4 w-4" />
        case "SISTEMA":
        return <Bot className="h-4 w-4" />
        default:
        return <MessageSquare className="h-4 w-4" />
    }
}

const getMessageTypeColor = (type: MessageType) => {
  
  return "bg-gray-200 text-gray-800 border-gray-300"
}


const MessageBubble = ({ message, isOwn, showAvatar = true, isLast = false }: MessageBubbleProps) => {
    const formatTime = (dateInput: string | Date) => {
        const now = new Date();
        
        const messageDate = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        
        // FIX: Verificar se a data é válida
        if (isNaN(messageDate.getTime())) {
            console.error('Data inválida recebida:', dateInput);
            return 'Data inválida';
        }
        
        const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
            return formatDistanceToNow(messageDate, { addSuffix: true, locale: ptBR });
        } else {
            return format(messageDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
        }
    };

    const extractPriceFromContent = (content: string, type: MessageType) => {
        if (type === 'OFERTA' || type === 'CONTRA_OFERTA') {
            const priceMatch = content.match(/R\$\s*([\d.,]+)/);
            if (priceMatch) {
                return priceMatch[1];
            }
        }
        return null;
    };

    const price = extractPriceFromContent(message.conteudo, message.tipo);

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-3 mb-4 ${isOwn ? "flex-row-reverse" : "flex-row"} ${isLast ? "mb-6" : ""}`}
        >
        {/* Avatar */}
        {showAvatar && (
            <Avatar className="h-8 w-8 flex-shrink-0 border border-gray-200">
            <AvatarImage src={message.autor?.avatar || ""} />
            <AvatarFallback className="text-xs bg-gray-100 text-gray-700">
                {message.tipo === "SISTEMA" ? (
                <Bot className="h-4 w-4" />
                ) : (
                message.autor?.nome?.charAt(0)?.toUpperCase() || "U"
                )}
            </AvatarFallback>
            </Avatar>
        )}
        {!showAvatar && <div className="w-8" />}
        {/* Message Content */}
        <div className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
            {/* Author and time */}
            <div
            className={`flex items-center gap-2 mb-1 text-xs text-gray-600 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
            >
            <span className="font-medium ">
                {message.tipo === "SISTEMA" ? "Sistema" : isOwn ? "Você" : message.autor?.nome}
            </span>
            <span>•</span>
            <span>{formatTime(message.createdAt)}</span>
            </div>
            {/* Message bubble */}
            <div
            className={`rounded-md px-4 py-3 max-w-full break-words border ${
                message.tipo === "SISTEMA"
                ? "bg-zinc-800 text-zinc-50 border-gray-200"
                : isOwn
                    ? "bg-zinc-950 text-zinc-50 border-gray-800"
                    : "bg-zinc-transparent text-zinc-950 border-gray-200"
            }`}
            >
            {/* Message type badge for special messages */}
            {(message.tipo === "OFERTA" || message.tipo === "CONTRA_OFERTA") && (
                <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className={`text-xs ${getMessageTypeColor(message.tipo)}`}>
                    {getMessageTypeIcon(message.tipo)}
                    <span className="ml-1">{message.tipo === "OFERTA" ? "Nova Oferta" : "Contraproposta"}</span>
                </Badge>
                </div>
            )}
            {/* Price highlight for financial messages */}
            {price && (
                <div className={`text-lg font-bold mb-2 ${isOwn ? "text-white" : "text-gray-800"}`}>R$ {price}</div>
            )}
            {/* Message content */}
            <div className="text-sm leading-relaxed whitespace-pre-wrap ">{message.conteudo}</div>
            </div>
        </div>

        </motion.div>
    )
};

export const MessageList = ({ 
    messages, 
    currentUserId, 
    negotiationId,
    canSendMessage = true,
    isNegotiationActive = true,
    canSendOffer = false,
    currentPrice = 0,
    onSendOffer
}: MessageListProps) => {
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [messageType, setMessageType] = useState<'TEXTO' | 'OFERTA' | 'CONTRA_OFERTA'>('TEXTO'); // NOVO
     
    const offerPrice = useMoneyInput(currentPrice);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { addMessage } = useNegotiationStore();

    // FIX: Debug - Adicionar logs para verificar os dados
    useEffect(() => {
        console.log('MessageList - Messages recebidas:', messages);
        console.log('MessageList - Quantidade de mensagens:', messages?.length || 0);
        console.log('MessageList - currentUserId:', currentUserId);
        console.log('MessageList - negotiationId:', negotiationId);
    }, [messages, currentUserId, negotiationId]);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
      
    const handleSendMessage = async () => {
        if (messageType === 'TEXTO' && (!newMessage.trim() || isSending || !canSendMessage)) return;
        if ((messageType === 'OFERTA' || messageType === 'CONTRA_OFERTA') && (!offerPrice.isValid || isSending || !canSendOffer)) return;

        setIsSending(true);
        try {
            if (messageType === 'TEXTO') {
                const payload: AddMessagePayload = {
                    conteudo: newMessage.trim(),
                    tipo: 'TEXTO'
                };
                await addMessage(negotiationId, payload);
                setNewMessage('');
            } else if ((messageType === 'OFERTA' || messageType === 'CONTRA_OFERTA') && onSendOffer) {
                await onSendOffer(offerPrice.cents, messageType); // ENVIA EM CENTAVOS
                offerPrice.setCents(currentPrice); // Reset
            }
            
            setMessageType('TEXTO');
            toast('Mensagem enviada com sucesso.');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            toast("Erro ao enviar mensagem. Tente novamente.");
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // FIX: Verificar se messages existe e é um array antes de processar
    const safeMessages = Array.isArray(messages) ? messages : [];

    // Group messages by date
    const groupedMessages = safeMessages.reduce((groups, message) => {
        try {
            // FIX: Verificar se message e createdAt existem
            if (!message || !message.createdAt) {
                console.warn('Mensagem sem data válida:', message);
                return groups;
            }

            // FIX: Converter string para Date se necessário
            const messageDate = typeof message.createdAt === 'string' 
                ? new Date(message.createdAt) 
                : message.createdAt;

            // FIX: Verificar se a data é válida
            if (isNaN(messageDate.getTime())) {
                console.error('Data inválida na mensagem:', message);
                return groups;
            }

            const date = format(messageDate, 'dd/MM/yyyy', { locale: ptBR });
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        } catch (error) {
            console.error('Erro ao processar mensagem:', message, error);
        }
        return groups;
    }, {} as Record<string, NegotiationMessage[]>);

    // FIX: Debug do agrupamento
    console.log('MessageList - Mensagens agrupadas:', groupedMessages);

    
    
    return (
        <div className="flex flex-col h-full bg-white border border-gray-200 rounded-md shadow-sm">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-6 p-4">
            {Object.keys(groupedMessages).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Nenhuma mensagem ainda</h3>
                <p className="text-sm max-w-md">
                Esta negociação ainda não tem mensagens. {canSendMessage ? "Seja o primeiro a enviar uma mensagem!" : ""}
                </p>
                <div className="mt-4 text-xs text-gray-500">Debug: {safeMessages.length} mensagens recebidas</div>
            </div>
            ) : (
            <AnimatePresence>
                {Object.entries(groupedMessages).map(([date, dayMessages]) => (
                <div key={date} className="space-y-4">
                    {/* Date separator */}
                    <div className="flex items-center justify-center my-6">
                    <div className="bg-gray-100 px-2 py-2 rounded-full text-xs text-gray-600 border border-gray-200">
                        {date}
                    </div>
                    </div>
                    {/* Messages for this date */}
                    {dayMessages.map((message, index) => {
                    const isOwn = message.autorId === currentUserId
                    const isLast = index === dayMessages.length - 1
                    const prevMessage = index > 0 ? dayMessages[index - 1] : null
                    const showAvatar = !prevMessage || prevMessage.autorId !== message.autorId
                    return (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            isOwn={isOwn}
                            showAvatar={showAvatar}
                            isLast={isLast}
                        />
                    )
                    })}
                </div>
                ))}
            </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
        </div>
     
        {/* Message Input */}
        {canSendMessage && isNegotiationActive && (
            <Card className="p-4 bg-gray-50 border-t border-gray-200 rounded-none">
                {/* Seletor de tipo de mensagem */}
                {canSendOffer && (
                    <div className="mb-3">
                        <div className="flex  flex-wrap  gap-2">
                            <Button
                                type="button"
                                variant={messageType === 'TEXTO' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    setMessageType('TEXTO');
                                    setNewMessage('');
                                }}
                                className={messageType === 'TEXTO' ? 'bg-gray-800 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
                            >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Texto
                            </Button>
                            <Button
                                type="button"
                                variant={messageType === 'OFERTA' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    setMessageType('OFERTA');
                                    setNewMessage('');
                                }}
                                className={messageType === 'OFERTA' ? 'bg-gray-800 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
                            >
                                <DollarSign className="h-4 w-4 mr-1" />
                                Oferta
                            </Button>
                            <Button
                                type="button"
                                variant={messageType === 'CONTRA_OFERTA' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    setMessageType('CONTRA_OFERTA');
                                    setNewMessage('');
                                }}
                                className={messageType === 'CONTRA_OFERTA' ? 'bg-gray-800 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
                            >
                                <TrendingUp className="h-4 w-4 mr-1" />
                                Contraproposta
                            </Button>
                        </div>
                    </div>
                )}

                <div className="flex gap-3">
                    <div className="flex-1">
                        {messageType === 'TEXTO' ? (
                            <Textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
                                className="min-h-[60px] resize-none border border-gray-300 focus:ring-1 focus:ring-gray-500 text-gray-800"
                                disabled={isSending}
                            />
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-md border border-gray-300">
                                    {messageType === 'OFERTA' ? (
                                        <DollarSign className="h-4 w-4 text-gray-600" />
                                    ) : (
                                        <TrendingUp className="h-4 w-4 text-gray-600" />
                                    )}
                                    <span className="text-sm text-gray-700 font-medium">
                                        {messageType === 'OFERTA' ? 'Nova Oferta' : 'Contraproposta'}
                                    </span>
                                </div>
                                <MoneyInput
                                    value={offerPrice.cents}
                                    onChange={(cents) => offerPrice.setCents(cents)}
                                    placeholder="Digite o valor"
                                    disabled={isSending}
                                />
                                {currentPrice > 0 && (
                                <div className="text-xs text-gray-600">
                                    Valor atual: {MoneyUtils.formatCentsWithSymbol(currentPrice)}
                                </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-end">
                        <Button
                            onClick={handleSendMessage}
                            disabled={
                                (messageType === 'TEXTO' && !newMessage.trim()) ||
                                ((messageType === 'OFERTA' || messageType === 'CONTRA_OFERTA') && !offerPrice.cents) ||
                                isSending
                            }
                            size="lg"
                            className="h-[60px] px-6 bg-gray-800 text-white hover:bg-gray-700"
                        >
                            {isSending ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                
                {/* Character counter and status */}
                <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                    <span>
                        {messageType === 'TEXTO' 
                            ? `${newMessage.length}/500 caracteres`
                            : offerPrice 
                                ? `Valor: R$ ${parseFloat(offerPrice.formattedWithSymbol).toFixed(2)}`
                                : 'Digite um valor'
                        }
                    </span>
                    <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                        Online
                    </span>
                </div>
            </Card>
        )}

        {/* Inactive state message */}
        {canSendMessage && !isNegotiationActive && (
            <Card className="p-4 bg-gray-100 border border-gray-200 rounded-none">
            <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Esta negociação não está mais ativa. Não é possível enviar novas mensagens.</span>
            </div>
            </Card>
        )}
        {/* No permission message */}
        {!canSendMessage && (
            <Card className="p-4 bg-gray-100 border border-gray-200 rounded-none">
            <div className="flex items-center gap-2 text-gray-700">
                <User className="h-4 w-4" />
                <span className="text-sm">Você não tem permissão para enviar mensagens nesta negociação.</span>
            </div>
            </Card>
        )}
    
        </div>
    )
};