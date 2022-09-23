import { Form, useActionData, useOutletContext } from '@remix-run/react';

import { TimelineVersion } from '~/domain/timelineVersion/timelineVersion';
import { Button } from '~/web/app/components/Button';
import { Dialog } from '~/web/app/components/Dialog/Dialog';
import { DialogTitle } from '~/web/app/components/Dialog/DialogTitle';
import { FieldError } from '~/web/app/components/Form/FieldError';
import { Input } from '~/web/app/components/Form/Input';
import { Label } from '~/web/app/components/Form/Label';
import { LinkButton } from '~/web/app/components/LinkButton';
import { timelineVersionPath } from '~/web/app/utils/paths';

type ActionData = Record<string, string>;

interface ParentData {
  timelineVersion: TimelineVersion;
}

export const RenameTimelineVersion = () => {
  const errors = useActionData<ActionData>();

  const { timelineVersion } = useOutletContext<ParentData>();

  return (
    <Dialog closeUrl={timelineVersionPath(timelineVersion.timelineVersionId)}>
      <DialogTitle>Rename timeline</DialogTitle>

      <Form method="post">
        <div className="mb-4">
          <Label htmlFor="name">
            Name
            <FieldError>{errors?.name}</FieldError>
          </Label>

          <Input
            autoFocus
            defaultValue={timelineVersion.name}
            id="name"
            required
            name="name"
          />
        </div>

        <div>
          <Button type="submit">Rename timeline</Button>

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
