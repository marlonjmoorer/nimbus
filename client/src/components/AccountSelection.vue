<template>
  <div class="card main">
      <div class="row">
          
     <div v-for="entry in accountTypes" :key="entry.type" class="col m4">
       <div class="card blue darken-2 ">
     
        <div class="card-content center-align">  
            <img class="responsive-img center-align" width="80" :src="entry.image"/>
         <span class="card-title white-text">{{entry.name}}</span>
         <a :href="entry.url" class="btn">Add</a>
        </div>
        
      </div>
     </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountTypes: require("../accountTypes")
    };
  },
  mounted() {
   
  }
};
</script>

<style>

</style>
