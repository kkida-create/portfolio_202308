<template>
  <main>
    <div class="all-contents-wrapper">
      <div class="slide-contents">
        <img
          class="slide-image"
          :src="slideImage[countIndex]"
          alt="写真"
          :key="countIndex"
        />
      </div>
      <div class="trend-contents section">
        <h2 class="trend-contents-title">2023 SUMMER SELECT COLLECTION</h2>
        <ul class="trend-container">
          <li class="trend-box" v-for="item in firstCountItems" :key="item.id">
            <div class="trend-image-box" @click="CatalogDetails(item)">
              <img
                class="trend-image"
                src="../assets/product_sample.jpg"
                alt="写真"
              />
            </div>
            <p class="inner-text">{{ item.product_name }}</p>
            <p class="inner-text">{{ item.price.toLocaleString() }}円</p>
            <p class="inner-text">{{ item.description }}</p>
          </li>
        </ul>
      </div>
      <div class="sale-contents section">
        <h2 class="sale-contents-title">SALE ITEMS</h2>
        <ul class="sale-container">
          <li class="sale-box" v-for="item in secondCountItems" :key="item.id">
            <div
              class="sale-image-box"
              to="/productDetails"
              @click="CatalogDetails(item)"
            >
              <img
                class="sale-image"
                src="../assets/product_sample.jpg"
                alt="写真"
              />
            </div>
            <p class="inner-text">{{ item.product_name }}</p>
            <p class="inner-text">
              {{ item.special_price.toLocaleString() }}円
            </p>
          </li>
        </ul>
      </div>
      <div class="products-button">
        <router-link class="products-button-link" to="/product">
          <img
            class="products-search-icon"
            src="../assets/icon_search.png"
            alt="アイコン"
          />
          <p class="products-search-text">商品を探す</p>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { useProductStore } from "@/store/product";

const productStore = useProductStore();
import { useMerchandiseStore } from "@/store/merchandise.js";
export default {
  data() {
    return {
      slideImage: [
        require("../assets/slide_1.jpg"),
        require("../assets/slide_2.jpg"),
        require("../assets/slide_3.jpg"),
      ],
      countIndex: 0,
      slideContent: null,
      productStore,
    };
  },
  mounted() {
    this.startSlide();
    productStore.fetchProducts();
    window.scrollTo(0, 0);
  },
  computed: {
    firstCountItems() {
      const filterItems = productStore.products.filter(
        (value) => value.is_featured == 1
      );
      const sortItems = filterItems.sort((a, b) => b.rating - a.rating);
      return sortItems.slice(0, 3);
    },
    secondCountItems() {
      const filterItems = productStore.products.filter((value) => value.stock);
      const sortItems = filterItems.sort((a, b) => b.stock - a.stock);
      return sortItems.slice(0, 4);
    },
  },
  methods: {
    startSlide() {
      this.slideContent = setInterval(() => {
        this.countIndex = (this.countIndex + 1) % this.slideImage.length;
      }, 5000);
    },
    beforeChanging() {
      clearInterval(this.slideContent);
    },
    CatalogDetails(item) {
      const merchandiseStore = useMerchandiseStore();
      merchandiseStore.selectProduct({ ...item });
      this.$router.push({
        name: "productDetails",
        params: {
          product_id: item.product_id,
        },
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital@1&display=swap");
.all-contents-wrapper {
  background-color: #eeeeee;
  padding-bottom: 120px;
}
.slide-contents {
  width: 100vw;
  height: 100vh;
}
.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation-name: fadeInSlide;
  animation-duration: 5s;
  animation-fill-mode: forwards;
  opacity: 0;
}
@keyframes fadeInSlide {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}
.section {
  margin-top: 200px;
}
.trend-contents-title {
  text-align: center;
  font-size: 40px;
}
.trend-container {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 40px;
  padding-left: 0;
}
.trend-box {
  width: 30%;
}
.trend-box + .trend-box {
  margin-left: 20px;
}
.trend-image-box {
  display: block;
  background-color: #ffffff;
  height: auto;
  aspect-ratio: 4 / 3;
  text-align: center;
}
.trend-image {
  width: auto;
  height: 100%;
}
.inner-text {
  font-size: 18px;
  padding: 0 20px;
}
.inner-text:first-of-type {
  margin-top: 20px;
}
.trend-box .inner-text:last-of-type {
  font-size: 14px;
}
.sale-contents {
  padding: 0 10%;
}
.sale-contents-title {
  font-size: 40px;
  font-family: "Noto Serif", serif;
}
.sale-container {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 40px;
  padding-left: 0;
}
.sale-box + .sale-box {
  margin-left: 20px;
}
.sale-image-box {
  display: block;
  height: auto;
  aspect-ratio: 1 / 1;
  text-align: center;
  border-radius: 40px;
  position: relative;
}
.sale-image-box::before {
  content: "SALE";
  color: #ffffff;
  position: absolute;
  background-color: #ff0000;
  padding: 4px 12px;
  border-radius: 20px;
  top: 12px;
  right: 12px;
  border: 2px solid #ffffff;
}
.sale-image {
  width: 100%;
  height: auto;
  border-radius: 40px;
}
.sale-box .inner-text:last-of-type {
  color: #ff0000;
}
.products-button {
  display: flex;
  justify-content: center;
  margin-top: 120px;
}
.products-button-link {
  text-decoration: none;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 60px;
  border: 1px solid #000000;
}
.products-search-icon {
  width: 32px;
}
.products-search-text {
  margin-bottom: 0;
  font-size: 24px;
  margin-left: 20px;
}
.trend-image-box:hover,
.sale-image-box:hover,
.products-button-link:hover {
  box-shadow: 0 0 12px #a9a9a9;
  background-color: #ffffff;
}
</style>
