import { defineStore } from "pinia";
import { useProductStore } from "./product.js";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    cart: [],
  }),
  getters: {
    totalAmount() {
      return this.cart.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
    },
    quantityInCart: (state) => (productId) => {
      const productInCart = state.cart.find(
        (product) => product.product_id === productId
      );
      return productInCart ? productInCart.quantity : 0;
    },
    totalQuantity() {
      return this.cart.reduce(
        (acc, product) => acc + product.selectedQuantity,
        0
      );
    },
  },
  actions: {
    addToCart(productId, quantity = 1) {
      const productStore = useProductStore();
      const product = productStore.getProductById(productId);
      if (!product) {
        return;
      }
      const useSpecialPrice = ["0034", "0042", "0049", "0052"].includes(
        productId
      );
      const selectedProduct = useSpecialPrice
        ? { ...product, price: product.special_price }
        : product;
      const productInCart = this.cart.find(
        (item) => item.product_id === productId
      );

      const selectedQuantity = productInCart
        ? productInCart.selectedQuantity
        : 0;
      const updatedQuantity = selectedQuantity + Number(quantity);
      if (useSpecialPrice) {
        selectedProduct.price = product.special_price;
      } else {
        selectedProduct.price = product.price;
      }
      if (updatedQuantity > product.stock) {
        console.error("Cannot add more items than available in stock.");
        return;
      }
      if (productInCart) {
        if (updatedQuantity <= product.stock) {
          productInCart.selectedQuantity = updatedQuantity;
        } else {
          console.error("Cannot add more items than available in stock.");
          return;
        }
      } else {
        if (quantity <= product.stock) {
          this.cart.push({
            ...selectedProduct,
            quantity: Number(quantity),
            selectedQuantity: Number(quantity),
          });
        } else {
          console.error("Cannot add more items than available in stock.");
          return;
        }
      }
    },
    decreaseQuantity(productId) {
      const productInCart = this.cart.find(
        (item) => item.product_id === productId
      );
      if (productInCart && productInCart.selectedQuantity > 0) {
        productInCart.selectedQuantity--;
      }
    },
    increaseQuantity(productId) {
      const productStore = useProductStore();
      const product = productStore.getProductById(productId);
      const productInCart = this.cart.find(
        (item) => item.product_id === productId
      );
      if (productInCart && productInCart.selectedQuantity < product.stock) {
        productInCart.selectedQuantity++;
      }
    },
    setQuantity(productId, quantity) {
      const productInCart = this.cart.find(
        (item) => item.product_id === productId
      );
      if (productInCart) {
        productInCart.selectedQuantity = quantity;
      }
    },
    updateSelectedQuantity(productId, selectedQuantity) {
      const productInCart = this.cart.find(
        (item) => item.product_id === productId
      );
      if (productInCart) {
        productInCart.selectedQuantity = selectedQuantity;
      }
    },
    removeProduct(productId) {
      const index = this.cart.findIndex(
        (item) => item.product_id === productId
      );
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    clearCart() {
      this.cart = [];
    },
  },
});
