import { createRouter, createWebHistory } from "vue-router";
import DiscordHome from "../components/discord/DiscordHome.vue"
import DiscordLogin from "../components/discord/DiscordLogin.vue";
import DiscordServer from "../components/discord/DiscordServer.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/discord",
            component: DiscordHome
        },
        {
            path: "/discord/login",
            component: DiscordLogin
        },
        {
            path: "/discord/server",
            component: DiscordServer
        },
    ],
});