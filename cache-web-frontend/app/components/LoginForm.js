import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import Form from 'components/Form';

export default class LoginForm extends Form {
  constructor(props, context) {
    super(props, context);

    this.validations = {
      username: {
        isRequired: 'An username is requied to authenticate you.'
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
      <form className="Auth__form" onSubmit={this.onSubmit.bind(this)}>
        <div className="group">
          <label className="label">Username</label>
          <input
            ref="username"
            type="username"
            disabled={this.props.isLoggingIn}
            autoFocus
            className={this.getUserNameFieldClasses()}/>
        </div>

        <div className="group">
          <label className="label">Password</label>
          <input
            ref="password"
            type="password"
            disabled={this.props.isLoggingIn}
            className={this.getPasswordFieldClasses()}/>
        </div>

        <div className="group">
          {this.renderLoginButton()}
        </div>

        <div className="group">
          <Link to="request-password-reset">Reset your password</Link>
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

  renderLoginButton() {
    const { isLoggingIn } = this.props;

    return (
      <button
        disabled={isLoggingIn}
        className="button button--primary">
        <span>
          {isLoggingIn ? 'Logging you in...' : 'Login'}
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

  getPasswordFieldClasses() {
    const { errors, isValid } = this.state;

    return classNames({
      'textfield': true,
      'textfield--error': !isValid && errors.password
    });
  }

  formDidPassValidation() {
    if (this.state.formWasSubmitted) {
      this.context.flux.getActions('user').login(
        React.findDOMNode(this.refs.username).value,
        React.findDOMNode(this.refs.password).value
      ).catch((response) => {
        this.context.flux.getActions('notifications').notify(
          'error', response.error
        );
      });
    }
  }
}
