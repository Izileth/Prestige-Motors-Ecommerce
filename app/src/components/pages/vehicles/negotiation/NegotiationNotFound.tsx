import { Button } from "~/src/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

export const NegotiationNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center space-y-4 p-6 border border-gray-200 rounded-md bg-white">
        <AlertCircle className="h-12 w-12 text-gray-500 mx-auto" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Negociação não encontrada
          </h3>
          <p className="text-sm text-gray-600">
            A negociação solicitada não existe ou você não tem permissão para
            visualizá-la.
          </p>
        </div>
        <Button
          onClick={() => navigate("/vehicles/negotiations")}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para negociações
        </Button>
      </div>
    </div>
  );
};
