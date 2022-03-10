<template>
  <router-view />
  <img alt="Vue logo" src="./assets/logo.png">
  <div v-for="(item, index) in state.stats" :key="index" >
    <span>ID: {{item.id}}</span>
    <span style="margin-left: 10px;">NAME: {{item.name}}</span>
  </div>
  <button @click="onClick()">Add to Discord</button>
</template>

<script>
import {onMounted, reactive} from "vue";
import axios from "axios";
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
    const state = reactive({
      stats: [
        {
          id:0,
          name:''
        }
      ],
    });

    onMounted( async() => {
      
      const overview = await axios.get("http://localhost:4000/overview");
      if(overview){
       state.stats = overview.data ;
      }//if
    });

    const onClick = () => {      
      location.href=`https://discord.com/api/oauth2/authorize?${process.env.VUE_APP_IDENTIFY}`;
    };

    return {
      state,
      onClick
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
