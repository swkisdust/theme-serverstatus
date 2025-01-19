import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Server from "./routes/Server.vue";
import NotFound from "./routes/NotFound.vue";
import { createMemoryHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      component: Server,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

createApp(App).use(router).mount("#app");
