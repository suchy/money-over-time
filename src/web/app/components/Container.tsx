export const Container = ({
  children,
  className = ''
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mx-auto w-full max-w-6xl px-4 ${className}`}>{children}</div>
);
