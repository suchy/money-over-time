import { useLoaderData, Outlet } from '@remix-run/react';

import { Timeline } from '../../../../domain/timeline/timeline';
import { LinkButton } from '../../components/LinkButton';
import { newTimelinePath } from '../../utils/paths';
import { TimelinesList } from './TimelinesList';

export const Timelines = () => {
  const { timelines } = useLoaderData<{ timelines: Timeline[] }>();

  const hasTimelines = !!timelines.length;

  return (
    <>
      <div>
        <h1>Timelines</h1>

        <LinkButton to={newTimelinePath()}>Add timeline</LinkButton>

        {!hasTimelines && (
          <div>
            No timelines,{' '}
            <LinkButton to={newTimelinePath()}>Add timeline</LinkButton>
          </div>
        )}

        {hasTimelines && <TimelinesList timelines={timelines} />}

        {/* {formTimelineVersion && <CreateTimelineForm onClose={toggleForm} />} */}

        <Outlet />
      </div>
    </>
  );
};
