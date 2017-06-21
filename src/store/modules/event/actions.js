import Router from '@/router';
import eventService from '@/services/event';
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
};
