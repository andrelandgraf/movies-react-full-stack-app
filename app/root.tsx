import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import stylesheetPath from '~/tailwind.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getMoviesAPIKey } from './modules/movies-api/env.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheetPath },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  description:
    'A demo React full-stack application using Remix and the Movies Database API',
  viewport: 'width=device-width,initial-scale=1',
});

export function loader() {
  return { apiKey: getMoviesAPIKey() };
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
