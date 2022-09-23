import { LoaderFunction } from '@remix-run/node';

import { getTimelines } from '../../../../domain/timeline/useCases/getTimelines/getTimelines';
import { errorHandledRoute } from '~/utils/errors';

const timelinesLoaderFn: LoaderFunction = async () => {
  const timelines = await getTimelines();

  return { timelines };
};

export const timelinesLoader = errorHandledRoute(timelinesLoaderFn);
