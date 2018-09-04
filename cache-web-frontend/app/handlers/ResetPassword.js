/* eslint-disable max-len */
import Header from 'components/Header';
import React, { Component } from 'react';
import redirectAuthenticated from 'lib/redirectAuthenticated';

@redirectAuthenticated
export default class ResetPassword extends Component {
  render() {
    const { query } = this.props;
    const { id, app, error, token, username } = query;

    return (
      <div className="Auth">
        <Header/>

        <div className="Auth__content">
          <div className="Auth__form-wrapper">
            <h1 className="Auth__title">Reset your password</h1>

            <form
              method="POST"
              action={`https://www.parse.com/apps/${id}/request_password_reset`}
              className="Auth__form">
              <div className="group">
                <label className="label">{`New Password for ${username}`}</label>
                <input
                  type="password"
                  name="new_password"
                  className="textfield"
                  autoFocus
                />
                <input
                  name="utf-8"
                  type="hidden"
                  value="âœ“"
                />
                <input
                  type="hidden"
                  name="username"
                  value={username}
                />
                <input
                  name="token"
                  type="hidden"
                  value={token}
                />
              </div>

              <div className="group">
                <button className="button button--primary">
                  Change Password
                </button>
              </div>

              {this.renderError()}
            </form>
          </div>
        </div>
      </div>
    );
  }

  renderError() {
    const { error } = this.props.query;

    return error ? (
      <div className="group">
        <label className="label label--error">{error}</label>
      </div>
    ) : null;
  }
}
