import React from 'react';

import Header from 'components/Header';
import LoginForm from 'components/LoginForm';
import connectToStores from 'flummox/connect';
import redirectAuthenticated from 'lib/redirectAuthenticated';

class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      if (nextProps.query.nextPath) {
        setTimeout(() => {
          this.context.router.transitionTo(nextProps.query.nextPath);
        }, 0);
      } else {
        setTimeout(() => {
          this.context.router.transitionTo('collections');
        }, 0);
      }
    }
  }

  render() {
    return (
      <div className="Auth">
        <Header/>
        <div className="Auth__content">
          <div className="Auth__form-wrapper">
            <h1 className="Auth__title">Login</h1>
            <LoginForm isLoggingIn={this.props.isLoggingIn}/>
          </div>
        </div>
      </div>
    );
  }
}

export default redirectAuthenticated(
  connectToStores(
    Login, ['user'], ([userStore]) => ({
      isLoggedIn: userStore.isLoggedIn(),
      isLoggingIn: userStore.state.isFetching
    })
  )
);
