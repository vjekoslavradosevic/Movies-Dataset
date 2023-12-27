import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import DataTableView from "../views/DataTableView.vue";
import CallbackView from "../views/CallbackView.vue";
import InfoView from "../views/InfoView.vue";

const routes = [
    {
        path: "/",
        name: "index",
        component: IndexView,
    },
    {
        path: "/datatable",
        name: "datatable",
        component: DataTableView,
    },
    {
        path: "/callback",
        name: "callback",
        component: CallbackView,
    },
    {
        path: "/info",
        name: "info",
        component: InfoView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
