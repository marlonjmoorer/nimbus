<template>
    <div>
    <div class="row">
        <uploader v-if="uploadQueue.length>0"></uploader>
    </div>
   
    <div class="row">
         <div class="card blue main">
        <div class="row">
        <div class="col s4">
            <a class="waves-effect waves-light btn" @click="SELECT_ACCOUNT()">
                <i class="material-icons left">library_add</i>Add
            </a>
            <a class="waves-effect waves-light btn" v-if="selectedAccount!=null" @click="deleteAccount">
                <i class="material-icons left">delete</i>Delete
            </a>
            
            <ul class="collection" >
                <li class="collection-item avatar" 
                v-for="account in accounts" 
                :key="account.email"
                @click.prevent="SELECT_ACCOUNT(account)"
                :class="{ active :selectedAccount==account}"
                
                >
                    <img :src="accountTypes[account.type]" width="12" alt="" class="circle">
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
    </div>
   
    </div>
</template>

<script>
import AccountSelection from "./AccountSelection.vue";
import Explorer from './Explorer.vue';
import Uploader from './Uploader.vue';

import { mapMutations,mapState,mapActions } from 'vuex'
export default {
  data: () => ({

  }),
  components: {
    AccountSelection,
    Explorer,
    Uploader
  },
  computed:{
      ...mapState(["accounts","selectedAccount","accountTypes","uploadQueue"])
  },
  methods:{
     ...mapActions(["loadAccounts","deleteAccount"]),
     ...mapMutations(["SELECT_ACCOUNT"]),
     
    
  },
  mounted() {
     
       $(".dropdown-button").dropdown({ belowOrigin: true});
      this.loadAccounts()
   
  }
};
</script>

<style>
.main {
  max-height: 100vh;
}
</style>
