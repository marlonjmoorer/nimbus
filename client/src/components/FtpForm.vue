<template>
  <div class="container">
    <div class="row">
        <div class="col s12">
          <div class="card-panel ">
            <div class="card-content ">
              <span class="card-title">FTP</span>
              <div class="row">
                 <form class="col s12" @submit.prevent="submit" autocomplete="off">

                    <input style="display:none;" type="text" name="email" />
                    <input style="display:none;" type="password" name="password" />
                    
                   <!--  <div class="row">
                        <div class="input-field col s12">
                            <select  v-model="protocol.val" >
                                <option :value="''"></option>
                                <option :value="1">FTP</option>
                                <option :value="2">SFTP</option>
                            </select>
                            <label>Protocol</label>
                        </div>
                    </div> -->
                   
                    <div class="row">
                        <div class="input-field col s10">
                            <input  id="host" type="text" class="validate" v-model="host">
                            <label for="host">Host</label>
                        </div>
                        <div class="input-field col s2">
                            <input id="port" type="text" class="validate"  v-model="port">
                            <label for="port">Port</label>
                        </div>
                       
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="username" type="text" class="validate" v-model="username">
                        <label for="username">Username</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="password" type="password" class="validate" v-model="password">
                        <label for="password">Password</label>
                        </div>
                    </div>
                    <div class="row" v-if="protocol=='sftp'">
                        <div class="input-field col s12">
                        <textarea id="key" class="materialize-textarea" v-model="key"></textarea>
                        <label for="key">Key</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </form>  
             </div>
            </div>
          </div>
        </div>
   </div>
 
  </div>
</template>

<script>
import axios from "axios";
export default {
    data:()=>({
        port:22,
        protocol:'sftp',
        host:'',
        key:'',
        username:'',
        password:''
    }),
    methods:{
        submit(){
            var{port,host,key,username,password}=this
            if(port&&host&&username&&(key||password)){
                axios.post("/ftp/signin",{port,username,key,password,host}).then(res=>{
                console.log(res)
                 this.$router.push("/dashboard")
                }).catch(err=>{
                console.log(err.response.data)
                })
            }
        },

    },
    mounted(){
        console.log(this.port)
        $('select').material_select();
    },
    updated(){
        console.log(this.protocol)
    }

}
</script>

<style>

</style>
