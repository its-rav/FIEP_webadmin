import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: "",
    fullName: "",
    email: "",
  },
  getters: {
    getfullName: state => {
      return state.fullName
    },
    getEmail: state => {
      return state.email
    },
    getIdToken: state => {
      return state.idToken
    }
  }, 
  mutations: {
    setIdToken (state, payload) {
      state.idToken = payload
    },
    setFullName (state, payload) {
      state.fullName = payload
    },
    setEmail (state, payload) {
      state.emails = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
