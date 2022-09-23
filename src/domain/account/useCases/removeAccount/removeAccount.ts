import { NotFoundError } from '../../../../utils/errors';
import { TimelinesVersionsRepositoryFactory } from '../../../timelineVersion/timelinesVersionsRepository';
import { createTimelineVersionAndUpdateTimelineLastVersionId } from '../../../timelineVersion/utils/createTimelineVersionAndUpdateTimelineLastVersionId';

export const removeAccount = async (
  timelineVersionId: string,
  accountId: string
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
    events,
    ...timelineVersionProps
  } = timelineVersion;

  const filteredAccounts = accounts.filter(
    (account) => account.accountId !== accountId
  );

  const filteredAccountsIds = filteredAccounts.map(
    ({ accountId }) => accountId
  );

  const filteredEvents = events.filter((event) => {
    if (!event.accountId) {
      return true;
    }

    return filteredAccountsIds.includes(event.accountId);
  });

  const { timelineVersion: newTimelineVersion } =
    await createTimelineVersionAndUpdateTimelineLastVersionId({
      ...timelineVersionProps,
      accounts: filteredAccounts,
      events: filteredEvents
    });

  return newTimelineVersion;
};
