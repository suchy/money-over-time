import { EventResult } from '../../../../../../domain/day/day';
import { EventResultItem } from './EventResultItem';

interface EventsResultsListProps {
  eventsResults: EventResult[];
}

export const EventsResultsList = ({
  eventsResults
}: EventsResultsListProps) => (
  <div>
    <h2 className="mb-4 text-center text-sm font-bold">
      The events of the day
    </h2>

    <div className="flex flex-col items-start">
      {eventsResults.map((eventResult, index) => (
        <EventResultItem
          eventResult={eventResult}
          key={eventResult.event.eventId}
        />
      ))}
    </div>
  </div>
);
