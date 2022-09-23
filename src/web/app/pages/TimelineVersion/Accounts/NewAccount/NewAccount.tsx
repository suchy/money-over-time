import { useOutletContext, useActionData } from '@remix-run/react';

import { AccountFactory } from '../../../../../../domain/account/account';
import { TimelineVersion } from '../../../../../../domain/timelineVersion/timelineVersion';
import { getRandomColor } from '../../../../../../utils/color';
import { timelineVersionPath } from '../../../../utils/paths';
import { AccountForm } from '../AccountForm';
import { Button } from '~/web/app/components/Button';
import { LinkButton } from '~/web/app/components/LinkButton';

export const NewAccount = () => {
  const validationErrors = useActionData<Record<string, string>>();

  const { timelineVersion } = useOutletContext<{
    timelineVersion: TimelineVersion;
  }>();

  return (
    <AccountForm
      account={emptyAccount}
      errors={validationErrors}
      timelineVersion={timelineVersion}
      title="Create new account"
    >
      <>
        <Button type="submit">Create new account</Button>

        <LinkButton
          className="ml-3"
          to={timelineVersionPath(timelineVersion.timelineVersionId)}
        >
          Cancel
        </LinkButton>
      </>
    </AccountForm>
  );
};

const emptyAccount = AccountFactory({
  accountId: '',
  name: '',
  startBalance: 0,
  startDate: new Date(),
  color: getRandomColor()
});
