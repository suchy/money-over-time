export const SidebarSectionHeader = ({
  children,
  className = ''
}: React.HTMLAttributes<HTMLHeadElement>) => (
  <header
    className={`mb-2 flex flex-row items-center justify-between${className}`}
  >
    {children}
  </header>
);
