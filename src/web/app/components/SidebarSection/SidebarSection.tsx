export const SidebarSection = ({
  children,
  className = ''
}: React.HTMLAttributes<HTMLElement>) => (
  <section className={`mb-6 ${className}`}>{children}</section>
);
