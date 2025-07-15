
import { Progress } from "~/src/components/ui/progress"

interface ProgressBarProps {
    formProgress: number;
}

export const ProgressBar = ({ formProgress }: ProgressBarProps) => (
    <div className="md:hidden mb-6">
        <Progress value={formProgress} className="h-2 bg-gray-200 dark:bg-gray-800" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-right">{formProgress}% completo</p>
    </div>
);