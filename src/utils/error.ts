export type ValidationErrorValue =
  | string
  | {
      key: string;
      params: Record<string, string>;
    };

export type ValidationError = ValidationErrorValue | any;

export type ValidationErrors<T> = Partial<Record<keyof T, ValidationError>>;
