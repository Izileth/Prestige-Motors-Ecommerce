import { Card, CardContent, CardHeader } from "~/src/components/ui/card";
import { Skeleton } from "~/src/components/ui/skeleton";


export const NegotiationActionsSkeleton = () => {
    return (
        <Card className="w-full">
        <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
            {/* Alert skeleton */}
            <div className="p-4 border rounded-md bg-muted/50">
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-64" />
            </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="grid grid-cols-1 gap-3">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            </div>
        </CardContent>
        </Card>
    );
};


export const MessageBubbleSkeleton = ({ isOwn = false }: { isOwn?: boolean }) => {
    return (
        <div className={`flex gap-3 mb-4 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar skeleton */}
        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
        
        {/* Message content */}
        <div className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
            {/* Author and time */}
            <div className={`flex items-center gap-2 mb-1 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-1 rounded-full" />
            <Skeleton className="h-3 w-20" />
            </div>
            
            {/* Message bubble */}
            <div className="space-y-2">
            <Skeleton className="h-16 w-64 rounded-md" />
            </div>
        </div>
        </div>
    );
};


export const MessageListSkeleton = () => {
    return (
        <div className="flex flex-col h-full bg-white border border-gray-200 rounded-md shadow-sm">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-6 p-4">
            {/* Date separator */}
            <div className="flex items-center justify-center my-6">
            <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            
            {/* Messages */}
            <div className="space-y-4">
            <MessageBubbleSkeleton isOwn={false} />
            <MessageBubbleSkeleton isOwn={true} />
            <MessageBubbleSkeleton isOwn={false} />
            <MessageBubbleSkeleton isOwn={true} />
            </div>
            
            {/* Another date separator */}
            <div className="flex items-center justify-center my-6">
            <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            
            <div className="space-y-4">
            <MessageBubbleSkeleton isOwn={false} />
            <MessageBubbleSkeleton isOwn={true} />
            </div>
        </div>
        
        {/* Message Input Area */}
        <Card className="p-4 bg-gray-50 border-t border-gray-200 rounded-none">
            {/* Message type selector */}
            <div className="mb-3">
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-16 rounded-md" />
                <Skeleton className="h-8 w-16 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" />
            </div>
            </div>
            
            {/* Input area */}
            <div className="flex gap-3">
            <div className="flex-1">
                <Skeleton className="h-[60px] w-full rounded-md" />
            </div>
            <Skeleton className="h-[60px] w-[60px] rounded-md" />
            </div>
            
            {/* Footer info */}
            <div className="flex items-center justify-between mt-2">
            <Skeleton className="h-3 w-32" />
            <div className="flex items-center gap-1">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-12" />
            </div>
            </div>
        </Card>
        </div>
    );
};


export const NegotiationInfoSkeleton = () => {
    return (
        <Card className="w-full">
        <CardHeader>
            <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-20 rounded-full" />
            </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-6 w-36" />
            </div>
            </div>
            
            <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-16 w-full rounded-md" />
            </div>
        </CardContent>
        </Card>
    );
};


export const NegotiationPageSkeleton = () => {
    return (
        <div className="container mx-auto w-full max-w-full p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-32 rounded-full" />
        </div>
        
        {/* Main content - assumindo layout com 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna esquerda - Messages */}
            <div className="space-y-4">
            <MessageListSkeleton />
            </div>
            
            {/* Coluna direita - Actions */}
            <div className="space-y-4">
            <NegotiationInfoSkeleton />
            <NegotiationActionsSkeleton />
            </div>
        </div>
        </div>
    );
};

// Hook para controlar estados de loading
export const useNegotiationLoading = () => {
  return {
    // Você pode expandir isso baseado nas suas necessidades
    isLoadingMessages: false,
    isLoadingActions: false,
    isLoadingInfo: false,
    isLoadingPage: false
  };
};

// Componente condicional que renderiza skeleton ou conteúdo
interface NegotiationWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeletonType?: 'page' | 'messages' | 'actions' | 'info';
}

export const NegotiationWrapper = ({ 
  isLoading, 
  children, 
  skeletonType = 'page' 
}: NegotiationWrapperProps) => {
  if (!isLoading) return <>{children}</>;
  
  switch (skeletonType) {
    case 'messages':
      return <MessageListSkeleton />;
    case 'actions':
      return <NegotiationActionsSkeleton />;
    case 'info':
      return <NegotiationInfoSkeleton />;
    default:
      return <NegotiationPageSkeleton />;
  }
};