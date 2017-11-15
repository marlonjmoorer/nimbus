<template>
  <div id="app" class="blue darken-1">
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
      console.log(this.$store.state)
    
    }
  }

</script>

<style >
#app,html,body{
  height: 100vh;

}
</style>