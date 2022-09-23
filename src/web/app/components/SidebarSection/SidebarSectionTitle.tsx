export const SidebarSectionTitle = ({
  children,
  className = ''
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-sm font-semibold text-gray-500 ${className}`}>
    {children}
  </h2>
);
