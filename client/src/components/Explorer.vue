<template>
    <div class="card main">
        <ul id="menu" class="dropdown-content">
            <li><a href="#!">Upload</a></li>
            <li><a href="#!">Delete</a></li>
        </ul>
        <nav>
            <div class="nav-wrapper black">
                <div class="col black s12">
                    <a v-for="(folder,index) in folders"  
                    @click.prevent=" index!=folders.length-1?goToFolder(folder):''"
                     :key="folder.id" href="#!" class="breadcrumb">
                        <i v-if="folder==''" class="material-icons ">home</i>
                        <span v-else>{{folder.name}}</span>
                    </a>
                    
                    <ul class="right hide-on-med-and-down">
                        <li><a class="dropdown-button" href="#!" data-activates="menu"><i class="material-icons right">more_vert</i></a></li>
                    </ul>
                </div>  
            </div>
        </nav>
        <component v-if="!loading" :files="files" :openFolder="openFolder" :is="explorerComponent"></component>
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
import DriveView from './ExplorerViews/DriveView.vue';
import DropboxView from './ExplorerViews/DropboxView.vue';

export default {
    props:["account"],
    components:{
        DriveView,
        DropboxView
    },
    data() {
        return {
            files:[],
            loading:true,
            folders:[],
            explorerComponent:null,
            current:null
        }
    },
    methods:{
        openFolder(id){
            console.log(id)
             this.loading=true
            axios.get(`/explorer/${this.account._id}/${id}`).then(res=>{
                this.files=res.data.files
                if(this.current.id!=res.data.folder.id){
                   this.folders.push(res.data.folder)
                   this.current=res.data.folder 
                }
                this.loading=false
                
            })
           
        },
        openRoot(){
            this.loading=true
            axios.get(`/explorer/${this.account._id}`).then(res=>{
                this.files=res.data.files
                if(this.current!=res.data.folder){
                   this.folders.push(res.data.folder)
                   this.current=res.data.folder 
                }
                this.loading=false
            })
        },

        goToFolder(folder){
            console.log(folder)
            let index= this.folders.indexOf(folder)
            console.log(index)
            this.current=folder 
            this.$nextTick(function() {
                if(this.folders.length>1){
                    this.folders= this.folders.slice(0,index+1)

                    if(folder){
                        this.openFolder(folder.id)
                    }else{
                        this.openRoot()
                    }
                }
            })
            
            
            
            
        }
    },
    mounted(){
       
        $(".dropdown-button").dropdown();
        this.openRoot()

        switch(this.account.type){
            case "drive":
                this.explorerComponent="driveView"
                break;
            case "drop":
                this.explorerComponent="dropboxView"
                break;

        }
    },
    
}
</script>

<style>

</style>
