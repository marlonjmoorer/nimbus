<template>
   <div class="row">
        <div class="col s12">
          <div class="card-panel blue darken-4">
            <div class="card-content white-text">
              <span class="card-title">Login</span>
             <div class="row">
                <form class="col s12" @submit.prevent="onSubmit">
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="email" type="email" class="validate" v-model="email" autocomplete="off" >
                        <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="password" type="password" class="validate" v-model="password" autocomplete="off" >
                        <label for="password">Password</label>
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
</template>

<script>
import axios from 'axios'
import { mapMutations,mapState ,mapActions} from 'vuex'
export default {

    data:()=>({
      email:"" ,
      password:"" ,
      message:""
    }),methods:{
       ...mapActions(["login"]),
       async onSubmit(){
         Materialize.Toast.removeAll();
         console.log(this)
         var {email,password}=this
            this.message="";
            try {
                await this.login({email,password})
                Materialize.toast("success", 10000) 
                this.$router.push("/dashboard")
                    
            } catch (error) {
                //console.error(error) // from creation or business logic
                console.log(error.response.data.message)
                this.message=error.response.data.message
               Materialize.toast(this.message, 10000,"red") 
            }
        }
    }
};
</script>

<style>

</style>
