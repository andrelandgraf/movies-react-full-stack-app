import invariant from 'tiny-invariant';
import dotenv from 'dotenv';

dotenv.config();

export function getMoviesAPIKey(): string {
  const envApiKey: unknown = process.env.MOVIES_API_KEY;
  invariant(
    envApiKey && typeof envApiKey === 'string',
    'MOVIES_API_KEY key is required'
  );
  return envApiKey;
}
