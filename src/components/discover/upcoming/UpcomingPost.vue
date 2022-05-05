<template>
<div>
    <form class="upcomingForm" @submit.prevent="onSubmit()">
        <input placeholder="COLLECTION_NAME" type="text" v-model="collectionName" required />
        <input placeholder="DUE_DATE" type="datetime" v-model="dueDate" required />
        <input placeholder="WEBSITE_URL" type="url" v-model="websiteUrl" required />
        <input placeholder="MINT_PRICE" type="text" v-model="mintPrice" required />
        <select v-model="network">
            <option disabled value="0">Please select one</option>
            <option value="ETH">Ethereum</option>
        </select>
        <input type="file" id="imageFile" @change="uploadImg()" ref="image" accept="image/*" multiple="multiple" required/>
        <img :src="imagePreview" />
        <input type="submit" value="Submit" />
        <!-- <button type="submit">Sumbit</button> -->
    </form>
</div>
</template>

<script>
import axios from "axios";
// import { ref } from "vue";

export default {
    name: "UpcomingPost",
    components: {},
    props:{},
    data(){
        return {
            // collectionName: "Retro Rollers123",
            // dueDate: "2022-05-05 21:00:00",
            // websiteUrl: "https://twitter.com/RetroRollersNFT",
            // image: "",
            // imagePreview: "",
            // mintPrice: "0.08",
            // network: "ETH",
            collectionName: "",
            dueDate: "",
            websiteUrl: "",
            imageUrl: "",
            mintPrice: "",
            network: "",
        };
    },

    setup(){

        return {

        };
    },

    methods: {
        uploadImg(){
            // form data
            const image = this.$refs['image'].files[0];
            this.image = image;

            // preview
            const objectUrl = URL.createObjectURL(image);
            this.imagePreview = objectUrl;
        },

        async onSubmit(){

            const body = {
                collectionName: this.collectionName,
                dueDate: this.dueDate,
                websiteUrl: this.websiteUrl,
                cover: this.image,
                mintPrice: this.mintPrice,
                network: this.network
            };

            let form = new FormData();
            for(const key of Object.entries(body)){
                form.append(key[0], key[1]);
            }

            try {
                const result = await axios.post(`http://172.30.1.33:3000/discover/upcoming`, form);
                console.log(result)
                if(result.data.success){
                    alert("성공~!");
                    this.collectionName = "",
                    this.dueDate = "",
                    this.websiteUrl = "",
                    this.image = "",
                    this.imagePreview = "",
                    this.mintPrice = "",
                    this.network = "0",
                    this.imagePreview = ""
                }
            } catch (error) {
                alert("실패")
                return ;
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