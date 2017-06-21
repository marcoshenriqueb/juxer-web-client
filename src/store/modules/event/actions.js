import Router from '@/router';
import eventService from '@/services/event';
import socketService from '@/services/socket';
import {
  SET_SEARCH_CODE_ERROR,
  SET_EVENT,
} from '@/store/mutation-types';

export default {
  /**
   * Search for the event with the given code.
   *
   * @param  {Function} options.commit
   * @param  {String} code The search code.
   */
  findEvent({ commit }, code) {
    eventService.getCode(code)
    .then(({ data }) => {
      if (data.count) {
        commit(SET_EVENT, data.results[0]);
      } else {
        commit(SET_SEARCH_CODE_ERROR, 'Esse código não existe.');
      }
    }).catch(() => {
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
};
