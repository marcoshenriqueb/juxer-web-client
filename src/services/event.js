import Vue from 'vue';

export default {
  /**
   * Search the event.
   *
   * @param  {String} code The code to search.
   */
  getCode(code) {
    return new Promise((resolve, reject) => {
      Vue.$http.get(`/api/event/?search=${code}`)
      .then(response => resolve(response))
      .catch(response => reject(response));
    });
  },
};
