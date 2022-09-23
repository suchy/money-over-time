import { NotFoundError, ValidationFailedError } from '../../../../utils/errors';
import { TimelinesVersionsRepositoryFactory } from '../../../timelineVersion/timelinesVersionsRepository';
import { createTimelineVersionAndUpdateTimelineLastVersionId } from '../../../timelineVersion/utils/createTimelineVersionAndUpdateTimelineLastVersionId';
import { VariableEventProps } from '../../event';
import { eventService } from '../../eventService/eventService';

export const createEvent = async (
  timelineVersionId: string,
  eventProps: VariableEventProps
) => {
  const timelinesVersionsRepository = TimelinesVersionsRepositoryFactory();

  const event = eventService.create(eventProps);

  const timelineVersion = await timelinesVersionsRepository.findOneById(
    timelineVersionId
  );

  if (!timelineVersion) {
    throw new NotFoundError(`Timeline version not found.`, {
      timelineVersionId
    });
  }

  const validationErrors = eventService.validate(event, timelineVersion);

  if (validationErrors) {
    throw new ValidationFailedError('Account is not valid.', validationErrors);
  }

  const {
    timelineVersionId: _,
    events,
    ...timelineVersionProps
  } = timelineVersion;

  const { timelineVersion: newTimelineVersion } =
    await createTimelineVersionAndUpdateTimelineLastVersionId({
      ...timelineVersionProps,
      events: [...events, event]
    });

  return newTimelineVersion;
};

// TODO add validation for timeline and timeline version
