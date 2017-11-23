<template>
    <div  class="collection">
        <a href="#" class="collection-item avatar black-text"
         @dblclick="open(file)" 
         @click.prevent="SELECT_FILE(file)"
         :class="{ active :selectedFile==file}"
          v-for="file in currentFiles" :key="file.id">
            <i class="material-icons circle black">{{file.mimeType.includes('folder')?'folder':'insert_drive_file'}}</i>  
            <span class="">{{file.name}}</span> 

            <a href="#!"  class="secondary-content">
                <img class="square responsive-img" :src="file.iconLink"/>
            </a>
        </a>
    </div>  
</template>

<script>
import { mapMutations,mapState,mapActions } from 'vuex'
export default {
  // props:["files","openFolder"],
   
    computed:{
        ...mapState(["currentFiles","selectedFile"])
    },
    methods:{
        ...mapActions(["openFolder"]),
        ...mapMutations(["SELECT_FILE"]),
        open(item){
            console.log(item)
            if(item.mimeType=="application/vnd.google-apps.folder"){
                console.log(item.id)
                this.openFolder(item.id)
            }
        }
    },
    mounted(){
       
    }
}
</script>

<style>

</style>
