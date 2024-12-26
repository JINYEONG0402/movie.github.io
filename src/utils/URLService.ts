import axios from "axios";
import { Movie } from "@/type/type";

export class URLService {
  private readonly API_KEY = "fb2191b2c2e7923b7b79f8e3fa925043";

  async fetchFeaturedMovie(): Promise<Movie> {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=ko-KR`
      );
      return response.data.results[0] as Movie;
    } catch (error) {
      console.error("Error fetching featured movie:", error);
      throw error;
    }
  }

  getURL4PopularMovies(page = 1): string {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=ko-KR&page=${page}`;
  }

  getURL4ReleaseMovies(page = 2): string {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}&language=ko-KR&page=${page}`;
  }

  getURL4GenreMovies(genre: string, page = 1): string {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&with_genres=${genre}&language=ko-KR&page=${page}`;
  }
}

export const urlService = new URLService();
