import { NavLink } from '@remix-run/react';
import { ReactNode } from 'react';

interface LinksListProps {
  links: {
    url: string;
    content: ReactNode;
  }[];
  className?: string;
}

const baseClassName = 'flex items-center rounded-sm p-2 text-gray-700 text-sm';

const defaultClassName =
  baseClassName + ' hover:text-sky-900 group-hover:bg-sky-200';

const activeClassName = baseClassName + ' text-sky-900 bg-sky-200';

export const LinksList = ({ links, className = '' }: LinksListProps) => (
  <ul className={`${className}`}>
    {links.map((link) => (
      <li key={link.url} className="group">
        <NavLink
          to={link.url}
          className={({ isActive }) =>
            isActive ? activeClassName : defaultClassName
          }
        >
          {link.content}
        </NavLink>
      </li>
    ))}
  </ul>
);
