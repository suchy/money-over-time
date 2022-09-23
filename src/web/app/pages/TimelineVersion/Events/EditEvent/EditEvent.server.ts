import { ActionFunction, json, redirect } from '@remix-run/node';

import { EventInterval } from '../../../../../../domain/event/event';
import { updateEvent } from '../../../../../../domain/event/useCases/updateEvent/updateEvent';
import { isDate, isString } from '../../../../../../utils/validators';
import { timelineVersionPath } from '../../../../utils/paths';
import { errorHandledRoute } from '~/utils/errors';
import { getFormDataObjectWithStringValues } from '~/utils/getFormDataObjectWithStringValues';
import { StatusCode } from '~/utils/statusCode';

const editEventActionFn: ActionFunction = async ({ request, params }) => {
  const { eventId, timelineVersionId } = params;

  if (!eventId) {
    throw new Response('Event not found.', { status: StatusCode.NotFound });
  }

  if (!timelineVersionId) {
    throw new Response('Timeline version not found.', {
      status: StatusCode.NotFound
    });
  }

  const formData = await request.formData();

  const formDataObjectWithStringValues =
    getFormDataObjectWithStringValues(formData);

  const validationErrors = validateFormData(formDataObjectWithStringValues);

  if (validationErrors) {
    return json({ validationErrors }, { status: StatusCode.BadRequest });
  }

  const {
    accountId,
    date,
    expression,
    name,
    isRepetitive,
    repeatEndDate,
    repeatInterval,
    repeatIntervalNumber,
    repeatIsCustom
  } = formDataObjectWithStringValues;

  const repeat = getEventRepeat(
    isRepetitive,
    repeatInterval,
    repeatIsCustom,
    repeatIntervalNumber,
    repeatEndDate
  );

  const eventProps = {
    accountId,
    date: new Date(date),
    expression,
    name,
    repeat
  };

  const newTimelineVersion = await updateEvent(
    timelineVersionId,
    eventId,
    eventProps
  );

  return redirect(timelineVersionPath(newTimelineVersion.timelineVersionId));
};

export const editEventAction = errorHandledRoute(editEventActionFn);

const validateFormData = (data: Record<string, FormDataEntryValue>) => {
  const errors: Record<string, string> = {};

  if (!isString(data.name)) {
    errors.name = 'validationErrors.event.name.invalid';
  }

  if (!isString(data.expression)) {
    errors.expression = 'validationErrors.event.expression.invalid';
  }

  if (!isString(data.accountId)) {
    errors.accountId = 'validationErrors.event.accountId.invalid';
  }

  const isDateInvalid = [
    !data.date,
    !isString(data.date),
    !isDate(new Date(data.date as string)) // TODO fix that type forcing
  ].includes(true);

  if (isDateInvalid) {
    errors.date = 'validationErrors.account.date.invalid';
  }

  const eventIntervalValues = Object.keys(EventInterval);

  const isRepeatIntervalInvalid =
    typeof data.repeatInterval !== 'string' ||
    !eventIntervalValues.includes(data.repeatInterval);

  if (isRepeatIntervalInvalid) {
    errors.repeatInterval = 'RepeatInterval is not valid.';
  }

  const hasErrors = !!Object.keys(errors).length;

  if (hasErrors) {
    return errors;
  }

  return;
};

const getEventRepeat = (
  isRepetitive: string,
  repeatInterval: string,
  repeatIsCustom: string,
  repeatIntervalNumber: string,
  repeatEndDate: string
) => {
  if (isRepetitive !== 'true') {
    return;
  }

  return {
    interval: repeatInterval as EventInterval, // validation is done in validateFormData
    isCustom: repeatIsCustom === 'true',
    intervalNumber: Number(repeatIntervalNumber),
    endDate: repeatEndDate ? new Date(repeatEndDate) : undefined
  };
};
