import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { fetchMovies } from '../movies-api/movies-api.server';
import { MoviesGrid } from './movies-grid';

export async function loader() {
  const [popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies] =
    await Promise.all([
      fetchMovies('popular'),
      fetchMovies('now_playing'),
      fetchMovies('top_rated'),
      fetchMovies('upcoming'),
    ]);
  return json(
    {
      popularMovies,
      nowPlayingMovies,
      topRatedMovies,
      upcomingMovies,
    },
    {
      headers: {
        'Cache-Control': 'private, max-age=600, stale-while-revalidate=300',
      },
    }
  );
}

export function MoviesOverview() {
  const { popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies } =
    useLoaderData<typeof loader>();
  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8">
      <MoviesGrid movies={popularMovies}>
        <h2 className="text-center text-xl lg:text-2xl font-semibold">
          Popular Movies
        </h2>
      </MoviesGrid>
      <MoviesGrid movies={nowPlayingMovies}>
        <h2 className="text-center text-xl lg:text-2xl font-semibold">
          Now Playing
        </h2>
      </MoviesGrid>
      <MoviesGrid movies={topRatedMovies}>
        <h2 className="text-center text-xl lg:text-2xl font-semibold">
          Top Rated Movies
        </h2>
      </MoviesGrid>
      <MoviesGrid movies={upcomingMovies}>
        <h2 className="text-center text-xl lg:text-2xl font-semibold">
          Upcoming Movies
        </h2>
      </MoviesGrid>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center justify-center m-2 md:m-4 lg:m-8 gap-4 lg:gap-8">
      <h1 className="font-semibold text-xl lg:text-3xl">Error</h1>
      <p className="text-lg">
        Something went wrong while fetching movies. Please try again later.
      </p>
    </div>
  );
}
