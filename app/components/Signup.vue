<template>
   <div class="row">
        <div class="col s12">
          <div class="card-panel blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Login</span>
             <div class="row">
                <form class="col s12">
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
            <!-- <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div> -->
          </div>
        </div>
   </div>
</template>

<script>

import axiois from 'axios'
export default {

    data:()=>({
      email:"" ,
      password:"" 
    }),methods:{
        onSubmit(){
            
        }
    }
};
</script>

<style>

</style>
