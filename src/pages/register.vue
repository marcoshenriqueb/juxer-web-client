<template>
  <div class="register-container full-w flex-column justify-center end pad">
    <div class="full-w flex-column">
      <img class="register-container_img" src="./../assets/media/logo/juxer-logo-light.png" alt="Juxer logo">
    </div>
    <h2>Escolha as suas músicas preferidas</h2>
    <j-button text="Facebook" icon="facebook" :loading="loggingIn" @click.native="login"></j-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'loggingIn',
    ]),
  },

  methods: {
    login() {
      this.$store.dispatch('login');
    },
  },
};
</script>
