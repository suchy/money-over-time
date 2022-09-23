import { NotFoundError, ValidationFailedError } from '../../../../utils/errors';
import { TimelinesVersionsRepositoryFactory } from '../../../timelineVersion/timelinesVersionsRepository';
import { createTimelineVersionAndUpdateTimelineLastVersionId } from '../../../timelineVersion/utils/createTimelineVersionAndUpdateTimelineLastVersionId';
import { VariableAccountProps } from '../../account';
import { accountService } from '../../accountService/accountService';

export const updateAccount = async (
  timelineVersionId: string,
  accountId: string,
  accountProps: Partial<VariableAccountProps>
) => {
  const timelinesVersionsRepository = TimelinesVersionsRepositoryFactory();

  const timelineVersion = await timelinesVersionsRepository.findOneById(
    timelineVersionId
  );

  if (!timelineVersion) {
    throw new NotFoundError(`Timeline version not found.`, {
      timelineVersionId
    });
  }

  const {
    timelineVersionId: _,
    accounts,
    ...timelineVersionProps
  } = timelineVersion;

  const updatecAccounts = accounts.map((account) => {
    if (account.accountId !== accountId) {
      return account;
    }

    const updatedAccount = accountService.update(account, accountProps);

    const validationErrors = accountService.validate(
      updatedAccount,
      timelineVersion
    );

    if (validationErrors) {
      throw new ValidationFailedError(
        'Account is not valid.',
        validationErrors
      );
    }

    return updatedAccount;
  });

  const { timelineVersion: newTimelineVersion } =
    await createTimelineVersionAndUpdateTimelineLastVersionId({
      ...timelineVersionProps,
      accounts: updatecAccounts
    });

  return newTimelineVersion;
};
