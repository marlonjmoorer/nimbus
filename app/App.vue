<template>
  <div id="app">
    <nav-bar/>
    <div class="container">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/Navbar.vue';
  export default {
    name: 'app',
    components:{
      NavBar
    },
    created(){
    
    }
  }

</script>

<style>
 
</style>
