export interface Genre {
  id: string;
  name: string;
}

export interface Movie {
  id: string;
  name: string;
  overview: string;
  genres: Genre[];
  score: number;
  votes: number;
  poster?: {
    small?: string;
    medium?: string;
  };
  releaseDate?: string;
}

export interface WikipediaSummary {
  title: string;
  extract: string;
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
}
