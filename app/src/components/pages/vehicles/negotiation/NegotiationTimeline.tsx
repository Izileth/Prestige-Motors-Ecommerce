import { NegotiationTimeline as Timeline } from "~/src/components/pages/negotiations/NegociationTimeLine";

export const NegotiationTimeline = ({ history }: any) => (
  <div className="bg-white p-6 rounded-md border border-gray-200">
    <Timeline history={history} />
  </div>
);
