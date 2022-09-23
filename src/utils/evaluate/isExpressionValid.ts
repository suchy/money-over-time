import { evaluate } from './evaluate';

export const isExpressionValid = (expression: string) => {
  try {
    if (!expression) {
      return false;
    }

    evaluate(expression);
    return true;
  } catch {
    return false;
  }
};
