import { ActionFunction, json, redirect } from '@remix-run/node';

import { createAccount } from '../../../../../../domain/account/useCases/createAccount/createAccount';
import {
  isDate,
  isNumber,
  isString,
  startsWith
} from '../../../../../../utils/validators';
import { timelineVersionPath } from '../../../../utils/paths';
import { errorHandledRoute } from '~/utils/errors';
import { getFormDataObjectWithStringValues } from '~/utils/getFormDataObjectWithStringValues';
import { StatusCode } from '~/utils/statusCode';

const newAccountActionFn: ActionFunction = async ({ request, params }) => {
  const { timelineVersionId } = params;

  if (!timelineVersionId) {
    throw new Response('Timeline version not found.', { status: 404 });
  }

  const formData = await request.formData();

  const formDataObjectWithStringValues =
    getFormDataObjectWithStringValues(formData);

  const validationErrors = validateFormData(formDataObjectWithStringValues);

  if (validationErrors) {
    return json({ validationErrors }, { status: StatusCode.BadRequest });
  }

  const { name, startBalance, startDate, color } =
    formDataObjectWithStringValues;

  const accountProps = {
    name,
    startBalance: Number(startBalance),
    startDate: new Date(startDate),
    color
  };

  const newTimelineVersion = await createAccount(
    timelineVersionId,
    accountProps
  );

  return redirect(timelineVersionPath(newTimelineVersion.timelineVersionId));
};

export const newAccountAction = errorHandledRoute(newAccountActionFn);

const validateFormData = (data: Record<string, FormDataEntryValue>) => {
  const errors: Record<string, string> = {};

  if (!isString(data.name)) {
    errors.name = 'validationErrors.account.name.invalid';
  }

  const isStartBalanceInvalid = [
    !isString(data.startBalance),
    !data.startBalance,
    !isNumber(Number(data.startBalance))
  ].includes(true);

  if (isStartBalanceInvalid) {
    errors.startBalance = 'validationErrors.account.startBalance.invalid';
  }

  const isStartDateInvalid = [
    !data.startDate,
    !isString(data.startDate),
    !isDate(new Date(data.startDate as string)) // TODO fix that type forcing
  ].includes(true);

  if (isStartDateInvalid) {
    errors.startDate = 'validationErrors.account.startDate.invalid';
  }

  const isColorInvalid = [
    !isString(data.color),
    !startsWith(data.color, '#')
  ].includes(true);

  if (isColorInvalid) {
    errors.color = 'validationErrors.account.color.invalid';
  }

  const hasErrors = !!Object.keys(errors).length;

  if (hasErrors) {
    return errors;
  }
};
