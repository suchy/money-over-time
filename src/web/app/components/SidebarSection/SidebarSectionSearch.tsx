import { ChangeEvent, FormEvent } from 'react';

import { Input } from '../Form/Input';

interface SidebarSectionSearchProps {
  className?: string;
  initialSearch?: string;
  onSearch: (search: string) => void;
}

export const SidebarSectionSearch = ({
  className = '',
  initialSearch,
  onSearch
}: SidebarSectionSearchProps) => {
  const handleSubmit = (formEvent: FormEvent) => {
    formEvent.preventDefault();
  };

  const handleSearchChange = (formEvent: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = formEvent.target.value.toLowerCase();
    onSearch(searchQuery);
  };

  return (
    <form method="get" onSubmit={handleSubmit} className="mb-6">
      <label
        htmlFor="search"
        className={`mb-2 block text-sm font-semibold text-gray-500 ${className}`}
      >
        Search
      </label>

      <div className="flex flex-row">
        <Input
          type="search"
          className="flex-grow"
          onChange={handleSearchChange}
          defaultValue={initialSearch}
          name="search"
          id="search"
        />

        <button
          type="submit"
          className="h-9 bg-gray-700 px-3 text-sm leading-none text-gray-400"
        >
          Search
        </button>
      </div>
    </form>
  );
};
