<template>
  <div id="app" v-if="authChecked">
    <router-view></router-view>
  </div>
  <div v-else class="initial-loader-div flex justify-center">
    <div class="loader big">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import '@/services/socket';

export default {
  name: 'app',

  computed: {
    ...mapGetters([
      'authChecked',
    ]),
  },

  mounted() {
    this.$store.dispatch('checkAuth');
  },
};
</script>
