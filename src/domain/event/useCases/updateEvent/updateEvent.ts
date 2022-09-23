import { NotFoundError, ValidationFailedError } from '../../../../utils/errors';
import { TimelinesVersionsRepositoryFactory } from '../../../timelineVersion/timelinesVersionsRepository';
import { createTimelineVersionAndUpdateTimelineLastVersionId } from '../../../timelineVersion/utils/createTimelineVersionAndUpdateTimelineLastVersionId';
import { VariableEventProps } from '../../event';
import { eventService } from '../../eventService/eventService';

export const updateEvent = async (
  timelineVersionId: string,
  eventId: string,
  eventProps: Partial<VariableEventProps>
) => {
  const timelinesVersionsRepository = TimelinesVersionsRepositoryFactory();

  const timelineVersion = await timelinesVersionsRepository.findOneById(
    timelineVersionId
  );

  if (!timelineVersion) {
    throw new NotFoundError(`Timeline version not found.`, {
      timelineVersionId
    });
  }

  const {
    timelineVersionId: _,
    events,
    ...timelineVersionProps
  } = timelineVersion;

  const updatedEvents = events.map((event) => {
    if (event.eventId !== eventId) {
      return event;
    }

    const updatedEvent = eventService.update(event, eventProps);

    const validationErrors = eventService.validate(
      updatedEvent,
      timelineVersion
    );

    if (validationErrors) {
      throw new ValidationFailedError('Event is not valid.', validationErrors);
    }

    return updatedEvent;
  });

  const { timelineVersion: newTimelineVersion } =
    await createTimelineVersionAndUpdateTimelineLastVersionId({
      ...timelineVersionProps,
      events: updatedEvents
    });

  return newTimelineVersion;
};
