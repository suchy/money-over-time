import { mockedDate, startOfDay, subDays } from '../../../utils/date';
import {
  TimelineVersion,
  VariableTimelineVersionProps
} from '../timelineVersion';
import { timelineVersionService } from './timelineVersionService';

describe('timelineVersionService', () => {
  let timelineVersionProps: VariableTimelineVersionProps;

  beforeEach(() => {
    timelineVersionProps = {
      name: 'Timeline version name',
      startDate: mockedDate,
      timelineId: '00000000-0000-0000-0000-000000000000',
      accounts: [],
      events: []
    } as any;
  });

  describe('create', () => {
    it('should return timelineVersion', () => {
      const timelineVersionProperties = {
        ...timelineVersionProps
      } as any;

      const timelineVersion = timelineVersionService.create(
        timelineVersionProperties
      );

      const timelineVersionKeys = Object.keys(timelineVersion);

      expect(timelineVersionKeys).toStrictEqual([
        'name',
        'startDate',
        'timelineId',
        'accounts',
        'events',
        'timelineVersionId'
      ]);
    });

    it('should set timelineVersionId', () => {
      const timelineVersionProperties = {
        ...timelineVersionProps
      } as any;

      const timelineVersion = timelineVersionService.create(
        timelineVersionProperties
      );

      expect(timelineVersion.timelineVersionId).not.toBeUndefined();
    });

    it('should set startDate to start of the day', () => {
      const timelineVersionProperties = {
        ...timelineVersionProps
      } as any;

      const timelineVersion = timelineVersionService.create(
        timelineVersionProperties
      );

      const hours = timelineVersion.startDate.getHours();
      const minutes = timelineVersion.startDate.getMinutes();
      const seconds = timelineVersion.startDate.getHours();
      const milliseconds = timelineVersion.startDate.getMilliseconds();

      expect(hours).toBe(0);
      expect(minutes).toBe(0);
      expect(seconds).toBe(0);
      expect(milliseconds).toBe(0);
    });
  });

  describe('update', () => {
    it('should update timelineVersion', () => {
      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: '00000000-0000-0000-0000-000000000000'
      } as TimelineVersion;

      const updateProps = {
        name: 'New name',
        startDate: startOfDay(subDays(mockedDate, 1)),
        accounts: [{}],
        events: [{}]
      } as any;

      const updatedTimelineVersion = timelineVersionService.update(
        timelineVersion,
        updateProps
      );

      expect(updatedTimelineVersion).toStrictEqual({
        ...timelineVersion,
        ...updateProps
      });
    });

    it('should not update timelineVersionId or timelineId', () => {
      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: '00000000-0000-0000-0000-000000000000'
      } as TimelineVersion;

      const updateProps = {
        name: 'New name',
        startDate: startOfDay(subDays(mockedDate, 1)),
        timelineVersionId: 'updated-timeline-version-id',
        timelineId: 'updated-timeline-id',
        accounts: [{}],
        events: [{}]
      } as any;

      const updatedTimelineVersion = timelineVersionService.update(
        timelineVersion,
        updateProps
      );

      expect(updatedTimelineVersion.timelineVersionId).toBe(
        timelineVersion.timelineVersionId
      );

      expect(updatedTimelineVersion.timelineId).toBe(
        timelineVersion.timelineId
      );
    });

    it('should set startDate to start of the day', () => {
      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: '00000000-0000-0000-0000-000000000000'
      } as TimelineVersion;

      const updateProps = {
        startDate: mockedDate
      } as any;

      const updatedTimelineVersion = timelineVersionService.update(
        timelineVersion,
        updateProps
      );

      const hours = updatedTimelineVersion.startDate.getHours();
      const minutes = updatedTimelineVersion.startDate.getMinutes();
      const seconds = updatedTimelineVersion.startDate.getHours();
      const milliseconds = updatedTimelineVersion.startDate.getMilliseconds();

      expect(hours).toBe(0);
      expect(minutes).toBe(0);
      expect(seconds).toBe(0);
      expect(milliseconds).toBe(0);
    });
  });

  describe('validate', () => {
    it('should return undefined if timelineVersion is valid', () => {
      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: '00000000-0000-0000-0000-000000000000'
      } as TimelineVersion;

      const validationErrors = timelineVersionService.validate(timelineVersion);

      expect(validationErrors).toBeUndefined();
    });

    it('should return errors object  if name is valid', () => {
      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: '00000000-0000-0000-0000-000000000000',
        name: ''
      } as TimelineVersion;

      const validationErrors = timelineVersionService.validate(timelineVersion);

      expect(validationErrors).toStrictEqual({
        name: 'validationErrors.timlineVersion.name.invalid'
      });
    });

    it('should return errors object  if timelineId is valid', () => {
      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: '00000000-0000-0000-0000-000000000000',
        timelineId: ''
      } as TimelineVersion;

      const validationErrors = timelineVersionService.validate(timelineVersion);

      expect(validationErrors).toStrictEqual({
        timelineId: 'validationErrors.timlineVersion.timelineId.invalid'
      });
    });

    it('should return errors object  if timelineVersionId is valid', () => {
      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: ''
      } as TimelineVersion;

      const validationErrors = timelineVersionService.validate(timelineVersion);

      expect(validationErrors).toStrictEqual({
        timelineVersionId:
          'validationErrors.timlineVersion.timelineVersionId.invalid'
      });
    });

    it('should return errors object  if any account is valid', () => {
      const invalidAccount = {};

      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: '00000000-0000-0000-0000-000000000000',
        accounts: [invalidAccount]
      } as TimelineVersion;

      const validationErrors = timelineVersionService.validate(timelineVersion);

      expect(validationErrors).toStrictEqual({
        accounts: 'validationErrors.timlineVersion.accounts.invalid'
      });
    });

    it('should return errors object  if any event is valid', () => {
      const invalidEvent = {};

      const timelineVersion = {
        ...timelineVersionProps,
        timelineVersionId: '00000000-0000-0000-0000-000000000000',
        events: [invalidEvent]
      } as TimelineVersion;

      const validationErrors = timelineVersionService.validate(timelineVersion);

      expect(validationErrors).toStrictEqual({
        events: 'validationErrors.timlineVersion.events.invalid'
      });
    });
  });
});
