import localStore from 'lib/localstore';

let session = {
  user: null,
  lastLogin: null,
  userIsLoggedIn: false,

  find: function() {
    return localStore.get('session');
  },

  set: function(user) {
    if (user) {
      this.user = user;
      this.lastLogin = new Date();
      this.userIsLoggedIn = true;

      localStore.set('session', { user, lastLogin: this.lastLogin });
    } else {
      let session = this.find();

      if (session) {
        this.user = session.user;
        this.lastLogin = new Date(session.lastLogin);
        this.userIsLoggedIn = true;
      }
    }
  },

  unset: function() {
    this.user = null;
    this.lastLogin = null;
    this.userIsLoggedIn = false;

    localStore.clear();
  },

  time: function() {
    if (this.userIsLoggedIn) {
      return (Date.now() - this.lastLogin.getTime()) * 0.001;
    } else {
      return 0;
    }
  },

  getId: function() {
    return this.userIsLoggedIn ? this.user.objectId : null;
  }
};

export default session;
