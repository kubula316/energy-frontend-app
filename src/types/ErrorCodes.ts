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
    title: 'Błąd połączenia',
    message: 'Nie można połączyć się z serwerem. Sprawdź swoje połączenie internetowe.',
    canRetry: true,
  },
  [ErrorCode.TIMEOUT_ERROR]: {
    title: 'Przekroczono czas oczekiwania',
    message: 'Serwer nie odpowiedział w odpowiednim czasie. Spróbuj ponownie.',
    canRetry: true,
  },
  [ErrorCode.SERVER_ERROR]: {
    title: 'Błąd serwera',
    message: 'Wystąpił problem po stronie serwera. Spróbuj ponownie za chwilę.',
    canRetry: true,
  },
  [ErrorCode.NOT_FOUND]: {
    title: 'Nie znaleziono',
    message: 'Żądany zasób nie został znaleziony.',
    canRetry: false,
  },
  [ErrorCode.BAD_REQUEST]: {
    title: 'Nieprawidłowe żądanie',
    message: 'Dane wysłane do serwera są nieprawidłowe. Sprawdź wprowadzone wartości.',
    canRetry: false,
  },
  [ErrorCode.VALIDATION_ERROR]: {
    title: 'Błąd walidacji',
    message: 'Wprowadzone dane są nieprawidłowe.',
    canRetry: false,
  },
  [ErrorCode.UNKNOWN_ERROR]: {
    title: 'Nieznany błąd',
    message: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.',
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
