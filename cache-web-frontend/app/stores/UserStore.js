import { Store } from 'flummox';
import session from 'lib/session';

export default class UserStore extends Store {
  constructor(flux) {
    super();

    const userActions = flux.getActions('user');

    this.register(userActions.loginFromSession, this.onLoginFromSession);

    this.registerAsync(
      userActions.login,
      this.onLogin, this.onLoginSuccess, this.onLoginFail
    );

    this.registerAsync(
      userActions.create,
      this.onCreate, this.onCreateSuccess, this.onCreateFail
    );

    this.registerAsync(
      userActions.edit,
      this.onEdit, this.onEditSuccess, this.onEditFail
    );

    this.registerAsync(
      userActions.logout,
      this.onLogout, this.onLogoutSuccess, this.onLogoutFail
    );

    this.registerAsync(
      userActions.validateSession,
      this.onValidateSession,
      this.onValidateSessionSuccess,
      this.onValidateSessionFail
    );

    this.state = {
      isEditing: false,
      isLoggedIn: false,
      isFetching: false
    };
  }

  onLogin() {
    this.setState({
      isFetching: true,
      isLoggedIn: false
    });
  }

  onLoginSuccess(user) {
    session.set(user);
    ga('set', 'userId', user.objectId);
    ga('send', 'pageview', {'sessionControl': 'start'});

    this.setState(Object.assign({}, user, {
      isFetching: false,
      isLoggedIn: true
    }));

    Raven.setUserContext({
      id: user.objectId,
      email: user.email,
      username: user.username
    });
  }

  onLoginFail() {
    this.setState({
      isFetching: false,
      isLoggedIn: false
    });
  }

  onLoginFromSession(user) {
    if (user && user.objectId) {
      ga('set', 'userId', user.objectId);

      this.setState(Object.assign({}, user, {
        isLoggedIn: true
      }));
    }
  }

  onCreate() {
    this.setState({
      isFetching: true,
      isLoggedIn: false
    });
  }

  onCreateSuccess(user) {
    delete user.password;
    user.emailVerified = false;
    session.set(user);

    this.setState(Object.assign({}, user, {
      isFetching: false,
      isLoggedIn: true
    }));
  }

  onCreateFail() {
    this.setState({
      isFetching: false,
      isLoggedIn: false
    });
  }

  onEdit() {
    this.setState({ isEditing: true });
  }

  onEditSuccess(user) {
    delete user.password;
    Object.assign(session.user, user);
    session.set(session.user);
    this.setState(Object.assign({}, user, { isEditing: false }));
  }

  onEditFail() {
    this.setState({ isEditing: false });
  }

  onLogout() {
    ga('send', 'pageview', {'sessionControl': 'end'});
    ga('set', 'userId', null);
    this.setState({ isFetching: true });
  }

  onLogoutSuccess() {
    session.unset();

    this.setState({
      isFetching: false,
      isLoggedIn: false
    });
  }

  onLogoutFail() {
    session.unset();

    this.setState({
      isFetching: false,
      isLoggedIn: false
    });
  }

  onValidateSession() {

  }

  onValidateSessionSuccess(user) {
    session.set(user);
    this.setState(Object.assign({}, this.state, user));
  }

  onValidateSessionFail() {

  }

  isLoggedIn() {
    return session.userIsLoggedIn || this.state.isLoggedIn === true;
  }

  getId() {
    return this.state.objectId;
  }
}
