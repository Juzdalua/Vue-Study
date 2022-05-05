<template>
<div>
    <form class="upcomingForm" @submit.prevent="onSubmit()">
        <input placeholder="TITLE" type="text" v-model="title" required />
        <input placeholder="DESCRIPTION" type="text" v-model="description" required />
        <input placeholder="CONTRACT_ADDRESS" type="text" v-model="contractAddress" required />
        <input placeholder="IMAGE_URL" type="url" v-model="imageUrl"  />
        <input placeholder="VIDEO_URL" type="url" v-model="videoUrl"  />
        <select v-model="priority">
            <option disabled value="0">출력 순서</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <input type="submit" value="Submit" />
        <!-- <button type="submit">Sumbit</button> -->
    </form>
</div>
</template>

<script>
import axios from "axios";
// import { ref } from "vue";

export default {
    name: "TopbannerPost",
    components: {},
    props:{},
    data(){
        return {
            // title: "KIWAMI Genesis",
            // description: "Kiwami is a collection of 10,000 avatars. Carefully designed in the metaverse & born in Japan, holders can have a stake in the collection's future.",
            // contractAddress: "0x701a038af4bd0fc9b69a829ddcb2f61185a49568",
            // imageUrl: "https://d11gdi7lblcy6n.cloudfront.net/discovers/articles/beab15f8269510d7093c70967594dea761f95958dcdaf689bf0596cdfed83a48",
            // videoUrl: "",
            // priority: null
            title: "",
            description: "",
            contractAddress: "",
            imageUrl: "",
            videoUrl: "",
            priority: null
        };
    },

    setup(){

        return {

        };
    },

    methods: {
        async onSubmit(){

            const body = {
                title: this.title,
                description: this.description,
                contractAddress: this.contractAddress,
                imageUrl: this.imageUrl,
                videoUrl: this.videoUrl,
                priority: this.priority ? Number(this.priority) : null,
            };

            try {
                const result = await axios.post(`http://172.30.1.33:3000/discover/topbanner`, body);
                console.log(result)
                if(result && result.data.success){
                    alert("성공~!");
                    this.title = "",
                    this.description = "",
                    this.contractAddress = ""
                    this.imageUrl = "",
                    this.videoUrl = "",
                    this.priority = null
                }
            } catch (error) {
                console.log(error)
                alert("실패");
                return;
            }




        },
    },
}
</script>

<style>
    .upcomingForm{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }

    .upcomingForm > input, select, label{
        margin-top: 5px;
        padding: 5px 10px;
        width: 500px;
    }
</style>