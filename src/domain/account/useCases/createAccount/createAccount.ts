import { NotFoundError, ValidationFailedError } from '../../../../utils/errors';
import { TimelinesVersionsRepositoryFactory } from '../../../timelineVersion/timelinesVersionsRepository';
import { createTimelineVersionAndUpdateTimelineLastVersionId } from '../../../timelineVersion/utils/createTimelineVersionAndUpdateTimelineLastVersionId';
import { VariableAccountProps } from '../../account';
import { accountService } from '../../accountService/accountService';

export const createAccount = async (
  timelineVersionId: string,
  accountProps: VariableAccountProps
) => {
  const timelinesVersionsRepository = TimelinesVersionsRepositoryFactory();

  const account = accountService.create(accountProps);

  const timelineVersion = await timelinesVersionsRepository.findOneById(
    timelineVersionId
  );

  if (!timelineVersion) {
    throw new NotFoundError(`Timeline version not found.`, {
      timelineVersionId
    });
  }

  const validationErrors = accountService.validate(account, timelineVersion);

  if (validationErrors) {
    throw new ValidationFailedError('Account is not valid.', validationErrors);
  }

  const {
    timelineVersionId: _,
    accounts,
    ...timelineVersionProps
  } = timelineVersion;

  const { timelineVersion: newTimelineVersion } =
    await createTimelineVersionAndUpdateTimelineLastVersionId({
      ...timelineVersionProps,
      accounts: [...accounts, account]
    });

  return newTimelineVersion;
};
