import Vue from 'vue';
import facebookService from '@/services/facebook';
import authService from '@/services/auth';
import {
  CHANGE_CHECKED_STATUS,
  SET_AUTH_USER,
  SET_AUTH_STATUS,
} from './../../mutation-types';

export default {
  /**
   * Checks user status with facebook SDK.
   * @return {[type]} [description]
   */
  checkAuth({ commit }) {
    facebookService.checkAuth()
    .then((response) => {
      console.log(response.status);
      if (response.authResponse) {
        commit(CHANGE_CHECKED_STATUS, true);
        facebookService.fetchUser()
        .then((user) => {
          user.username = user.email;
          user.piture = user.picture.data.url;
          user.token = response.authResponse.accessToken;
          commit(SET_AUTH_USER, user);
          authService.auth(user)
          .then(({ data }) => {
            commit(SET_AUTH_STATUS, true);
            console.log(data);
          }).catch(() => {
            commit(SET_AUTH_STATUS, false);
            commit(SET_AUTH_USER, {});
          });
        });
      } else {
        Vue.$router.push({
          name: 'register',
        });
      }
    });
  },
};
