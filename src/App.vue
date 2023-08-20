<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
    <div id="content">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/top">Top</router-link> |
        <router-link to="/contact">Contact</router-link> |
        <router-link to="/product">Product</router-link> |
        <router-link to="/productDetails">productDetails</router-link> |
        <router-link to="/contact-confirm">ContactCofirm</router-link> |
        <router-link to="/cart-list">CartList</router-link> |
        <router-link to="/cart-payment">CartPayment</router-link> |
        <router-link to="/cart-check">CartCheck</router-link> |
        <router-link to="/cart-complete">CartComplete</router-link>|
        <router-link to="/product">Product</router-link> |
        <router-link to="/productDetails">ProductDetails</router-link> |
        <router-link to="/favorite">Favorite</router-link> |
        <router-link to="/login">Login</router-link> |
      </nav>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderView.vue";
import FooterComponent from "@/components/FooterView.vue";
import { onMounted } from "vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0);
    });
  },
};
</script>

<style>
/* @import '@/assets/CSS/bootstrap-reboot.css'; */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
#app {
  display: flex;
  flex-direction: column;
}
#content {
  flex-grow: 1;
}
</style>
