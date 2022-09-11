export default [
  {
    name: "center",
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    children: [
      {
        name: "myOrder",
        path: "myOrder",
        component: () => import("@/pages/Center/MyOrder"),
        meta: { show: true },
      },
      {
        name: "groupOrder",
        path: "groupOrder",
        component: () => import("@/pages/Center/GroupOrder"),
        meta: { show: true },
      },
      {
        path: "/center",
        redirect: "/center/myOrder",
      },
    ],
  },
  {
    name: "paySuccess",
    path: "/paySuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
  },
  {
    name: "pay",
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf("/trade") != -1) {
        //要去支付界面必是从trade来
        next();
      } else if (from.path == "/") {
        //判断是否刷新界面
        next();
      } else {
        //回到from.path的地址
        next(false);
      }
    },
  },
  {
    name: "trade",
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path.indexOf("/shopCart") != -1) {
        //要去交易界面必是从shopCart来
        next();
      } else if (from.path == "/") {
        //判断是否刷新界面
        next();
      } else {
        //回到from.path的地址
        next(false);
      }
    },
  },
  {
    name: "shopCart",
    path: "/shopCart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    name: "detail",
    path: "/detail/:skuId",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
  },
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
  {
    path: "/",
    redirect: "/home",
  },
];
