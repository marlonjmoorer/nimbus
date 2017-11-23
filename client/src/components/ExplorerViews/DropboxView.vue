<template>
    <div  class="collection">
        <a href="#" class="collection-item avatar black-text" @dblclick="open(file)" @click.prevent="''"  v-for="file in  currentFiles" :key="file.id">
            <i class="material-icons circle black">{{file[".tag"]=="folder"?'folder':'insert_drive_file'}}</i>  
            <span class="">{{file.name}}</span> 

            <a href="#!"  class="secondary-content">
               <!--  <img class="square responsive-img" :src="file.iconLink"/> -->
            </a>
        </a>
    </div> 
    
</template>

<script>
import { mapMutations,mapState,mapActions } from 'vuex'
export default {
  
   computed:{
        ...mapState(["currentFiles"])
    },
    methods:{
        ...mapActions(["openFolder"]),
        open(item){
            if(item[".tag"]=="folder"){
                this.openFolder(item.id)
            }
        }
    },
    mounted(){
       console.log(this.files)
    }
}
</script>

<style>

</style>
