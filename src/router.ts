import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// component: () => import("./views/A1.vue")
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: resolve => require(["./views/Home"], resolve)
    },
    {
      path: "/about",
      name: "about",
      component: resolve => require(["./views/About"], resolve),
      children: [
        {
          path: "/about",
          redirect: "/about/a"
        },
        {
          name: "a",
          path: "/about/a",
          component: resolve => require(["./views/A1"], resolve)
        },
        {
          name: "b",
          path: "/about/b",
          component: resolve => require(["./views/A2"], resolve)
        }
      ]
    },
    {
      path: "/other",
      name: "other",
      component: resolve => require(["./views/Other"], resolve)
    }
  ]
});
// 路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path == "/") {
//     // console.log(to.path);
//   } else {
//     // console.log(to.path);
//   }
//   next();
// });

export default router;
