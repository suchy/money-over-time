import { FirebaseRepositoryFactory } from '../../infrastructure/firebase/repository';
import { Timeline } from './timeline';

export const TimelinesRepositoryFactory = () => {
  const timelinesRepository = FirebaseRepositoryFactory<Timeline>(
    'timelines',
    'timelineId'
  );

  return timelinesRepository;
};
