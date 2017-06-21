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
        <span @click="addToQueue(t)" v-for="t in getNotInQueue(tracks[playlist])">{{ t.title }}<br></span>
      </div>
    </div>
    <button @click="leaveEvent">Sair</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  RESET_EVENT,
} from '@/store/mutation-types';

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

    tracks(tracks) {
      if (Object.keys(tracks).indexOf(this.playlist) < 0) {
        this.playlist = '';
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

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('closeEventConnection', this.event.id);
    this.$store.commit(RESET_EVENT);
    next();
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

    /**
     * Gets list of tracks that are not in queue already.
     *
     * @param  {Array} tracks The track list.
     * @return {Array} The filtered list.
     */
    getNotInQueue(tracks) {
      return tracks.filter(t => (
        this.queue.filter(q => q.id.toString() === t.id.toString()).length === 0
      ));
    },

    /**
     * Leaves event.
     */
    leaveEvent() {
      console.log(1);
      this.$router.push({
        name: 'start',
      });
    },
  },
};
</script>
