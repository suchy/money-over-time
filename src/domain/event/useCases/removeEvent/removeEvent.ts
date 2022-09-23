import { NotFoundError } from '../../../../utils/errors';
import { TimelinesVersionsRepositoryFactory } from '../../../timelineVersion/timelinesVersionsRepository';
import { createTimelineVersionAndUpdateTimelineLastVersionId } from '../../../timelineVersion/utils/createTimelineVersionAndUpdateTimelineLastVersionId';

export const removeEvent = async (
  timelineVersionId: string,
  eventId: string
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

  const filteredEvents = events.filter((event) => event.eventId !== eventId);

  const { timelineVersion: newTimelineVersion } =
    await createTimelineVersionAndUpdateTimelineLastVersionId({
      ...timelineVersionProps,
      events: filteredEvents
    });

  return newTimelineVersion;
};
