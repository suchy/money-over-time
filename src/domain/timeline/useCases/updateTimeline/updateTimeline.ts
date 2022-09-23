import { VariableTimelineProps } from '../../timeline';
import { timelineService } from '../../timelineService/timelineService';
import { TimelinesRepositoryFactory } from '../../timelinesRepository';

interface UpdateTimelineProps {
  timelineId: string;
  timelineProps: Partial<VariableTimelineProps>;
}

export const updateTimeline = async ({
  timelineId,
  timelineProps
}: UpdateTimelineProps) => {
  const timelinesRepository = TimelinesRepositoryFactory();

  const timeline = await timelinesRepository.findOneById(timelineId);

  if (!timeline) {
    throw new Error(`Timeline ${timelineId} not found.`);
  }

  const updatedTimeline = timelineService.update(timeline, timelineProps);

  const validationErrors = timelineService.validate(updatedTimeline);

  if (validationErrors) {
    throw validationErrors;
  }

  const savedTimeline = await timelinesRepository.update(updatedTimeline);

  return savedTimeline;
};
