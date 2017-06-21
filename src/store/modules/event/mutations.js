import {
  SET_EVENT,
  SET_SEARCH_CODE,
  SET_SEARCH_CODE_ERROR,
  SET_EVENT_TRACKS,
} from '@/store/mutation-types';

export default {
  [SET_EVENT](state, event) {
    state.event = event;
  },

  [SET_SEARCH_CODE](state, code) {
    state.searchCode = code;
  },

  [SET_SEARCH_CODE_ERROR](state, error) {
    state.searchCodeError = error;
  },

  [SET_EVENT_TRACKS](state, tracks) {
    state.tracks = tracks;
  },
};
