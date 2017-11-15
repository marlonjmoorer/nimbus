import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      loggedIn:localStorage.getItem("token")!=null
    },
    mutations: {
      checkLogin (state) {
        console.log(localStorage)
        state.loggedIn= localStorage.getItem("token")!=null
      }
    }
  })