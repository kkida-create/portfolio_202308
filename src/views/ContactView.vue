<template>
  <main>
    <div class="all-contents-wrapper">
      <h2 class="main-title">CONTACT&emsp;FORM</h2>
      <div class="form-contents">
        <div
          class="form-container"
          v-for="(list, index) in formLists"
          :key="list.id"
        >
          <label class="form-label" :for="index">{{ list.label }}</label>
          <input
            class="form-input"
            :type="list.type"
            :id="index"
            v-model="formInput[index]"
            v-if="index < 3"
            @blur="validationTrigger(index)"
            @focus="requiredText[index] = false"
          />
          <textarea
            class="form-textarea"
            :id="index"
            cols="30"
            rows="10"
            v-model="formInput[index]"
            v-else
            @blur="validationTrigger(index)"
            @focus="requiredText[index] = false"
          />
          <p v-show="requiredText[index]">※項目を入力してください</p>
        </div>
        <router-link
          v-if="formInput[0] && formInput[1] && formInput[2] && formInput[3]"
          class="confirm-link"
          to="/contact-confirm"
          @click="submitContactStore"
        >
          <p class="confirm-text">確認画面へ進む</p>
        </router-link>
        <div v-else class="confirm-link" @click="announceText = true">
          <p class="confirm-text">確認画面へ進む</p>
          <p class="announce-text" v-show="announceText">
            ※全ての項目を入力してください
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useContactStore } from "@/store/contact";
const contactStore = useContactStore();
export default {
  data() {
    return {
      formLists: [
        {
          label: "お名前",
          type: "text",
        },
        {
          label: "メールアドレス",
          type: "email",
        },
        {
          label: "タイトル",
          type: "text",
        },
        {
          label: "メッセージ",
        },
      ],
      requiredText: [],
      announceText: false,
    };
  },
  methods: {
    submitContactStore() {
      const setFormInput = contactStore.setFormInput;
      setFormInput(this.formInput);
    },
    validationTrigger(index) {
      if (!this.formInput[index]) {
        this.requiredText[index] = true;
      }
      if (index == 1) {
        const emailChecked = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+[a-z]$/;
        const testResult = emailChecked.test(this.formInput[1]);
        if (!testResult) {
          alert(
            "メールアドレスの入力に誤りがあります。「＠」を含む正しいメールアドレスを入力してください。"
          );
        }
        return testResult;
      }
    },
  },
  computed: {
    formInput() {
      const inputInformation = contactStore.inputInformation;
      return inputInformation;
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
  font-size: 18px;
}
.form-input,
.form-textarea {
  border: none;
  font-size: 20px;
}
.form-textarea {
  resize: none;
}
.confirm-link {
  position: relative;
  text-decoration: none;
  border: 1px solid #000000;
  display: block;
  margin-top: 40px;
  padding: 20px;
}
.confirm-link:hover {
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
.confirm-text {
  color: #000000;
  position: relative;
  text-align: center;
  margin-bottom: 0;
  font-size: 18px;
}
.confirm-text::after {
  content: "→";
  position: absolute;
  right: 20px;
}
.announce-text {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: #ff0000;
  margin-bottom: 0;
}
.hidden-content {
  display: none;
}
</style>
