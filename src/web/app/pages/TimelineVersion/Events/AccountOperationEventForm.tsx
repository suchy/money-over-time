import { Form } from '@remix-run/react';
import { ChangeEvent, ReactNode, useState } from 'react';

import { Account } from '../../../../../domain/account/account';
import { Event, EventType } from '../../../../../domain/event/event';
import { TimelineVersion } from '../../../../../domain/timelineVersion/timelineVersion';
import { formatInputDate } from '../../../../../utils/date';
import { ValidationErrors } from '../../../../../utils/error';
import { timelineVersionPath } from '../../../utils/paths';
import { EventRepeatForm } from './EventRepeatForm';
import { Dialog } from '~/web/app/components/Dialog/Dialog';
import { DialogTitle } from '~/web/app/components/Dialog/DialogTitle';
import { FieldError } from '~/web/app/components/Form/FieldError';
import { Label } from '~/web/app/components/Form/Label';
import { Input } from '~/web/app/components/Form/Input';

interface AccountOperationEventFormProps {
  timelineVersion: TimelineVersion;
  children: ReactNode;
  event: Event;
  errors: ValidationErrors<Event> | undefined;
  title: string;
}

export const AccountOperationEventForm = ({
  timelineVersion,
  children,
  event,
  errors,
  title
}: AccountOperationEventFormProps) => {
  const { accounts } = timelineVersion;

  const [selectedAccount, setSelectedAccount] = useState(
    getInitialSelectedAccount(event, accounts)
  );

  const hasMoreThanOneAccount = accounts.length > 1;

  const handleAccountIdChange = (formEvent: ChangeEvent<HTMLSelectElement>) => {
    const accountId = formEvent.target.value;

    const selectedAccount = accounts.find(
      (account) => account.accountId === accountId
    );

    if (!selectedAccount) {
      return;
    }

    setSelectedAccount(selectedAccount);
  };

  return (
    <Dialog closeUrl={timelineVersionPath(timelineVersion.timelineVersionId)}>
      <DialogTitle>{title}</DialogTitle>
      <Form method="post">
        <Input
          type="hidden"
          name="type"
          defaultValue={EventType.accountOperation}
        />

        <div className="mb-4">
          <Label htmlFor="name">
            Name
            <FieldError>{errors?.name}</FieldError>
          </Label>

          <Input
            autoFocus
            id="name"
            name="name"
            defaultValue={event.name}
            required
          />
        </div>

        {hasMoreThanOneAccount && (
          <div className="mb-4">
            <Label htmlFor="accountId">
              Account
              <FieldError>{errors?.accountId}</FieldError>
            </Label>

            <select
              id="accountId"
              name="accountId"
              required
              value={selectedAccount.accountId}
              onChange={handleAccountIdChange}
            >
              {accounts.map(({ accountId, name }) => (
                <option value={accountId} key={accountId}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        {!hasMoreThanOneAccount && (
          <Input
            type="hidden"
            name="accountId"
            defaultValue={event.accountId}
          />
        )}

        <div className="mb-4">
          <Label htmlFor="date">
            Date
            <FieldError>{errors?.date}</FieldError>
          </Label>

          <Input
            id="date"
            name="date"
            min={formatInputDate(selectedAccount.startDate)}
            type="date"
            required
            defaultValue={formatInputDate(event.date)}
          />
        </div>

        <div>
          <Label htmlFor="expression">
            Value
            <FieldError>{errors?.expression}</FieldError>
          </Label>

          <Input
            id="expression"
            name="expression"
            required
            defaultValue={event.expression}
          />
        </div>

        <EventRepeatForm
          event={event}
          eventRepeat={event.repeat}
          errors={errors?.repeat}
          // onEventRepeatChange={handleRepeatChange}
        />

        {children}
      </Form>
    </Dialog>
  );
};

const getInitialSelectedAccount = (event: Event, accounts: Account[]) => {
  const { accountId } = event;

  const account = accounts.find((account) => account.accountId === accountId);

  if (!account) {
    return accounts[0];
  }

  return account;
};
