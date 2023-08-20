import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userStore",

  state: () => ({
    userId: null,
    password: null,
    username: null,
  }),

  actions: {
    async login(userId, password) {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby4ngFUSpA-VMSo2xv__tr8Hz4Y1w8J_xOC8IOodQWypAkEiqfD8HPsNTCa7U5c1Cjm/exec?sheetName=User"
      );
      const data = await response.json();

      const user = data.find(
        (user) => user.user_id === userId && user.password === password
      );

      if (user) {
        this.userId = userId;
        this.password = password;
        this.username = user.username;
        return true;
      } else {
        return false;
      }
    },

    logout() {
      this.userId = null;
      this.password = null;
      this.username = null;
    },
  },
});
