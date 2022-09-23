import {
  subDays,
  startOfDay,
  fullDateFormat,
  mockedDate
} from '../../../utils/date';
import { TimelineVersion } from '../../timelineVersion/timelineVersion';
import { Event, EventType, VariableEventProps } from '../event';
import { eventService } from './eventService';

describe('eventService', () => {
  let variableEventProps: VariableEventProps;
  let timelineVersion: TimelineVersion;

  beforeEach(() => {
    variableEventProps = {
      date: mockedDate,
      name: 'Event name',
      type: EventType.accountOperation,
      expression: '10'
    } as VariableEventProps;

    timelineVersion = {
      name: 'Timeline version name',
      startDate: subDays(mockedDate, 7),
      timelineId: '00000000-0000-0000-0000-000000000000',
      timelineVersionId: '00000000-0000-0000-0000-000000000000',
      accounts: [],
      events: []
    };
  });

  describe('create', () => {
    it('should return event', () => {
      const eventProps = {
        ...variableEventProps
      };

      const event = eventService.create(eventProps);

      const eventKeys = Object.keys(event);

      expect(eventKeys).toStrictEqual([
        'date',
        'name',
        'type',
        'expression',
        'eventId'
      ]);
    });

    it('should set eventId', () => {
      const eventProps = {
        ...variableEventProps
      };

      const event = eventService.create(eventProps);

      expect(event.eventId).not.toBeUndefined();
    });

    it('should set date to start of the day', () => {
      const eventProps = {
        ...variableEventProps
      };

      const event = eventService.create(eventProps);

      const hours = event.date.getHours();
      const minutes = event.date.getMinutes();
      const seconds = event.date.getHours();
      const milliseconds = event.date.getMilliseconds();

      expect(hours).toBe(0);
      expect(minutes).toBe(0);
      expect(seconds).toBe(0);
      expect(milliseconds).toBe(0);
    });
  });

  describe('update', () => {
    it('should update event', () => {
      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000'
      };

      const updatedEventProps = {
        accountId: '00000000-0000-0000-0000-000000000000',
        date: startOfDay(subDays(mockedDate, 1)),
        name: 'New name',
        type: EventType.accountOperation,
        expression: '1'
      };

      const updatedEvent = eventService.update(event, updatedEventProps);

      expect(updatedEvent).toStrictEqual({ ...event, ...updatedEventProps });
    });

    it('should not update eventId', () => {
      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000'
      };

      const updatedEventProps = {
        eventId: 'updated-event-id'
      };

      // Let's test user input, not typing
      // eslint-disable-next-line
      // @ts-ignore
      const updatedEvent = eventService.update(event, updatedEventProps);

      expect(updatedEvent.eventId).toBe(event.eventId);
    });

    it('should set date to start of the day', () => {
      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000'
      };

      const updatedEventProps = {
        date: subDays(mockedDate, 1)
      };

      const updatedEvent = eventService.update(event, updatedEventProps);

      const hours = updatedEvent.date.getHours();
      const minutes = updatedEvent.date.getMinutes();
      const seconds = updatedEvent.date.getHours();
      const milliseconds = updatedEvent.date.getMilliseconds();

      expect(hours).toBe(0);
      expect(minutes).toBe(0);
      expect(seconds).toBe(0);
      expect(milliseconds).toBe(0);
    });
  });

  describe('validate', () => {
    it('should return undefined if account is valid', () => {
      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000'
      };

      const validationErros = eventService.validate(event, timelineVersion);

      expect(validationErros).toBeUndefined();
    });

    it('should return errors object if name is invalid', () => {
      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000',
        name: ''
      };

      const validationErros = eventService.validate(event, timelineVersion);

      expect(validationErros).toStrictEqual({
        name: 'validationErrors.event.name.invalid'
      });
    });

    it('should return errors object if type is invalid', () => {
      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000',
        // Let's test user input, not typing
        // eslint-disable-next-line
        // @ts-ignore
        type: 'invalid-event-type'
      };

      const validationErros = eventService.validate(event, timelineVersion);

      expect(validationErros).toStrictEqual({
        type: 'validationErrors.event.type.invalid'
      });
    });

    it('should return errors object if expression is invalid', () => {
      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000',
        expression: 'invalid expression'
      };

      const validationErros = eventService.validate(event, timelineVersion);

      expect(validationErros).toStrictEqual({
        expression: 'validationErrors.event.expression.invalid'
      });
    });

    it("should return errors object if accountId is set and account doesn't exists", () => {
      timelineVersion = {
        ...timelineVersion,
        accounts: []
      };

      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000',
        accountId: '00000000-0000-0000-0000-000000000000'
      };

      const validationErros = eventService.validate(event, timelineVersion);

      expect(validationErros).toStrictEqual({
        accountId: 'validationErrors.event.accountId.notFound'
      });
    });

    it('should return errors object if accountId is set and date is earlier than account start date', () => {
      const accountStartDate = mockedDate;

      timelineVersion = {
        ...timelineVersion,
        accounts: [
          {
            accountId: '00000000-0000-0000-0000-000000000000',
            name: 'Account name',
            startBalance: 0,
            startDate: accountStartDate
          }
        ]
      } as TimelineVersion;

      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000',
        accountId: '00000000-0000-0000-0000-000000000000',
        date: subDays(accountStartDate, 1)
      };

      const validationErros = eventService.validate(event, timelineVersion);

      expect(validationErros).toStrictEqual({
        date: {
          key: 'validationErrors.event.startDate.greaterThanAccountStartDate',
          params: { date: fullDateFormat(accountStartDate) }
        }
      });
    });

    it('should return errors object if accountId is not set and date is earlier than timelineVersion start date', () => {
      const timelineVersionStartDate = mockedDate;

      timelineVersion = {
        ...timelineVersion,
        startDate: timelineVersionStartDate,
        accounts: []
      };

      const event: Event = {
        ...variableEventProps,
        eventId: '00000000-0000-0000-0000-000000000000',
        date: subDays(timelineVersionStartDate, 1)
      };

      const validationErros = eventService.validate(event, timelineVersion);

      expect(validationErros).toStrictEqual({
        date: {
          key: 'validationErrors.event.startDate.greaterThanTimelineVersionStartDate',
          params: { date: fullDateFormat(timelineVersionStartDate) }
        }
      });
    });
  });
});
