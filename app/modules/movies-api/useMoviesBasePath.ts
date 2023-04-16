import { useQuery } from '@tanstack/react-query';
import type { ImgHTMLAttributes, SyntheticEvent } from 'react';
import { useRef } from 'react';
import type { MoviesAPIConfiguration } from './movies-api';
import { fetchConfiguration } from './movies-api';
import { useMoviesAPIKey } from './useAPIKey';

function findBestSize(
  widthSizes: string[], // ["w92", "w154", "w185", "w342", "w500", "w780", original]
  widthInPixels: number
): string {
  const widthBasedSizes = widthSizes.filter((size) => size[0] === 'w');
  const bestSize = widthBasedSizes.reduce((current, size) => {
    const sizeInPixels = parseInt(size.slice(1), 10);
    if (sizeInPixels >= widthInPixels) {
      return size;
    }
    return current;
  }, widthBasedSizes[0]);
  return bestSize;
}

export function useMoviesImageProps(
  path: string | undefined,
  widthInPixels: number
): ImgHTMLAttributes<HTMLImageElement> | null {
  const retries = useRef(0);
  const apiKey = useMoviesAPIKey();
  const query = useQuery<MoviesAPIConfiguration>({
    queryKey: ['moviesAPIConfiguration'],
    queryFn: () => fetchConfiguration(apiKey),
    staleTime: Infinity,
    useErrorBoundary: true,
  });
  if (!query.data || !path) {
    return null;
  }

  const {
    secure_base_url: baseUrl,
    poster_sizes: posterSizes,
    backdrop_sizes: backdropSizes,
  } = query.data.images;

  const bestPosterWidth = findBestSize(posterSizes, widthInPixels);
  const bestBackdropWidth = findBestSize(backdropSizes, widthInPixels);

  const widthPosterSizes = posterSizes.filter((size) => size[0] === 'w');
  const srcSet = widthPosterSizes
    .map((size) => `${baseUrl}${size}${path} ${size.slice(1)}w`)
    .join(', ');
  const sizes = widthPosterSizes
    .map((size) => `(max-width: ${size.slice(1)}px) ${size.slice(1)}px`)
    .join(', ');

  const backdropImage = `${baseUrl}${bestBackdropWidth}${path}`;
  return {
    src: `${baseUrl}${bestPosterWidth}${path}`,
    srcSet,
    sizes,
    onError: (event: SyntheticEvent<HTMLImageElement>) => {
      if (retries.current > 2) {
        return;
      }
      retries.current += 1;
      const img = event.currentTarget;
      img.src = backdropImage;
    },
    style: {
      backgroundImage: `url(${backdropImage})`,
      filter: 'blur(5px)',
    },
    onLoad: (event: SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      img.style.filter = 'none';
    },
  };
}
