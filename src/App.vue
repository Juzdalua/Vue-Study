<template>
<div>
  <router-view />
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <div>
    <input type="text" />
    <button @click="onClickPutStore()">Store</button>
    <span></span>
  </div> -->
  <div v-for="(item, index) in state.stats" :key="index" >
    <span>ID: {{item.id}}</span>
    <span style="margin-left: 10px;">NAME: {{item.name}}</span>
  </div>
  <button @click="onClickFrontend()">Add to Discord with Frontend</button><br/>
  <button @click="onClickBackend()">Add to Discord with Backend</button>
</div>
</template>

<script>
import {onMounted, reactive, computed} from "vue";
import axios from "axios";
import { useStore } from 'vuex';
// import data from "./data";

export default {  
  name: 'App',
  components: {},
  data(){
    return {
      response: "Home"
    }
  },

  setup() {
    const store = useStore();
    const state = reactive({
      stats: [
        {
          id:0,
          name:''
        }
      ],
      response: computed( () => store.state.response)
    });

    onMounted( async() => {
      
      const overview = await axios.get("http://localhost:4000/overview");
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
