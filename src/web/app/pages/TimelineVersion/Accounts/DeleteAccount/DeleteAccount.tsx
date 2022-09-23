import { useOutletContext, Form, useParams } from '@remix-run/react';

import { TimelineVersion } from '../../../../../../domain/timelineVersion/timelineVersion';
import { timelineVersionPath } from '../../../../utils/paths';
import { Button } from '~/web/app/components/Button';
import { Dialog } from '~/web/app/components/Dialog/Dialog';
import { DialogTitle } from '~/web/app/components/Dialog/DialogTitle';
import { LinkButton } from '~/web/app/components/LinkButton';

export const DeleteAccount = () => {
  const { accountId } = useParams();

  const { timelineVersion } = useOutletContext<{
    timelineVersion: TimelineVersion;
  }>();

  const account = timelineVersion.accounts.find(
    (account) => account.accountId === accountId
  );

  if (!accountId || !account) {
    throw new Error('Account not found.');
  }

  return (
    <Dialog closeUrl={timelineVersionPath(timelineVersion.timelineVersionId)}>
      <DialogTitle>Delete account "{account.name}"</DialogTitle>

      <Form method="post">
        <p className="mb-4">
          Are you sure to delete account <strong>"{account.name}"</strong> with
          all related events?
        </p>

        <div>
          <Button type="submit">Delete account with events</Button>

          <LinkButton
            className="ml-3"
            to={timelineVersionPath(timelineVersion.timelineVersionId)}
          >
            Cancel
          </LinkButton>
        </div>
      </Form>
    </Dialog>
  );
};
