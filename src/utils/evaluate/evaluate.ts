import { evaluate as evaluateExpression } from 'mathjs';

export const evaluate = (expression: string): number =>
  evaluateExpression(expression);
