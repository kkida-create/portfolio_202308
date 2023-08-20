<template>
  <main>
    <div class="all-contents-wrapper">
      <h2 class="main-title">入力内容のご確認</h2>
      <form
        class="form-contents"
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScqgMgO8HhVtEgIFu5WsrpkRPp972KbxzFvTFhkeZgCiSWm9w/formResponse"
        target="hidden-iframe"
        @submit="thanksBox = !thanksBox"
      >
        <div
          class="form-container"
          v-for="(list, index) in formLists"
          :key="list.id"
        >
          <label class="form-label" :for="index">{{ list.label }}：</label>
          <input
            class="form-input"
            :type="list.type"
            :name="list.name"
            :id="index"
            :value="inputConfirm[index]"
            readonly="readonly"
            v-if="index < 3"
          />
          <textarea
            class="form-textarea"
            :name="list.name"
            :id="index"
            :value="inputConfirm[index]"
            readonly="readonly"
            v-else
          />
        </div>
        <router-link class="back-button" to="/contact">
          <p class="back-text">入力画面へ戻る</p>
        </router-link>
        <button class="send-button">
          <p class="send-text">この内容で送信</p>
        </button>
      </form>
      <div class="thanks-box" v-show="thanksBox">
        <div class="inner-box">
          <router-link
            class="close-icon"
            type="button"
            to="/top"
            @click="closedClick"
          ></router-link>
          <p class="inner-text">お問い合わせありがとうございます。</p>
        </div>
      </div>
      <iframe class="hidden-content" name="hidden-iframe" />
    </div>
  </main>
</template>

<script>
import { useContactStore } from "@/store/contact";
const contactStore = useContactStore();
export default {
  data() {
    return {
      thanksBox: false,
      formLists: [
        {
          label: "お名前",
          type: "text",
          name: "entry.1013600213",
        },
        {
          label: "メールアドレス",
          type: "email",
          name: "entry.631804925",
        },
        {
          label: "タイトル",
          type: "text",
          name: "entry.914441306",
        },
        {
          label: "メッセージ",
          name: "entry.1709713028",
        },
      ],
    };
  },
  methods: {
    closedClick() {
      this.thanksBox = false;
      this.inputConfirm[0] = "";
      this.inputConfirm[1] = "";
      this.inputConfirm[2] = "";
      this.inputConfirm[3] = "";
    },
  },
  computed: {
    inputConfirm() {
      const inputConfirm = contactStore.inputConfirm;
      return inputConfirm;
    },
  },
};
</script>

<style scoped>
.all-contents-wrapper {
  background-color: #eeeeee;
  padding: 236px 0 120px;
  padding-top: 236px;
  /* ヘッダー分の余白：116px */
}
.main-title {
  font-size: 40px;
  text-align: center;
}
.form-contents {
  max-width: 600px;
  margin: 80px auto 0;
}
.form-container + .form-container {
  margin-top: 20px;
}
.form-label,
.form-input,
.form-textarea {
  display: block;
  width: 100%;
}
.form-label {
  font-size: 14px;
}
.form-input,
.form-textarea {
  border: none;
  font-size: 24px;
  background-color: rgba(255, 255, 255, 0);
}
.form-textarea {
  resize: none;
  padding-bottom: 20px;
}
.form-input:focus,
.form-textarea:focus {
  outline: none;
}
.back-button {
  text-decoration: none;
  border: 1px solid #000000;
  display: block;
  margin-top: 40px;
  padding: 20px;
}
.back-button:hover {
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
.back-text {
  color: #000000;
  position: relative;
  text-align: center;
  margin-bottom: 0;
  font-size: 18px;
}
.back-text::before {
  content: "←";
  position: absolute;
  left: 20px;
}
.send-button {
  background-color: #ffffff;
  border-radius: 40px;
  display: block;
  width: 100%;
  border: 0;
  margin-top: 20px;
  padding: 20px 0;
}
.send-button:hover {
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
.send-text {
  font-size: 24px;
  margin-bottom: 0;
}
.thanks-box {
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
.hidden-content {
  display: none;
}
</style>
