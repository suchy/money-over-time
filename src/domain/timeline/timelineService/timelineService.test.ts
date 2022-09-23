import { Timeline, VariableTimelineProps } from '../timeline';
import { timelineService } from './timelineService';

describe('timelineService', () => {
  let variableTimelineProps: VariableTimelineProps;

  beforeEach(() => {
    variableTimelineProps = {};
  });

  describe('create', () => {
    it('should return timeline', () => {
      const timelineProps = {
        ...variableTimelineProps
      };

      const timeline = timelineService.create(timelineProps);

      const timelineKeys = Object.keys(timeline);

      expect(timelineKeys).toStrictEqual(['timelineId']);
    });

    it('should set timelineId', () => {
      const timelineProps = {
        ...variableTimelineProps
      };

      const timeline = timelineService.create(timelineProps);

      expect(timeline.timelineId).not.toBeUndefined();
    });
  });

  describe('update', () => {
    it('should not update timelineId', () => {
      const timeline: Timeline = {
        ...variableTimelineProps,
        timelineId: '00000000-0000-0000-0000-000000000000'
      };

      const updatedTimelineProps = {
        timelineId: 'updated-timeline-id'
      };

      // Let's test user input, not typing
      // eslint-disable-next-line
      // @ts-ignore
      const updatedTimeline = timelineService.update(
        timeline,
        updatedTimelineProps
      );

      expect(updatedTimeline.timelineId).toBe(timeline.timelineId);
    });
  });

  describe('validate', () => {
    it('should return undefined', () => {
      const timeline: Timeline = {
        ...variableTimelineProps,
        timelineId: '00000000-0000-0000-0000-000000000000'
      };

      const validationErrors = timelineService.validate(timeline);

      expect(validationErrors).toBeUndefined();
    });
  });
});
