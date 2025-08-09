import { NegotiationStatusBadge as Badge } from "~/src/components/pages/negotiations/NegociationStatusBadge";
import type { NegotiationStatus } from "~/src/types/negociation";

export const NegotiationStatusBadge = ({ status }: { status: NegotiationStatus }) => (
  <Badge status={status} />
);
