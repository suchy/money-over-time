import { Form } from '@remix-run/react';
import { ReactNode } from 'react';

import { Account } from '../../../../../domain/account/account';
import { TimelineVersion } from '../../../../../domain/timelineVersion/timelineVersion';
import { formatInputDate } from '../../../../../utils/date';
import { ValidationErrors } from '../../../../../utils/error';
import { Dialog } from '../../../components/Dialog/Dialog';
import { timelineVersionPath } from '../../../utils/paths';
import { DialogTitle } from '~/web/app/components/Dialog/DialogTitle';
import { FieldError } from '~/web/app/components/Form/FieldError';
import { Input } from '~/web/app/components/Form/Input';
import { Label } from '~/web/app/components/Form/Label';

interface AccountFormProps {
  account: Account;
  children: ReactNode;
  errors?: ValidationErrors<Account>;
  title: string;
  timelineVersion: TimelineVersion;
}

export const AccountForm = ({
  account,
  children,
  errors,
  timelineVersion,
  title
}: AccountFormProps) => {
  const minStartDate = formatInputDate(timelineVersion.startDate);

  return (
    <Dialog closeUrl={timelineVersionPath(timelineVersion.timelineVersionId)}>
      <DialogTitle>{title}</DialogTitle>

      <Form method="post">
        <div className="mb-4">
          <Label htmlFor="name">
            Name
            <FieldError>{errors?.name}</FieldError>
          </Label>

          <Input
            autoFocus
            defaultValue={account.name}
            id="name"
            required
            name="name"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="startBalance">
            Start balance
            <FieldError>{errors?.startBalance}</FieldError>
          </Label>

          <Input
            defaultValue={account.startBalance}
            id="startBalance"
            name="startBalance"
            required
            type="number"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="startDate">
            Start date
            <FieldError>{errors?.startDate}</FieldError>
          </Label>

          <Input
            defaultValue={formatInputDate(account.startDate)}
            id="startDate"
            min={minStartDate}
            name="startDate"
            required
            type="date"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="color">
            Color
            <FieldError>{errors?.color}</FieldError>
          </Label>

          <Input
            defaultValue={account.color}
            id="color"
            name="color"
            required
            type="color"
          />
        </div>

        {children}
      </Form>
    </Dialog>
  );
};
