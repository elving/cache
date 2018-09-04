/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';

import Form from 'components/Form';

export default class RegisterForm extends Form {
  constructor(props, context) {
    super(props, context);

    this.validations = {
      username: {
        isRequired: 'An username is requied to authenticate you.',
        isValidUsernameLength: 'Your password must have at least 3 characters.'
      },

      email: {
        isRequired: 'An email is requied to authenticate you.',
        isEmail: 'A valid email is requied to authenticate you.'
      },

      password: {
        isRequired: 'A password is requied to authenticate you.',
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
      <form
        className="Auth__form"
        onSubmit={this.onSubmit.bind(this)}
      >
        <div className="group">
          <label className="label">Username</label>
          <input
            ref="username"
            type="text"
            disabled={this.props.isCreatingAccount}
            className={this.getUserNameFieldClasses()}
          />
        </div>

        <div className="group">
          <label className="label">Email</label>
          <input
            ref="email"
            type="email"
            disabled={this.props.isCreatingAccount}
            className={this.getEmailFieldClasses()}
          />
          <small>Your email is never visible to anyone and is only used to contact you regarding critical updates and news. We will not spam you :)</small>
        </div>

        <div className="group">
          <label className="label">Password</label>
          <input
            ref="password"
            type="password"
            disabled={this.props.isCreatingAccount}
            className={this.getPasswordFieldClasses()}
          />
        </div>

        <div className="group">
          {this.renderRegisterButton()}
        </div>

        <div className="group">
          <small>By creating an account, you agree to the <a href="http://www.trycache.co/terms" target="_blank">Terms of Service</a> and <a href="http://www.trycache.co/privacy" target="_blank">Privacy Policy</a>.</small>
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

  renderRegisterButton() {
    const { isCreatingAccount } = this.props;

    return (
      <button
        disabled={isCreatingAccount}
        className="button button--primary">
        <span>
          {isCreatingAccount ? 'Creating account...' : 'Create account'}
        </span>
      </button>
    );
  }

  getUserNameFieldClasses() {
    const { errors, isValid } = this.state;

    return classNames({
      'textfield': true,
      'textfield--error': !isValid && errors.username
    });
  }

  getEmailFieldClasses() {
    const { errors, isValid } = this.state;

    return classNames({
      'textfield': true,
      'textfield--error': !isValid && errors.email
    });
  }

  getPasswordFieldClasses() {
    const { errors, isValid } = this.state;

    return classNames({
      'textfield': true,
      'textfield--error': !isValid && errors.password
    });
  }

  formDidPassValidation() {
    if (this.state.formWasSubmitted) {
      this.context.flux.getActions('user').create({
        email: React.findDOMNode(this.refs.email).value,
        username: React.findDOMNode(this.refs.username).value,
        password: React.findDOMNode(this.refs.password).value
      }).catch((response) => {
        this.context.flux.getActions('notifications').notify(
          'error', response.error
        );
      });
    }
  }
}
