import type { Negotiation } from "../types/negociation";
export const countByStatus = (negotiations: Negotiation[]) => {
  return negotiations.reduce((acc, negotiation) => {
    acc[negotiation.status] = (acc[negotiation.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};