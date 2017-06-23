<template>
  <div class="full-w flex-column" style="position:relative;overflow-x:hidden;">
    <div class="event-current_track flex-column full-w">
      <a class="event-current_track-leave_button flex justify-center" @click="leaveEvent"><span class="fa fa-chevron-left"></span></a>
      <img class="event-current_track-img" v-if="queue.length" :src="queue[index].album.cover_big" :alt="queue[index].album.title">
      <img v-else src="./../assets/media/album-placeholder.png" alt="album" class="event-current_track-img">
      <div class="event-current_track-content flex-column justify-center full-w" v-if="queue.length">
        <img class="event-current_track-content-user_img" :src="getUserPic(queue[index])" :alt="queue[index].user.first_name">
        <span class="label big">{{ queue[index].title }}</span>
        <span class="text">{{ queue[index].artist.name }}</span>
        <span class="text">Pedido por {{ queue[index].user.first_name }}</span>
      </div>
    </div>
    <button class="icon-button big add-track-button" @click="toggleAddTrack" v-if="!addTrack"><span class="fa fa-plus"></span></button>
    <button class="icon-button big add-track-button" @click="toggleAddTrack" v-else><span class="fa fa-close"></span></button>
    <div class="full-w flex-column pad event-queue_container">
      <div class="event-queue_item full-w flex start" v-for="(q, k) in queue" v-if="k > index">
        <img class="event-queue_item-img" :src="q.album.cover_medium" :alt="q.album.title"><br>
        <div class="flex-column start">
          <span class="text big">{{ q.title }}</span>
          <span class="text small">{{ q.artist.name }}</span>
        </div>
      </div>
    </div>
    <div class="event-add_track_container full-w pad" :class="{ 'active': addTrack }">
      <p class="text big">Escolha uma playlist:</p>
      <div class="event-add_track_container-playlist" v-for="(p, k) in tracks" @click="openPlaylist(k)">
        <p class="label big event-add_track_container-playlist-title">{{ k }}</p>
        <transition 
          name="shrink"
          @before-leave="calculateElementHeight"
          @after-enter="calculateElementHeight"
          @before-enter="(el) => { el.style.height = '0px'; }"
          @leave="(el) => { el.style.height = '0px'; }"
        >
          <div v-if="playlist === k" class="full-w flex-column start shrink-transition">
            <div class="event-add_track_container-playlist-track full-w flex start" @click="addToQueue(t)" v-for="t in getNotInQueue(tracks[playlist])">
              <img class="event-queue_item-img" :src="t.album.cover_medium" :alt="t.album.title"><br>
              <div class="flex-column start">
                <span class="text big ellipsis">{{ t.title }}</span>
                <span class="text small ellipsis">{{ t.artist.name }}</span>
              </div>
            </div>
          </div>
        </transition> 
      </div>
    </div>
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
      addTrack: false,
      playlist: '',
    };
  },

  computed: {
    ...mapGetters([
      'event',
      'tracks',
      'queue',
      'index',
      'addingToQueueStatus',
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

    addingToQueueStatus(status) {
      if (status.length) {
        this.$toasted.show(status);
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
      this.toggleAddTrack();
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
      this.$router.push({
        name: 'start',
      });
    },

    /**
     * Gets user profile picture.
     *
     * @param  {Object} track The track object.
     * @return {String} The picture url.
     */
    getUserPic(track) {
      if (!track) {
        return '';
      }

      return track.user.picture;
    },

    /**
     * Toogle add track container.
     */
    toggleAddTrack() {
      if (this.addTrack) {
        this.playlist = '';
      }

      this.addTrack = !this.addTrack;
    },

    /**
     * Open chosen playlist's tracks.
     *
     * @param  {String} playlist The playlist name.
     */
    openPlaylist(playlist) {
      if (this.playlist === playlist) {
        this.playlist = '';
        return;
      }

      this.playlist = playlist;
    },

    /**
     * Calculates elements height on shrink transitions.
     *
     * @param  {Object} el The element.
     */
    calculateElementHeight(el, done) {
      if (el.children.length === 0) {
        el.style.height = 0;
        return;
      }

      const count = el.children.length;
      el.style.height = `${count * 50}px`;
      if (typeof done === 'function') {
        done();
      }
    },
  },
};
</script>
