import React from 'react';
import { merge } from 'lodash';

import Header from 'components/Header';
import session from 'lib/session';
import connectToStores from 'flummox/connect';
import needsAuthentication from 'lib/needsAuthentication';

class ValidateEmail extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      setTimeout(() => {
        this.context.router.transitionTo('login');
      }, 0);
    } else {
      this.context.flux.getActions('user').validateSession(
        session.user.sessionToken
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.emailVerified) {
      setTimeout(() => {
        this.context.router.transitionTo('email-verified');
      }, 0);
    }
  }

  render() {
    return (
      <div className="ValidateEmail">
        <Header/>
        <div className="ValidateEmail__content">
          <h1 className="ValidateEmail__title">
            Please validate your email address to start using Cache.
          </h1>
          <p className="ValidateEmail__text">
            An email has been sent to <strong>{this.props.email}</strong> with
            instructions to validate your email address.
          </p>
          <p className="ValidateEmail__text">
            Once validated, refresh this page to continue.
          </p>
        </div>
      </div>
    );
  }
}

export default needsAuthentication(
  connectToStores(
    ValidateEmail, ['user'], ([userStore]) => userStore.state
  )
);
