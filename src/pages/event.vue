<template>
  <div>
    <h2>{{ event.name }}</h2>
    <div v-if="queue.length">
      <img :src="queue[index].album.cover_medium" :alt="queue[index].album.title"><br>
      <span>{{ queue[index].title }}</span><br>
      <span>{{ queue[index].artist.name }}</span>
    </div>
    <div v-if="queue.length - 1 > index">
      <div v-for="(q, k) in queue" v-if="k > index">
        <img width="80" :src="q.album.cover_medium" :alt="q.album.title"><br>
        <span>{{ q.title }}</span><br>
        <span>{{ q.artist.name }}</span>
      </div>
    </div>
    <hr>
    <div>
      <h3 v-for="(p, k) in tracks" @click="() => { playlist = k; }">{{ k }}</h3>
      <div v-if="playlist">
        <h4>Choose a track:</h4>
        <span @click="addToQueue(t)" v-for="t in tracks[playlist]">{{ t.title }}<br></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      playlist: '',
    };
  },

  computed: {
    ...mapGetters([
      'event',
      'tracks',
      'queue',
      'index',
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
      this.$store.dispatch('openEventConnection', this.event.id);
    }
  },

  beforeRouteLeave() {
    this.$store.dispatch('closeEventConnection', this.event.id);
  },

  methods: {
    /**
     * Adds a track to the queue.
     *
     * @param {Object} track The track.
     */
    addToQueue(track) {
      this.$store.dispatch('addToQueue', {
        id: this.event.id,
        track,
      });
    },
  },
};
</script>
