<template>
  <main>
    <div class="cart-complete-container">
      <div class="complete-message-box">
        <p class="complete-message">
          ✅ ありがとうございます。注文が完了されました。
        </p>
      </div>
      <button class="to-top-button" @click="goToTop">
        ショッピングを続ける
      </button>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    goToTop() {
      this.$router.push("/top");
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.cart-complete-container {
  background-color: #eeeeee;
  min-width: 1100px;
  width: 100%;
  text-align: center;
  padding: 300px 0 50px;
}
.complete-message-box {
  text-align: center;
  margin: 0 auto;
  display: block;
  background-color: white;
  width: 80%;
}
.complete-message {
  font-size: 40px;
  color: rgba(0, 255, 128, 0.462);
  white-space: nowrap;
  height: 180px;
  padding-top: 70px;
  font-size: 36px;
}

.to-top-button {
  margin-top: 100px;
  font-size: 24px;
  width: 40%;
  padding: 15px 0;
}

.to-top-button:hover {
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
</style>
