<template>
    <div>
        <div>
            <button @click="goHome()">HOME</button>
        </div>
        <router-view />

        <div v-for="(item, index) in state.stats" :key="index" >
            <span>ID: {{item.id}}</span>
            <span style="margin-left: 10px;">NAME: {{item.name}}</span>
            <span style="margin-left: 10px;">AGE: {{item.age}}</span>
        </div>
        <button @click="onClickFrontend()">Add to Discord with Frontend</button><br/>
        <button @click="onClickBackend()">Add to Discord with Backend</button>
        <form v-on:submit.prevent="onSubmitForm()">
            <input v-model="name" id="name" type="text" placeholder="name"/>
            <input v-model="age" id="age" type="number" placeholder="age"/>
            <input type="submit"/>
        </form>
    </div>
</template>

<script>
import {onMounted, reactive, computed} from "vue";
import axios from "axios";
import { useStore } from 'vuex';
// import data from "./data";

export default {
  name: 'DiscordHome',
  components: {},
  props: {},
  data(){
    return {
      response: "Home",
      name: "",
      age: "",
    }
  },

  setup() {
    const store = useStore();
    const state = reactive({
      stats: [
        {
          id:0,
          name:'',
          age:'',
        }
      ],
      response: computed( () => store.state.response)
    });

    onMounted( async() => {

      const overview = await axios.get("http://localhost:4000/overview?page=1");
      if(overview){
       state.stats = overview.data ;
      }//if
    });

    const onClickFrontend = () => {
      location.href=`https://discord.com/api/oauth2/authorize?${process.env.VUE_APP_IDENTIFY_FRONT}`;
    };

    const onClickBackend = () => {
      location.href=`https://discord.com/api/oauth2/authorize?${process.env.VUE_APP_IDENTIFY_BACK}`;

    };

    const onClickPutStore = () => {

    };

    return {
      store,
      state,
      onClickPutStore,
      onClickFrontend,
      onClickBackend
      };
  },


  methods: {
    goHome(){
      location.href="http://localhost:8080";
    },

    async onSubmitForm(){
      // console.log(this.name, this.age);
      if(this.name && this.age){
        const body = {
          name: this.name,
          age: this.age,
        };
        const result = await axios.post(`http://localhost:4000/user/create`, body, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        // console.log(result);
        if(result.status === 201)
          this.$router.go();
      } //if
    }, //onSubmitForm

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>