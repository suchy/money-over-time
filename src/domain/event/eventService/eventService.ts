import { createId } from '../../../utils/createId';
import { fullDateFormat, startOfDay } from '../../../utils/date';
import { ValidationErrors } from '../../../utils/error';
import { isExpressionValid } from '../../../utils/evaluate/isExpressionValid';
import { TimelineVersion } from '../../timelineVersion/timelineVersion';
import {
  Event,
  EventFactory,
  EventInterval,
  EventRepeat,
  EventType,
  VariableEventProps
} from '../event';

export const eventService = {
  create(eventProps: VariableEventProps) {
    const newEventProps = {
      ...eventProps,
      date: startOfDay(eventProps.date),
      eventId: createId()
    };

    const event = EventFactory(newEventProps);
    return event;
  },

  update(event: Event, eventProps: Partial<VariableEventProps>) {
    // Make sure eventId is no updated
    // eslint-disable-next-line
    // @ts-ignore
    const { eventId, ...variableEventProps } = eventProps;

    const updatedEventProps = {
      ...event,
      ...variableEventProps
    };

    updatedEventProps.date = startOfDay(updatedEventProps.date);

    const updatedEvent = EventFactory(updatedEventProps);
    return updatedEvent;
  },

  validate(event: Event, timelineVersion: TimelineVersion) {
    const errors: ValidationErrors<Event> = {};

    if (!event.name) {
      errors.name = 'Name is invalid.';
    }

    const eventTypes = Object.keys(EventType);

    if (!eventTypes.includes(event.type)) {
      errors.type = 'Type is invalid.';
    }

    if (!isExpressionValid(event.expression)) {
      errors.expression = 'Expression is invalid.';
    }

    if (event.accountId) {
      const account = timelineVersion.accounts.find(
        (account) => account.accountId === event.accountId
      );

      if (!account) {
        errors.accountId = 'Account not found.';
      }

      if (account && event.date < account.startDate) {
        errors.date = `Date can't be lower than ${fullDateFormat(
          account.startDate
        )}.`;
      }
    }

    if (!event.accountId && event.date < timelineVersion.startDate) {
      errors.date = `Date can't be lower than ${fullDateFormat(
        timelineVersion.startDate
      )}.`;
    }

    if (event.repeat) {
      const repeatErrors: ValidationErrors<EventRepeat> = {};

      const eventIntervals = Object.keys(EventInterval);

      if (!eventIntervals.includes(event.repeat.interval)) {
        repeatErrors.interval = 'Interval is not valid.';
      }

      if (!event.repeat.intervalNumber) {
        repeatErrors.intervalNumber = 'IntervalNumber is not valid.';
      }

      if (event.repeat.endDate && event.repeat.endDate <= event.date) {
        repeatErrors.endDate = `EndDate can't be lower than ${fullDateFormat(
          event.date
        )}`;
      }

      const hasEventRepeatErrors = !!Object.entries(repeatErrors).length;

      if (hasEventRepeatErrors) {
        errors.repeat = repeatErrors;
      }
    }

    const hasErrors = !!Object.entries(errors).length;

    if (hasErrors) {
      return errors;
    }
  }
};
