interface AccountProps {
  accountId: string;
  name: string;
  startBalance: number;
  startDate: Date;
  color: string;
}

export type VariableAccountProps = Omit<AccountProps, 'accountId'>;

export type Account = Readonly<AccountProps>;

export const AccountFactory = (accountProps: AccountProps) => {
  const account: Account = Object.freeze(accountProps);
  return account;
};
