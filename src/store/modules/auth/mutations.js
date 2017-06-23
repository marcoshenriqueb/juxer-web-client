import Vue from 'vue';
import Router from '@/router';
import {
  SET_AUTH_USER,
  SET_AUTH_STATUS,
  LOGIN,
  LOGOUT,
  SET_LOGGING_IN_STATUS,
} from './../../mutation-types';

export default {
  [SET_AUTH_USER](state, user) {
    state.user = user;
  },

  [SET_AUTH_STATUS](state, status) {
    state.checked = true;
    state.authenticated = status;
    if (Router.currentRoute.matched.some(record => record.meta.guest) && status) {
      Router.push({
        name: 'start',
      });
    } else if (Router.currentRoute.matched.some(record => record.meta.auth) && !status) {
      Router.push({
        name: 'register',
      });
    }
  },

  [LOGIN](state) {
    state.authenticated = true;
    Router.push({
      name: 'start',
    });
  },

  [LOGOUT](state) {
    state.authenticated = false;
    Vue.$http.defaults.headers.common.Authorization = '';
    Router.push({
      name: 'register',
    });
  },

  [SET_LOGGING_IN_STATUS](state, status) {
    state.loggingIn = status;
  },
};
