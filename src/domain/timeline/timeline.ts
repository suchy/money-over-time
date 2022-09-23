interface TimelineProps {
  timelineId: string;
  lastTimelineVersionId: string;
}

export type VariableTimelineProps = Omit<TimelineProps, 'timelineId'>;

export type Timeline = Readonly<TimelineProps>;

export const TimelineFactory = (timelineProps: TimelineProps) => {
  const timeline: Timeline = Object.freeze(timelineProps);
  return timeline;
};
