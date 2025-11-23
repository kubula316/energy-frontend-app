import type { FontSize } from '../../types/Accessibility';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fontSize?: FontSize;
}

export const LoadingSpinner = ({ 
  size = 'medium', 
  message,
  fontSize = 'medium',
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'h-8 w-8 border-b-2',
    medium: 'h-12 w-12 border-b-2',
    large: 'h-16 w-16 border-b-4',
  };

  const messageSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div 
        className={`animate-spin rounded-full border-blue-600 dark:border-blue-400 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className={`mt-4 text-gray-600 dark:text-gray-400 ${messageSizeClasses[fontSize]}`}>
          {message}
        </p>
      )}
    </div>
  );
};
