import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, 
    DollarSign, 
    TrendingUp, 
    CheckCircle, 
    XCircle, 
    Clock,
    User,
    Bot,
    MessageSquare,
    Reply
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

interface MessageListProps {
    messages: NegotiationMessage[];
    currentUserId: string;
    negotiationId: string;
    canSendMessage?: boolean;
    isNegotiationActive?: boolean;
}

interface MessageBubbleProps {
    message: NegotiationMessage;
    isOwn: boolean;
    showAvatar?: boolean;
    isLast?: boolean;
}

const getMessageTypeIcon = (type: MessageType) => {
  switch (type) {
    case 'OFERTA':
      return <DollarSign className="h-4 w-4" />;
    case 'CONTRA_OFERTA':
      return <TrendingUp className="h-4 w-4" />;
    case 'SISTEMA':
      return <Bot className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const getMessageTypeColor = (type: MessageType) => {
  switch (type) {
    case 'OFERTA':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'CONTRA_OFERTA':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'SISTEMA':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-green-100 text-green-800 border-green-200';
  }
};

const MessageBubble = ({ message, isOwn, showAvatar = true, isLast = false }: MessageBubbleProps) => {
    const formatTime = (date: Date) => {
        const now = new Date();
        const messageDate = new Date(date);
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
        className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'} ${isLast ? 'mb-6' : ''}`}
        >
        {/* Avatar */}
        {showAvatar && (
            <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={message.autor?.avatar || ''} />
            <AvatarFallback className="text-xs">
                {message.tipo === 'SISTEMA' ? (
                <Bot className="h-4 w-4" />
                ) : (
                message.autor?.nome?.charAt(0)?.toUpperCase() || 'U'
                )}
            </AvatarFallback>
            </Avatar>
        )}
        {!showAvatar && <div className="w-8" />}

        {/* Message Content */}
        <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
            {/* Author and time */}
            <div className={`flex items-center gap-2 mb-1 text-xs text-muted-foreground ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="font-medium">
                {message.tipo === 'SISTEMA' ? 'Sistema' : (isOwn ? 'Você' : message.autor?.nome)}
            </span>
            <span>•</span>
            <span>{formatTime(message.createdAt)}</span>
            </div>

            {/* Message bubble */}
            <div
            className={`rounded-2xl px-4 py-3 max-w-full break-words ${
                message.tipo === 'SISTEMA'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                : isOwn
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
            >
            {/* Message type badge for special messages */}
            {(message.tipo === 'OFERTA' || message.tipo === 'CONTRA_OFERTA') && (
                <div className="flex items-center gap-2 mb-2">
                <Badge 
                    variant="secondary" 
                    className={`text-xs ${getMessageTypeColor(message.tipo)}`}
                >
                    {getMessageTypeIcon(message.tipo)}
                    <span className="ml-1">
                    {message.tipo === 'OFERTA' ? 'Nova Oferta' : 'Contraproposta'}
                    </span>
                </Badge>
                </div>
            )}

            {/* Price highlight for financial messages */}
            {price && (
                <div className={`text-lg font-bold mb-2 ${isOwn ? 'text-white' : 'text-green-600'}`}>
                R$ {price}
                </div>
            )}

            {/* Message content */}
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.conteudo}
            </div>
            </div>
        </div>
        </motion.div>
    );
};

export const MessageList = ({ 
    messages, 
    currentUserId, 
    negotiationId,
    canSendMessage = true,
    isNegotiationActive = true 
    }: MessageListProps) => {
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { addMessage } = useNegotiationStore();

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || isSending || !canSendMessage) return;

        setIsSending(true);
        try {
        const payload: AddMessagePayload = {
            conteudo: newMessage.trim(),
            tipo: 'TEXTO'
        };

        await addMessage(negotiationId, payload);
        setNewMessage('');
        
        toast('Mensagem enviada com sucesso.');
        } catch (error) {
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

    // Group messages by date
    const groupedMessages = messages.reduce((groups, message) => {
        const date = format(new Date(message.createdAt), 'dd/MM/yyyy', { locale: ptBR });
        if (!groups[date]) {
        groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {} as Record<string, NegotiationMessage[]>);

    return (
        <div className="flex flex-col h-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-4">
            {Object.keys(groupedMessages).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma mensagem ainda</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                Esta negociação ainda não tem mensagens. {canSendMessage ? 'Seja o primeiro a enviar uma mensagem!' : ''}
                </p>
            </div>
            ) : (
            <AnimatePresence>
                {Object.entries(groupedMessages).map(([date, dayMessages]) => (
                <div key={date} className="space-y-4">
                    {/* Date separator */}
                    <div className="flex items-center justify-center my-6">
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs text-muted-foreground">
                        {date}
                    </div>
                    </div>

                    {/* Messages for this date */}
                    {dayMessages.map((message, index) => {
                    const isOwn = message.autorId === currentUserId;
                    const isLast = index === dayMessages.length - 1;
                    const prevMessage = index > 0 ? dayMessages[index - 1] : null;
                    const showAvatar = !prevMessage || prevMessage.autorId !== message.autorId;

                    return (
                        <MessageBubble
                        key={message.id}
                        message={message}
                        isOwn={isOwn}
                        showAvatar={showAvatar}
                        isLast={isLast}
                        />
                    );
                    })}
                </div>
                ))}
            </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {canSendMessage && isNegotiationActive && (
            <Card className="p-4 bg-gray-50 dark:bg-gray-900 border-t">
            <div className="flex gap-3">
                <div className="flex-1">
                <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
                    className="min-h-[60px] resize-none"
                    disabled={isSending}
                />
                </div>
                <div className="flex flex-col justify-end">
                <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isSending}
                    size="lg"
                    className="h-[60px] px-6"
                >
                    {isSending ? (
                    <Clock className="h-4 w-4 animate-spin" />
                    ) : (
                    <Send className="h-4 w-4" />
                    )}
                </Button>
                </div>
            </div>
            
            {/* Character counter and status */}
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>
                {newMessage.length}/500 caracteres
                </span>
                <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Online
                </span>
            </div>
            </Card>
        )}

        {/* Inactive state message */}
        {canSendMessage && !isNegotiationActive && (
            <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                Esta negociação não está mais ativa. Não é possível enviar novas mensagens.
                </span>
            </div>
            </Card>
        )}

        {/* No permission message */}
        {!canSendMessage && (
            <Card className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-200">
            <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm">
                Você não tem permissão para enviar mensagens nesta negociação.
                </span>
            </div>
            </Card>
        )}
        </div>
    );
};