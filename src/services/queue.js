import Vue from 'vue';

export default {
  /**
   * Adds track to a queue.
   *
   * @param  {Integer} id The event id.
   * @param  {Object} data The track.
   */
  store(id, data) {
    return new Promise((resolve, reject) => {
      Vue.$http.post(`api/track/queue/${id}/`, data)
      .then((response) => {
        resolve(response.data);
      }).catch((response) => {
        reject(response);
      });
    });
  },
};
