<template>
  <div class="address-modal-container">
    <div class="address-modal">
      <div class="top-container">
        <p class="top-message">新しいお届け先を入力</p>
        <button class="close-modal-button" @click="$emit('close-modal')">
          ×
        </button>
      </div>
      <form class="address-input-container" @submit.prevent="submitForm">
        <div class="post-code-input-container">
          <p class="post-code-title">郵便番号</p>
          <input
            type="text"
            v-model="postCode"
            class="post-code-input"
            pattern="\d{7}"
            title="半角数字7文字で入力してください"
            placeholder="ハイフンなし"
            required
          />
        </div>
        <div class="prefecture-input-container">
          <p class="prefecture-title">都道府県</p>
          <select
            class="prefecture-select"
            size="1"
            v-model="selectedPrefecture"
            required
          >
            <option
              v-for="prefecture in prefectures"
              :key="prefecture"
              :value="prefecture"
              class="prefecture-option"
            >
              {{ prefecture }}
            </option>
          </select>
        </div>
        <div class="city-input-container">
          <p class="city-title">市区町村</p>
          <input
            type="text"
            v-model="city"
            class="city-input"
            placeholder="〇〇市〇〇区〇〇町"
            required
          />
        </div>
        <div class="house-number-input-container">
          <p class="house-number-title">丁目・番地・号</p>
          <input
            type="text"
            v-model="houseNumber"
            class="house-number-input"
            placeholder="1-2-3"
            required
          />
        </div>
        <div class="building-name-input-container">
          <p class="building-name-title">建物名/会社名・部屋番号</p>
          <input
            type="text"
            v-model="buildingName"
            class="building-name-input"
            placeholder="〇〇マンション〇〇〇号室"
          />
        </div>
        <button class="address-admit-button" type="submit">
          この住所を登録
        </button>
        <div v-if="isAddressModalVisible" class="overlay"></div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prefectures: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県",
      ],
      isAddressModalVisible: false,
      postCode: "",
      selectedPrefecture: "",
      city: "",
      houseNumber: "",
      buildingName: "",
    };
  },
  methods: {
    submitForm() {
      const formPayload = {
        postCode: this.postCode,
        selectedPrefecture: this.selectedPrefecture,
        city: this.city,
        houseNumber: this.houseNumber,
        buildingName: this.buildingName,
      };
      this.$emit("submit-form", formPayload);

      this.postCode = "";
      this.selectedPrefecture = "";
      this.city = "";
      this.houseNumber = "";
      this.buildingName = "";
    },
    openAddressModal() {
      this.isAddressModalVisible = true;
    },
  },
};
</script>
<style scoped>
.address-modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 100vw;
  min-height: 50vh;
  top: 0;
  left: 0;
  z-index: 10;
  position: relative;
}
.address-modal {
  border: 1px solid black;
  width: 500px;
  height: 800px;
  background-color: white;
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.top-container {
  display: flex;
  font-size: 24px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(192, 192, 192);
  border: 1px solid black;
}
.top-message {
  padding: 10px 0 10px 120px;
  margin: 0;
}
.close-modal-button {
  font-size: 30px;
  background: none;
  color: inherit;
  border: none;
  padding-right: 20px;
  cursor: pointer;
  outline: inherit;
}
.address-input-container {
  margin-top: 30px;
}
.post-code-title {
  font-size: 24px;
}
.post-code-input {
  width: 30%;
}
.prefecture-input-container {
  margin-top: 30px;
}
.prefecture-title {
  font-size: 24px;
}
.city-input-container {
  margin-top: 30px;
}
.city-input {
  width: 80%;
}
.city-title {
  font-size: 24px;
}
.house-number-input-container {
  margin-top: 30px;
}
.house-number-title {
  font-size: 24px;
}
.building-name-input-container {
  margin-top: 30px;
}
.building-name-title {
  font-size: 24px;
}
.building-name-input {
  width: 80%;
}
.address-admit-button {
  font-size: 24px;
  margin-top: 90px;
  padding: 8px 14px;
}
.address-admit-button:hover {
  background-color: darkgray;
}
</style>
