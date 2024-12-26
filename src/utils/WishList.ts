import { ref, computed, Ref, ComputedRef } from "vue";

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

export class WishList {
  private wishlist: Ref<Movie[]>;

  constructor() {
    this.wishlist = ref<Movie[]>(this.loadWishlist());
  }

  /**
   * Load wishlist data from localStorage
   * @returns {Movie[]} - The current wishlist for the logged-in user
   */
  private loadWishlist(): Movie[] {
    const userId = localStorage.getItem("Kakao-Token");
    if (!userId) {
      console.warn("로그인이 필요합니다.");
      return [];
    }

    const storedWishlist = localStorage.getItem(`movieWishlist_${userId}`);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  /**
   * Save the wishlist data to localStorage
   */
  private saveWishlist(): void {
    const userId = localStorage.getItem("Kakao-Token");
    if (!userId) {
      console.warn("로그인이 필요합니다. 위시리스트를 저장할 수 없습니다.");
      return;
    }

    localStorage.setItem(
      `movieWishlist_${userId}`,
      JSON.stringify(this.wishlist.value)
    );
  }

  /**
   * Add or remove a movie from the wishlist
   * @param {Movie} movie - The movie to toggle in the wishlist
   */
  toggleWishlist(movie: Movie): void {
    const index = this.wishlist.value.findIndex((item) => item.id === movie.id);

    if (index === -1) {
      // Add the movie to the wishlist
      this.wishlist.value.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path || "",
      });
    } else {
      // Remove the movie from the wishlist
      this.wishlist.value = this.wishlist.value.filter(
        (item) => item.id !== movie.id
      );
    }

    this.saveWishlist();
  }

  /**
   * Check if a movie is in the wishlist
   * @param {number} movieId - The ID of the movie to check
   * @returns {boolean} - True if the movie is in the wishlist
   */
  isInWishlist(movieId: number): boolean {
    return this.wishlist.value.some((item) => item.id === movieId);
  }

  /**
   * Get the current wishlist
   * @returns {Movie[]} - The current wishlist
   */
  getCurrentWishlist(): Movie[] {
    return this.wishlist.value;
  }

  /**
   * Reactive reference to the wishlist for computed properties
   * @returns {ComputedRef<Movie[]>} - Computed reference of the wishlist
   */
  get wishlist$(): ComputedRef<Movie[]> {
    return computed(() => this.wishlist.value);
  }
}

// Export an instance of WishList for shared use across components
export const wishListService = new WishList();
