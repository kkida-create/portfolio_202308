<template>
  <footer>
    <div class="footer-wrapper">
      <router-link
        v-if="
          $route.path == '/top' ||
          $route.path == '/product' ||
          $route.path == '/productDetails' ||
          $route.path == '/favorite' ||
          $route.path == '/cart-complete'
        "
        class="contact-button"
        to="/contact"
      >
        <p class="contact-button-title">CONTACT</p>
      </router-link>
      <div v-else></div>
      <div class="copyright-wrapper">
        <p class="copyfight-text">
          Copyright © 2023 SAMPLE All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital@1&display=swap");
.contact-button {
  background-color: #ffffff;
  text-decoration: none;
  display: block;
  padding: 80px 0;
}
.contact-button-title {
  color: #000000;
  font-size: 40px;
  font-family: "Noto Serif", serif;
  text-align: center;
  margin-bottom: 0;
}
.copyright-wrapper {
  background-color: #eeeeee;
  padding: 20px 0;
}
.copyfight-text {
  font-size: 12px;
  text-align: center;
  margin-bottom: 0;
}
</style>
