import { useOutletContext, useActionData, useParams } from '@remix-run/react';

import { TimelineVersion } from '../../../../../../domain/timelineVersion/timelineVersion';
import {
  deleteAccountPath,
  timelineVersionPath
} from '../../../../utils/paths';
import { AccountForm } from '../AccountForm';
import { Button } from '~/web/app/components/Button';
import { LinkButton } from '~/web/app/components/LinkButton';

interface OutletContext {
  timelineVersion: TimelineVersion;
}
export const EditAccount = () => {
  const { accountId } = useParams();

  const validationErrors = useActionData<Record<string, string>>();

  const { timelineVersion } = useOutletContext<OutletContext>();

  const account = timelineVersion.accounts.find(
    (account) => account.accountId === accountId
  );

  if (!accountId || !account) {
    throw new Error('Account not found.');
  }

  return (
    <AccountForm
      account={account}
      errors={validationErrors}
      timelineVersion={timelineVersion}
      title={`Update account "${account.name}"`}
    >
      <div className="flex flex-row justify-between">
        <div>
          <Button type="submit">Update account</Button>

          <LinkButton
            className="ml-3"
            to={timelineVersionPath(timelineVersion.timelineVersionId)}
          >
            Cancel
          </LinkButton>
        </div>

        <LinkButton
          to={deleteAccountPath(timelineVersion.timelineVersionId, accountId)}
        >
          Delete
        </LinkButton>
      </div>
    </AccountForm>
  );
};
