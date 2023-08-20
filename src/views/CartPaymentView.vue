<template>
  <main>
    <div class="payment-top">
      <h1 class="page-title">支払い画面</h1>
      <div class="contents-container">
        <div class="address-container">
          <p class="address-title">1 住所</p>
          <div
            class="address-select-container"
            v-for="(address, index) in displayedAddresses"
            :key="index"
          >
            <div class="outer-circle" @click="toggleAddressCircle(index)">
              <div
                class="inner-circle"
                :class="{
                  'inner-circle-selected':
                    selectedAddressIndex === index && selectedAddressCircle,
                }"
              ></div>
            </div>
            <div class="address-text">{{ address.address }}</div>
            <button class="delete-address-button" @click="deleteAddress(index)">
              削除
            </button>
          </div>
          <div class="address-registration" @click="openAddressModal">
            <div class="cross"></div>
            新しい住所を登録
          </div>
        </div>
        <div class="payment-container">
          <p class="payment-title">2 お支払い方法</p>
          <div
            class="payment-info-container"
            v-for="(method, index) in paymentMethods"
            :key="index"
          >
            <div class="outer-circle" @click="togglePaymentMethodCircle(index)">
              <div
                class="inner-circle"
                :class="{
                  'inner-circle-selected': selectedPaymentMethodIndex === index,
                }"
              ></div>
            </div>
            <div class="payment-info-contents">
              <div class="payment-info">
                <p class="payment-text">{{ method.name }}</p>
                <p class="payment-content">{{ method.description }}</p>
              </div>
              <button
                v-if="method.hasModalButton"
                class="credit-modal-open"
                @click="openCreditModal"
              >
                クレジットカードの変更
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="button-container">
        <button class="return-to-cart" @click="returnToCart">
          ← カート一覧へ戻る
        </button>
        <div class="cart-button-container">
          <button class="go-to-cart-check" @click="goToCartCheck">
            ご注文確認へ進む →
          </button>
        </div>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <AddressModal
        v-if="isAddressModalVisible"
        @submit-form="submitForm($event)"
        @close-modal="closeModal"
      />
      <CreditModal v-if="isCreditModalVisible" @close-modal="closeModal" />
      <div
        v-if="isAddressModalVisible || isCreditModalVisible"
        class="overlay"
      ></div>
    </div>
  </main>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import AddressModal from "../components/AddressModal.vue";
import CreditModal from "../components/CreditModal.vue";
import { usePaymentStore } from "@/store/payment.js";
import { useRouter } from "vue-router";

export default {
  components: {
    AddressModal,
    CreditModal,
  },
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0);
    });
    const paymentStore = usePaymentStore();
    const router = useRouter();
    const selectedAddressIndex = ref(paymentStore.selectedAddressIndex);
    const selectedPaymentMethodIndex = ref(
      paymentStore.selectedPaymentMethodIndex
    );
    const selectedAddressCircle = ref(paymentStore.selectedAddressCircle);
    const selectedPaymentMethodCircle = ref(
      paymentStore.selectedPaymentMethodCircle
    );
    const displayedAddresses = computed(() =>
      paymentStore.addresses.slice(0, 3)
    );
    const selectedAddress = computed(() => paymentStore.selectedAddress);
    const selectedCreditCard = computed(() => paymentStore.selectedCreditCard);
    const selectedPaymentMethod = paymentStore.selectedPaymentMethod;
    const errorMessage = ref("");

    const paymentMethods = computed(() => [
      {
        name: "クレジットカード",
        description: selectedCreditCard.value
          ? `${
              selectedCreditCard.value.company
            }  末尾:${selectedCreditCard.value.number.slice(-4)}  ${
              selectedCreditCard.value.name
            }  ${selectedCreditCard.value.month}/${
              selectedCreditCard.value.year
            }`
          : "カード情報が選択されていません",
        hasModalButton: true,
      },
      {
        name: "代金引換え",
        description: "国内配送のみ。代引手数料がかかります。",
        hasModalButton: false,
      },
      {
        name: "コンビニ・ATM・ネットバンキング・電子マネー支払い",
        description:
          "商品の発送は代金のお支払い後になるため、お届け予定日はお支払い確定後にご案内いたします。",
        hasModalButton: false,
      },
    ]);
    const toggleAddressCircle = (index) => {
      if (displayedAddresses.value[index] === undefined) {
        console.error(
          "Invalid index:",
          index,
          "Addresses:",
          displayedAddresses.value
        );
        return;
      }
      selectedAddressIndex.value = index;
      console.log("Selected address to set:", displayedAddresses.value[index]);
      selectedAddressCircle.value = true;
      paymentStore.setSelectedAddress(displayedAddresses.value[index]);
      paymentStore.setSelectedAddressIndex(index);
      paymentStore.setSelectedAddressCircle(true);
    };

    const togglePaymentMethodCircle = (index) => {
      selectedPaymentMethodIndex.value = index;
      selectedPaymentMethodCircle.value = true;
      const selectedMethod = paymentMethods.value[index];
      paymentStore.setSelectedPaymentMethod(selectedMethod);
      paymentStore.setSelectedPaymentMethodIndex(index);
      paymentStore.setSelectedPaymentMethodCircle(true);
    };

    const openAddressModal = () => {
      paymentStore.setSelectedAddress(null);
      paymentStore.setSelectedAddressIndex(null);
      paymentStore.setSelectedAddressCircle(false);
      selectedAddressCircle.value = false;
      isAddressModalVisible.value = true;
    };

    const openCreditModal = () => {
      isCreditModalVisible.value = true;
      paymentStore.setSelectedPaymentMethod(null);
      paymentStore.setSelectedPaymentMethodIndex(null);
      paymentStore.setSelectedPaymentMethodCircle(false);

      selectedPaymentMethodIndex.value = null;
      selectedPaymentMethodCircle.value = false;
    };

    const closeModal = () => {
      isAddressModalVisible.value = false;
      isCreditModalVisible.value = false;
    };

    const deleteAddress = (index) => {
      const addressToDelete = paymentStore.addresses[index];

      if (
        selectedAddress.value &&
        addressToDelete.address === selectedAddress.value.address
      ) {
        paymentStore.setSelectedAddress(null);
        selectedAddressIndex.value = null;
        paymentStore.setSelectedAddressCircle(false);
        selectedAddressCircle.value = false;
      } else if (selectedAddressIndex.value > index) {
        selectedAddressIndex.value--;
        paymentStore.setSelectedAddressIndex(selectedAddressIndex.value);
      }

      paymentStore.removeAddress(index);
    };

    const submitForm = (formData) => {
      const newAddress = {
        name: "New Option",
        isActive: false,
        address: `${formData.postCode} ${formData.selectedPrefecture}${formData.city}${formData.houseNumber} ${formData.buildingName}`,
      };
      if (paymentStore.addresses.length === 3) {
        paymentStore.removeAddress(paymentStore.addresses.length - 1);
      }
      paymentStore.addAddress(newAddress);
      isAddressModalVisible.value = false;
    };
    const isAddressModalVisible = ref(false);
    const isCreditModalVisible = ref(false);
    const goToCartCheck = () => {
      if (selectedAddressIndex.value === null) {
        errorMessage.value = "住所情報を選択してください。";
      } else if (selectedPaymentMethodIndex.value === null) {
        errorMessage.value = "支払い情報を選択してください。";
      } else if (
        paymentMethods.value[selectedPaymentMethodIndex.value].name ===
          "クレジットカード" &&
        paymentMethods.value[selectedPaymentMethodIndex.value].description ===
          "カード情報が選択されていません"
      ) {
        errorMessage.value = "クレジットカード情報を選択してください。";
      } else {
        errorMessage.value = "";
        router.push("/cart-check");
      }
    };

    return {
      paymentStore,
      selectedAddressIndex,
      selectedPaymentMethodIndex,
      selectedAddressCircle,
      selectedAddress,
      selectedPaymentMethodCircle,
      displayedAddresses,
      toggleAddressCircle,
      togglePaymentMethodCircle,
      openAddressModal,
      openCreditModal,
      closeModal,
      deleteAddress,
      submitForm,
      isAddressModalVisible,
      isCreditModalVisible,
      paymentMethods,
      selectedPaymentMethod,
      goToCartCheck,
      errorMessage,
    };
  },
  methods: {
    returnToCart() {
      this.$router.push("/cart-list");
    },
  },
};
</script>

<style scoped>
.payment-top {
  min-width: 950px;
  background-color: #eeeeee;
  padding: 120px 20px 30px 20px;
  display: flex;
  flex-direction: column;
}
.page-title {
  font-size: 40px;
}
.contents-container {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
}
.outer-circle {
  width: 30px;
  height: 30px;
  border: 2px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.inner-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.inner-circle-selected {
  background-color: black;
}
.address-title {
  font-size: 24px;
}
.address-select-container {
  display: flex;
  margin-top: 10px;
}
.address-text {
  margin-left: 10px;
  padding-top: 4px;
}
.delete-address-button {
  margin-left: 15px;
}
.delete-address-button:hover {
  background-color: darkgray;
}
.address-registration {
  display: flex;
  align-items: center;
  padding-left: 5px;
  margin-top: 10px;
  display: inline-block;
  font-size: 20px;
}
.address-registration:hover {
  color: rgb(0, 102, 255);
  cursor: pointer;
}
.address-registration:hover .cross::before,
.address-registration:hover .cross::after {
  background-color: rgb(0, 102, 255);
}
.cross {
  display: inline-block;
  position: relative;
  height: 18px;
  width: 18px;
  top: 2px;
  margin-right: 10px;
}

.cross::before,
.cross::after {
  content: "";
  position: absolute;
  background: rgba(9, 9, 9, 0.506);
}

.cross::before {
  height: 5px;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.cross::after {
  width: 5px;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.payment-container {
  margin-top: 30px;
}
.payment-title {
  font-size: 24px;
}
.payment-info-container {
  margin-top: 30px;
  display: flex;
  align-items: center;
  width: 90%;
}

.payment-info-contents {
  border: solid 1px black;
  padding: 14px;
  margin-left: 10px;
  width: 100%;
}
.payment-info-contents:nth-last-of-type(1) {
  display: flex;
  justify-content: space-between;
}
.payment-text {
  font-weight: bold;
  margin: 0;
}
.payment-content {
  margin: 0;
}
.address-modal {
  display: none;
}
.credit-modal {
  display: none;
}
.credit-modal-open {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  color: rgb(0, 102, 255);
}
.credit-modal-open:hover {
  text-decoration: underline;
}
.return-to-cart,
.go-to-cart-check {
  font-size: 24px;
  padding: 8px 14px;
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 0 20px;
}
.error-message {
  text-align: right;
  padding-right: 30px;
  margin-top: 5px;
  color: red;
}
.return-to-cart:hover,
.go-to-cart-check:hover {
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  overflow: hidden;
}
</style>
