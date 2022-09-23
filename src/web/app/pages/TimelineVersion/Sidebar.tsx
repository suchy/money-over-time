import { useState } from 'react';

import { SidebarSectionSearch } from '../../components/SidebarSection/SidebarSectionSearch';
import { useQueryString } from '../../hooks/useQueryString';
import { Accounts } from './Accounts/Accounts';
import { Events } from './Events/Events';
import { Variables } from './Variables/Variables';
import { TimelineVersion } from '~/domain/timelineVersion/timelineVersion';

interface SidebarProps {
  timelineVersion: TimelineVersion;
  initialSearch?: string;
}

export const Sidebar = ({ timelineVersion }: SidebarProps) => {
  const { search: initialSearch } = useQueryString();

  const [search, setSearch] = useState(initialSearch);

  const { accounts, events, timelineVersionId } = timelineVersion;

  return (
    <>
      <SidebarSectionSearch onSearch={setSearch} />
      <Accounts
        accounts={accounts}
        timelineVersionId={timelineVersionId}
        search={search}
      />

      <Variables
        timelineVersionId={timelineVersionId}
        search={search}
        variables={[]}
      />

      <Events
        events={events}
        timelineVersionId={timelineVersionId}
        search={search}
      />
    </>
  );
};
