const baseUrl = 'https://api.themoviedb.org/3';

type ErrorResponse = {
  status_code: number;
  status_message: string;
  success: false;
};

function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    !!data &&
    typeof data === 'object' &&
    'status_code' in data &&
    'status_message' in data
  );
}

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MoviesData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

function isMoviesData(data: unknown): data is MoviesData {
  return (
    !!data &&
    typeof data === 'object' &&
    'results' in data &&
    Array.isArray(data.results)
  );
}

export type Endpoint = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

export async function fetchMovies(
  endpoint: Endpoint,
  apiKey: string,
  languageCode = 'en-US'
): Promise<Movie[]> {
  const url = `${baseUrl}/movie/${endpoint}?api_key=${apiKey}&language=${languageCode}`;
  const response = await fetch(url);
  const data = await response.json();
  if (isErrorResponse(data)) {
    throw new Error(`${data.status_code}: ${data.status_message}`);
  }
  if (!isMoviesData(data)) {
    console.error(url, data);
    throw new Error('Unexpected response');
  }
  return data.results;
}

export type MoviesAPIConfiguration = {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
};

function isMoviesAPIConfiguration(
  data: unknown
): data is MoviesAPIConfiguration {
  return (
    !!data &&
    typeof data === 'object' &&
    'images' in data &&
    !!data.images &&
    typeof data.images === 'object' &&
    'base_url' in data.images &&
    typeof data.images.base_url === 'string'
  );
}

export async function fetchConfiguration(
  apiKey: string
): Promise<MoviesAPIConfiguration> {
  const response = await fetch(`${baseUrl}/configuration?api_key=${apiKey}`);
  const data = await response.json();
  if (isErrorResponse(data)) {
    throw new Error(`${data.status_code}: ${data.status_message}`);
  }
  if (!isMoviesAPIConfiguration(data)) {
    throw new Error('Unexpected response');
  }
  return data;
}

type LanguageObject = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

function isLanguageArray(data: unknown): data is LanguageObject[] {
  return (
    !!data &&
    Array.isArray(data) &&
    data.every(
      (item) =>
        !!item &&
        typeof item === 'object' &&
        'english_name' in item &&
        'iso_639_1' in item &&
        'name' in item
    )
  );
}

export async function fetchLanguageCodes(apiKey: string): Promise<string[]> {
  const response = await fetch(
    `${baseUrl}/configuration/languages?api_key=${apiKey}`
  );
  const data = await response.json();
  if (isErrorResponse(data)) {
    throw new Error(`${data.status_code}: ${data.status_message}`);
  }
  if (!isLanguageArray(data)) {
    throw new Error('Unexpected response');
  }
  return data.map((item) => item.iso_639_1);
}
