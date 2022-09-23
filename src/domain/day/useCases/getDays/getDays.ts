import {
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isWithinInterval
} from '../../../../utils/date';
import { Account } from '../../../account/account';
import { Event } from '../../../event/event';
import { TimelineVersion } from '../../../timelineVersion/timelineVersion';
import { Day, DayAccountBalance, DayFactory } from '../../day';
import { getEventRepetitions } from './getEventRepetitions/getEventRepetitions';
import { getEventsResults } from './getEventsResults';

export const getDays = (
  timelineVersion: TimelineVersion,
  startDate: Date,
  endDate: Date
) => {
  const datesFromStartoToEndDate = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const { accounts, events } = timelineVersion;

  const hasAccounts = !!accounts.length;

  if (!hasAccounts) {
    const emptyDays = datesFromStartoToEndDate.map(getEmptyDay);
    return emptyDays;
  }

  const eventsFromTimelineStartoToEndDate = events.filter((event) =>
    isWithinInterval(event.date, { start: startDate, end: endDate })
  );

  const eventsWithRepetitions = eventsFromTimelineStartoToEndDate.reduce(
    (eventsRepetitions: Event[], event) => {
      const eventRepetitions = getEventRepetitions(event, endDate);
      return [...eventsRepetitions, ...eventRepetitions];
    },
    []
  );

  const datesFromTimelineStartoToEndDate = eachDayOfInterval({
    start: timelineVersion.startDate,
    end: endDate
  });

  const daysFromTimelineStartToEndDate =
    datesFromTimelineStartoToEndDate.reduce((days: Day[], date, dateIndex) => {
      const previousDateIndex = dateIndex - 1;
      const isFirstDay = dateIndex === 0;

      const previousDayFinalAccountsBalances = isFirstDay
        ? []
        : days[previousDateIndex].finalAccountsBalances;

      const day = getDay(
        date,
        accounts,
        eventsWithRepetitions,
        previousDayFinalAccountsBalances
      );

      const updatedDays = [...days, day];
      return updatedDays;
    }, []);

  const daysInDatesRange = daysFromTimelineStartToEndDate.filter((day) =>
    isWithinInterval(day.date, { start: startDate, end: endDate })
  );

  return daysInDatesRange;
};

const getDay = (
  date: Date,
  accounts: Account[],
  events: Event[],
  previousDayFinalAccountsBalances: DayAccountBalance[]
) => {
  const accountsExistingThatDay = accounts.filter(
    ({ startDate }) => isBefore(startDate, date) || isSameDay(startDate, date)
  );

  const dayStartAccountsBalances = getDayStartAccountsBalances(
    previousDayFinalAccountsBalances,
    accountsExistingThatDay
  );

  const dayEvents = events.filter((event) =>
    isWithinInterval(event.date, { start: date, end: date })
  );

  const eventsResults = getEventsResults(dayStartAccountsBalances, dayEvents);

  const hasEventsResults = !!eventsResults.length;

  const finalAccountsBalances = hasEventsResults
    ? eventsResults[eventsResults.length - 1].accountsBalances
    : dayStartAccountsBalances;

  const day = DayFactory({
    date,
    finalAccountsBalances,
    eventsResults
  });

  return day;
};

const getDayStartAccountsBalances = (
  previousDayFinalAccountsBalances: DayAccountBalance[],
  dayAccounts: Account[]
) => {
  const dayStartAccountsBalances = dayAccounts.map((account) => {
    const previousDayAccountBalanceIndex =
      previousDayFinalAccountsBalances.findIndex(
        (accountBalance) =>
          accountBalance.account.accountId === account.accountId
      );

    const wasAccountExistPreviousDay = previousDayAccountBalanceIndex !== -1;

    if (wasAccountExistPreviousDay) {
      const previousDayFinalAccountBalance =
        previousDayFinalAccountsBalances[previousDayAccountBalanceIndex];

      return {
        ...previousDayFinalAccountBalance
      };
    }

    const accountBalance = { account, balance: account.startBalance };

    return accountBalance;
  });

  return dayStartAccountsBalances;
};

const getEmptyDay = (date: Date) =>
  DayFactory({
    date,
    finalAccountsBalances: [],
    eventsResults: []
  });
