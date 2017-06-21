<template>
  <div id="app" v-if="authChecked">
    <router-view></router-view>
  </div>
  <span v-else>Loading</span>
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
