import React from 'react';

import DB from 'lib/db';
import Header from 'components/Header';
import RegisterForm from 'components/RegisterForm';
import connectToStores from 'flummox/connect';
import redirectAuthenticated from 'lib/redirectAuthenticated';

class Register extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      if (nextProps.query.invite && nextProps.inviteId) {
        DB.beta.redeemInvite(nextProps.inviteId, {
          email: nextProps.email,
          lastName: nextProps.lastName,
          firstName: nextProps.firstName
        }).then(() => {
          this.context.router.transitionTo('validate-email');
        });
      } else {
        setTimeout(() => {
          this.context.router.transitionTo('validate-email');
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
            <h1 className="Auth__title">Create an Account</h1>
            <RegisterForm isCreatingAccount={this.props.isCreatingAccount}/>
          </div>
        </div>
      </div>
    );
  }
}

export default redirectAuthenticated(
  connectToStores(
    Register, ['user'], ([userStore]) => ({
      ...userStore.state,
      isLoggedIn: userStore.state.isLoggedIn,
      isCreatingAccount: userStore.state.isFetching
    })
  )
);
