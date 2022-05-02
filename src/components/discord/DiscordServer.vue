<template>
<div>
    <div style="display: flex; justify-content:center;">
        <span v-if="state.guilds.length===0">HI Discord</span>
        <div v-if="state.guilds.length!==0" style="padding:20px; border:1px solid black; cursor:pointer;">
            <h2>{{state.user.username}}</h2>
            <h2 v-for="(item, index) in state.guilds" :key="index">{{state.guilds.length !== 0 ? state.guilds[0].name : ''}}</h2>
        </div>
    </div>
</div>
</template>

<script>
import {onMounted, reactive} from "vue";

export default {
    name: 'DiscordServer',
    components: {},

    setup(){
        const state = reactive({
            user: {},
            guilds: [],
        });

        let loginUser, guildsList;
        onMounted( async() => {
            const url = new URL(window.location.href);
            const code = url.searchParams.get("code")
            if(code){
                try {
                    const oauthResult = await fetch(`https://discord.com/api/oauth2/token`, {
                        method: 'POST',
                        body: new URLSearchParams({
                            client_id: process.env.VUE_APP_CLIENT_ID,
                            client_secret: process.env.VUE_APP_CLIENT_SECRET,
                            code,
                            grant_type: 'authorization_code',
                            redirect_uri: `http://localhost:4000/discord/signin`,
                            scope: 'identify',
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    });
                    const oauthData = await oauthResult.json();
                    if(!oauthData.access_token)
                        return;

                    const userResult = await fetch('https://discord.com/api/users/@me', {
                        headers: {
                            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
                        },
                    });
                    const guildsResult = await fetch('https://discord.com/api/users/@me/guilds', {
                        headers: {
                            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
                        },
                    });
                    loginUser = await userResult.json();
                    guildsList = await guildsResult.json();
                    console.log(loginUser, guildsList[0]);

                    state.user = loginUser;
                    state.guilds = [...guildsList];

                } catch (error) {
                    console.log(`get TOKEN ERROR: `, error);
                    return;
                }

            }

        });
        return {
            state,
        };
    },

}
</script>

<style lang="sass">

</style>