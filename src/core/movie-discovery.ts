export interface Movie {
  title?: string;
  awards?: string;
  actors?: string[];
  country?: string;
  director?: string;
  genre?: string[];
  plot?: string;
  poster?: string;
  imdbRating?: number;
  imdbVotes?: number;
  imdbID?: string;
  language?: string;
  metascore?: string;
  rated?: string;
  released?: string;
  runtime?: string;
  type?: number;
  year?: number;
  folderAddress?: string;
}

export function discoverMovie(text: string): Promise<Movie> {
  return null;
}