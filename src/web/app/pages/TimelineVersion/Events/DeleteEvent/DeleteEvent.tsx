import { useOutletContext, Form, useParams } from '@remix-run/react';

import { TimelineVersion } from '../../../../../../domain/timelineVersion/timelineVersion';
import { timelineVersionPath } from '../../../../utils/paths';
import { Button } from '~/web/app/components/Button';
import { Dialog } from '~/web/app/components/Dialog/Dialog';
import { DialogTitle } from '~/web/app/components/Dialog/DialogTitle';
import { LinkButton } from '~/web/app/components/LinkButton';

interface OutletContext {
  timelineVersion: TimelineVersion;
}

export const DeleteEvent = () => {
  const { eventId } = useParams();

  const { timelineVersion } = useOutletContext<OutletContext>();

  const event = timelineVersion.events.find(
    (event) => event.eventId === eventId
  );

  if (!eventId || !event) {
    throw new Error('Event not found.');
  }

  return (
    <Dialog closeUrl={timelineVersionPath(timelineVersion.timelineVersionId)}>
      <DialogTitle>Delete event "{event.name}"</DialogTitle>

      <Form method="post">
        <p className="mb-4">Are you sure to delete event "{event.name}"?</p>

        <div>
          <Button type="submit">Delete event</Button>

          <LinkButton
            className="ml-3"
            to={timelineVersionPath(timelineVersion.timelineVersionId)}
          >
            Cancel
          </LinkButton>
        </div>
      </Form>
    </Dialog>
  );
};
