<template>
  <header>
    <div class="header-wrapper">
      <nav class="auth-user-header" v-if="username">
        <router-link class="site-title-wrapper" to="/top">
          <h1 class="site-title">ECサイト名</h1>
        </router-link>
        <div class="page-links">
          <router-link class="page-link-list" to="/product">
            <img
              class="link-list-icon-small"
              src="../assets/icon_list.png"
              alt="アイコン"
            />
            <p class="link-list-title">商品一覧</p>
          </router-link>
          <router-link class="page-link-list" to="/cart-list">
            <img
              class="link-list-icon-larg"
              src="../assets/icon_cart.png"
              alt="アイコン"
            />
            <p class="link-list-title">カート</p>
          </router-link>
          <div class="auth-user-inform">
            <span class="auth-user-name"
              >{{ username }}&nbsp;様&nbsp;/&nbsp;</span
            >
            <button class="auth-user-button" @click="logout">ログアウト</button>
          </div>
        </div>
      </nav>
      <nav class="non-auth-user-header" v-else>
        <router-link class="site-title-wrapper" to="/top">
          <h1 class="site-title">ECサイト名</h1>
        </router-link>
        <div class="page-links">
          <router-link class="page-link-list" to="/product">
            <img
              class="link-list-icon-small"
              src="../assets/icon_list.png"
              alt="アイコン"
            />
            <p class="link-list-title">商品一覧</p>
          </router-link>
          <router-link class="page-link-list non-auth-user-button" to="/login"
            >新規登録&nbsp;/&nbsp;ログイン</router-link
          >
        </div>
      </nav>
      <div class="modal-box" v-show="modalBox">
        <div class="inner-box">
          <router-link
            class="close-icon"
            type="button"
            to="/login"
            @click="closedClick"
          ></router-link>
          <p class="inner-text">ログアウトしました。</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useUserStore } from "@/store/user.js";
import { useFavoriteStore } from "@/store/favorite.js";
import { useCartStore } from "@/store/cart.js";
import { usePaymentStore } from "@/store/payment.js";

export default {
  data() {
    return {
      modalBox: false,
    };
  },
  computed: {
    username() {
      const userStore = useUserStore();
      return userStore.username;
    },
  },
  methods: {
    logout() {
      this.modalBox = !this.modalBox;

      const userStore = useUserStore();
      const paymentStore = usePaymentStore();
      const cartStore = useCartStore();
      const favoriteStore = useFavoriteStore();

      paymentStore.clearPaymentInfo();
      cartStore.clearCart();
      favoriteStore.clearFavorites();

      userStore.logout();
      this.$router.push("/login");
    },
    closedClick() {
      this.modalBox = false;
      // this.findUser = !this.findUser
    },
    // findUser() {
    //   return this.userInform.some(
    //     (value) =>
    //       value.user_id == '2001' ||
    //       value.user_id == '2002' ||
    //       value.user_id == '2003' ||
    //       value.user_id == '2004' ||
    //       value.user_id == '2005' ||
    //       value.user_id == '2006' ||
    //       value.user_id == '2007' ||
    //       value.user_id == '2008' ||
    //       value.user_id == '2009'
    //   )
    // },
  },
};
</script>

<style scoped>
.header-wrapper {
  position: fixed;
  width: 100%;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgb(208, 208, 208) 100%
  );
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.auth-user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.non-auth-user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.site-title-wrapper {
  text-decoration: none;
  color: #000000;
}
.page-links {
  display: flex;
  align-items: center;
}
.auth-user-header .page-links .page-link-list:nth-child(-n + 2) {
  display: flex;
  align-items: center;
}
.non-auth-user-header .page-links .page-link-list:nth-child(1) {
  display: flex;
  align-items: center;
}
.page-link-list {
  text-decoration: none;
  color: #000000;
}
.page-link-list + .page-link-list {
  margin-left: 60px;
}
.link-list-icon-small {
  width: auto;
  height: 20px;
}
.link-list-icon-larg {
  width: auto;
  height: 32px;
}
.link-list-title {
  margin-left: 20px;
  margin-bottom: 0;
}
.auth-user-inform {
  margin-left: 60px;
}
.auth-user-name {
  font-weight: bold;
}
.auth-user-button {
  color: #000000;
  font-weight: bold;
  border: none;
  background: transparent;
  border-bottom: 2px solid #000000;
  padding: 0;
  margin-bottom: 0;
}
.non-auth-user-button {
  border: 1px solid #000000;
  padding: 12px 24px;
  border-radius: 30px;
}
.non-auth-user-button:hover {
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
.modal-box {
  background-color: #eeeeee;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1;
}
.inner-box {
  display: inline-block;
  position: relative;
  background-color: #ffffff;
  border-radius: 30px;
  left: 50%;
  padding: 80px 140px;
  top: 50%;
  transform: translate(-50%, -50%);
}
.inner-text {
  white-space: nowrap;
  font-size: 24px;
  text-align: center;
  margin-bottom: 0;
}
.close-icon {
  background-color: #ffffff;
  border: 0;
  display: inline-block;
  padding: 0;
  position: absolute;
  height: 24px;
  right: 22px;
  top: 22px;
  width: 24px;
}
.close-icon::before,
.close-icon::after {
  background-color: #000000;
  content: "";
  position: absolute;
  height: 1px;
  left: -9%;
  top: 46%;
  width: 28px;
}
.close-icon::before {
  transform: rotate(45deg);
}
.close-icon::after {
  transform: rotate(-45deg);
}
.test {
  font-size: 12px;
}
</style>
