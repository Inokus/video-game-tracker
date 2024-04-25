type Category = 'backlog' | 'completed' | 'wishlist';

type Mode = 'auto' | 'manual';

type ErrorType = 'user' | 'internal';

type Game = {
  title: string;
  releaseDate: string;
  genres: string[];
  platforms: string[];
  summary: string;
  userRating: number;
  criticRating: number;
  coverUrl: string;
  category: Category;
  manualEntry: boolean;
};

type ResponseGame = {
  aggregated_rating?: number;
  category?: number;
  cover?: { id: number; url: string };
  first_release_date?: number;
  genres?: GenreOrPlatformResponse[];
  name: string;
  platforms?: GenreOrPlatformResponse[];
  rating?: number;
  summary?: string;
};

type ResponseGenreOrPlatform = {
  id: number;
  name: string;
};

export { Category, Mode, ErrorType, Game, ResponseGame, ResponseGenreOrPlatform };
