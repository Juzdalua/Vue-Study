<template>
<div>
  <div class="PostBtn">
    <!-- <button @click="goDiscord()" >
      <router-link to="/discord/login">Discord</router-link>
    </button><br/>
    <button @click="goDiscord()" >
      <router-link to="/discord/server">Discord</router-link>
    </button><br/> -->

    <button @click="goDiscord()" >
      <router-link to="/discover/upcoming">Upcoming POST</router-link>
    </button>
    <button @click="goDiscord()" >
      <router-link to="/discover/topbanner">Topbanner POST</router-link>
    </button>
  </div>
  <router-view />
</div>
</template>

<script>
  export default {
    name: "MainPage",
    components: {},
    props: {},
    // data(){
    //   return {

    //   },
    // },
    setup(){
      const goDiscord = () => {

      }
      return {
        goDiscord,
      };
    }
  }
</script>

<style>
  .PostBtn{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .PostBtn > button {
    margin-top: 10px;
  }
</style>
