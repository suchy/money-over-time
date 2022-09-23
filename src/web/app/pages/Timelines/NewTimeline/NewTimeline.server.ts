import { ActionFunction, json, redirect } from '@remix-run/node';

import { createTimelineWithTimelineVersion } from '../../../../../domain/timeline/useCases/createTimelineWithTimelineVersion/createTimelineWithTimelineVersion';
import { isDate, isString } from '../../../../../utils/validators';
import { timelineVersionPath } from '../../../utils/paths';
import { errorHandledRoute } from '~/utils/errors';
import { getFormDataObjectWithStringValues } from '~/utils/getFormDataObjectWithStringValues';
import { StatusCode } from '~/utils/statusCode';

export const newTimelineActionFn: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const formDataObjectWithStringValues =
    getFormDataObjectWithStringValues(formData);

  const validationErrors = validateFormData(formDataObjectWithStringValues);

  if (validationErrors) {
    return json({ validationErrors }, { status: StatusCode.BadRequest });
  }

  const { name, startDate } = formDataObjectWithStringValues;

  const timelineProps = {};

  const timelineVersionProps = {
    accounts: [],
    events: [],
    name,
    startDate: new Date(startDate)
  };

  const { timeline } = await createTimelineWithTimelineVersion(
    timelineProps,
    timelineVersionProps
  );

  return redirect(timelineVersionPath(timeline.lastTimelineVersionId));
};

export const newTimelineAction = errorHandledRoute(newTimelineActionFn);

const validateFormData = (data: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!isString(data.name)) {
    errors.name = 'Name is invalid.';
  }

  const isStartDateInvalid = [
    !data.startDate,
    !isString(data.startDate),
    !isDate(new Date(data.startDate as string)) // TODO fix that type forcing
  ].includes(true);

  if (isStartDateInvalid) {
    errors.startDate = 'StartDate is invalid.';
  }

  const hasErrors = !!Object.keys(errors).length;

  if (hasErrors) {
    return errors;
  }
};
