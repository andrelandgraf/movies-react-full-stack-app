import { useRouteLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

export function useMoviesAPIKey(): string {
  const loaderData = useRouteLoaderData('root');
  invariant(
    loaderData && typeof loaderData === 'object',
    'root loader data required'
  );
  invariant(
    'apiKey' in loaderData && typeof loaderData.apiKey === 'string',
    'movies API key required'
  );
  return loaderData.apiKey;
}
