import { TimelinesRepositoryFactory } from '../../timelinesRepository';

export const getTimelines = async () => {
  const timelinesRepository = TimelinesRepositoryFactory();

  const timelines = await timelinesRepository.findMany();

  return timelines;
};
