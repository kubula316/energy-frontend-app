import type {AppError} from "../types/errorCodes.ts";

export const isAppError = (err: unknown): err is AppError => {
    return (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        'title' in err
    );
};

export const normalizeError = (error: unknown): AppError | Error => {
    if (error && typeof error === 'object' && 'code' in error && 'title' in error) {
        return error as AppError;
    }

    if (error instanceof Error) {
        return error;
    }

    return new Error('Unknown error');
};