<template>
  <div>
    <h2>{{ event.name }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'event',
      'tracks',
    ]),
  },

  watch: {
    event(event) {
      if (event.id) {
        this.$store.dispatch('openEventConnection', event.id);
      }
    },
  },

  mounted() {
    if (!Object.keys(this.event).length) {
      this.$store.dispatch('getEvent', this.$route.params.code);
    } else {
      this.$store.dispatch('openEventConnection', event.id);
    }
  },

  destroyed() {
    this.$store.dispatch('closeEventConnection');
  },
};
</script>
