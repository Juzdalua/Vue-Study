<template>
<div>
    <form class="upcomingForm" @submit.prevent="onSubmit()">
        <input placeholder="TITLE" type="text" v-model="title" required />
        <input placeholder="DESCRIPTION" type="text" v-model="description" required />
        <input placeholder="TAGS" type="text" v-model="tags" required />
        <input placeholder="CONTRACT_ADDRESS" type="text" v-model="contractAddress"  />

        <select v-model="category">
            <option disabled value="0">카테고리</option>
            <option v-for="(item, index) in state.categories" :key="index" :value="item.UID">{{item.NAME}}</option>
        </select>
        <input type="file" id="imageFile" @change="uploadImg()" ref="image" accept="image/*" multiple="multiple" required/>
        <img :src="imagePreview" />
        <input type="submit" value="Submit" />
        <!-- <button type="submit">Sumbit</button> -->
        <button @click="checkStore()">Check Store</button>
    </form>
</div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, computed } from "vue";
import { useStore } from 'vuex';

export default {
    name: "ArticlePost",
    components: {},
    props:{},
    data(){
        return {
            // title: "Arcade Land",
            // description: "Your avatar + your land = endless possibilities ",
            // tags: "Metaverse,Land",
            // contractAddress: "0x4a8C9D751EEAbc5521A68FB080DD7E72E46462aF",
            // image: "",
            // imagePreview: "",
            // category: null
            title: "",
            description: "",
            tags: "",
            contractAddress: "",
            image: "",
            imagePreview: "",
            category: null
        };
    },

    setup(){
        const store = useStore();
        const state = reactive({
            categories: computed(() => store.getters["categories"]),
        });

        onMounted( async() => {
            const categories = await axios.get("http://localhost:4000/discover/category")
            if(categories.status === 200)
                store.dispatch("categories", categories.data);
        });

        return {
            state
        };
    },

    methods: {
        checkStore(){
            console.log(this.state.categories)
            console.log(this.$store.getters["categories"])
        },

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
                title: this.title,
                description: this.description,
                tags: this.tags,
                contractAddress: this.contractAddress,
                category: this.category,
                cover: this.image,
            };

            let form = new FormData();
            for(const key of Object.entries(body)){
                form.append(key[0], key[1]);
            }
            console.log(Object.entries(body))

            try {
                const result = await axios.post(`http://172.30.1.33:4000/discover/article`, form);
                console.log(result)
                if(result.data.success){
                    alert("성공~!");
                    this.title = "",
                    this.description = "",
                    this.tags = "",
                    this.contractAddress = "",
                    this.category = "",
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