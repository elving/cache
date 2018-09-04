import React from 'react';
import session from 'lib/session';

const redirectAuthenticated = Component => class extends React.Component {
  static willTransitionTo(transition) {
    if (session.userIsLoggedIn) {
      transition.redirect('collections');
    }
  }

  render() {
    return <Component {...this.props}/>;
  }
};

export default redirectAuthenticated;
