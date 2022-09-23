import { Account } from '../account/account';
import { Event } from '../event/event';

export interface TimelineVersionProps {
  accounts: Account[];
  createdAt: Date;
  events: Event[];
  name: string;
  startDate: Date;
  timelineId: string;
  timelineVersionId: string;
  updatedAt: Date;
}

export type VariableTimelineVersionProps = Omit<
  TimelineVersionProps,
  'timelineId' | 'timelineVersionId' | 'createdAt' | 'updatedAt'
>;

export type CreateTimelineVersionProps = Omit<
  TimelineVersionProps,
  'timelineVersionId' | 'createdAt' | 'updatedAt'
>;

export type TimelineVersion = Readonly<TimelineVersionProps>;

export const TimelineVersionFactory = (
  timelineVersionProps: TimelineVersionProps
) => {
  const timelineVersion: TimelineVersion = Object.freeze(timelineVersionProps);
  return timelineVersion;
};
