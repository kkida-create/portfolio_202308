import { defineStore } from "pinia";

export const usePaymentStore = defineStore({
  id: "payment",
  state: () => ({
    selectedAddress: null,
    selectedAddressIndex: null,
    selectedAddressCircle: null,
    addresses: [],
    selectedCreditCard: null,
    selectedCreditCardIndex: null,
    selectedCreditCardCircle: null,
    creditCards: [],
    selectedPaymentMethodCircle: null,
    selectedPaymentMethodIndex: null,
    selectedPaymentMethod: null,
  }),
  actions: {
    setSelectedAddressIndex(index) {
      this.$patch({ selectedAddressIndex: index });
    },
    setSelectedAddress(address) {
      console.log("selectedAddress:", address);
      this.$patch({ selectedAddress: address });
      console.log("Updated selectedAddress:", this.selectedAddress);
    },
    addAddress(address) {
      this.addresses.unshift(address);
    },
    removeAddress(index) {
      if (this.addresses[index] === this.selectedAddress) {
        this.selectedAddress = null;
        this.selectedAddressIndex = null;
      }
      this.addresses.splice(index, 1);
    },
    setSelectedAddressCircle(circle) {
      this.selectedAddressCircle = circle;
    },
    setSelectedCreditCardIndex(index) {
      this.$patch({ selectedCreditCardIndex: index });
    },
    setSelectedCreditCard(creditCard) {
      console.log("selectedCreditCard:", creditCard);
      this.$patch({ selectedCreditCard: creditCard });
      console.log("Updated selectedCreditCard:", this.selectedCreditCard);
    },
    addCreditCard(creditCard) {
      this.creditCards.unshift(creditCard);
    },
    removeCreditCard(index) {
      if (this.creditCards[index] === this.selectedCreditCard) {
        this.selectedCreditCard = null;
        this.selectedCreditCardIndex = null;
      }
      this.creditCards.splice(index, 1);
    },
    setSelectedCreditCardCircle(circle) {
      this.selectedCreditCardCircle = circle;
    },
    setSelectedPaymentMethod(method) {
      this.selectedPaymentMethod = method;
    },
    setSelectedPaymentMethodIndex(index) {
      this.selectedPaymentMethodIndex = index;
    },
    setSelectedPaymentMethodCircle(circle) {
      this.selectedPaymentMethodCircle = circle;
    },
    clearPaymentInfo() {
      this.$patch({
        selectedAddress: null,
        selectedAddressIndex: null,
        selectedAddressCircle: null,
        addresses: [],
        selectedCreditCard: null,
        selectedCreditCardIndex: null,
        selectedCreditCardCircle: null,
        creditCards: [],
        selectedPaymentMethodCircle: null,
        selectedPaymentMethodIndex: null,
        selectedPaymentMethod: null,
      });
    },
  },
});
