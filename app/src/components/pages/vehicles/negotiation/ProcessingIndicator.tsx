import { Loader2 } from "lucide-react";

export const ProcessingIndicator = () => (
  <div className="bg-gray-100 border border-gray-200 rounded-md p-4">
    <div className="flex items-center space-x-3">
      <Loader2 className="h-4 w-4 animate-spin text-gray-700" />
      <p className="text-sm text-gray-800">Processando ação...</p>
    </div>
  </div>
);
