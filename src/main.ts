import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Server from "./routes/Server.vue";
import Service from "./routes/Service.vue";
import NotFound from "./routes/NotFound.vue";
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Server,
      meta: {
        keepAlive: true,
      },
    },
    {
      path: "/service",
      component: Service,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

const app = createApp(App);

app.use(router);
app.mount("#app");
