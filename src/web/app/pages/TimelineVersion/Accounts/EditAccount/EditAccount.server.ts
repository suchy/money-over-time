import { ActionFunction, json, redirect } from '@remix-run/node';

import { updateAccount } from '../../../../../../domain/account/useCases/updateAccount/updateAccount';
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

const editAccountActionFn: ActionFunction = async ({ request, params }) => {
  const { accountId, timelineVersionId } = params;

  if (!accountId) {
    throw new Response('Account not found.', { status: StatusCode.NotFound });
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
    return json(validationErrors, { status: 400 });
  }

  const { name, startBalance, startDate, color } =
    formDataObjectWithStringValues;

  const accountProps = {
    name,
    startBalance: Number(startBalance),
    startDate: new Date(startDate),
    color
  };

  const newTimelineVersion = await updateAccount(
    timelineVersionId,
    accountId,
    accountProps
  );

  return redirect(timelineVersionPath(newTimelineVersion.timelineVersionId));
};

export const editAccountAction = errorHandledRoute(editAccountActionFn);

const validateFormData = (data: Record<string, string>) => {
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

  return;
};
