<template>
<div>
  <button class="home" >
    <router-link to="/">Home</router-link>
  </button><br/>

  <router-view />
</div>
</template>

<script>
  export default {
    name: "app",
    components: {},
    props: {},
    data(){
      return {

      };
    },
    setup(){

      return {

      };
    }
  }
</script>

<style>
  .home{
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
