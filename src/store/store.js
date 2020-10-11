import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: 'ready',
  },
  mutations: {
    toggleStatus(state) {
      console.log('toggle!', state.status);
      state.status = state.status === 'stop' ? 'start' : 'stop';
    },
    ready(state) {
      console.log('ready!', state.status);
      state.status = 'ready';
    },
    play(state) {
      console.log('play!', state.status);
      state.status = 'play';
    },
    gameover(state) {
      console.log('gameover!', state.status);
      state.status = 'gameover';
    },
  },
});
