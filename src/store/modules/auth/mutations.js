import {
  CHANGE_CHECKED_STATUS,
  SET_AUTH_USER,
} from './../../mutation-types';

export default {
  [CHANGE_CHECKED_STATUS](state, status) {
    state.checked = status;
  },

  [SET_AUTH_USER](state, user) {
    state.user = user;
  },
};
