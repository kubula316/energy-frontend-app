export const ErrorCode = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];

export interface AppError {
  code: ErrorCode;
  title: string;
  message: string;
  canRetry: boolean;
  originalError?: Error;
}

export const ERROR_MESSAGES: Record<ErrorCode, { title: string; message: string; canRetry: boolean }> = {
  [ErrorCode.NETWORK_ERROR]: {
    title: 'Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection.',
    canRetry: true,
  },
  [ErrorCode.TIMEOUT_ERROR]: {
    title: 'Timeout Error',
    message: 'The server did not respond in time. Please try again.',
    canRetry: true,
  },
  [ErrorCode.SERVER_ERROR]: {
    title: 'Server Error',
    message: 'A problem occurred on the server side. Please try again later.',
    canRetry: true,
  },
  [ErrorCode.NOT_FOUND]: {
    title: 'Not Found',
    message: 'The requested resource was not found.',
    canRetry: false,
  },
  [ErrorCode.BAD_REQUEST]: {
    title: 'Bad Request',
    message: 'The data sent to the server is invalid. Please check your input.',
    canRetry: false,
  },
  [ErrorCode.VALIDATION_ERROR]: {
    title: 'Validation Error',
    message: 'The entered data is invalid.',
    canRetry: false,
  },
  [ErrorCode.UNKNOWN_ERROR]: {
    title: 'Unknown Error',
    message: 'An unexpected error occurred. Please try again.',
    canRetry: true,
  },
};

export const createAppError = (
  code: ErrorCode,
  originalError?: Error,
  customMessage?: string
): AppError => {
  const errorConfig = ERROR_MESSAGES[code];
  
  return {
    code,
    title: errorConfig.title,
    message: customMessage || errorConfig.message,
    canRetry: errorConfig.canRetry,
    originalError,
  };
};

export const mapHttpStatusToErrorCode = (status: number): ErrorCode => {
  if (status >= 500) return ErrorCode.SERVER_ERROR;
  if (status === 404) return ErrorCode.NOT_FOUND;
  if (status === 400) return ErrorCode.BAD_REQUEST;
  if (status === 408) return ErrorCode.TIMEOUT_ERROR;
  return ErrorCode.UNKNOWN_ERROR;
};
