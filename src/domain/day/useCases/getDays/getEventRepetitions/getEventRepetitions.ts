import {
  addDays,
  addWeeks,
  addMonths,
  addQuarters,
  addYears,
  isWithinInterval,
  min
} from '../../../../../utils/date';
import {
  Event,
  EventFactory,
  EventInterval,
  EventRepeat
} from '../../../../event/event';

export const getEventRepetitions = (event: Event, endDate: Date) => {
  if (!event.repeat) {
    return [event];
  }

  const repetitionEndDate = event.repeat.endDate
    ? min([event.repeat.endDate, endDate])
    : endDate;

  const eventRepetitionsDates = getEventRepetitionsDates(
    event,
    repetitionEndDate
  );

  const eventRepetitions = eventRepetitionsDates.map((date) =>
    EventFactory({ ...event, date })
  );

  return eventRepetitions;
};

const getEventRepetitionsDates = (event: Event, endDate: Date) => {
  const repeatedEventDates = [event.date];

  if (!event.repeat) {
    return repeatedEventDates;
  }

  let repeatedEventDateIsInRange = true;

  while (repeatedEventDateIsInRange) {
    const previousRepeatDate =
      repeatedEventDates[repeatedEventDates.length - 1];

    const nextRepeatDate = getNextRepeatDate(previousRepeatDate, event.repeat);

    const isNextRepeatDateinRange = isWithinInterval(nextRepeatDate, {
      start: event.date,
      end: endDate
    });

    if (isNextRepeatDateinRange) {
      repeatedEventDates.push(nextRepeatDate);
    } else {
      repeatedEventDateIsInRange = false;
    }
  }

  return repeatedEventDates;
};

const getNextRepeatDate = (date: Date, eventRepeat: EventRepeat) => {
  const { interval, intervalNumber } = eventRepeat;

  let add = addDays;

  if (interval === EventInterval.week) {
    add = addWeeks;
  }

  if (interval === EventInterval.month) {
    add = addMonths;
  }

  if (interval === EventInterval.quarter) {
    add = addQuarters;
  }

  if (interval === EventInterval.year) {
    add = addYears;
  }

  const nextRepeatDate = add(date, intervalNumber);

  return nextRepeatDate;
};
