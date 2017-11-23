<template>
  <div id="app" class="blue darken-1">
    <nav-bar/>
    <div class="wrapper">
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
    mounted(){
      
    },
    created(){
    }
  }

</script>

<style >
#app,html,body{
 height: 100vh;

}

.wrapper{
  
  height: 100%

}


</style>