import { NotFoundError } from '../../../../utils/errors';
import { TimelinesRepositoryFactory } from '../../timelinesRepository';

export const getTimeline = async (timelineId: string) => {
  const timelinesRepository = TimelinesRepositoryFactory();

  const timeline = await timelinesRepository.findOneById(timelineId);

  if (!timeline) {
    throw new NotFoundError('Timeline not found.', { timelineId });
  }

  return timeline;
};
