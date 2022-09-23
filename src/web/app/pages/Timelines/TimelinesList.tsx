import { Link } from '@remix-run/react';

import { Timeline } from '../../../../domain/timeline/timeline';

interface TimelinesListProps {
  timelines: Timeline[];
}

export const TimelinesList = ({ timelines }: TimelinesListProps) => (
  <ul>
    {timelines.map((timeline) => (
      <li key={timeline.timelineId}>
        <Link to={`/timelines/${timeline.lastTimelineVersionId}`}>
          {timeline.timelineId}
        </Link>
      </li>
    ))}
  </ul>
);
