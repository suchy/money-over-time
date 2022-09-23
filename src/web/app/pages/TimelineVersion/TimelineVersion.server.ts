import { LoaderFunction } from '@remix-run/node';

import { getDays } from '../../../../domain/day/useCases/getDays/getDays';
// import { getTimeline } from '../../../../domain/timeline/useCases/getTimeline/getTimeline';
import { getTimelineVersion } from '../../../../domain/timelineVersion/useCases/getTimelineVersion/getTimelineVersion';
import {
  addMonths,
  addQuarters,
  addWeeks,
  addYears
} from '../../../../utils/date';
import { EventInterval } from '~/domain/event/event';
import { errorHandledRoute } from '~/utils/errors';

const timelineVersionLoaderFn: LoaderFunction = async ({ params, request }) => {
  const { timelineVersionId } = params;

  if (!timelineVersionId) {
    throw new Response('Timeline version not found.', { status: 404 });
  }

  const timelineVersion = await getTimelineVersion(timelineVersionId);

  // TODO check permissions etc.
  // await getTimeline(timelineVersion.timelineId);

  const url = new URL(request.url);

  const { from, interval: intervalParam } = Object.fromEntries(
    url.searchParams.entries()
  );

  const startDate = from ? new Date(from) : timelineVersion.startDate;

  const interval = Object.keys(EventInterval).includes(intervalParam)
    ? (intervalParam as EventInterval)
    : EventInterval.month;

  const endDate = getEndDate(startDate, interval);

  const days = getDays(timelineVersion, startDate, endDate);

  return { timelineVersion, days, interval, startDate };
};

export const timelineVersionLoader = errorHandledRoute(timelineVersionLoaderFn);

const getEndDate = (startDate: Date, interval: EventInterval) => {
  let add = addMonths;

  if (interval === EventInterval.week) {
    add = addWeeks;
  }

  if (interval === EventInterval.month) {
    add = addMonths;
  }

  if (interval === EventInterval.quarter) {
    add = addQuarters;
  }

  if (interval === EventInterval.year) {
    add = addYears;
  }

  const endDate = add(startDate, 1);

  return endDate;
};
