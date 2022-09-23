import { ActionFunction, redirect } from '@remix-run/node';

import { removeEvent } from '../../../../../../domain/event/useCases/removeEvent/removeEvent';
import { timelineVersionPath } from '../../../../utils/paths';
import { errorHandledRoute } from '~/utils/errors';
import { StatusCode } from '~/utils/statusCode';

const deleteEventActionFn: ActionFunction = async ({ params }) => {
  const { eventId, timelineVersionId } = params;

  if (!eventId) {
    throw new Response('Event not found.', { status: StatusCode.BadRequest });
  }

  if (!timelineVersionId) {
    throw new Response('Timeline version not found.', {
      status: StatusCode.BadRequest
    });
  }

  const newTimelineVersion = await removeEvent(timelineVersionId, eventId);

  return redirect(timelineVersionPath(newTimelineVersion.timelineVersionId));
};

export const deleteEventAction = errorHandledRoute(deleteEventActionFn);
