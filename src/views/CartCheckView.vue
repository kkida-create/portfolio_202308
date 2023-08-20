<template>
  <main>
    <div class="cart-check-container">
      <h1 class="page-title">ご注文内容確認画面</h1>
      <div class="contents-container">
        <div class="left-container">
          <div class="cart-card-container">
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
                  ¥{{ formatNumber(product.price) }}(税込)
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
              </div>
            </div>
          </div>
          <div class="total-card">
            <div class="total-quantity">合計個数 {{ totalQuantity }} 個</div>
            <div class="total-price">
              合計金額 ¥{{ formatNumber(totalPrice) }}(税込)
            </div>
          </div>
        </div>
        <div class="right-container">
          <div class="pay-info-check">
            <div class="pay-address-container">
              <p class="pay-text">お届け先</p>
              <p class="pay-info" v-if="selectedAddress">
                {{ selectedAddress.address }}
              </p>
              <p class="pay-info" v-else>住所が選択されていません</p>
            </div>
            <div class="pay-method-container">
              <p class="pay-text">お支払い</p>
              <p class="pay-method">
                {{ selectedPaymentMethod.name }}
              </p>
              <p class="pay-info" v-if="shouldShowDescription">
                {{ selectedPaymentMethod.description }}
              </p>
            </div>
            <div class="pay-day-container">
              <p class="pay-text">注文確定日</p>
              <p class="pay-info">{{ formattedDate }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="button-container">
        <button class="return-to-payment" @click="returnToPayment">
          ← 支払い画面へ戻る
        </button>
        <button class="confirm-button" @click="confirmOrder">
          注文を確定する
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { usePaymentStore } from "@/store/payment.js";
import { useCartStore } from "@/store/cart.js";
import { useProductStore } from "@/store/product.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0);
    });
    const router = useRouter();
    const paymentStore = usePaymentStore();
    const selectedAddress = paymentStore.selectedAddress;
    const selectedPaymentMethod = computed(() => {
      const defaultMethod = { name: "", description: "" };
      const selectedMethod =
        paymentStore.selectedPaymentMethod || defaultMethod;

      return {
        name: selectedMethod.name || "支払い方法が選択されていません",
        description:
          selectedMethod.description || "カード情報が選択されていません",
      };
    });
    const shouldShowDescription = computed(
      () => selectedPaymentMethod.value.name === "クレジットカード"
    );
    const cartStore = useCartStore();
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
    const today = ref(new Date());
    const formattedDate = computed(() => {
      const year = today.value.getFullYear();
      const month = today.value.getMonth() + 1;
      const date = today.value.getDate();
      return `${year}年${month}月${date}日`;
    });
    function setQuantity(productId, quantity) {
      const productStore = useProductStore();
      const product = productStore.getProductById(productId);

      const updatedQuantity = Number(quantity);
      if (updatedQuantity <= product.stock) {
        cartStore.setQuantity(productId, updatedQuantity);
      }
    }
    function formatNumber(value) {
      return Number(value).toLocaleString();
    }
    function getQuantityInCart(productId) {
      const productInCart = cartStore.cart.find(
        (item) => item.product_id === productId
      );
      return productInCart ? productInCart.selectedQuantity : 0;
    }
    function availableQuantity(product) {
      return Array.from({ length: product.stock }, (_, i) => i + 1);
    }
    const confirmOrder = () => {
      cartStore.clearCart();
      router.push("/cart-complete");
    };
    return {
      selectedAddress,
      selectedPaymentMethod,
      shouldShowDescription,
      cart: cartStore.cart,
      totalQuantity,
      totalPrice,
      setQuantity,
      formatNumber,
      formattedDate,
      getQuantityInCart,
      availableQuantity,
      confirmOrder,
    };
  },
  methods: {
    returnToPayment() {
      this.$router.push("/cart-payment");
    },
  },
};
</script>

<style scoped>
.cart-check-container {
  min-width: 950px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #eeeeee;
  padding-top: 120px;
}
.contents-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 30px 20px;
}
.left-container {
  width: 488px;
}

.cart-card-container {
  border: solid 1px black;
  padding: 10px;
  background-color: white;
}
.cart-card {
  display: flex;
  height: 250px;
  width: 100%;
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
  padding: 20px 0;
  align-items: center;
  flex-direction: column;
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
  padding: 0 3px;
}
.product-amount {
  border: none;
}
.amount {
  margin: 0 0;
  padding: 0 3px;
  white-space: nowrap;
}
.size-select-container {
  display: flex;
  border-radius: 4px;
  border: 1.5px solid black;
  margin-left: 20px;
  padding: 0 3px;
}
.size-select {
  border: none;
  white-space: nowrap;
}
.size {
  margin: 0 0;
  white-space: nowrap;
}
.total-card {
  width: 100%;
  font-size: 24px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 30px;
  text-align: left;
  background-color: white;
}
.right-container {
  border: solid 1px black;
  padding: 10px;
  background-color: white;
  width: 300px;
  height: 350px;
  text-align: center;
}
.pay-text {
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
}
.pay-info {
  font-size: 14px;
}
.pay-method {
  font-size: 14px;
}
.button-container {
  display: flex;
  padding-bottom: 30px;
  margin-top: auto;
  justify-content: space-between;
  padding: 0 80px 50px 80px;
}
.return-to-payment {
  font-size: 24px;
  padding: 8px 14px;
}
.confirm-button {
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.766);
  color: white;
  padding: 8px 14px;
}
.confirm-button:hover {
  box-shadow: 0 0 12px #a9a9a9;
  color: rgb(241, 67, 67);
  background-color: rgb(252, 195, 195);
}
.return-to-payment:hover {
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
@media screen and (min-width: 950px) {
  .left-container {
    width: 54.6315%;
  }
}
</style>
