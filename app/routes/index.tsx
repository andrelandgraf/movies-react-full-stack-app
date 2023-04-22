import { MoviesOverview } from '../modules/movies-overview/movies-overview';

export {
  ErrorBoundary,
  loader,
} from '../modules/movies-overview/movies-overview';

export const config = { runtime: 'edge' };

export default function Component() {
  return (
    <main className="w-full p-2 lg:p-8">
      <div className="text-center mb-2 lg:mb-8">
        <h1 className="font-semibold text-xl lg:text-3xl">Full-Stack React</h1>
        <p className="text-sm">
          Built with Remix. Powered by the Movie DB API.
        </p>
      </div>
      <MoviesOverview />
    </main>
  );
}
