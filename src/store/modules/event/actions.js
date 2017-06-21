import eventService from '@/services/event';
import {
  SET_SEARCH_CODE_ERROR,
  SET_EVENT,
} from '@/store/mutation-types';

export default {
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
};
