import { ValidationFailedError } from '../../../../utils/errors';
import { TimelinesVersionsRepositoryFactory } from '../../../timelineVersion/timelinesVersionsRepository';
import { CreateTimelineVersionProps } from '../../../timelineVersion/timelineVersion';
import { timelineVersionService } from '../../../timelineVersion/timelineVersionService/timelineVersionService';
import { VariableTimelineProps } from '../../timeline';
import { timelineService } from '../../timelineService/timelineService';
import { TimelinesRepositoryFactory } from '../../timelinesRepository';

export const createTimelineWithTimelineVersion = async (
  timelineProps: Omit<
    VariableTimelineProps,
    'lastTimelineVersionId' | 'createdAt' | 'updatedAt'
  >,
  timelineVersionProps: Omit<CreateTimelineVersionProps, 'timelineId'>
) => {
  const timelinesRepository = TimelinesRepositoryFactory();
  const timelinesVersionsRepository = TimelinesVersionsRepositoryFactory();

  const timeline = timelineService.create({
    ...timelineProps,
    lastTimelineVersionId: ''
  });

  const timelineVersion = timelineVersionService.create({
    ...timelineVersionProps,
    timelineId: timeline.timelineId,
    accounts: [],
    events: []
  });

  const timelineWithLatestVersion = timelineService.update(timeline, {
    lastTimelineVersionId: timelineVersion.timelineVersionId
  });

  const timelineValidationErrors = timelineService.validate(
    timelineWithLatestVersion
  );

  if (timelineValidationErrors) {
    throw new ValidationFailedError(
      'Timeline is not valid.',
      timelineValidationErrors
    );
  }

  const timelineVersionValidationErrors =
    timelineVersionService.validate(timelineVersion);

  if (timelineVersionValidationErrors) {
    throw new ValidationFailedError(
      'Timeline version is not valid.',
      timelineVersionValidationErrors
    );
  }

  await Promise.all([
    timelinesRepository.insert(timelineWithLatestVersion),
    timelinesVersionsRepository.insert(timelineVersion)
  ]);

  return {
    timeline: timelineWithLatestVersion,
    timelineVersion
  };
};
