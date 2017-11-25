import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import Cookie from 'js-cookie'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      loggedIn:Cookie.get("SESSION")!=null,
      path:[],
      currentFolder:{id:null},
      selectedFile:null,
      selectedAccount:null,
      currentFiles:[],
      loading:true,
      accounts:[],
      uploadQueue:[],
      accountTypes:require("./accountTypes")
      .map(t=>({[t.code]:t.image}))
      .reduce((result,item)=>({...result,...item}))
    },
    mutations: {
      LOGIN_SUCCESS(state) {
        state.loggedIn = true;
      },
      LOGOUT(state) {
        Cookie.remove("SESSION")
        state.loggedIn  = false;
      },
      DESCEND(state,{files,folder}){
        state.path.push(folder)
        state.currentFolder=folder
        state.currentFiles=files
      },
      ASCEND(state,{files,folder}){
        let index= state.path.findIndex(seg=>seg.id==folder.id)
        console.log(index)
        if(state.path.length>1){
          state.path= state.path.slice(0,index+1)
        }
        state.currentFolder=folder
        state.currentFiles=files
       
      },
      SELECT_ACCOUNT(state,account){
        if(state.selectedAccount!=account){
          state.path=[]
          state.selectedFile=null
          state.selectedAccount=account
        }
      },
      SET_ACCOUNTS(state,accounts){
        state.accounts=accounts
      },
      LOADING(state,loading){
        state.loading=loading
      },
      SELECT_FILE(state,file){
        state.selectedFile=file
      },
      QUEUE_UPLOAD(state,file){
          state.uploadQueue.push({
            file,
            accountId:state.selectedAccount._id,
            folder:state.currentFolder
          })
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
        var response=await axios.get("/user/logout")
        if(response.status==200) {
          commit("LOGOUT")
        }
      },
      async openFolder({commit,state},id) {
        let url=id?`/explorer/${state.selectedAccount._id}/${id}`:`/explorer/${state.selectedAccount._id}`
        commit("LOADING",true)

         let res= await axios.get(url)
         let {files,folder}=res.data
         if(res.status==200){
         
            if(!state.currentFolder||state.currentFolder.id!=folder.id){
              if(state.path.findIndex(seg=>seg.id==folder.id)!=-1){
                commit("ASCEND",{files,folder})
              }else{
                commit("DESCEND",{files,folder})
              }
            }
         }
         commit("LOADING",false)
      },
      async loadAccounts ({commit}) {
        let res=await  axios.get("/accounts")
        if(res.status==200){
          commit("SET_ACCOUNTS",res.data)
          commit("SELECT_ACCOUNT",null)
        }
      },
      async deleteAccount({commit,dispatch,state}){
        if(confirm("Are you sure you want to remove this account")){
          await  axios.post(`/accounts/disconnect/${state.selectedAccount._id}`)
          dispatch("loadAccounts")
        }
      },
      async uploadFile({commit},file){
        console.log(file)
        if(file){
        /*   let form= new FormData()
          let {name ,size,type}=file
          form.append("data",file);
         // form.append('metadata',{name,size,type})
          axios.post("explorer/upload",form,{onUploadProgress:(e)=>{
            console.log(e)
            console.log(`${Math.floor(e.loaded/e.total*100)}%`)
          }}).then(()=>{
            console.log("done")
          }) */
         commit("QUEUE_UPLOAD",file)
        }
      }
    }
  })