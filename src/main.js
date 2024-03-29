import Vue from 'vue';
import VuexRouterSync from 'vuex-router-sync';
import Axios from 'axios';
import Toasted from 'vue-toasted';

import App from './App';
import router from './router';
import store from './store';
import routeMidlleware from './router/middleware';
import JButton from './components/button';

// Stylesheets
import 'normalize.css';
import './assets/stylus/app.styl';

Vue.config.productionTip = false;

// Syncs Vue router and Vuex.
VuexRouterSync.sync(store, router);

// Adds router middleware to check authentication mostly.
router.beforeEach(routeMidlleware.beforeEach);

// Sets Axios base url for the API and default header.
Axios.defaults.baseURL = process.env.API_LOCATION;
Axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.$http = Axios;

// Register global components.
Vue.component('j-button', JButton);

// Toaster.
Vue.use(Toasted, {
  position: 'top-center',
  duration: 3000,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
