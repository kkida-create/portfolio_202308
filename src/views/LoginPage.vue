<template>
  <div class="login-wrapper">
    <div class="login-group">
      <p class="login-title">会員の方は、以下からログインしてください。</p>
      <form class="login-form" @submit.prevent="login">
        <div class="login-form-box">
          <p class="login-label">ログインＩＤ</p>
          <input type="id" v-model="user_id" class="login-input-box" />
        </div>
        <div class="login-form-box">
          <p class="login-label">パスワード</p>
          <input type="password" v-model="password" class="login-input-box" />
        </div>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div class="button-box">
        <button type="button" class="login-button" @click="login">
          ログイン
        </button>
      </div>
      <button type="button" class="guest-button" @click="guestLogin">
        ログインせずに使用
      </button>
      <p class="guest-note">※ログインしない場合、カート機能が使えません。</p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/store/user.js";
import { onMounted } from "vue";

const userStore = useUserStore();

export default {
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0);
    });
  },
  data() {
    return {
      user_id: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      userStore.login(this.user_id, this.password).then((success) => {
        if (success) {
          if (!window.history.length) {
            this.$router.push("/top");
          } else {
            window.history.back();
          }
        } else {
          this.errorMessage = "ユーザIDもしくはパスワードが違います。";
        }
      });
    },
    guestLogin() {
      this.$router.push("/top");
    },
  },
};
</script>
<style>
.login-wrapper {
  background: #eeeeee;
  font-size: 20px;
  min-width: 950px;
  min-height: 100vh;
  overflow-x: auto;
  padding-top: 120px;
}

.login-title {
  text-align: center;
}

.error-message {
  color: red;
  margin-top: 15px;
  text-align: center;
}

.button-box {
  text-align: center;
  margin-top: 100px;
}

.login-button {
  background: #fff;
  border: none;
  cursor: pointer;
  border-radius: 18px;
  height: 70px;
  width: 250px;
}

.login-button:hover {
  background: #999f;
}

.password-link {
  color: #333f8b;
}

.new-login-title {
  font-weight: normal;
  text-align: center;
}

.new-login {
  text-align: center;
  margin-top: 30px;
}

.new-login-group {
  background: #fff;
  padding: 50px 0;
}

.new-login-button {
  background: #e7d4b6;
  border: none;
  cursor: pointer;
  border-radius: 18px;
  height: 70px;
  width: 250px;
}

.new-login-button:hover {
  background: #ccb596;
}

.login-group {
  padding: 60px 0;
  text-align: center;
}

.login-form-box {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.login-label {
  text-align: right;
  width: 150px;
}

.login-input-box {
  margin-left: 5em;
  width: 400px;
}

.link-box {
  margin: 30px 10% 0 0;
  text-align: right;
}
.guest-button {
  background: #fff;
  border: none;
  cursor: pointer;
  border-radius: 18px;
  height: 70px;
  width: 250px;
  margin-top: 100px;
}
.guest-button:hover {
  background: #999f;
}
.guest-note {
  margin-top: 10px;
}
</style>
