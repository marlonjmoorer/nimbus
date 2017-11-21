<template>
    <div class="card main">
        <ul id="menu" class="dropdown-content">
            <li><a href="#!">Upload</a></li>
            <li><a href="#!">Delete</a></li>
        </ul>
        <nav>
            <div class="nav-wrapper black">
                <div class="col black s12">
                    <a v-for="folder in folders" :key="folder" href="#!" class="breadcrumb">
                        <i v-if="!folder" class="material-icons ">home</i>
                        <span v-else>{{folder}}</span>
                    </a>
                    
                    <ul class="right hide-on-med-and-down">
                        <li><a class="dropdown-button" href="#!" data-activates="menu"><i class="material-icons right">more_vert</i></a></li>
                    </ul>
                </div>  
            </div>
        </nav>
        
        <div v-if="!loading" class="collection">
            <a href="#" class="collection-item avatar black-text" @click.prevent="open(file)" v-for="file in files" :key="file.id">
                <i class="material-icons circle black">{{file.mimeType.includes('folder')?'folder':'insert_drive_file'}}</i>  
                <span class="">{{file.name}}</span> 

                <a href="#!"  class="secondary-content">
                    <img class="square responsive-img" :src="file.iconLink"/>
                </a>
            </a>
        </div>
        

        <div v-else>
            Loading ......
                <div class="preloader-wrapper active">
                <div class="spinner-layer spinner-red-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
        </div>
    </div>
  </template>

<script>
import axios from "axios";
export default {
    props:["account"],
    data() {
        return {
            files:[],
            loading:true,
            folders:[]
        }
    },
    methods:{
        open(item){
            console.log(item)
            if(item.mimeType.includes('folder')){
                
            }
        }
    },
    mounted(){
        this.loading=true
         $(".dropdown-button").dropdown();
        axios.get(`/explorer/${this.account._id}`).then(res=>{
            this.files=res.data.files
            this.folders.push(res.data.folder)
            this.loading=false
        }).then(()=>{
            
        })
    }
}
</script>

<style>

</style>
