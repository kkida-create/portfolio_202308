<template>
  <div id="productDetails" class="product-details">
    <div class="product-details-warp" v-if="selectedProduct">
      <div class="img-warp">
        <div class="img">
          <img
            src="../assets/product_sample.jpg"
            alt="ProductImage"
            class="productDetails-image"
          />
        </div>
      </div>
      <div class="explanatory-text-warp">
        <div class="explanatory-text">
          <p class="product-tittle">{{ selectedProduct.product_name }}</p>
          <div class="product-price">
            &yen;{{ computedProduct.price }}(税込)
          </div>
        </div>
        <div class="select-warp">
          <div class="size-warp">
            <p class="select-text">サイズ</p>
            <select class="dropdown-option">
              <option>
                {{ selectedProduct.size }}
              </option>
            </select>
          </div>
          <div class="favorite-wrap">
            <div class="stock-warp">
              <p class="select-text">数量&emsp;</p>
              <select
                class="stock-dropdown-option"
                v-model="selectedQuantities[selectedProduct.product_id]"
              >
                <option
                  v-for="num in availableQuantity(selectedProduct)"
                  :key="num"
                >
                  {{ num }}
                </option>
              </select>
            </div>
            <div class="favorite">
              <div class="favorite-border">
                <button
                  :class="[
                    'heart',
                    { 'favorite pink': isFavorite },
                    { favorite: !isFavorite },
                    'favorite-button',
                  ]"
                  @click="
                    toggleFavorite(
                      selectedProduct,
                      favoriteQuantities[selectedProduct.product_id]
                    )
                  "
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div class="button-warp">
          <button
            id="add-to-cart"
            @click="
              addToCart(
                selectedProduct,
                selectedQuantities[selectedProduct.product_id]
              )
            "
            class="cart-button"
          >
            カートに追加
          </button>
          <div class="error-message" v-if="isLoginErrorVisible">
            ログインしてください。
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-show="isModalVisible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p v-if="addToCartErrorMessage" class="modal-content-text">
          {{ addToCartErrorMessage }}
        </p>
        <p v-else class="modal-content-text">商品をカートに追加しました。</p>
        <button class="modal-content-cart" @click="cartPage">
          カート画面へ
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useMerchandiseStore } from "@/store/merchandise.js";
import { reactive, watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cart.js";
import { useFavoriteStore } from "@/store/favorite.js";
import { useProductStore } from "@/store/product.js";
import { useUserStore } from "@/store/user.js";

export default {
  name: "productDetails",
  data() {
    return {};
  },
  setup() {
    const cartStore = useCartStore();
    const merchandiseStore = useMerchandiseStore();
    const favoriteStore = useFavoriteStore();
    const productStore = useProductStore();
    const router = useRouter();
    const userStore = useUserStore();
    const isLoginErrorVisible = ref(false);
    const productQuantities = reactive([]);
    const selectedQuantities = ref({});
    const favoriteQuantities = ref(1);
    const isModalVisible = ref(false);
    const isFavorite = ref(false);
    const addToCartErrorMessage = ref("");
    const selectedProduct = merchandiseStore.selectedProduct;
    function addToCart(selectedProduct, quantity) {
      if (!userStore.userId) {
        isLoginErrorVisible.value = true;
        return;
      }
      const productId = selectedProduct.product_id;
      const stock = availableQuantity(selectedProduct);
      if (!productId) return;
      if (stock <= 0) {
        addToCartErrorMessage.value = "商品の在庫がありません";
        isModalVisible.value = true;
        return;
      }
      cartStore.addToCart(productId, quantity);
      selectedQuantities.value[productId] = 1;
      isModalVisible.value = true;
    }
    function availableQuantity(product) {
      if (!selectedProduct) {
        return [];
      }
      const productInCart = cartStore.cart.find(
        (item) => item.product_id === product.product_id
      );
      const quantityInCart = productInCart ? productInCart.selectedQuantity : 0;
      return Array.from(
        { length: product.stock - quantityInCart },
        (_, i) => i + 1
      );
    }
    function closeModal() {
      isModalVisible.value = false;
      router.push("/product");
    }
    function cartPage() {
      router.push("/cart-list");
    }
    function toggleFavorite(selectedProduct, quantity) {
      if (isFavorite.value) {
        favoriteStore.removeFavoriteQuantities(selectedProduct);
      } else {
        favoriteStore.setFavoriteQuantities(selectedProduct, quantity);
      }
      isFavorite.value = !isFavorite.value;
    }
    onMounted(async () => {
      window.scrollTo(0, 0);
      await productStore.fetchProducts();
      selectedQuantities.value[merchandiseStore.selectedProduct.product_id];
    });
    watch(merchandiseStore.selectedProduct, (newProduct) => {
      productQuantities.splice(
        0,
        productQuantities.length,
        ...Array.from({ length: newProduct.quantity }, (_, index) => index + 1)
      );
    });
    watch(
      () => favoriteStore.favoriteQuantities,
      (favoriteQuantities) => {
        const productId = merchandiseStore.selectedProduct.product_id;
        isFavorite.value = !!favoriteQuantities.find(
          (item) => item.product_id === productId
        );
      },
      { immediate: true }
    );
    return {
      selectedProduct: merchandiseStore.selectedProduct,
      productQuantities,
      selectedQuantities,
      favoriteQuantities,
      availableQuantity,
      isModalVisible,
      addToCart,
      closeModal,
      toggleFavorite,
      cartPage,
      isFavorite,
      isLoginErrorVisible,
      addToCartErrorMessage,
    };
  },
  computed: {
    computedProduct() {
      const selectedProduct = this.selectedProduct;
      if (!selectedProduct) return null;

      if (
        ["0034", "0042", "0049", "0052"].includes(selectedProduct.product_id)
      ) {
        return {
          ...selectedProduct,
          price: selectedProduct.special_price,
        };
      } else {
        return selectedProduct;
      }
    },
  },
};
</script>
<style>
.dropdown-option {
  background-color: #eeeeee;
  width: 30%;
  height: 40px;
}
.stock-dropdown-option {
  background-color: #eeeeee;
  width: 60%;
  height: 40px;
}
.product-details {
  background-color: #eeeeee;
  color: #000000;
  padding: 150px 0 116px 0;
}
.product-details-warp {
  display: flex;
  justify-content: space-between;
}
.size-warp,
.stock-warp {
  display: flex;
}
.img-warp,
.explanatory-text-warp {
  width: 50%;
}
.explanatory-text-warp {
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
}
.img-warp {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  width: 70%;
  border: 1px solid #000000;
}
.productDetails-image {
  width: 100%;
  object-fit: cover;
}
.product-price,
.product-tittle {
  font-size: 24px;
}
.explanatory-text {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.select-text {
  margin: 0 20px 0 0;
  display: flex;
  align-items: center;
}
.size-warp {
  margin-bottom: 20px;
}
.select-warp,
.button-warp {
  width: 100%;
  text-align: center;
}
.cart-button {
  border: 1px solid #000000;
  width: 70%;
  height: 50px;
  font-size: 24px;
  margin-top: 10px;
}
.favorite-wrap {
  display: flex;
}
.favorite {
  display: flex;
  width: 30%;
}
.stock-warp {
  width: 50%;
}
.modal {
  background-color: rgb(0 0 0 / 40%);
  display: block;
  height: 100%;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
.modal-content {
  text-align: center;
  background-color: #fefefe;
  border: 1px solid;
  height: 300px;
  margin: 15% auto;
  max-width: 500px;
  padding: 20px;
  width: 600px;
}
.close {
  color: #333;
  font-size: 28px;
  font-weight: bold;
  margin-left: 90%;
}
.close:hover {
  color: #000;
  cursor: pointer;
  text-decoration: none;
}
.heart::before {
  left: 50%;
}
.heart::after {
  border-left: none;
  right: 10%;
  transform: rotate(45deg);
}
.favorite.pink::before,
.favorite.pink::after {
  background-color: #000;
}
.favorite::before,
.favorite::after {
  background-color: transparent;
}
.favorite-button {
  display: flex;
  position: relative;
}
.favorite-wrap {
  display: block;
  height: fit-content;
}
.heart::before {
  border-left: none;
  right: 10%;
  transform: rotate(45deg);
}
.heart::after {
  border-right: none;
  left: 20%;
  transform: rotate(-45deg);
}
.heart {
  border: none;
  cursor: pointer;
  height: 30px;
  width: 30px;
}
.heart::before,
.heart::after {
  border: 2px solid #000;
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  content: "";
  display: block;
  height: 42px;
  position: absolute;
  width: 30px;
}
.favorite-wrap {
  display: flex;
}
.favorite-border {
  display: flex;
  border: 1px solid #000;
  height: 50px;
  width: 55px;
}
.modal-content-cart {
  margin: 30px 100px;
  border: 1px solid;
}
.modal-content-text {
  margin-top: 70px;
}
</style>
