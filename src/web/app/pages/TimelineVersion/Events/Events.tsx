import { Link } from '@remix-run/react';

import { editEventPath, newEventPath } from '../../../utils/paths';
import { NoEvents } from './NoEvents';
import { Event } from '~/domain/event/event';
import { LinksList } from '~/web/app/components/LinksList';
import { SidebarSection } from '~/web/app/components/SidebarSection/SidebarSection';
import { SidebarSectionHeader } from '~/web/app/components/SidebarSection/SidebarSectionHeader';
import { SidebarSectionTitle } from '~/web/app/components/SidebarSection/SidebarSectionTitle';

interface EventsTabProps {
  events: Event[];
  timelineVersionId: string;
  search: string;
}

export const Events = ({
  events,
  timelineVersionId,
  search
}: EventsTabProps) => {
  const hasEvents = !!events.length;

  const filteredEvents = search
    ? events.filter(
        ({ name, expression }) =>
          name.toLowerCase().includes(search) ||
          expression.toLowerCase().includes(search)
      )
    : events;

  const hasFilteredEvents = !!filteredEvents.length;

  const eventsLink = filteredEvents.map((event) => ({
    url: editEventPath(timelineVersionId, event.eventId),
    content: event.name
  }));

  return (
    <SidebarSection className="mb-0">
      <SidebarSectionHeader>
        <SidebarSectionTitle>Planned events</SidebarSectionTitle>
        <Link
          to={newEventPath(timelineVersionId)}
          className="text-sm text-sky-900"
        >
          Add event
        </Link>
      </SidebarSectionHeader>

      {!hasEvents && (
        <NoEvents newEventPath={newEventPath(timelineVersionId)} />
      )}

      {hasEvents && !hasFilteredEvents && (
        <p className="ml-2 text-sm text-gray-500">No events found.</p>
      )}

      {hasFilteredEvents && <LinksList links={eventsLink} />}
    </SidebarSection>
  );
};
