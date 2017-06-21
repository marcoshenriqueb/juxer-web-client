<template>
  <div>
    <input @input="onSearchInput" :value="searchCode" type="text" placeholder="Digite o código">
    <button @click="enter">Entrar</button>
    <span v-if="searchCodeError.length">{{ searchCodeError }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  SET_SEARCH_CODE,
  SET_SEARCH_CODE_ERROR,
} from '@/store/mutation-types';

export default {
  computed: {
    ...mapGetters([
      'event',
      'searchCode',
      'searchCodeError',
    ]),
  },

  watch: {
    /**
     * Watches if there is a current event and redirects the user.
     *
     * @param  {Object} event The current event.
     */
    event(event) {
      if (event.code) {
        this.$router.push({
          name: 'event',
          params: {
            code: event.code,
          },
        });
      }
    },
  },

  methods: {
    /**
     * Search the event with the input code.
     */
    enter() {
      if (this.searchCode.length) {
        this.$store.dispatch('findEvent', this.searchCode);
      } else {
        this.$store.commit(SET_SEARCH_CODE_ERROR, 'Por favor, digite um código.');
      }
    },

    /**
     * Updates the state with the input and clear errors.
     * @param  {Object} e The event.
     */
    onSearchInput(e) {
      this.$store.commit(SET_SEARCH_CODE, e.target.value);
      this.$store.commit(SET_SEARCH_CODE_ERROR, '');
    },
  },
};
</script>
