import {
  CHANGE_CHECKED_STATUS,
} from './../../mutation-types';

export default {
  [CHANGE_CHECKED_STATUS](state, status) {
    state.checked = status;
  },
};
