<template>
   <b-card bg-variant="dark" >
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
                        header="Signup"
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
                            <b-form-group 
                            label="Confirm Password:" label-for="confirm_password">
                                <b-form-input id="confirm_password"
                                            type="password"  required
                                            v-model="confirm_password"
                                            placeholder="Conform Password">
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

export default {

    data:()=>({
      email:"" ,
      password:"" ,
      confirm_password:"",
      message:""
    }),methods:{
       async onSubmit(){
          
         var {email,password}=this
            this.message="";
            try {
                const response= await axios.post("/user/signup",{email,password})
                if (response.status==200){
                    this.$router.push("/login")
                    this.email="" 
                    this.password=""
                    this.confirm_password=""
                    this.message=response.data.message
                    this.success=true
                }
                
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
