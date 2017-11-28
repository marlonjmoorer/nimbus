<template>
  <b-navbar v-if="true" toggleable="md" type="dark" variant="primary">

    <b-navbar-toggle target="nav_collapse">

    </b-navbar-toggle>

    <b-navbar-brand href="#">Nimbus</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">



      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
         <template v-if="!loggedIn">
            <b-nav-item to="/signup" active href="#" >Signup <i class="fa fa-user-plus" aria-hidden="true"></i></b-nav-item>
            <b-nav-item  to="/login" active href="#" >Login <i class="fa fa-sign-in" aria-hidden="true"></i></b-nav-item>
         </template>
      
        <b-nav-item-dropdown v-else right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <i class="fa fa-user" aria-hidden="true"></i>
          </template>
          <b-dropdown-item to="dashboard">Profile <i class="fa fa-male" aria-hidden="true"></i></b-dropdown-item>
          <b-dropdown-item href="#" @click="_logout" >Signout <i class="fa fa-sign-out" aria-hidden="true"></i></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
</b-navbar>

  
  
  
 
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  data: () => ({
    // loggedIn:localStorage.token===null
  }),
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    ...mapActions(["logout"]),
    async _logout() {
      await this.logout();
      console.log(this.$route);
      this.$router.push("/");
    }
  },
  mounted() {},
  updated() {
    $(".dropdown-button").dropdown();
  }
};
</script>

<style>

</style>
