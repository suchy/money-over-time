import { useOutletContext, useActionData } from '@remix-run/react';

import { EventFactory, EventType } from '../../../../../../domain/event/event';
import { TimelineVersion } from '../../../../../../domain/timelineVersion/timelineVersion';
import { timelineVersionPath } from '../../../../utils/paths';
import { AccountOperationEventForm } from '../AccountOperationEventForm';
import { Button } from '~/web/app/components/Button';
import { LinkButton } from '~/web/app/components/LinkButton';

type ActionData = Record<string, string>;

interface ParentData {
  timelineVersion: TimelineVersion;
}

export const NewEvent = () => {
  const validationErrors = useActionData<ActionData>();

  const { timelineVersion } = useOutletContext<ParentData>();

  return (
    <AccountOperationEventForm
      errors={validationErrors}
      event={getEmptyEvent(timelineVersion)}
      timelineVersion={timelineVersion}
      title="Create new event"
    >
      <>
        <Button type="submit" className="mr-3">
          Create new event
        </Button>

        <LinkButton to={timelineVersionPath(timelineVersion.timelineVersionId)}>
          Cancel
        </LinkButton>
      </>
    </AccountOperationEventForm>
  );
};

const getEmptyEvent = ({ accounts, startDate }: TimelineVersion) =>
  EventFactory({
    accountId: accounts[0].accountId,
    date: startDate,
    name: '',
    eventId: '',
    type: EventType.accountOperation,
    expression: ''
  });
