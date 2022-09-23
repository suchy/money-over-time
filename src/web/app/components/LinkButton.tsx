import { Link } from '@remix-run/react';
import { RemixLinkProps } from '@remix-run/react/dist/components';

type LinkButtonProps = RemixLinkProps & React.RefAttributes<HTMLAnchorElement>;

export const LinkButton = ({
  children,
  className = '',
  ...props
}: LinkButtonProps) => (
  <Link className={`inline-block ${className}`} {...props}>
    {children}
  </Link>
);
