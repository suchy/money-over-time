import { Account } from '../account/account';
import { Event } from '../event/event';

export interface DayAccountBalance {
  account: Account;
  balance: number;
}

export interface EventResult {
  event: Event;
  accountsBalances: DayAccountBalance[];
}

export interface DayProps {
  date: Date;
  finalAccountsBalances: DayAccountBalance[];
  eventsResults: EventResult[];
}

export type Day = Readonly<DayProps>;

export const DayFactory = (props: DayProps) => {
  const day: Day = Object.freeze(props);
  return day;
};
