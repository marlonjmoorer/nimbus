<template>
 <b-card bg-variant="dark" v-if="true" >
       <b-container class="bv-example-row">
        <b-row align-h="center">
            <b-col md="5">
                  <b-alert variant="danger"
                        dismissible
                        :show="message!=''"
                        @dismissed="message=''">
               {{message}}
                </b-alert>
                <b-form @submit="onSubmit">
                    <b-card bg-variant="primary"  text-variant="white"
                        header="Login"
                        header-tag="header"
                        class="mt-2">
                        <b-img center src="https://www.mariowiki.com/images/thumb/8/8a/SMO_CLOUD.jpg/281px-SMO_CLOUD.jpg" fluid alt="Responsive image" />
                            <b-form-group 
                            label="Email address:" label-for="email"
                            >
                                <b-form-input id="email"
                                            type="email"  required
                                            v-model="email"
                                            placeholder="Enter email">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group 
                            label="Password:" label-for="password">
                                <b-form-input id="password"
                                            type="password"  required
                                            v-model="password"
                                            placeholder="Password">
                                </b-form-input>
                            </b-form-group>
                            
                            <b-row align-h="center">
                                <b-col md="4">
                                    <b-button  type="submit" variant="light">Submit</b-button>
                                </b-col>
                            </b-row>
                    </b-card>
                </b-form>
            </b-col>
        
        </b-row>
        </b-container>
        
   </b-card>

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
         
         console.log(this)
         var {email,password}=this
            this.message="";
            try {
                await this.login({email,password})
               
                this.$router.push("/dashboard")
                    
            } catch (error) {
                //console.error(error) // from creation or business logic
                console.log(error.response.data.message)
                this.message=error.response.data.message
              
            }
        }
    }
};
</script>

<style>

</style>
