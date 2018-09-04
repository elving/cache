import React from 'react';

import Header from 'components/Header';

export default class Login extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    this.context.flux.getActions('user').logout().then(() => {
      setTimeout(() => {
        this.context.router.transitionTo('login');
      }, 0);
    }).catch((response) => {
      setTimeout(() => {
        this.context.router.transitionTo('login');
      }, 0);
    });
  }

  render() {
    return (
      <div className="Logout">
        <Header/>
        <div className="Logout__content">
          <p className="Logout__text">Logging you out...</p>
        </div>
      </div>
    );
  }
}
