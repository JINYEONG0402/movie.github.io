import { ref, computed, Ref, ComputedRef } from "vue";

// Define a Movie interface
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

  // Load wishlist from localStorage
  private loadWishlist(): Movie[] {
    const storedWishlist = localStorage.getItem("movieWishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  // Save wishlist to localStorage
  private saveWishlist(): void {
    localStorage.setItem("movieWishlist", JSON.stringify(this.wishlist.value));
  }

  toggleWishlist(movie: Movie): void {
    const index = this.wishlist.value.findIndex((item) => item.id === movie.id);

    if (index === -1) {
      // Add the movie, ensuring poster_path and title are included
      this.wishlist.value.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path || "", // Default empty string if undefined
      });
    } else {
      // Remove the movie if it already exists
      this.wishlist.value = this.wishlist.value.filter(
        (item) => item.id !== movie.id
      );
    }

    this.saveWishlist();
  }
  // Check if a movie is in the wishlist
  isInWishlist(movieId: number): boolean {
    return this.wishlist.value.some((item) => item.id === movieId);
  }

  // Get the current wishlist as a reactive array
  getCurrentWishlist(): Movie[] {
    return this.wishlist.value;
  }

  // Get the wishlist as a computed property for reactive binding
  get wishlist$(): ComputedRef<Movie[]> {
    return computed(() => this.wishlist.value);
  }
}

// Export a singleton instance of the WishList class
export const wishListService = new WishList();
