<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <h4>{{state.name}}</h4>
    <button @click="getData">가져오기</button>
  </div>
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
      name: '',
    });

    onMounted( async() => {
      const overview = await axios.get("http://localhost:4000/1");
      if(overview){
       state.name = overview.data ;
      }//if
    });
    return {
      state
      };
  },


  methods: {
    async getData(){
      const response = await axios.get("http://localhost:4000/1");
      // console.log(response)
      this.response = response.data
    }
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
