import { defineStore } from "pinia";

export const useTextStore = defineStore({
  id: "text",
  state: () => ({
    selectedText: "",
    selectedOptions: [],
  }),
  getters: {
    getText: (state) => state.selectedText,
    getOptions: (state) => state.selectedOptions,
  },
  actions: {
    setSelectedText(text) {
      this.selectedText = text;
    },
    addOption() {
      this.selectedOptions.push(this.selectedText);
      this.selectedText = "";
    },
  },
});
