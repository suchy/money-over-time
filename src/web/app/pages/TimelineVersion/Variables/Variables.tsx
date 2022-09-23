import { Link } from '@remix-run/react';

import { LinksList } from '~/web/app/components/LinksList';
import { SidebarSection } from '~/web/app/components/SidebarSection/SidebarSection';
import { SidebarSectionHeader } from '~/web/app/components/SidebarSection/SidebarSectionHeader';
import { SidebarSectionTitle } from '~/web/app/components/SidebarSection/SidebarSectionTitle';

interface VariablesProps {
  timelineVersionId: string;
  search: string;
  variables: any[];
}

export const Variables = ({
  timelineVersionId,
  search,
  variables
}: VariablesProps) => {
  const hasVariables = !!variables.length;

  const filteredVariables = search
    ? variables.filter(({ name }) => name.toLowerCase().includes(search))
    : variables;

  const hasFilteredVariables = !!filteredVariables.length;

  const variablesLinks = filteredVariables.map((variable) => ({
    url: '#',
    content: variable.name
  }));

  return (
    <SidebarSection>
      <SidebarSectionHeader>
        <SidebarSectionTitle>Variables</SidebarSectionTitle>
        <Link to="#" className="text-sm text-sky-900">
          Add variable
        </Link>
      </SidebarSectionHeader>

      {!hasVariables && (
        <p className="ml-2 text-sm text-gray-500">No viarables found.</p>
      )}

      {hasVariables && !hasFilteredVariables && (
        <p className="ml-2 text-sm text-gray-500">No viarables found.</p>
      )}

      {hasFilteredVariables && <LinksList links={variablesLinks} />}
    </SidebarSection>
  );
};
