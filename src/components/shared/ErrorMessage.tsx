import type { AppError } from '../../types/ErrorCodes';

interface ErrorMessageProps {
  error: AppError | Error | string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {

  const isAppError = (err: any): err is AppError => {
    return err && typeof err === 'object' && 'code' in err && 'title' in err;
  };

  const getErrorDetails = () => {
    if (isAppError(error)) {
      return {
        title: error.title,
        message: error.message,
        canRetry: error.canRetry,
      };
    }
    
    if (error instanceof Error) {
      return {
        title: 'An Error Occurred',
        message: error.message,
        canRetry: true,
      };
    }
    
    return {
      title: 'An Error Occurred',
      message: error,
      canRetry: true,
    };
  };

  const { title, message, canRetry } = getErrorDetails();
  const showRetryButton = onRetry && canRetry;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6" role="alert">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">❌</span>
        <div className="flex-1">
          <h3 className="text-red-900 dark:text-red-200 font-bold mb-2">
            {title}
          </h3>
          <p className="text-red-800 dark:text-red-300 text-sm">
            {message}
          </p>
          {showRetryButton && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
