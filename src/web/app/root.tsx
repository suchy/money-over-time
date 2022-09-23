import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';

import styles from './styles/app.css';

export const meta: MetaFunction = () => {
  return { title: 'Money over time', description: 'Lorem ipsum dolor' };
};

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://rsms.me/inter/inter.css'
  },
  { rel: 'stylesheet', href: styles }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
