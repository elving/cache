import React from 'react';
import session from 'lib/session';

const needsAuthentication = Component => class extends React.Component {
  static willTransitionTo(transition) {
    const { path } = transition;

    if (!session.userIsLoggedIn) {
      transition.redirect('login', {}, { nextPath: path });
    } else if (!(/validate-email/).test(path) && !session.user.emailVerified) {
      transition.redirect('validate-email');
    }
  }

  render() {
    return <Component {...this.props}/>;
  }
};

export default needsAuthentication;
