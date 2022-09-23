import { NotFoundError } from '../../../../utils/errors';
import { TimelinesVersionsRepositoryFactory } from '../../timelinesVersionsRepository';

export const getTimelineVersion = async (timelineVersionId: string) => {
  const timelinesVersionsRepository = TimelinesVersionsRepositoryFactory();

  const timelineVersion = await timelinesVersionsRepository.findOneById(
    timelineVersionId
  );

  if (!timelineVersion) {
    throw new NotFoundError('Timeline version not found.', {
      timelineVersionId
    });
  }

  return timelineVersion;
};
