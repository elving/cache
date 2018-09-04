import React from 'react';
import { Link } from 'react-router';

import Header from 'components/Header';

export default class PasswordChanged extends React.Component {
  render() {
    return (
      <div className="PasswordChanged">
        <Header/>

        <div className="PasswordChanged__content">
          <h1 className="PasswordChanged__title">
            Your password has been changed successfully!
          </h1>
          <Link to="login" className="button button--primary">Login</Link>
        </div>
      </div>
    );
  }
}
