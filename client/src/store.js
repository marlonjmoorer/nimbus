import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import Cookie from 'js-cookie'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      loggedIn:Cookie.get("SESSION")!=null
    },
    mutations: {
      LOGIN_SUCCESS(state) {
        state.loggedIn = true;
      },
      LOGOUT(state) {
        Cookie.remove("SESSION")
        state.loggedIn  = false;
      }
    },
    actions:{
      async login({commit},data){
        var response=await axios.post("/user/login",data)
        if(response.status==200) {
          commit("LOGIN_SUCCESS")
        }
      },
      async logout({commit}){
        commit("LOGOUT")
      },
      async authCheck({commit}){
        var response=await axios.get("/auth/isLoggedIn")
        if(response.data){
          commit("LOGIN_SUCCESS")
        }
      }
    }
  })