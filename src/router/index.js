import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventRegister from "@/views/event/EventRegister.vue";
import EventEdit from "@/views/event/EventEdit.vue";
import EventCreate from "@/views/EventCreate.vue";
import AboutView from "@/views/AboutView.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import NProgress from "nprogress";
import store from "@/store/index";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
      store.dispatch("fetchEvent", to.params.id).catch((error) => {
        if (error.response && error.response.status == 404) {
          return {
            name: "404Resource",
            params: { resource: "event" },
          };
        } else {
          return { name: "NetworkError" };
        }
      });
    },
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  {
    path: "/event/:id",
    redirect: () => {
      return { name: "EventDetails" };
    },
    children: [
      { path: "register", redirect: () => ({ name: "EventRegister" }) },
      { path: "edit", redirect: () => ({ name: "EventEdit" }) },
    ],
    // -- Alternative --
    // path: "/event/:afterEvent(.*)",
    // redirect: (to) => {
    //   return { path: "/events/" + to.params.afterEvent };
    // },
  },
  {
    path: "/event/create",
    name: "EventCreate",
    component: EventCreate,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/:catchAll(.*)",
    name: NotFound,
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
