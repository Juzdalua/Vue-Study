import { createRouter, createWebHistory } from "vue-router";
import DiscordLogin from "./components/pages/DiscordLogin.vue";
import DiscordServer from "./components/pages/DiscordServer.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/discord",
            component: DiscordLogin
        },
        {
            path: "/server",
            component: DiscordServer
        },
    ],
});