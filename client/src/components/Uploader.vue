


<template>
   <ul class="collapsible" data-collapsible="accordion">
            <li>
            <div class="collapsible-header">
                <i class="material-icons">filter_drama</i>First
               
                <div class="progress">
                    <div class="determinate" :style="{width: percent}"></div>
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
import { mapMutations,mapState,mapActions } from 'vuex'
var io= require('socket.io-client')
import ss from 'socket.io-stream'
export default {
    data:()=>({
        percent:0
    }),
    computed:{
        ...mapState(["uploadQueue"])
    },
    mounted(){
        let socket =io()
        let stream = ss.createStream();
        let {file,accountId, folder}= this.uploadQueue[0]
        let {name,size,type}=file;
        ss(socket).emit("begin",stream,{accountId,folder,fileMeta:{name,size,type}})
        var blobStream = ss.createBlobReadStream(file);
        var size2 = 0;

        blobStream.on('data',(chunk)=> {
            size2 += chunk.length;
            this.percent=`${Math.floor(size2 / file.size * 100)}%`
        // -> e.g. '42%'
        });
        blobStream.pipe(stream);

        $('.collapsible').collapsible();
        console.log(this.uploadQueue)
    }
}
</script>

<style>

</style>
