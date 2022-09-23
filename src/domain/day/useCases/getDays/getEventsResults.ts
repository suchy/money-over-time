import { evaluate } from '../../../../utils/evaluate/evaluate';
import { Event } from '../../../event/event';
import { DayAccountBalance, EventResult } from '../../day';

export const getEventsResults = (
  accountsBalances: DayAccountBalance[],
  events: Event[]
) => {
  const eventsAccountsBalances = events.reduce(
    (eventsAccountsBalances: EventResult[], event, index) => {
      const previousEventResult = eventsAccountsBalances[index - 1];

      const hasPreviousEventResult = !!previousEventResult;

      const previousBalances = hasPreviousEventResult
        ? previousEventResult.accountsBalances
        : accountsBalances;

      const accountsBalancesAfterEvent = getAccountBalancesAfterEvent(
        event,
        previousBalances
      );

      return [
        ...eventsAccountsBalances,
        { event, accountsBalances: accountsBalancesAfterEvent }
      ];
    },
    []
  );

  return eventsAccountsBalances;
};

const getAccountBalancesAfterEvent = (
  event: Event,
  accountsBalances: DayAccountBalance[]
) => {
  const updatedBalances = [...accountsBalances];

  const accountBalanceIndex = updatedBalances.findIndex(
    ({ account }) => event.accountId === account.accountId
  );

  if (accountBalanceIndex === -1) {
    return updatedBalances;
  }

  const updatedAccountBalance = { ...updatedBalances[accountBalanceIndex] };

  const updatedAccountBalanceExpression = getEventExpression(
    event.expression,
    updatedAccountBalance.balance
  );

  updatedAccountBalance.balance = evaluate(updatedAccountBalanceExpression);

  updatedBalances[accountBalanceIndex] = updatedAccountBalance;

  return updatedBalances;
};

const getEventExpression = (
  eventExpression: string,
  accountBalance: number
) => {
  if (!eventExpression) {
    return accountBalance.toString();
  }

  const operators = ['+', '-', '*', '/', '^'];

  const trimmedExpression = eventExpression.trim();

  const firstChar = trimmedExpression.at(0);

  if (!firstChar) {
    return accountBalance.toString();
  }

  const isFirstCharAnOperator = operators.includes(firstChar);

  if (isFirstCharAnOperator) {
    return `${accountBalance} ${eventExpression}`;
  }

  return `${accountBalance} + ${eventExpression}`;
};
