import React from 'react';
import Header from 'components/Header';

export default class InvalidLink extends React.Component {
  render() {
    return (
      <div className="PasswordChanged">
        <Header/>

        <div className="PasswordChanged__content">
          <h1 className="PasswordChanged__title">Invalid link</h1>
        </div>
      </div>
    );
  }
}
