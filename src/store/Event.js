import Vue from 'vue';
import Vuex from 'vuex';
import FIEP from '@/store/FIEP'
import FIEPCore from './FIEPCore';

Vue.use(Vuex);

// eslint-disable-next-line
export const store = new Vuex.Store({
  state: {
    listEvent: []
  },

  mutations: {
    // updateProperty: (state, data) => {
    //   state[data.property] = data.value;
    // },
    listEvent: (state, data) => {
        state.listEvent = data.value
    }
  },

  actions: {
    // getEvent: (context, data) => {
    //   Api.post('/users', data)
    //     .then(response => context.commit('updateProperty', { property: 'authenticatedUser', value: response.body }))
    //     // eslint-disable-next-line
    //     .catch(error => console.error(error));
    // },
    getEvent: (context, data) => {
      FIEPCore.get('/events')
        .then(response =>
          context.commit('listEvent', response.data))
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
});
