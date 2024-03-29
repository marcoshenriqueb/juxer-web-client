import {
  SET_EVENT,
  SET_SEARCH_CODE,
  SET_SEARCHING_EVENT_STATUS,
  SET_SEARCH_CODE_ERROR,
  SET_EVENT_TRACKS,
  SET_EVENT_QUEUE,
  SET_EVENT_QUEUE_INDEX,
  SET_ADD_TO_QUEUE_STATUS,
  RESET_EVENT,
} from '@/store/mutation-types';

export default {
  [SET_EVENT](state, event) {
    state.event = event;
  },

  [SET_SEARCH_CODE](state, code) {
    state.searchCode = code;
  },

  [SET_SEARCHING_EVENT_STATUS](state, status) {
    state.searching = status;
  },

  [SET_SEARCH_CODE_ERROR](state, error) {
    state.searchCodeError = error;
  },

  [SET_EVENT_TRACKS](state, tracks) {
    state.tracks = tracks;
  },

  [SET_EVENT_QUEUE](state, queue) {
    state.queue = queue;
  },

  [SET_EVENT_QUEUE_INDEX](state, index) {
    state.index = index;
  },

  [SET_ADD_TO_QUEUE_STATUS](state, status) {
    state.addingToQueueStatus = status;
  },

  [RESET_EVENT](state) {
    state.event = {};
    state.tracks = {};
    state.queue = [];
    state.index = 0;
  },
};
