import { useOutletContext, useActionData, useParams } from '@remix-run/react';

import { TimelineVersion } from '../../../../../../domain/timelineVersion/timelineVersion';
import { deleteEventPath, timelineVersionPath } from '../../../../utils/paths';
import { AccountOperationEventForm } from '../AccountOperationEventForm';
import { Button } from '~/web/app/components/Button';
import { LinkButton } from '~/web/app/components/LinkButton';

export const EditEvent = () => {
  const { eventId } = useParams();

  const validationErrors = useActionData<Record<string, string>>();

  const { timelineVersion } = useOutletContext<{
    timelineVersion: TimelineVersion;
  }>();

  const event = timelineVersion.events.find(
    (event) => event.eventId === eventId
  );

  if (!eventId || !event) {
    throw new Error('Event not found.');
  }

  return (
    <AccountOperationEventForm
      errors={validationErrors}
      event={event}
      timelineVersion={timelineVersion}
      title={`Update event "${event.name}"`}
    >
      <div className="flex w-full flex-row justify-between">
        <div>
          <Button type="submit">Update event</Button>

          <LinkButton
            className="ml-3"
            to={timelineVersionPath(timelineVersion.timelineVersionId)}
          >
            Cancel
          </LinkButton>
        </div>

        <LinkButton
          to={deleteEventPath(timelineVersion.timelineVersionId, eventId)}
        >
          Delete
        </LinkButton>
      </div>
    </AccountOperationEventForm>
  );
};
