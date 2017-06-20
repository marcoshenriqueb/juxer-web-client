import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/pages/register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});
