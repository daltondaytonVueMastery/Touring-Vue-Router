import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventRegister from "@/views/event/EventRegister.vue";
import EventEdit from "@/views/event/EventEdit.vue";
import EventCreate from "@/views/EventCreate.vue";
import AboutView from "@/views/AboutView.vue";
import ErrorDisplay from "@/views/ErrorDisplay.vue";

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
    path: "/error/:error",
    name: "ErrorDisplay",
    props: true,
    component: ErrorDisplay,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
