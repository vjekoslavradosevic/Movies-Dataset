import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createAuth0 } from "@auth0/auth0-vue";

const app = createApp(App);

const myWorker = new Worker("./worker.js");
app.config.globalProperties.$worker = myWorker;

app.use(
    createAuth0({
        domain: "dev-xim66l7npdohtkc2.us.auth0.com",
        clientId: "MK7BHULLeMLBuVjQh3MTXCpKMVP54lqC",
        authorizationParams: {
            redirect_uri: "http://localhost:8080/callback",
            audience: "http://localhost:3000",
            scope: "openid profile email refresh:dataset",
        },
    })
);

app.use(router).mount("#app");
