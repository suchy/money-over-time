import { Form, useActionData } from '@remix-run/react';

import { formatInputDate } from '../../../../../utils/date';
import { timelinesPath } from '../../../utils/paths';
import { Button } from '~/web/app/components/Button';
import { Dialog } from '~/web/app/components/Dialog/Dialog';
import { DialogTitle } from '~/web/app/components/Dialog/DialogTitle';
import { FieldError } from '~/web/app/components/Form/FieldError';
import { Input } from '~/web/app/components/Form/Input';
import { Label } from '~/web/app/components/Form/Label';

interface ActionData {
  validationErrors: Record<string, string>;
}

export const NewTimeline = () => {
  const actionData = useActionData<ActionData>();

  const errors = actionData?.validationErrors;

  return (
    <Dialog closeUrl={timelinesPath()}>
      <DialogTitle>Create new timeline</DialogTitle>

      <Form method="post">
        <div className="mb-4">
          <Label htmlFor="name">
            Name
            <FieldError>{errors?.name}</FieldError>
          </Label>

          <Input autoFocus id="name" name="name" />
        </div>

        <div className="mb-4">
          <Label htmlFor="date">
            Start date
            <FieldError>{errors?.startDate}</FieldError>
          </Label>

          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={formatInputDate(new Date())}
          />
        </div>

        <div>
          <Button type="submit">Create timeline</Button>
        </div>
      </Form>
    </Dialog>
  );
};
