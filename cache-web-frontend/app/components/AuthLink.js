import React, { Component } from 'react';
import { Link } from 'react-router';

import session from 'lib/session';
import connectToStores from 'flummox/connect';
import CurrentUserDropdown from 'components/CurrentUserDropdown';

class AuthLink extends Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  render() {
    const { user } = this.props;

    return user && user.isLoggedIn ? (
      <CurrentUserDropdown
        email={user.email}
        username={user.username}
        lastName={user.lastName}
        firstName={user.firstName}/>
    ) : this.renderAuthLink();
  }

  renderAuthLink() {
    const inLogin = this.context.router.isActive('login');
    const text = inLogin ? 'Create an account for free' : 'Login';
    const route = inLogin ? 'register' : 'login';

    return (
      <Link
        to={route}
        className="button button--primary button--mini"
      >
        {text}
      </Link>
    );
  }
}

export default connectToStores(
  AuthLink, ['user'], ([userStore]) => ({
    user: userStore.state
  })
);
