import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favoriteQuantities: [],
  }),
  actions: {
    setFavoriteQuantities(selectedProduct, quantity) {
      const index = this.favoriteQuantities.findIndex(
        (item) => item.product_id === selectedProduct.product_id
      );
      if (index !== -1) {
        this.favoriteQuantities[index] = { ...selectedProduct, ...quantity };
      } else {
        this.favoriteQuantities.push({ ...selectedProduct, ...quantity });
      }
    },
    removeFavoriteQuantities(selectedProduct) {
      this.favoriteQuantities = this.favoriteQuantities.filter(
        (item) => item.product_id !== selectedProduct.product_id
      );
    },
    liftFavoriteQuantities(product) {
      const index = this.favoriteQuantities.findIndex(
        (item) => item.product_id === product.product_id
      );
      if (index !== -1) {
        this.favoriteQuantities.splice(index, 1);
      }
    },
    clearFavorites() {
      this.favoriteQuantities = [];
    },
  },
});
