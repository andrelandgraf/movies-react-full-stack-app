import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { Movie } from '../movies-api/movies-api.server';
import { useMoviesImageProps } from '../movies-api/useMoviesBasePath';

type MovieCardProps = {
  movie?: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const imageProps = useMoviesImageProps(movie?.poster_path, 220);
  if (!movie) {
    return (
      <li className="flex flex-col w-[220px] items-center">
        <div className="relative">
          <div className="rounded-lg w-[220px] h-[330px] bg-gray-200 animate-pulse" />
        </div>
        <div className="mt-2">
          <div className="text-lg font-semibold bg-gray-200 animate-pulse w-[220px] h-6" />
          <div className="text-sm text-gray-500 bg-gray-200 animate-pulse w-[220px] h-4" />
        </div>
      </li>
    );
  }

  if (!imageProps) {
    return (
      <li className="flex flex-col w-[220px] items-center">
        <div className="relative">
          <div className="rounded-lg w-[220px] h-[330px] bg-gray-200 animate-pulse" />
        </div>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.release_date}</p>
        </div>
      </li>
    );
  }

  return (
    <li className="flex flex-col w-[220px] items-center">
      <div className="relative">
        <img
          className="rounded-lg w-[220px] h-[330px] object-cover"
          alt={movie.title}
          {...imageProps}
        />
        <div className="absolute top-0 right-0 bg-black bg-opacity-50 rounded-bl-lg rounded-tr-lg p-2">
          <span className="text-white text-sm">{movie.popularity} 🌟</span>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
      </div>
    </li>
  );
}

type MoviesGridProps = {
  children: ReactNode;
  movies: Movie[];
  className?: string;
  isLoading?: boolean;
};

export function MoviesGrid({
  children,
  isLoading,
  movies,
  className,
}: MoviesGridProps) {
  if (!isLoading && !movies.length) {
    return null;
  }
  return (
    <section className="w-full flex flex-col gap-4">
      {children}
      <ul
        className={clsx(
          'w-full flex-wrap flex flex-row justify-center gap-4',
          className
        )}
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <MovieCard key={index} />
            ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </ul>
    </section>
  );
}
