<template>
  <div class="start-container full-w flex-column justify-center pad">
    <img class="start-container_img" src="./../assets/media/logo/juxer-logo-light.png" alt="Juxer logo">
    <span class="text">O código do evento pode ser obtido com o responsável pela jukebox.</span>
    <input @input="onSearchInput" :value="searchCode" type="text" placeholder="Digite o código">
    <j-button text="Entrar" :loading="searchingEvent" @click.native="enter"></j-button>
    <br>
    <a class="white" @click="logout">Sair</a>
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
      'searchingEvent',
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
        this.$store.commit(SET_SEARCH_CODE, '');
      }
    },

    searchCodeError(error) {
      if (error.length) {
        this.$toasted.show(error);
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

    /**
     * Logs the user out.
     */
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
