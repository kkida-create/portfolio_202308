import { defineStore } from "pinia";

export const useMerchandiseStore = defineStore("merchandise", {
  state: () => ({
    selectedProduct: {
      product_id: null,
      quantity: 0,
      stock: 0,
    },
  }),
  actions: {
    selectProduct(product) {
      this.selectedProduct = {
        ...product,
        quantity: product.stock,
      };
    },
  },
});
