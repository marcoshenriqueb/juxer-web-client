import Vue from 'vue';

export default {
  /**
   * Logs the user in Juxer.
   *
   * @param  {Object} user The user object.
   */
  auth(user) {
    return new Promise((resolve, reject) => {
      Vue.$http.post('/api/user/login/', user)
      .then(response => resolve(response))
      .catch(response => reject(response));
    });
  },
};
