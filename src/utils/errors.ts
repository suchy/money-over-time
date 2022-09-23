import { ActionFunction, json, LoaderFunction } from '@remix-run/node';

export enum AppErrorType {
  appError = 'appError',
  validationFailed = 'validationFailed',
  notFound = 'notfound'
}

export class AppError extends Error {
  public readonly type: string;
  public readonly isTrusted: boolean;
  public readonly details?: unknown;

  constructor(
    type: AppErrorType,
    isTrusted: boolean,
    message: string,
    details?: unknown
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.type = type;
    this.isTrusted = isTrusted;
    this.details = details;

    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: unknown) {
    super(AppErrorType.notFound, true, message, details);
  }
}

export class ValidationFailedError extends AppError {
  constructor(message: string, details?: unknown) {
    super(AppErrorType.validationFailed, true, message, details);
  }
}

export const isAppError = (error: unknown) => {
  const isError = error instanceof Error;

  if (!isError) {
    return false;
  }

  const isTrustedError = Object.prototype.hasOwnProperty.call(
    error,
    'isTrusted'
  );

  return isTrustedError;
};

export const errorHandledRoute =
  (
    actionOrLoaderFunction: ActionFunction | LoaderFunction
  ): ActionFunction | LoaderFunction =>
  async (actionOrLoaderFunctionPrarams) => {
    try {
      return await actionOrLoaderFunction(actionOrLoaderFunctionPrarams);
    } catch (error) {
      if (!isAppError(error)) {
        throw error;
      }

      const appError = error as AppError;

      if (appError.type === AppErrorType.validationFailed) {
        const validationErrors = appError.details;
        return json({ validationErrors }, { status: 400 });
      }

      const status = appError.type === AppErrorType.notFound ? 404 : 500;

      throw new Response(appError.message, { status });
    }
  };
