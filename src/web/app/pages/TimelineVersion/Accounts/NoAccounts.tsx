import { LinkButton } from '~/web/app/components/LinkButton';

interface NoAccountsProps {
  newAccountPath: string;
}

export const NoAccounts = ({ newAccountPath }: NoAccountsProps) => (
  <div className="ml-4 rounded-sm bg-white p-4">
    <div className="text-center">
      <h2 className="mb-3 font-bold">No accounts</h2>

      <p className="mb-3">No accounts</p>

      <LinkButton title="Add account" to={newAccountPath}>
        Add account
      </LinkButton>
    </div>
  </div>
);
