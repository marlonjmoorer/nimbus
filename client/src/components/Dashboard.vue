<template>
    <div class="card blue main">
        <div class="row">
        <div class="col s4">
            <a class="waves-effect waves-light btn" @click="selectedAccount=null">
                <i class="material-icons left">library_add</i>Add
            </a>
            <a class="waves-effect waves-light btn" v-if="selectedAccount!=null" @click="deleteAccount">
                <i class="material-icons left">delete</i>Delete
            </a>
            
            <ul class="collection" >
                <li class="collection-item avatar" 
                v-for="account in accounts" 
                :key="account.email"
                @click.prevent="selectedAccount=account"
                :class="{ active :selectedAccount==account}"
                
                >
                    <img :src="types[account.type]" width="12" alt="" class="circle">
                    <p>
                        {{account.email}}<br>
                    </p>
                   
                </li>
            </ul>
        </div>
        <div class="col s8">
            <account-selection v-if="selectedAccount==null"></account-selection>
            <template v-for="account in accounts" >
                <explorer :account="account" :key="account._id" v-if="selectedAccount==account" ></explorer>
            </template>
        </div>
        </div>
    </div>
  
</template>

<script>
import AccountSelection from "./AccountSelection.vue";
import Explorer from './Explorer.vue';
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
    AccountSelection,
    Explorer
  },
  methods:{
      async loadAccounts(){
          try {
              let res=await  axios.get("/accounts")
              this.accounts=res.data
              this.selectedAccount=null
          }catch (error) {
              console.error(error)
          }
      },
      async deleteAccount(){
          try {
              if(confirm("Are you sure you want to remove this account?")){
                  await  axios.post(`/accounts/disconnect/${this.selectedAccount._id}`)
                  
                  this.loadAccounts()
              }
               //let res=await  axios.get(`/accounts/disconnect/`)
          }catch (error) {
              console.log(error)
          }
      }
  },
  mounted() {
     
       $(".dropdown-button").dropdown({ belowOrigin: true});
      this.loadAccounts()
   
  }
};
</script>

<style>
.main {
  min-height: 100vh;
}
</style>
