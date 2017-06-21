import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/pages/register';
import Start from '@/pages/start';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,

      meta: {
        guest: true,
      },
    },

    {
      path: '/',
      name: 'start',
      component: Start,

      meta: {
        auth: true,
      },
    },
  ],
});
