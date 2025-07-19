import { cn } from "~/src/lib/cn";
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({
  icon,
  title,
  description,
  className,
  action
}: EmptyStateProps) => {
  return (
    <div className={cn(
      "border border-gray-100 dark:border-gray-900 rounded-lg py-16 px-6 text-center",
      className
    )}>
      <div className="max-w-md mx-auto space-y-4">
        {icon && (
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-light text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
          {description}
        </p>
        {action && (
          <div className="pt-4">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};