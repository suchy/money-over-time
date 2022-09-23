import { createId } from '../../../utils/createId';
import { startOfDay } from '../../../utils/date';
import { ValidationErrors } from '../../../utils/error';
import { isColor, isDate, isString } from '../../../utils/validators';
import { TimelineVersion } from '../../timelineVersion/timelineVersion';
import { Account, AccountFactory, VariableAccountProps } from '../account';

export const accountService = {
  create(accountProps: VariableAccountProps) {
    const newAccountProps = {
      ...accountProps,
      accountId: createId(),
      startDate: startOfDay(accountProps.startDate)
    };

    const account = AccountFactory(newAccountProps);
    return account;
  },

  update(account: Account, accountProps: Partial<VariableAccountProps>) {
    // Make sure accountId is no updated
    // eslint-disable-next-line
    // @ts-ignore
    const { accountId, ...variableAccountProps } = accountProps;

    const updatedAccountProps = {
      ...account,
      ...variableAccountProps
    };

    updatedAccountProps.startDate = startOfDay(updatedAccountProps.startDate);

    const updatedAccount = AccountFactory(updatedAccountProps);

    return updatedAccount;
  },

  validate(account: Account, timelineVersion: TimelineVersion) {
    const errors: ValidationErrors<Account> = {};

    if (!isString(account.accountId) || !account.accountId) {
      errors.accountId = 'AccountId is invalid.';
    }

    if (!isString(account.name) || !account.name) {
      errors.name = 'Name is invalid.';
    }

    if (!isDate(account.startDate)) {
      errors.startDate = 'StartDate is invalid.';
    }

    if (
      isDate(account.startDate) &&
      account.startDate < timelineVersion.startDate
    ) {
      errors.startDate = `StartDate can't be lower than ${timelineVersion.startDate}.`;
    }

    if (!isString(account.color) || !isColor(account.color)) {
      errors.color = 'Color is invalid.';
    }

    const hasErrors = !!Object.entries(errors).length;

    if (hasErrors) {
      return errors;
    }
  }
};
