<template>
    <div  class="collection">
        <a href="#" class="collection-item avatar black-text" @click.prevent="open(file)" v-for="file in files" :key="file.id">
            <i class="material-icons circle black">{{file.mimeType.includes('folder')?'folder':'insert_drive_file'}}</i>  
            <span class="">{{file.name}}</span> 

            <a href="#!"  class="secondary-content">
                <img class="square responsive-img" :src="file.iconLink"/>
            </a>
        </a>
    </div>  
</template>

<script>
import axios from "axios";
export default {
   props:["files","openFolder"],
    data() {
        return {
            //files:[],
        }
    },
    methods:{
        open(item){
            if(item.mimeType=="application/vnd.google-apps.folder"){
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
