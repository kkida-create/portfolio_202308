import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore({
  id: "product",
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      const response = await axios.get(
        "https://script.google.com/macros/s/AKfycby4ngFUSpA-VMSo2xv__tr8Hz4Y1w8J_xOC8IOodQWypAkEiqfD8HPsNTCa7U5c1Cjm/exec?sheetName=Product"
      );
      this.products = response.data;
    },
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.product_id === id);
    },
  },
});
