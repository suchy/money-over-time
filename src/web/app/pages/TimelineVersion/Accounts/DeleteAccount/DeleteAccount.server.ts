import { ActionFunction, redirect } from '@remix-run/node';

import { removeAccount } from '~/domain/account/useCases/removeAccount/removeAccount';
import { errorHandledRoute } from '~/utils/errors';
import { StatusCode } from '~/utils/statusCode';
import { timelineVersionPath } from '~/web/app/utils/paths';

const deleteAccountActionFn: ActionFunction = async ({ params }) => {
  const { accountId, timelineVersionId } = params;

  if (!accountId) {
    throw new Response('Account not found.', { status: StatusCode.NotFound });
  }

  if (!timelineVersionId) {
    throw new Response('Timeline version not found.', {
      status: StatusCode.NotFound
    });
  }

  const newTimelineVersion = await removeAccount(timelineVersionId, accountId);

  return redirect(timelineVersionPath(newTimelineVersion.timelineVersionId));
};

export const deleteAccountAction = errorHandledRoute(deleteAccountActionFn);
