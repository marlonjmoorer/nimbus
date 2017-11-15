<template>
   <div class="row">
        <div class="col s12">
          <div class="card-panel blue darken-4">
            <div class="card-content white-text">
              <span class="card-title">Signup</span>
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

export default {

    data:()=>({
      email:"" ,
      password:"" ,
      message:""
    }),methods:{
       async onSubmit(){
          
         var {email,password}=this
            this.message="";
            try {
                const response= await axios.post("/user/signup",{email,password})
                if (response.status==200){
                    
                    var button=$("<button>")
                    .addClass("btn-flat red=")
                    .text('Login')
                    .click(()=>{
                       Materialize.Toast.removeAll();
                       this.$router.push("/login")
                    })
                   
                    
                    this.email="" 
                    this.password=""
                    this.message=response.data.message
                    this.success=true
                    Materialize.toast(this.message, 10000) 
                    Materialize.toast(button, 10000) 
                }
                
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
