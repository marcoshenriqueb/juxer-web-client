import Router from '@/router';
import eventService from '@/services/event';
import socketService from '@/services/socket';
import queueService from '@/services/queue';
import {
  SET_SEARCH_CODE_ERROR,
  SET_EVENT,
  SET_SEARCHING_EVENT_STATUS,
} from '@/store/mutation-types';

export default {
  /**
   * Search for the event with the given code.
   *
   * @param  {Function} options.commit
   * @param  {String} code The search code.
   */
  findEvent({ commit }, code) {
    commit(SET_SEARCHING_EVENT_STATUS, true);
    eventService.getCode(code)
    .then(({ data }) => {
      if (data.count) {
        commit(SET_EVENT, data.results[0]);
      } else {
        commit(SET_SEARCH_CODE_ERROR, 'Esse código não existe.');
      }
      commit(SET_SEARCHING_EVENT_STATUS, false);
    }).catch(() => {
      commit(SET_SEARCHING_EVENT_STATUS, false);
      commit(SET_SEARCH_CODE_ERROR, 'Falha na busca, por favor tente mais tarde.');
    });
  },

  /**
   * Search for the event with the given code. This method is for the event page, as it redirects
   * to a not found page if there isn't a result, instead of just pointing a error like in the
   * search.
   *
   * @param  {Function} options.commit
   * @param  {String} code The search code.
   */
  getEvent({ commit }, code) {
    eventService.getCode(code)
    .then(({ data }) => {
      if (data.count) {
        commit(SET_EVENT, data.results[0]);
      } else {
        Router.push({
          name: 'start',
        });
      }
    }).catch(() => {
      Router.push({
        name: 'start',
      });
    });
  },

  /**
   * Opens a event connection with socket.io server.
   *
   * @param  {Function} options.commit
   * @param  {Integer} id The event id.
   */
  openEventConnection({ commit }, id) {
    socketService.openEventConnection(id);
  },

  /**
   * Close event connection and remove listeners.
   */
  closeEventConnection({ commit }, id) {
    socketService.closeEventConnection(id);
  },

  /**
   * Adds track to the queue.
   *
   * @param {Object} store
   * @param {Integer} options.id The event id.
   * @param {Object} options.track The track to be added.
   */
  addToQueue(store, { id, track }) {
    queueService.store(id, track)
    .catch(r => console.log(r));
  },
};
