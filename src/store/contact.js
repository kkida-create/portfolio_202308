import { defineStore } from "pinia";

export const useContactStore = defineStore("contact", {
  state() {
    return {
      inputInformation: [],
    };
  },
  getters: {
    inputConfirm() {
      return this.inputInformation.value;
    },
  },
  actions: {
    setFormInput(getInput) {
      this.inputInformation.value = getInput;
    },
  },
});
