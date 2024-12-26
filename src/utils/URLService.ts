import axios from "axios";
import { Movie } from "@/type/type";

export class URLService {
  private readonly API_KEY = process.env.VUE_APP_TMDB_API_KEY;
  private readonly BASE_URL = process.env.VUE_APP_TMDB_BASE_URL;

  async fetchFeaturedMovie(): Promise<Movie> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=ko-KR`
      );
      return response.data.results[0] as Movie;
    } catch (error) {
      console.error("Error fetching featured movie:", error);
      throw error;
    }
  }

  getURL4PopularMovies(page = 1): string {
    return `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=ko-KR&page=${page}`;
  }

  getURL4ReleaseMovies(page = 2): string {
    return `${this.BASE_URL}/movie/now_playing?api_key=${this.API_KEY}&language=ko-KR&page=${page}`;
  }

  getURL4GenreMovies(genre: string, page = 1): string {
    return `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&with_genres=${genre}&language=ko-KR&page=${page}`;
  }
}

export const urlService = new URLService();
