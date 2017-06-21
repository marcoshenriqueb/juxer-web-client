import store from './../store';

export default {
  beforeEach(to, from, next) {
    /**
     * Authenticated routes.
     */
    if (to.matched.some(record => record.meta.auth)) {
      /**
       * If user is not authenticated, redirect to home.
       */
      if (store.state.auth.checked && !store.state.auth.authenticated) {
        return next({
          path: '/register',
        });
      }
    } else if (to.matched.some(record => record.meta.guest)) {
      /**
       * If user is authenticated, redirect him to app.
       */
      if (store.state.auth.checked && store.state.auth.authenticated) {
        return next({
          path: '/',
        });
      }
    }

    /**
     * Let user through.
     */
    return next();
  },
};
