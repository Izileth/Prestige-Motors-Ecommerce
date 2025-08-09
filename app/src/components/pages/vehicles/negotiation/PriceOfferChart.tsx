import { PriceOfferChart as Chart } from "~/src/components/pages/negotiations/PriceOfferChart";

export const PriceOfferChart = ({ negotiation, messages }: any) => (
  <Chart negotiation={negotiation} messages={messages} />
);
