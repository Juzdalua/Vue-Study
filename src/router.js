import { createRouter, createWebHistory } from "vue-router";
import DiscordLogin from "./components/pages/DiscordLogin.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/discord",
            component: DiscordLogin
        },
    ],
});