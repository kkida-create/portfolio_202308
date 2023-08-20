<template>
  <main>
    <div class="cart-container">
      <h1 class="cart-title">カート一覧</h1>
      <div class="contents-container">
        <div class="left-container">
          <div
            class="cart-card"
            v-for="product in cart"
            :key="product.product_id"
          >
            <figure class="product-photo-container">
              <img
                class="product-photo"
                src="../assets/product_sample.jpg"
                alt="商品"
              />
            </figure>
            <div class="product-detail">
              <div class="product-name">{{ product.product_name }}</div>
              <div class="product-price">
                ¥ {{ formatNumber(getProductPrice(product)) }}(税込)
              </div>
              <div class="select-button-container">
                <div class="product-amount-container">
                  <p class="amount">個数：</p>
                  <select
                    class="product-amount"
                    size="1"
                    :value="getQuantityInCart(product.product_id)"
                    @change="
                      setQuantity(product.product_id, $event.target.value)
                    "
                  >
                    <option
                      v-for="num in availableQuantity(product)"
                      :key="num"
                      :value="num"
                    >
                      {{ num }}
                    </option>
                  </select>
                </div>
                <div class="size-select-container">
                  <p class="size">サイズ：{{ product.size }}</p>
                </div>
              </div>
              <button
                class="delete-button"
                @click="removeProduct(product.product_id)"
              >
                削除
              </button>
            </div>
          </div>
        </div>
        <div class="right-container">
          <div class="total-card">
            <div class="total-quantity">合計個数 {{ totalQuantity }} 個</div>
            <div class="total-price">
              合計金額 ¥{{ formatNumber(totalPrice) }}(税込)
            </div>
            <button class="buying-procedure-button" @click="checkAndNavigate">
              購入手続きへ
            </button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, ref } from "vue";
import { useCartStore } from "@/store/cart.js";
import { useRouter } from "vue-router";
import { useProductStore } from "@/store/product.js";
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0);
    });
    const cartStore = useCartStore();
    const router = useRouter();
    const totalQuantity = computed(() => {
      return cartStore.cart.reduce(
        (sum, product) => sum + Number(product.selectedQuantity),
        0
      );
    });
    const totalPrice = computed(() =>
      cartStore.cart.reduce(
        (sum, product) => sum + product.price * product.selectedQuantity,
        0
      )
    );
    const errorMessage = ref("");

    function removeProduct(productId) {
      cartStore.removeProduct(productId);
    }

    function setQuantity(productId, quantity) {
      const productStore = useProductStore();
      const product = productStore.getProductById(productId);

      const updatedQuantity = Number(quantity);
      if (updatedQuantity <= product.stock) {
        cartStore.setQuantity(productId, updatedQuantity);
      }
    }
    function getProductPrice(product) {
      return product.price || product.special_price || 0;
    }
    function getQuantityInCart(productId) {
      const productInCart = cartStore.cart.find(
        (item) => item.product_id === productId
      );
      return productInCart ? productInCart.selectedQuantity : 0;
    }

    function formatNumber(value) {
      return Number(value).toLocaleString();
    }

    function checkAndNavigate() {
      if (totalQuantity.value === 0) {
        errorMessage.value = "商品がカートに入っていません";
      } else {
        errorMessage.value = "";
        router.push("/cart-payment");
      }
    }

    function availableQuantity(product) {
      return Array.from({ length: product.stock }, (_, i) => i + 1);
    }
    return {
      cart: cartStore.cart,
      totalQuantity,
      totalPrice,
      removeProduct,
      setQuantity,
      getProductPrice,
      formatNumber,
      checkAndNavigate,
      errorMessage,
      getQuantityInCart,
      availableQuantity,
    };
  },
};
</script>

<style scoped>
.cart-container {
  padding-top: 120px;
  min-width: 950px;
  background-color: #eeeeee;
}
.cart-container > * {
  background-color: inherit;
}
.contents-container {
  display: flex;
  justify-content: space-between;
  transition: width 0.3s ease;
  margin-top: 30px;
}
.left-container {
  width: 500px;
  padding-left: 20px;
}
.cart-title {
  font-size: 40px;
}
.cart-card {
  display: flex;
  border: 1px solid black;
  height: 250px;
  width: 100%;
  padding-bottom: 20px;
  background-color: white;
}
.cart-card:not(:first-of-type) {
  margin-top: 30px;
}
.cart-card:last-of-type {
  margin-bottom: 30px;
}
.product-photo-container {
  width: 220px;
  height: 220px;
  display: block;
  margin: 15px;
}
.product-photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.product-detail {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  align-items: center;
  justify-content: space-between;
  overflow: auto;
}
.product-name {
  font-size: 24px;
}
.product-price {
  font-size: 24px;
  margin-top: 10px;
}
.select-button-container {
  display: flex;
}
.product-amount-container {
  display: flex;
  border-radius: 4px;
  border: 1.5px solid black;
  align-items: center;
}
.product-amount {
  border: none;
}
.amount {
  margin: 0 0;
  padding: 0 3px;
}
.size-select-container {
  display: flex;
  border-radius: 4px;
  border: 1.5px solid black;
  margin-left: 30px;
  padding: 0 3px;
}
.size-select {
  border: none;
}
.size {
  margin: 0 0;
}
.delete-button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
.delete-button:hover {
  color: aqua;
  text-decoration: underline;
}
.right-container {
  width: 300px;
  padding-right: 20px;
  text-align: center;
}
.total-card {
  width: 100%;
  height: 270px;
  font-size: 24px;
  border: 1px solid black;
  background-color: white;
}
.total-quantity {
  padding-top: 40px;
}
.total-price {
  margin-top: 20px;
}
.buying-procedure-button {
  margin-top: 50px;
}
.buying-procedure-button:hover {
  background-color: darkgray;
  box-shadow: 0 0 12px #a9a9a9;
}
.error-message {
  margin-top: 5px;
  color: red;
  font-size: 18px;
}
@media screen and (min-width: 950px) {
  .left-container {
    width: 52.63%;
  }
}
</style>
