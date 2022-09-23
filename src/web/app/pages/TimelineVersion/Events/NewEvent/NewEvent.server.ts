import { ActionFunction, json, redirect } from '@remix-run/node';

import { createEvent } from '../../../../../../domain/event/useCases/createEvent/createEvent';
import { isDate, isString } from '../../../../../../utils/validators';
import { timelineVersionPath } from '../../../../utils/paths';
import { EventInterval, EventType } from '~/domain/event/event';
import { errorHandledRoute } from '~/utils/errors';
import { getFormDataObjectWithStringValues } from '~/utils/getFormDataObjectWithStringValues';
import { StatusCode } from '~/utils/statusCode';

export const newEventActionFn: ActionFunction = async ({ request, params }) => {
  const { timelineVersionId } = params;

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
    type,
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
    repeat,
    type: type as EventType // validation is done before, in validateFormData
  };

  const newTimelineVersion = await createEvent(timelineVersionId, eventProps);

  return redirect(timelineVersionPath(newTimelineVersion.timelineVersionId));
};

export const newEventAction = errorHandledRoute(newEventActionFn);

const validateFormData = (data: Record<string, FormDataEntryValue>) => {
  const errors: Record<string, string> = {};

  if (!isString(data.name)) {
    errors.name = 'validationErrors.event.name.invalid';
  }

  if (!isString(data.type)) {
    errors.type = 'validationErrors.event.type.invalid';
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

  const eventTypesValues = Object.keys(EventType);

  const isTypeInvalid =
    typeof data.type !== 'string' || !eventTypesValues.includes(data.type);

  if (isTypeInvalid) {
    errors.repeatInterval = 'Type is not valid.';
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
