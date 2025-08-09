import { Button } from "~/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { NegotiationHeader as Header } from "~/src/components/pages/negotiations/NegotiationHeader";
import { NegotiationStatusBadge } from "./NegotiationStatusBadge";
import { useNavigate } from "react-router";

export const NegotiationHeader = ({ negotiation }: { negotiation: any }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap items-start sm:items-center justify-between border-b border-gray-200 pb-4">
      <div className="flex flex-col xs:flex-row gap-3 xs:items-center w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/vehicles/negotiations")}
          className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full xs:w-auto justify-center xs:justify-start"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Header negotiation={negotiation} />
      </div>

      <div className="w-full sm:w-auto flex justify-start sm:justify-end">
        <NegotiationStatusBadge status={negotiation.status} />
      </div>
    </div>
  );
};
