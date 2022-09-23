import { ActionFunction, json, redirect } from '@remix-run/node';

import { renameTimelineVersion } from '~/domain/timelineVersion/useCases/renameTimelineVersion/renameTimelineVersion';
import { errorHandledRoute } from '~/utils/errors';
import { getFormDataObjectWithStringValues } from '~/utils/getFormDataObjectWithStringValues';
import { StatusCode } from '~/utils/statusCode';
import { isString } from '~/utils/validators';
import { timelineVersionPath } from '~/web/app/utils/paths';

const renameTimelineVersionActionFn: ActionFunction = async ({
  params,
  request
}) => {
  const formData = await request.formData();

  const formDataObjectWithStringValues =
    getFormDataObjectWithStringValues(formData);

  const { timelineVersionId } = params;

  if (!timelineVersionId) {
    throw new Response('Timeline version not found.', {
      status: StatusCode.NotFound
    });
  }

  const validationErrors = validateFormData(formDataObjectWithStringValues);

  if (validationErrors) {
    return json(validationErrors, { status: 400 });
  }

  const newTimelineVersion = await renameTimelineVersion(
    timelineVersionId,
    formDataObjectWithStringValues.name
  );

  return redirect(timelineVersionPath(newTimelineVersion.timelineVersionId));
};

export const renameTimelineVersionAction = errorHandledRoute(
  renameTimelineVersionActionFn
);

const validateFormData = (data: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!isString(data.name)) {
    errors.name = 'validationErrors.timelineVersion.name.invalid';
  }

  const hasErrors = !!Object.keys(errors).length;

  if (hasErrors) {
    return errors;
  }

  return;
};
