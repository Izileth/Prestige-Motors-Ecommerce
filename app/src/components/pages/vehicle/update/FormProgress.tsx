
import { Progress } from "~/src/components/ui/progress";

interface FormProgressProps {
  progress: number;
}

export function FormProgress({ progress }: FormProgressProps) {
  return (
    <div className="md:hidden mb-6">
      <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-800" />
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-right">
        {progress}% completo
      </p>
    </div>
  );
}
