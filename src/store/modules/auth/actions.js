import Vue from 'vue';
import facebookService from '@/services/facebook';
import authService from '@/services/auth';
import {
  SET_AUTH_USER,
  SET_AUTH_STATUS,
  LOGIN,
  LOGOUT,
  SET_LOGGING_IN_STATUS,
} from './../../mutation-types';

export default {
  /**
   * Checks user status with facebook SDK.
   * @return {[type]} [description]
   */
  checkAuth({ commit }) {
    facebookService.checkAuth()
    .then((response) => {
      if (response.authResponse) {
        facebookService.fetchUser()
        .then((user) => {
          user.username = user.email;
          user.piture = user.picture.data.url;
          user.token = response.authResponse.accessToken;
          authService.auth(user)
          .then(({ data }) => {
            commit(SET_AUTH_USER, user);
            commit(SET_AUTH_STATUS, true);
            Vue.$http.defaults.headers.common.Authorization = `JWT ${data}`;
          }).catch(() => {
            commit(SET_AUTH_STATUS, false);
          });
        });
      } else {
        commit(SET_AUTH_STATUS, false);
      }
    });
  },

  /**
   * Logs the user in.
   */
  login({ commit }) {
    commit(SET_LOGGING_IN_STATUS, true);
    facebookService.login()
    .then((response) => {
      if (response.authResponse) {
        facebookService.fetchUser()
        .then((user) => {
          user.username = user.email;
          user.piture = user.picture.data.url;
          user.token = response.authResponse.accessToken;
          authService.auth(user)
          .then(({ data }) => {
            commit(LOGIN);
            commit(SET_AUTH_USER, user);
            commit(SET_LOGGING_IN_STATUS, false);
            Vue.$http.defaults.headers.common.Authorization = `JWT ${data}`;
          }).catch(() => {
            commit(SET_LOGGING_IN_STATUS, false);
          });
        });
      } else {
        commit(SET_LOGGING_IN_STATUS, false);
      }
    }).catch(() => commit(SET_LOGGING_IN_STATUS, false));
  },

  /**
   * Logs the user out.
   */
  logout({ commit }) {
    facebookService.logout()
    .then(() => {
      commit(LOGOUT);
    });
  },
};
