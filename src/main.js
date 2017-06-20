import Vue from 'vue';
import VuexRouterSync from 'vuex-router-sync';
import Axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Syncs Vue router and Vuex.
VuexRouterSync.sync(store, router);

// Sets Axios base url for the API and default header.
Axios.defaults.baseURL = process.env.API_LOCATION;
Axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.$http = Axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
