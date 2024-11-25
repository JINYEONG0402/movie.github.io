import { ref, computed } from "vue";

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

class WishList {
  private wishlist = ref<Movie[]>(this.loadWishlist());

  // Computed property to get the wishlist as a reactive state
  get wishlist$() {
    return computed(() => this.wishlist.value);
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

  // Toggle movie in the wishlist
  toggleWishlist(movie: Movie): void {
    const currentWishlist = this.wishlist.value;
    const index = currentWishlist.findIndex((item) => item.id === movie.id);

    if (index === -1) {
      // Add the movie if it does not exist
      this.wishlist.value = [...currentWishlist, movie];
    } else {
      // Remove the movie if it already exists
      this.wishlist.value = currentWishlist.filter(
        (item) => item.id !== movie.id
      );
    }

    this.saveWishlist();
  }

  // Check if a movie is in the wishlist
  isInWishlist(movieId: number): boolean {
    return this.wishlist.value.some((item) => item.id === movieId);
  }

  // Get the current wishlist
  getCurrentWishlist(): Movie[] {
    return this.wishlist.value;
  }
}

// Export an instance of the WishList class
export const wishListService = new WishList();
