const c1 = () => import(/* webpackChunkName: "page--src--pages--404-vue" */ "/Volumes/Big Mama/Documents/Projets/NWS/Cours Jamstack/Developpeur UE 3 - année 2/vuejs-api-call/src/pages/404.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Volumes/Big Mama/Documents/Projets/NWS/Cours Jamstack/Developpeur UE 3 - année 2/vuejs-api-call/src/pages/Index.vue")

export default [
  {
    name: "404",
    path: "/404/",
    component: c1
  },
  {
    name: "home",
    path: "/",
    component: c2
  },
  {
    name: "*",
    path: "*",
    component: c1
  }
]
