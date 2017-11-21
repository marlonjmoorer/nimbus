<template>
  <div>
     <ul id="dropdown1" class="dropdown-content">
        <li><a href="#!">one</a></li>
        <li><a href="#!">two</a></li>
        <li class="divider"></li>
        <li><a href="#!">three</a></li>
      </ul>
    <nav class="light-blue darken-1">
    <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Logo</a>
        <ul class="right ">
          <template v-if="!loggedIn">
              <li><router-link to="/signup"> Signup <i class="material-icons right">file_upload</i></router-link></li>
              <li><router-link to="/login"> Login <i class="material-icons right">account_circle</i></router-link></li>
          </template>
           <template v-else>
               <li><a href="#"@click="_logout"  > Logout<i class="material-icons right">exit_to_app</i></a></li>
                <li><a class="dropdown-button" href="#!" data-activates="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
           </template>
        </ul>
    </div>
    </nav>
  </div>
</template>

<script>
import { mapMutations,mapState,mapActions } from 'vuex'
export default {
  data:()=>({
   // loggedIn:localStorage.token===null
  }),
  computed:{
    ...mapState(['loggedIn'])
  },
  methods:{

    ...mapActions(["logout"])
    ,async _logout(){
      await this.logout()
      console.log(this.$route)
      this.$router.push("/")
    }
  },
  mounted(){
  },
  updated(){
    $(".dropdown-button").dropdown();
  }
};
</script>

<style>

</style>
