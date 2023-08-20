<template>
  <div class="favorite-warp">
    <div class="favorite-tittle">
      <p>お気に入り</p>
      <div class="error-message" v-if="isLoginErrorVisible">
        カート機能を使うにはログインしてください。
      </div>
    </div>
    <div
      class="favorite-product-warp"
      v-for="product in favoriteQuantities"
      :key="product.product_id"
    >
      <div class="favorite-img-warp">
        <div class="favorite-img">
          <img
            src="../assets/product_sample.jpg"
            alt="ProductImage"
            class="favorite-product-image"
          />
        </div>
      </div>
      <div class="favorite-explanatory-text">
        <p class="favorite-product-tittle">{{ product.product_name }}</p>
        <div class="favorite-product-price">&yen;{{ product.price }}(税込)</div>
      </div>
      <div class="button-warp-second">
        <div class="cart-button-warp">
          <button
            id="favorite-add-to-cart"
            @click="addToCart(product, 1)"
            class="favorite-cart-button"
          >
            カートに追加
          </button>
        </div>
        <div class="favorite-button-warp">
          <button class="favorite-button-second" @click="liftFavorite(product)">
            お気に入り解除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useFavoriteStore } from "@/store/favorite.js";
import { useCartStore } from "@/store/cart.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { onMounted } from "vue";
import { useUserStore } from "@/store/user.js";

export default {
  data() {
    return {};
  },
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0);
    });
    const favoriteStore = useFavoriteStore();
    const cartStore = useCartStore();
    const favoriteQuantities = ref({});
    const router = useRouter();
    const userStore = useUserStore();
    const isLoginErrorVisible = ref(false);
    function liftFavorite(product) {
      favoriteStore.liftFavoriteQuantities(product);
    }
    function addToCart(product, quantity) {
      if (!userStore.userId) {
        isLoginErrorVisible.value = true;
        return;
      }
      const productId = product.product_id;
      if (!productId) return;
      cartStore.addToCart(productId, quantity);
      favoriteQuantities.value[productId] = 1;
      router.push("/cart-list");
    }
    return {
      favoriteQuantities: favoriteStore.favoriteQuantities,
      liftFavorite,
      addToCart,
      isLoginErrorVisible,
    };
  },
};
</script>
<style>
.favorite-warp {
  padding-top: 116px;
  background-color: #eeeeee;
  color: #000000;
  padding: 130px 30px 30px 30px;
}
.favorite-tittle {
  font-size: 24px;
}
.favorite-product-warp {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}
.favorite-explanatory-text,
.favorite-img-warp {
  width: 30%;
}
.favorite-explanatory-text {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.button-warp-second {
  width: 40%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.favorite-img-warp {
  display: flex;
  justify-content: center;
  align-items: center;
}
.favorite-img {
  width: 70%;
  border: 1px solid #000000;
}
.cart-button-warp,
.favorite-button-warp {
  width: 100%;
}
.favorite-cart-button,
.favorite-button-second {
  width: 50%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid #000000;
}
.favorite-cart-button {
  background-color: #000000;
  color: white;
  margin-bottom: 20px;
}
.favorite-product-image {
  object-fit: cover;
  width: 100%;
}
.error-message {
  color: red;
  font-size: 18px;
}
</style>
