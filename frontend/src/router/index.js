import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import DataTableView from "../views/DataTableView.vue";

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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
