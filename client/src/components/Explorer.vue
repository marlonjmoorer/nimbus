<template>
    <div class="card main">
        <input v-show="false" @change="uploadFile($event.target.files[0])" id="file" type="file">
        <ul id="menu" class="dropdown-content">
            <li>
                <a @click.prevent="fileDialog" href="#!">Upload</a>
            </li>
            <li><a href="#!">Delete</a></li>
        </ul>
        <nav>
            <div class="nav-wrapper black">
                <div class="col black s12">
                    <template v-for="(folder,index) in path">
                        <a class="breadcrumb" v-if="index==path.length-1" :key="index" data-activates="menu" >
                            <span >{{folder.name}}</span>
                        </a>
                        <a class="breadcrumb" href="#!" v-else :key="index" 
                             @click.prevent="openFolder(folder.id)">
                            <span >{{folder.name}}</span>
                        </a>
                    </template>
                    <ul class="right hide-on-med-and-down">
                        <li><a class="dropdown-button" href="#!" data-activates="menu"><i class="material-icons right">more_vert</i></a></li>
                    </ul>
                </div>  
            </div>
        </nav>
        <component v-if="!loading" :is="explorerComponent"></component>
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

import DriveView from './ExplorerViews/DriveView.vue';
import DropboxView from './ExplorerViews/DropboxView.vue';
import FtpView from './ExplorerViews/FtpView.vue';
import { mapMutations,mapState,mapActions } from 'vuex'
export default {
    props:["account"],
    components:{
        DriveView,
        DropboxView,
        FtpView
    },
    data() {
        return {
            explorerComponent:null,
        }
    },
    methods:{
        ...mapActions(["openFolder","uploadFile"]),
        fileDialog(){
            document.getElementById('file').click()
             //Materialize.toast('I am a toast!')
        }
    },
    computed:{
        ...mapState(['selectedAccount','path',"loading"])
    },
    mounted(){
       
        $(".dropdown-button").dropdown();
        this.openFolder()
        switch(this.selectedAccount.type){
            case "drive":
                this.explorerComponent="driveView"
                break;
            case "drop":
                this.explorerComponent="dropboxView"
                break;
             case "ftp":
                this.explorerComponent="ftpView"
                break;
        }
    },
    
}
</script>

<style>

</style>
