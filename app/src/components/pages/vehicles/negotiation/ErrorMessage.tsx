import { ErrorMessage as Error } from "~/src/components/pages/negotiations/ErrrorMensage";

export const ErrorMessage = ({ message, onRetry }: any) => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <Error message={message} onRetry={onRetry} />
  </div>
);
