import Vue from 'vue';
import facebookService from '@/services/facebook';

export default {
  /**
   * Checks user status with facebook SDK.
   * @return {[type]} [description]
   */
  checkAuth() {
    facebookService.checkAuth()
    .then((response) => {
      console.log(response.status);
      if (response.authResponse) {
        facebookService.fetchUser()
        .then((user) => {
          console.log(user);
        });
      } else {
        Vue.$router.push({
          name: 'register',
        });
      }
    });
  },
};
