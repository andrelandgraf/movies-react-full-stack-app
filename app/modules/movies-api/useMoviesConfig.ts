import { json } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { FilteredMoviesAPIConfiguration } from './movies-api.server';
import { fetchConfiguration } from './movies-api.server';

export async function loader() {
  const moviesConfig = await fetchConfiguration();
  return json(
    { moviesConfig },
    {
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      },
    }
  );
}

export function useMoviesConfig() {
  const data = useRouteLoaderData('root');
  invariant(
    data && typeof data === 'object' && 'moviesConfig' in data,
    'Missing moviesAPIConfig in root loader data'
  );
  return data.moviesConfig as FilteredMoviesAPIConfiguration;
}
