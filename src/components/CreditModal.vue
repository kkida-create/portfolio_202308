<template>
  <div class="credit-modal-container">
    <div class="credit-modal">
      <div class="top-container">
        <h1 class="credit-modal-title">お客様のクレジットカード</h1>
        <button class="close-modal-button" @click="$emit('close-modal')">
          ×
        </button>
      </div>
      <div
        class="credit-info-container"
        v-for="(creditCard, index) in displayedCreditCards"
        :key="index"
      >
        <div class="outer-circle" @click="toggleCreditCardCircle(index)">
          <div
            class="inner-circle"
            :class="{
              'inner-circle-selected': selectedCreditCardIndex === index,
            }"
          ></div>
        </div>
        <div class="credit-info">
          <div class="credit-company">{{ creditCard.company }}</div>
          <div class="credit-last-number">
            末尾:{{ creditCard.number.slice(-4) }}
          </div>
          <div class="credit-name">{{ creditCard.name }}</div>
          <div class="credit-date">
            {{ creditCard.month }}/{{ creditCard.year }}
          </div>
        </div>
        <button
          class="delete-credit-card-button"
          @click="deleteCreditCard(index)"
        >
          削除
        </button>
      </div>
      <div class="credit-registration" @click="openCreditAddModal">
        <div class="cross"></div>
        新しいクレジットカードを追加
      </div>
      <div class="add-credit-modal" v-if="isCreditAddModalVisible">
        <button class="close-sub-modal-button" @click="closeCreditAddModal">
          ×
        </button>
        <form class="modal-contents" @submit.prevent="addCreditCard">
          <div class="credit-number-container">
            <div class="credit-number">カード番号</div>
            <input
              type="text"
              class="credit-number-input"
              v-model="newCreditCard.number"
              required
            />
          </div>
          <div class="credit-name-container">
            <div class="credit-name-title">カード名義人</div>
            <input
              type="text"
              class="credit-name-input"
              v-model="newCreditCard.name"
              required
            />
          </div>
          <div class="credit-date-container">
            <div class="credit-date-title">有効期限</div>
            <div class="credit-date-select">
              <select
                class="credit-month-select"
                v-model="newCreditCard.month"
                required
              >
                <option value="">月</option>
                <option v-for="month in months" :value="month" :key="month">
                  {{ month }}
                </option>
              </select>
              <select
                class="credit-year-select"
                v-model="newCreditCard.year"
                required
              >
                <option value="">年</option>
                <option v-for="year in years" :value="year" :key="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
          <div class="credit-security-container">
            <div class="credit-security-title">セキュリティコード</div>
            <input
              type="password"
              pattern="\d{3,4}"
              class="credit-security-input"
              v-model="newCreditCard.securityCode"
              required
            />
          </div>
          <button
            class="credit-submit"
            type="submit"
            @click.prevent="addCreditCard"
          >
            カード追加
          </button>
        </form>
      </div>
      <div v-if="isCreditModalVisible" class="overlay"></div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { usePaymentStore } from "@/store/payment.js";

export default {
  computed: {
    months() {
      return Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        return month < 10 ? `0${month}` : `${month}`;
      });
    },
    years() {
      const currentYear = new Date().getFullYear();
      const endYear = currentYear + 20;
      return Array.from(
        { length: endYear - currentYear + 1 },
        (_, i) => currentYear + i
      );
    },
  },
  setup() {
    const paymentStore = usePaymentStore();
    const selectedCreditCardIndex = ref(paymentStore.selectedCreditCardIndex);
    const selectedPaymentMethodIndex = ref(
      paymentStore.selectedPaymentMethodIndex
    );
    const selectedCreditCardCircle = ref(paymentStore.selectedCreditCardCircle);
    const selectedPaymentMethodCircle = ref(
      paymentStore.selectedPaymentMethodCircle
    );
    const displayedCreditCards = computed(() =>
      paymentStore.creditCards.slice(0, 3)
    );
    const selectedCreditCard = computed(() => paymentStore.selectedCreditCard);
    const isCreditModalVisible = ref(true);
    const isCreditAddModalVisible = ref(false);
    const newCreditCard = ref({
      number: "",
      name: "",
      month: "",
      year: "",
      securityCode: "",
      company: "",
    });
    const toggleCreditCardCircle = (index) => {
      if (displayedCreditCards.value[index] === undefined) {
        console.error(
          "Invalid index:",
          index,
          "Credit Cards:",
          displayedCreditCards.value
        );
        return;
      }
      selectedCreditCardIndex.value = index;
      console.log(
        "Selected credit card to set:",
        displayedCreditCards.value[index]
      );
      selectedCreditCardCircle.value = true;
      paymentStore.setSelectedCreditCard(displayedCreditCards.value[index]);
      paymentStore.setSelectedCreditCardIndex(index);
      paymentStore.setSelectedCreditCardCircle(true);
    };

    const togglePaymentMethodCircle = (index) => {
      selectedPaymentMethodIndex.value = index;
      selectedPaymentMethodCircle.value = true;
      paymentStore.setSelectedPaymentMethodIndex(index);
      paymentStore.setSelectedPaymentMethodCircle(true);
    };

    const openCreditAddModal = () => {
      isCreditAddModalVisible.value = true;
    };

    const closeCreditAddModal = () => {
      isCreditAddModalVisible.value = false;
    };

    const deleteCreditCard = (index) => {
      if (paymentStore.creditCards[index] === paymentStore.selectedCreditCard) {
        paymentStore.setSelectedCreditCard(null);
        paymentStore.setSelectedCreditCardIndex(null);
        paymentStore.setSelectedCreditCardCircle(false);
      } else if (
        paymentStore.selectedCreditCard &&
        selectedCreditCardIndex.value !== null &&
        index < selectedCreditCardIndex.value
      ) {
        selectedCreditCardIndex.value = selectedCreditCardIndex.value - 1;
        paymentStore.setSelectedCreditCardIndex(selectedCreditCardIndex.value);
      }
      paymentStore.removeCreditCard(index);
    };
    const addCreditCard = () => {
      if (paymentStore.creditCards.length === 3) {
        paymentStore.removeCreditCard(paymentStore.creditCards.length - 1);
      }
      const number = newCreditCard.value.number;
      const name = newCreditCard.value.name;
      const month = newCreditCard.value.month;
      const year = newCreditCard.value.year;
      const securityCode = newCreditCard.value.securityCode;

      if (!/^\d+$/.test(number)) {
        alert("カード番号は半角数字のみ入力してください");
        return;
      }

      const prefix1 = number[0];
      const prefix2 = number.substr(0, 2);

      let validLength = null;
      let CardCompany = null;

      switch (prefix1) {
        case "4":
          validLength = 16;
          CardCompany = "Visa";
          break;
        case "5":
          validLength = 16;
          CardCompany = "MasterCard";
          break;
        default:
          switch (prefix2) {
            case "34":
            case "37":
              validLength = 15;
              CardCompany = "American Express";
              break;
            case "35":
              validLength = 16;
              CardCompany = "JCB";
              break;
            case "36":
              validLength = 14;
              CardCompany = "Diners Club";
              break;
            default:
              alert("無効なカード番号です");
              return;
          }
      }

      if (number.length !== validLength) {
        alert("カード番号は" + validLength + "桁である必要があります");
        return;
      }

      if (!/^[A-Z\s]+$/.test(name)) {
        alert("カード名義は半角大文字のローマ字のみで入力してください");
        return;
      }

      if (!/^\d{3,4}$/.test(securityCode)) {
        alert("セキュリティコードは3桁または4桁の数字である必要があります");
        return;
      }
      if (!month || !year) {
        alert("有効期限を選択してください");
        return;
      }
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        alert("有効期限が過去の日付です");
        return;
      }

      const creditCard = {
        number,
        name,
        month,
        year,
        securityCode,
        company: CardCompany,
      };

      paymentStore.addCreditCard(creditCard);
      paymentStore.setSelectedCreditCard(null);

      selectedCreditCard.value = null;
      selectedCreditCardIndex.value = null;
      selectedCreditCardCircle.value = false;

      isCreditAddModalVisible.value = false;
      newCreditCard.value.number = "";
      newCreditCard.value.name = "";
      newCreditCard.value.month = "";
      newCreditCard.value.year = "";
      newCreditCard.value.securityCode = "";
      newCreditCard.value.company = "";
    };

    return {
      paymentStore,
      selectedCreditCardIndex,
      selectedPaymentMethodIndex,
      selectedCreditCardCircle,
      selectedCreditCard,
      selectedPaymentMethodCircle,
      displayedCreditCards,
      toggleCreditCardCircle,
      togglePaymentMethodCircle,
      openCreditAddModal,
      closeCreditAddModal,
      deleteCreditCard,
      addCreditCard,
      isCreditModalVisible,
      isCreditAddModalVisible,
      newCreditCard,
    };
  },
};
</script>
<style>
.credit-modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 50vh;
  top: 0;
  left: 0;
  z-index: 10;
  position: relative;
}
.credit-modal {
  border: 1px solid black;
  width: 900px;
  height: 700px;
  background-color: white;
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  padding-left: 20px;
}
.top-container {
  display: flex;
  justify-content: space-between;
}
.close-modal-button {
  font-size: 30px;
  background: none;
  color: inherit;
  border: none;
  padding-right: 20px;
  cursor: pointer;
  outline: inherit;
}
.credit-modal-title {
  border-bottom: 1px solid black;
  width: 90%;
  padding-top: 20px;
  font-size: 40px;
}
.credit-info-container {
  display: flex;
  margin-top: 30px;
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
.credit-info {
  display: flex;
  margin-left: 10px;
  font-size: 24px;
}
.credit-last-number {
  margin-left: 15px;
}
.credit-name {
  margin-left: 15px;
}
.credit-date {
  margin-left: 15px;
}
.delete-credit-card-button {
  margin-left: 15px;
}
.credit-registration {
  padding-left: 5px;
  margin-top: 20px;
  display: inline-block;
  font-size: 20px;
  color: rgba(39, 39, 39, 0.382);
}
.cross {
  display: inline-block;
  position: relative;
  height: 16px;
  width: 16px;
  margin-right: 10px;
  padding-top: 10px;
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
.credit-registration:hover {
  color: rgb(0, 102, 255);
  cursor: pointer;
}
.credit-registration:hover .cross::before,
.credit-registration:hover .cross::after {
  background-color: rgb(0, 102, 255);
}
.add-credit-modal {
  width: 90%;
  border: 1px solid black;
  background-color: rgba(169, 169, 169, 0.406);
  margin-top: 30px;
  position: relative;
  margin-left: 40px;
}
.close-sub-modal-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  color: inherit;
  border: none;
  padding-right: 10px;
  cursor: pointer;
  outline: inherit;
  font-size: 30px;
}
.modal-contents {
  padding: 30px 20px;
}
.credit-number-container {
  display: flex;
}
.credit-number-input {
  margin-left: 20px;
  width: 50%;
}
.credit-name-container {
  display: flex;
  margin-top: 30px;
}
.credit-name-input {
  margin-left: 20px;
  width: 40%;
}
.credit-date-container {
  display: flex;
  margin-top: 30px;
}
.credit-month-select,
.credit-year-select {
  margin-left: 20px;
}
.credit-month-select {
  width: 60px;
}
.credit-year-select {
  width: 80px;
}
.credit-security-container {
  display: flex;
  margin-top: 30px;
}
.credit-security-input {
  margin-left: 20px;
  width: 20%;
}
.credit-submit {
  margin-left: 82%;
  white-space: nowrap;
  font-size: 18px;
}
.credit-submit:hover {
  margin-left: 82%;
  white-space: nowrap;
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
</style>
