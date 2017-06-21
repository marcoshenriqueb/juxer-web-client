import Vue from 'vue';

export default {
  auth(user) {
    return new Promise((resolve, reject) => {
      Vue.$http.post('/api/user/login/', user)
      .then(response => resolve(response))
      .catch(response => reject(response));
    });
  },
};
