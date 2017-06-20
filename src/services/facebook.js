export default {
  /**
   * Initializes facebook SDK and checks authentication status.
   */
  checkAuth() {
    return new Promise((resolve) => {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: process.env.FACEBOOK_ID,
          cookie: true,
          xfbml: true,
          version: 'v2.8',
        });
        window.FB.AppEvents.logPageView();
        window.FB.getLoginStatus((response) => {
          resolve(response);
        });
      };

      ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        const js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    });
  },

  /**
   * Attempts to log the user with facebook SDK.
   */
  login() {
    return new Promise((resolve, reject) => {
      window.FB.login((response) => {
        if (response.authResponse) {
          resolve(response);
        } else {
          reject(response);
        }
      }, { scope: 'public_profile,email' });
    });
  },

  /**
   * Fetch user information from facebook SDK.
   */
  fetchUser() {
    return new Promise((resolve) => {
      window.FB.api('/me', { fields: 'first_name,last_name,picture,email' }, (response) => {
        resolve(response);
      });
    });
  },
};
