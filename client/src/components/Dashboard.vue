<template>
    <div class="card blue main">
        <div class="row">
        <div class="col s3">
            <a class="waves-effect waves-light btn" @click="selectedAccount=null">
                <i class="material-icons left">library_add</i>Add
            </a>
            <ul class="collection" >
                <li class="collection-item avatar" 
                v-for="account in accounts" 
                :key="account.email"
                @click.prevent="selectedAccount=account"
                :class="{ active:selectedAccount==account}"
                >
                    <img :src="types[account.type]" alt="" class="circle">
                    <p>
                        {{account.email}}<br>
                        {{account.type}}
                    </p>
                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                </li>
               
            </ul>
        </div>
        <div class="col s9">
            <account-selection v-if="selectedAccount==null"></account-selection>
        </div>
        
        </div>
    </div>
  
</template>

<script>
import AccountSelection from "./AccountSelection.vue";
import axios from "axios";
export default {
  data: () => ({
    accounts: [],
    selectedAccount:null,
    types:require("../accountTypes")
    .map(t=>({[t.code]:t.image}))
    .reduce((result,item)=>({...result,...item}))
  }),
  components: {
    AccountSelection
  },
  methods:{
      async loadAccounts(){
          try {
              let res=await  axios.get("/accounts")
              this.accounts=res.data
          } catch (error) {
              console.error(error)
          }
          console.log(this.accounts)
      }
  },
  mounted() {
      console.log(this.types)
      
      this.loadAccounts()
   
  }
};
</script>

<style>
.main {
  min-height: 100vh;
}
</style>
