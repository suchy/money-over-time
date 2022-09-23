import { Link } from '@remix-run/react';

import { editAccountPath, newAccountPath } from '../../../utils/paths';
import { NoAccounts } from './NoAccounts';
import { Account } from '~/domain/account/account';
import { LinksList } from '~/web/app/components/LinksList';
import { SidebarSection } from '~/web/app/components/SidebarSection/SidebarSection';
import { SidebarSectionHeader } from '~/web/app/components/SidebarSection/SidebarSectionHeader';
import { SidebarSectionTitle } from '~/web/app/components/SidebarSection/SidebarSectionTitle';

interface AccountsProps {
  timelineVersionId: string;
  accounts: Account[];
  search: string;
}

export const Accounts = ({
  accounts,
  timelineVersionId,
  search
}: AccountsProps) => {
  const hasAccounts = !!accounts.length;

  const filteredAccounts = search
    ? accounts.filter(({ name }) => name.toLowerCase().includes(search))
    : accounts;

  const hasFilteredAccounts = !!filteredAccounts.length;

  const accountsLinks = filteredAccounts.map((account) => ({
    url: editAccountPath(timelineVersionId, account.accountId),
    content: (
      <>
        {/* <span
          className={`mr-2 inline-block aspect-square w-3 rounded-sm`}
          style={{ background: account.color }}
        /> */}
        {account.name}
      </>
    )
  }));

  return (
    <SidebarSection className="">
      <SidebarSectionHeader>
        <SidebarSectionTitle>Accounts</SidebarSectionTitle>
        <Link
          to={newAccountPath(timelineVersionId)}
          className="text-sm text-sky-900"
        >
          Add account
        </Link>
      </SidebarSectionHeader>

      {!hasAccounts && (
        <NoAccounts newAccountPath={newAccountPath(timelineVersionId)} />
      )}

      {hasAccounts && !hasFilteredAccounts && (
        <p className="ml-2 text-sm text-gray-500">No accounts found.</p>
      )}

      {hasFilteredAccounts && <LinksList links={accountsLinks} />}
    </SidebarSection>
  );
};
