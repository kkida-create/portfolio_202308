import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/top",
  },
  {
    path: "/top",
    name: "top",
    component: () =>
      import(/* webpackChunkName: "top" */ "../views/TopView.vue"),
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "display" */ "../views/LoginPage.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/ContactView.vue"),
  },
  {
    path: "/contact-confirm",
    name: "contactConfirm",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "contactConfirm" */ "../views/ContactConfirm.vue"
      ),
    beforeEnter: (to, from, next) => {
      if (from.name === "contact") {
        next();
      } else {
        next("/contact");
      }
    },
  },
  {
    path: "/cart-list",
    name: "CartList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "CartList" */ "../views/CartListView.vue"),
  },
  {
    path: "/cart-payment",
    name: "CartPayment",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CartPayment" */ "../views/CartPaymentView.vue"
      ),
  },
  {
    path: "/cart-check",
    name: "CartCheck",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "CartCheck" */ "../views/CartCheckView.vue"),
  },
  {
    path: "/cart-complete",
    name: "CartComplete",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CartComplete" */ "../views/CartCompleteView.vue"
      ),
  },
  {
    path: "/product",
    name: "Product",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Product" */ "../views/ProductView.vue"),
  },
  {
    path: "/productDetails",
    name: "productDetails",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails" */ "../views/ProductDetailsView.vue"
      ),
  },
  {
    path: "/favorite",
    name: "Favorite",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Favorite" */ "../views/FavoriteView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
