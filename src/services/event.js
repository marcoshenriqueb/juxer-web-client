import Vue from 'vue';

export default {
  getCode(code) {
    return new Promise((resolve, reject) => {
      Vue.$http.get(`/api/event/?search=${code}`)
      .then(response => resolve(response))
      .catch(response => reject(response));
    });
  },
};
