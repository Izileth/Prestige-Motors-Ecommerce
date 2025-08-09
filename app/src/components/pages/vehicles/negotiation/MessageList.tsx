import { MessageList as List } from "~/src/components/pages/negotiations/MensagesList";

export const MessageList = ({
  messages,
  currentUserId,
  negotiationId,
  canSendMessage,
  isNegotiationActive,
  canSendOffer,
  currentPrice,
  onSendOffer,
}: any) => (
  <div className="bg-white rounded-md border border-gray-200">
    <div className="py-2 px-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-lg font-semibold text-gray-900">Conversa</h3>
        <span className="text-sm text-gray-600">
          {messages.length} mensagem{messages.length !== 1 ? "s" : ""}
        </span>
      </div>
      <List
        messages={messages}
        currentUserId={currentUserId}
        negotiationId={negotiationId}
        canSendMessage={canSendMessage}
        isNegotiationActive={isNegotiationActive}
        canSendOffer={canSendOffer}
        currentPrice={currentPrice}
        onSendOffer={onSendOffer}
      />
    </div>
  </div>
);
