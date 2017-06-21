import io from 'socket.io-client';
import Router from '@/router';
import store from '@/store';
import {
  SET_EVENT_TRACKS,
  SET_EVENT_QUEUE,
  SET_EVENT_QUEUE_INDEX,
} from '@/store/mutation-types';

const socketUrl = process.env.SOCKET_LOCATION;
const socket = io(socketUrl);

socket.on('connection', () => {
  if (Router.history.current.name === 'event' && store.state.event.event.id) {
    socket.emit('jukebox-client-connect', store.state.event.event.id);
  }
});

export default {
  /**
   * Opens a connection with socket.io server.
   *
   * @param  {Integer} id The event id.
   */
  openEventConnection(id) {
    socket.emit('jukebox-client-connect', id);

    socket.on(`juxer:queue:${id}`, (data) => {
      store.commit(SET_EVENT_QUEUE, data.map(d => JSON.parse(d)));
    });

    socket.on(`juxer:queueindex:${id}`, (data) => {
      store.commit(SET_EVENT_QUEUE_INDEX, data !== null ? data : 0);
    });

    socket.on(`juxer:tracks:${id}`, (data) => {
      store.commit(SET_EVENT_TRACKS, JSON.parse(data));
    });
  },

  /**
   * Close the connection and removes event listeners.
   */
  closeEventConnection(id) {
    socket.emit('jukebox-client-disconnect');
    socket.removeAllListeners(`juxer:tracks:${id}`);
    socket.removeAllListeners(`juxer:queueindex:${id}`);
    socket.removeAllListeners(`juxer:queue:${id}`);
  },
};
