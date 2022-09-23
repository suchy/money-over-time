import { NotFoundError, ValidationFailedError } from '../../../utils/errors';
import { timelineService } from '../../timeline/timelineService/timelineService';
import { TimelinesRepositoryFactory } from '../../timeline/timelinesRepository';
import { TimelinesVersionsRepositoryFactory } from '../timelinesVersionsRepository';
import { CreateTimelineVersionProps } from '../timelineVersion';
import { timelineVersionService } from '../timelineVersionService/timelineVersionService';

export const createTimelineVersionAndUpdateTimelineLastVersionId = async (
  timelineVersionProps: CreateTimelineVersionProps
) => {
  const timelinesVersionsRepository = TimelinesVersionsRepositoryFactory();
  const timelinesRepository = TimelinesRepositoryFactory();

  const timeline = await timelinesRepository.findOneById(
    timelineVersionProps.timelineId
  );

  if (!timeline) {
    throw new NotFoundError(`Timeline not found.`, {
      timelineId: timelineVersionProps.timelineId
    });
  }

  const newTimelineVersion =
    timelineVersionService.create(timelineVersionProps);

  const timelineVersionValidationErrors =
    timelineVersionService.validate(newTimelineVersion);

  if (timelineVersionValidationErrors) {
    throw new ValidationFailedError(
      'Timeline version is not valid.',
      timelineVersionValidationErrors
    );
  }

  const updatedTimeline = timelineService.update(timeline, {
    lastTimelineVersionId: newTimelineVersion.timelineVersionId
  });

  const timelineValidationErrors = timelineService.validate(updatedTimeline);

  if (timelineValidationErrors) {
    throw new ValidationFailedError(
      'Timeline is not valid.',
      timelineValidationErrors
    );
  }

  await Promise.all([
    timelinesVersionsRepository.insert(newTimelineVersion),
    timelinesRepository.update(updatedTimeline)
  ]);

  return { timeline: updatedTimeline, timelineVersion: newTimelineVersion };
};
