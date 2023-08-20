<template>
  <div class="product-page" id="app">
    <div class="product-top">
      <div class="product-top-left">
        <div class="select_box">
          <div class="category-button" @click="categoryList = !categoryList">
            <div class="title">{{ selectedCategoryList }}<span>▼</span></div>
            <ul class="pets-filter" v-show="categoryList">
              <li
                v-on:click="all"
                :class="{ active: selectedCategoryList === '全商品' }"
              >
                全商品
              </li>
              <li
                v-on:click="outer"
                :class="{ active: selectedCategoryList === 'アウター' }"
              >
                アウター
              </li>
              <li
                v-on:click="tops"
                :class="{ active: selectedCategoryList === 'トップス' }"
              >
                トップス
              </li>
              <li
                v-on:click="bottoms"
                :class="{ active: selectedCategoryList === 'パンツ' }"
              >
                パンツ
              </li>
              <li
                v-on:click="inner"
                :class="{ active: selectedCategoryList === 'インナー' }"
              >
                インナー
              </li>
              <li
                v-on:click="roomWear"
                :class="{ active: selectedCategoryList === 'ルームウェア' }"
              >
                ルームウェア
              </li>
            </ul>
          </div>
        </div>
        <div class="sort-box">
          <div class="sort-button" v-on:click="getSortList">
            <div class="title">{{ selectedSort }}<span>▼</span></div>
            <ul class="sort" v-show="sortList">
              <li
                v-on:click="popular"
                :class="{ active: selectedSort === '人気順' }"
              >
                人気順
              </li>
              <li
                v-on:click="cheap"
                :class="{ active: selectedSort === '価格が安い順' }"
              >
                価格が安い順
              </li>
              <li
                v-on:click="expensive"
                :class="{ active: selectedSort === '価格が高い順' }"
              >
                価格が高い順
              </li>
              <li
                v-on:click="newItem"
                :class="{ active: selectedSort === '新着順' }"
              >
                新着順
              </li>
            </ul>
          </div>
        </div>
        <div class="searchField">
          <input type="text" v-model="keyword" class="search-text" />
        </div>
      </div>
      <div class="product-top-right">
        <div class="favorite-button">
          <button @click="favorite" class="favorite-screen">
            お気に入り画面
          </button>
        </div>
      </div>
    </div>
    <div class="item-list-warp">
      <div class="item-list">
        <div
          v-for="product in filteredProducts"
          :key="product.product_id"
          @click="CatalogDetails(product)"
          class="product"
        >
          <div
            v-show="isSelectedCategory(product.category_id)"
            class="product-explanation"
          >
            <img
              src="../assets/product_sample.jpg"
              alt="Product Image"
              class="product-image"
            />
            <div class="explanation">
              <div>{{ product.product_name }}</div>
              <div
                v-if="
                  ['0034', '0042', '0049', '0052'].includes(product.product_id)
                "
              >
                &yen;{{ product.special_price }}
              </div>
              <div v-else>&yen;{{ product.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useMerchandiseStore } from "@/store/merchandise.js";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      products: [],
      selectedCategory: null,
      pageNum: 0,
      currentPage: 1,
      sortList: false,
      categoryList: false,
      showOuter: true,
      showTops: true,
      showBottoms: true,
      showInner: true,
      showRoomWear: true,
      selectedCategoryList: "絞り込む",
      selectedSort: "人気順",
      keyword: "",
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    axios
      .get(
        "https://script.google.com/macros/s/AKfycby4ngFUSpA-VMSo2xv__tr8Hz4Y1w8J_xOC8IOodQWypAkEiqfD8HPsNTCa7U5c1Cjm/exec?sheetName=Product"
      )
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    CatalogDetails(product) {
      const merchandiseStore = useMerchandiseStore();
      const quantity = product.stock;
      merchandiseStore.selectProduct({ ...product, quantity });
      this.$router.push({
        name: "productDetails",
        params: {
          product_id: product.product_id,
        },
      });
    },
    getSortList: function () {
      this.sortList = !this.sortList;
    },
    popular() {
      this.selectedSort = "人気順";
      this.products = [...this.products];
      this.products.sort((a, b) => b.rating - a.rating);
    },
    cheap() {
      this.selectedSort = "価格が安い順";
      this.products = [...this.products];
      this.products.sort((a, b) => a.price - b.price);
    },
    expensive() {
      this.selectedSort = "価格が高い順";
      this.products = [...this.products];
      this.products.sort((a, b) => b.price - a.price);
    },
    newItem() {
      this.selectedSort = "新着順";
      this.products = [...this.products];
      this.products.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
    },
    all() {
      this.selectedCategory = 0;
      this.selectedCategoryList = "全商品";
    },
    outer() {
      this.selectedCategory = 1;
      this.selectedCategoryList = "アウター";
    },
    tops() {
      this.selectedCategory = 2;
      this.selectedCategoryList = "トップス";
    },
    bottoms() {
      this.selectedCategory = 3;
      this.selectedCategoryList = "パンツ";
    },
    inner() {
      this.selectedCategory = 4;
      this.selectedCategoryList = "インナー";
    },
    roomWear() {
      this.selectedCategory = 5;
      this.selectedCategoryList = "ルームウェア";
    },
    isSelectedCategory(category_id) {
      if (this.selectedCategory === null || this.selectedCategory === 0) {
        return true;
      } else {
        return this.selectedCategory === category_id;
      }
    },
    favorite() {
      this.$router.push("/favorite");
    },
    filterProducts: function (keyword) {
      return this.products.filter(function (product) {
        return product.product_name
          .toLowerCase()
          .includes(keyword.toLowerCase());
      });
    },
  },
  computed: {
    displayedPages: function () {
      const pageCount = this.pages;
      const currentPage = this.currentPage;
      const maxPagesToShow = 3;
      const pagesToShow = [];
      if (pageCount <= maxPagesToShow) {
        for (let i = 1; i <= pageCount; i++) {
          pagesToShow.push(i);
        }
      } else {
        const startPage = Math.max(
          1,
          currentPage - Math.floor(maxPagesToShow / 2)
        );
        const endPage = Math.min(startPage + maxPagesToShow - 1, pageCount);
        for (let i = startPage; i <= endPage; i++) {
          pagesToShow.push(i);
        }
      }
      return pagesToShow;
    },
    filteredProducts: function () {
      var keyword = this.keyword.toLowerCase();
      return this.products.filter(function (product) {
        return product.product_name.toLowerCase().includes(keyword);
      });
    },
  },
  watch: {
    keyword: function (newKeyword) {
      this.filteredProducts = this.filterProducts(newKeyword);
    },
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
span {
  justify-content: flex-end;
  display: flex;
}
.product-page {
  padding-top: 116px;
  background-color: #eeeeee;
  color: #000000;
}
.product-top {
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
}
.category-button,
.sort-button {
  cursor: pointer;
}
.select_box,
.sort-box {
  margin-right: 10px;
  border: 1px solid #000000;
  position: relative;
  width: 30%;
}
.title {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.pets-filter,
.sort {
  border: 1px solid #000000;
  position: absolute;
  width: 100%;
  background-color: #eeeeee;
}
.product-top-right {
  display: flex;
  justify-content: flex-end;
  width: 30%;
}
.product-top-left {
  display: flex;
  width: 70%;
}
ul {
  list-style: none;
  padding: 0;
}
.active {
  font-weight: bold;
}
.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-align: start;
  width: 100%;
}
.product {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
  margin: 1%;
  cursor: pointer;
}
.favorite-screen {
  border: 1px solid #000000;
  padding: 0 10px;
  height: 100%;
}
.searchField {
  width: 30%;
}
.search-text {
  background-color: #eeeeee;
  border: 1px solid #000000;
  width: 100%;
  height: 100%;
}
.product-image {
  object-fit: cover;
  width: 100%;
  height: 150px;
}
.explanation {
  text-align: start;
}
.item-list-warp {
  padding: 0 50px;
  display: flex;
  justify-content: flex-start;
}
</style>
