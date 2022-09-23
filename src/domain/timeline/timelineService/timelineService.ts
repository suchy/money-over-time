import { createId } from '../../../utils/createId';
import { Timeline, TimelineFactory, VariableTimelineProps } from '../timeline';

export const timelineService = {
  create(timelineProps: VariableTimelineProps) {
    const newTimelineProps = {
      ...timelineProps,
      timelineId: createId()
    };

    const timeline = TimelineFactory(newTimelineProps);
    return timeline;
  },

  update(timeline: Timeline, timelineProps: Partial<VariableTimelineProps>) {
    // Make sure accountId is no updated
    // eslint-disable-next-line
    // @ts-ignore
    const { timelineId, ...variableTimelineProps } = timelineProps;

    const updatedTimelineProps = {
      ...timeline,
      ...variableTimelineProps
    };

    const updatedTimeline = TimelineFactory(updatedTimelineProps);
    return updatedTimeline;
  },

  validate: (timeline: Timeline) => undefined
};
