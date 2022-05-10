import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue"
import DiscordHome from "../components/discord/DiscordHome.vue"
import DiscordLogin from "../components/discord/DiscordLogin.vue";
import DiscordServer from "../components/discord/DiscordServer.vue";
import UpcomingHome from "../components/discover/upcoming/Upcoming.vue"
import TopbannerHome from "../components/discover/topbanner/Topbanner.vue"
import ArticleHome from "../components/discover/article/Article.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: MainPage
        },
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
        {
            path: "/discover/upcoming",
            component: UpcomingHome
        },
        {
            path: "/discover/topbanner",
            component: TopbannerHome
        },
        {
            path: "/discover/article",
            component: ArticleHome
        },
    ],
});