import {
  addDays,
  addMonths,
  addWeeks,
  mockedDate
} from '../../../../../utils/date';
import { Event, EventInterval, EventType } from '../../../../event/event';
import { getEventRepetitions } from './getEventRepetitions';

describe('getEventRepetitions', () => {
  let event: Event;

  beforeEach(() => {
    event = {
      date: mockedDate,
      eventId: '00000000-0000-0000-0000-000000000000',
      name: 'Event name',
      type: EventType.accountOperation,
      expression: '10'
    } as Event;
  });

  it('should return array with one event if event is unrepeatable', () => {
    const endDate = addDays(event.date, 7);
    const repeadetEvent = getEventRepetitions(event, endDate);

    expect(repeadetEvent).toStrictEqual([event]);
  });

  describe('should return events array if event is repeatable', () => {
    it('by days', () => {
      const endDate = addDays(event.date, 3);

      const eventToRepeat = {
        ...event,
        repeat: {
          interval: EventInterval.day,
          intervalNumber: 2,
          endDate
        }
      } as Event;

      const eventRepetitions = getEventRepetitions(eventToRepeat, endDate);

      const expectedEventRepetitions = [
        eventToRepeat,
        { ...eventToRepeat, date: addDays(eventToRepeat.date, 2) }
      ];

      expect(eventRepetitions).toStrictEqual(expectedEventRepetitions);
    });

    it('by weeks', () => {
      const endDate = addWeeks(event.date, 3);

      const eventToRepeat = {
        ...event,
        repeat: {
          interval: EventInterval.week,
          intervalNumber: 2,
          endDate
        }
      } as Event;

      const eventRepetitions = getEventRepetitions(eventToRepeat, endDate);

      const expectedEventRepetitions = [
        eventToRepeat,
        { ...eventToRepeat, date: addWeeks(eventToRepeat.date, 2) }
      ];

      expect(eventRepetitions).toStrictEqual(expectedEventRepetitions);
    });

    it('by months', () => {
      const endDate = addMonths(event.date, 3);

      const eventToRepeat = {
        ...event,
        repeat: {
          interval: EventInterval.month,
          intervalNumber: 2,
          endDate
        }
      } as Event;

      const eventRepetitions = getEventRepetitions(eventToRepeat, endDate);

      const expectedEventRepetitions = [
        eventToRepeat,
        { ...eventToRepeat, date: addMonths(eventToRepeat.date, 2) }
      ];

      expect(eventRepetitions).toStrictEqual(expectedEventRepetitions);
    });
  });
});
