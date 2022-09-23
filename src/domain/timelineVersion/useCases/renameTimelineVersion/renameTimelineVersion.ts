import { TimelinesVersionsRepositoryFactory } from '../../timelinesVersionsRepository';
import { createTimelineVersionAndUpdateTimelineLastVersionId } from '../../utils/createTimelineVersionAndUpdateTimelineLastVersionId';
import { NotFoundError } from '~/utils/errors';

export const renameTimelineVersion = async (
  timelineVersionId: string,
  name: string
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

  const { timelineVersionId: _, ...timelineVersionProps } = timelineVersion;

  const { timelineVersion: newTimelineVersion } =
    await createTimelineVersionAndUpdateTimelineLastVersionId({
      ...timelineVersionProps,
      name
    });

  return newTimelineVersion;
};
