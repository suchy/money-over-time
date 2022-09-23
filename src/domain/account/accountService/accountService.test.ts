import {
  fullDateFormat,
  mockedDate,
  startOfDay,
  subDays
} from '../../../utils/date';
import { TimelineVersion } from '../../timelineVersion/timelineVersion';
import { Account, VariableAccountProps } from '../account';
import { accountService } from './accountService';

describe('accountService', () => {
  let variableAccountProps: VariableAccountProps;
  let timelineVersion: TimelineVersion;

  beforeEach(() => {
    variableAccountProps = {
      name: 'Account name',
      startBalance: 0,
      startDate: mockedDate,
      color: '#000000'
    };

    timelineVersion = {
      name: 'Timeline version name',
      startDate: subDays(mockedDate, 7),
      timelineId: '00000000-0000-0000-0000-000000000000',
      timelineVersionId: '00000000-0000-0000-0000-000000000000',
      accounts: [],
      events: []
    };
  });

  describe('create', () => {
    it('should return account', () => {
      const accountProps = {
        ...variableAccountProps
      };

      const account = accountService.create(accountProps);

      const accountKeys = Object.keys(account);

      expect(accountKeys).toStrictEqual([
        'name',
        'startBalance',
        'startDate',
        'color',
        'accountId'
      ]);
    });

    it('should set accountId', () => {
      const accountProps = {
        ...variableAccountProps
      };

      const account = accountService.create(accountProps);

      expect(account.accountId).not.toBeUndefined();
    });

    it('should set startDate to start of the day', () => {
      const accountProps = {
        ...variableAccountProps
      };

      const account = accountService.create(accountProps);

      const hours = account.startDate.getHours();
      const minutes = account.startDate.getMinutes();
      const seconds = account.startDate.getHours();
      const milliseconds = account.startDate.getMilliseconds();

      expect(hours).toBe(0);
      expect(minutes).toBe(0);
      expect(seconds).toBe(0);
      expect(milliseconds).toBe(0);
    });
  });

  describe('update', () => {
    it('should update account', () => {
      const account: Account = {
        ...variableAccountProps,
        accountId: '00000000-0000-0000-0000-000000000000'
      };

      const updatedAccountProps = {
        name: 'New name',
        startBalance: 10,
        startDate: startOfDay(subDays(mockedDate, 1))
      };

      const updatedAccount = accountService.update(
        account,
        updatedAccountProps
      );

      expect(updatedAccount).toStrictEqual({
        ...account,
        ...updatedAccountProps
      });
    });

    it('should not update accountId', () => {
      const account: Account = {
        ...variableAccountProps,
        accountId: '00000000-0000-0000-0000-000000000000'
      };

      const updatedAccountProps = {
        accountId: 'updated-account-id'
      };

      const updatedAccount = accountService.update(
        account,
        // Let's test user input, not typing
        // eslint-disable-next-line
        // @ts-ignore
        updatedAccountProps
      );

      expect(updatedAccount.accountId).toBe(account.accountId);
    });

    it('should set startDate to start of the day', () => {
      const account: Account = {
        ...variableAccountProps,
        accountId: '00000000-0000-0000-0000-000000000000'
      };

      const updatedAccountProps = {
        startDate: subDays(mockedDate, 1)
      };

      const updatedAccount = accountService.update(
        account,
        updatedAccountProps
      );

      const hours = updatedAccount.startDate.getHours();
      const minutes = updatedAccount.startDate.getMinutes();
      const seconds = updatedAccount.startDate.getHours();
      const milliseconds = updatedAccount.startDate.getMilliseconds();

      expect(hours).toBe(0);
      expect(minutes).toBe(0);
      expect(seconds).toBe(0);
      expect(milliseconds).toBe(0);
    });
  });

  describe('validate', () => {
    it('should return undefined if account is valid', () => {
      const account: Account = {
        ...variableAccountProps,
        accountId: '00000000-0000-0000-0000-000000000000'
      };

      const validationErros = accountService.validate(account, timelineVersion);

      expect(validationErros).toBeUndefined();
    });

    it('should return errors object if accountId is invalid', () => {
      const account: Account = {
        ...variableAccountProps,
        accountId: ''
      };

      const validationErros = accountService.validate(account, timelineVersion);

      expect(validationErros).toStrictEqual({
        accountId: 'validationErrors.account.accountId.invalid'
      });
    });

    it('should return errors object if name is invalid', () => {
      const account: Account = {
        ...variableAccountProps,
        accountId: '00000000-0000-0000-0000-000000000000',
        name: ''
      };

      const validationErros = accountService.validate(account, timelineVersion);

      expect(validationErros).toStrictEqual({
        name: 'validationErrors.account.name.invalid'
      });
    });

    it('should return errors object if startDate is earlier than timelineVersion startDate', () => {
      timelineVersion = {
        ...timelineVersion,
        startDate: mockedDate
      };

      const account: Account = {
        ...variableAccountProps,
        accountId: '00000000-0000-0000-0000-000000000000',
        startDate: subDays(mockedDate, 1)
      };

      const validationErros = accountService.validate(account, timelineVersion);

      expect(validationErros).toStrictEqual({
        startDate: {
          key: 'validationErrors.account.startDate.greaterThanTimelineVersionStartDate',
          params: { date: fullDateFormat(timelineVersion.startDate) }
        }
      });
    });

    it('should return errors object if color is invalid', () => {
      const account: Account = {
        ...variableAccountProps,
        accountId: '00000000-0000-0000-0000-000000000000',
        color: ''
      };

      const validationErros = accountService.validate(account, timelineVersion);

      expect(validationErros).toStrictEqual({
        color: 'validationErrors.account.color.invalid'
      });
    });
  });
});
