import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import DatabaseView from "../views/DatabaseView.vue";

const routes = [
    {
        path: "/",
        name: "index",
        component: IndexView,
    },
    {
        path: "/database",
        name: "database",
        component: DatabaseView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
