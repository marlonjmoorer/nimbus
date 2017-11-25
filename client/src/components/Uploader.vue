

<template>
   <ul class="collapsible" data-collapsible="accordion">
            <li>
            <div class="collapsible-header">
                <i class="material-icons">filter_drama</i>First
               
                <div class="progress">
                    <div class="determinate" :style="{width:`${percent}%`}"></div>
                </div> 
                <span>{{percent}}</span>
            </div>
            <div class="collapsible-body">
                 <ul class="collection">
                    <li v-for="file in uploadQueue" :key="file.name" class="collection-item">{{file.name}}</li>
                    
                </ul>
            </div>
            </li>
    </ul>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import io from 'socket.io-client';
import axios from 'axios';


export default {
  data: () => ({
    percent: 0
  }),
  computed: {
    ...mapState(["uploadQueue"])
  },
  methods: {
    send(data) {
        console.log(data)
        let form= new FormData()
        form.append("file",data.file)
        form.append("accountId",data.accountId)
        form.append("folderId",data.folder.id)
        axios.post("/explorer/upload", form , {
          onUploadProgress: e => {
            console.log(e);
            this.percent=Math.floor(e.loaded / e.total * 100);
          }
        })
        .then(() => {
          let socket= io(`/${data.file.id}`)
          socket.on("progress",(num)=>{
            this.percent=num
          })
          
          console.log("done");
        }).catch(err=>{
            console.log(err)
        })
    }
  },
  mounted() {

    $(".collapsible").collapsible();
    console.log(this.uploadQueue);
    this.uploadQueue.forEach(item=> {
        this.send(item)
    });
  }
};
</script>

<style>

</style>
