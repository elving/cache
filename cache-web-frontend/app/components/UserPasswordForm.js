import React from 'react';
import classNames from 'classnames';

import DB from 'lib/db';
import Form from 'components/Form';

export default class UserPasswordForm extends Form {
  constructor(props, context) {
    super(props, context);

    this.state = Object.assign({
      isChangingPassword: false
    }, this.state);

    this.validations = {
      newPassword: {
        isValidPasswordLength: 'Your password must have at least 8 characters.'
      },

      currentPassword: {
        isValidPasswordLength: 'Your password must have at least 8 characters.'
      }
    };
  }

  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <form className="Auth__form" onSubmit={this.onSubmit.bind(this)}>
        <h2 className="Auth__title">Change your password</h2>

        <div className="group">
          <label className="label">Current password</label>
          <input
            ref="currentPassword"
            type="password"
            disabled={this.props.isEditing}
            className={this.getCurrentPasswordFieldClasses()}/>
        </div>

        <div className="group">
          <label className="label">New password</label>
          <input
            ref="newPassword"
            type="password"
            disabled={this.props.isEditing}
            className={this.getNewPasswordFieldClasses()}/>
          <small>Choosing a new password will
          require you to log in with your new password.</small>
        </div>

        <div className="group">
          {this.renderButton()}
        </div>

        {this.renderError()}
      </form>
    );
  }

  renderError() {
    const { errors } = this.state;
    const invalidFields = Object.keys(errors);

    if (!this.state.isValid) {
      return invalidFields.map(function(field) {
        return (
          <div key={`${field}-error`} className="group">
            <label className="error">{errors[field]}</label>
          </div>
        );
      })
    } else {
      return null;
    }
  }

  renderButton() {
    const { isChangingPassword } = this.state;

    return (
      <button
        disabled={isChangingPassword}
        className="button button--primary">
        <span>
          {isChangingPassword ? 'Changing password...' : 'Change password'}
        </span>
      </button>
    );
  }

  getNewPasswordFieldClasses() {
    const { errors, isValid } = this.state;

    return classNames({
      'textfield': true,
      'textfield--error': !isValid && errors.newPassword
    });
  }

  getCurrentPasswordFieldClasses() {
    const { errors, isValid } = this.state;

    return classNames({
      'textfield': true,
      'textfield--error': !isValid && errors.currentPassword
    });
  }

  formDidPassValidation() {
    const userId = this.props.id;
    const userStore = this.context.flux.getStore('user');
    const userActions = this.context.flux.getActions('user');
    const { username } = this.props;

    if (this.state.formWasSubmitted) {
      const newPassword = React.findDOMNode(
        this.refs.newPassword
      ).value;

      const currentPassword = React.findDOMNode(
        this.refs.currentPassword
      ).value;

      if (currentPassword && newPassword) {
        this.setState({ isChangingPassword: true }, () => {
          DB.auth.validatePassword(
            username, currentPassword, newPassword
          ).then(() => {
            userActions.edit(userId, {
              password: newPassword
            }).then(() => {
              userStore.onLogoutSuccess();
              this.context.router.transitionTo('login', {}, {
                nextPath: '/user/settings'
              });
            }).catch((response) => {
              this.context.flux.getActions('notifications').notify(
                'error', response.error
              );
            });
          }).catch((response) => {
            this.setState({ isChangingPassword: false }, () => {
              this.context.flux.getActions('notifications').notify(
                'error', response.error
              );
            });
          });
        });
      }
    }
  }
}
