import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: "",
    userInfo:{
      userId:"",
      fullName: "",
      email: "",
      avatarUrl:"",
      role:""
    }

  },
  getters: {
    getFullname: state => {
      return state.userInfo.fullName
    },
    getUserInfo:state=>{
      return state.userInfo;
    },
    getId: state => {
      return state.userInfo.userId
    },
    getEmail: state => {
      return state.userInfo.email
    },
    getAvatarUrl: state => {
      return state.userInfo.avatarUrl
    },
    getIdToken: state => {
      return state.idToken
    }
  }, 
  mutations: {
    setUserInfo(state,payload){
      state.userInfo=payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
