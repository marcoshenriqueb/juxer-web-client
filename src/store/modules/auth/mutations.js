import Router from '@/router';
import {
  SET_AUTH_USER,
  SET_AUTH_STATUS,
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
        name: 'dashboard',
      });
    } else if (Router.currentRoute.matched.some(record => record.meta.auth) && !status) {
      Router.push({
        name: 'register',
      });
    }
  },
};
