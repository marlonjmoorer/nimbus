<template>
  <div class="card main">
     
    <nav>
        <div class="nav-wrapper">
        <div class="col black s12">
            <a href="#!" class="breadcrumb"><i class="material-icons ">home</i></a>
            <a href="#!" class="breadcrumb">Second</a>
            <a href="#!" class="breadcrumb">Third</a>
        </div>
        </div>
    </nav> 
       <div v-if="!loading" class="collection">
            <a href="#" class="collection-item avatar black-text" v-for="file in files" :key="file.id">
             <i class="material-icons circle red">{{file.mimeType.includes('folder')?'folder':'insert_drive_file'}}</i>  
             <span class="">{{file.name}}</span> 
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
            loading:true
        }
    },
    
    mounted(){
        this.loading=true

        axios.get(`/explorer/${this.account._id}`).then(res=>{
            this.files=res.data
            this.loading=false
        }).then(()=>{
            console.log(this.files)
        })
    }
}
</script>

<style>

</style>
