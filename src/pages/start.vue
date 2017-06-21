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
      'searchCode',
      'searchCodeError',
    ]),
  },

  methods: {
    enter() {
      if (this.searchCode.length) {
        this.$store.dispatch('findEvent', this.searchCode);
      } else {
        this.$store.commit(SET_SEARCH_CODE_ERROR, 'Por favor, digite um código.');
      }
    },

    onSearchInput(e) {
      this.$store.commit(SET_SEARCH_CODE, e.target.value);
      this.$store.commit(SET_SEARCH_CODE_ERROR, '');
    },
  },
};
</script>
