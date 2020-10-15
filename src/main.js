import Vue from 'vue';
import App from './App.vue';
import store from './store/store';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  components: {
    App,
  },
  // render: h => h(App),
});
//.$mount('#app');
