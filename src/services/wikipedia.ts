import axios from 'axios';
import { WikipediaSummary } from '../types/movie';

const WIKIPEDIA_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';

export const getWikipediaSummary = async (movieName: string): Promise<WikipediaSummary | null> => {
  try {
    const searchTitle = encodeURIComponent(movieName);
    const response = await axios.get<WikipediaSummary>(`${WIKIPEDIA_API}/${searchTitle}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Wikipedia summary:', error);
    return null;
  }
};
