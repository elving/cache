import React from 'react';
import classNames from 'classnames';

import DB from 'lib/db';
import Form from 'components/Form';
import Header from 'components/Header';
import redirectAuthenticated from 'lib/redirectAuthenticated';

@redirectAuthenticated
export default class RequestPasswordReset extends Form {
  constructor(props, context) {
    super(props, context);

    this.state = Object.assign({
      requestedReset: false,
      isRequestingReset: false
    }, this.state);

    this.validations = {
      email: {
        isRequired: 'An email is requied to authenticate you.',
        isEmail: 'A valid email is requied to authenticate you.'
      }
    };
  }

  static contextTypes = {
    flux: React.PropTypes.object
  }

  render() {
    return (
      <div className="Auth">
        <Header/>

        <div className="Auth__content">
          <div className="Auth__form-wrapper">
            <h1 className="Auth__title">Reset your password</h1>

            <form className="Auth__form" onSubmit={this.onSubmit.bind(this)}>
              <div className="group">
                <label className="label">Email</label>
                <input
                  ref="email"
                  autoFocus
                  className={this.getEmailFieldClasses()}/>
              </div>

              <div className="group">
                {this.renderButton()}
              </div>

              {this.renderError()}
              {this.renderMessage()}
            </form>
          </div>
        </div>
      </div>
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

  getEmailFieldClasses() {
    const { errors, isValid } = this.state;

    return classNames({
      'textfield': true,
      'textfield--error': !isValid && errors.email
    });
  }

  renderButton() {
    const { isRequestingReset } = this.state;
    const buttonText = isRequestingReset
      ? 'Requesting password reset...'
      : 'Request password reset';

    return (
      <button
        disabled={isRequestingReset}
        className="button button--primary">
        <span>
          {buttonText}
        </span>
      </button>
    );
  }

  renderMessage() {
    return this.state.requestedReset ? (
      <p>An email has been sent with instructions
      on how to reset your password.</p>
    ) : null;
  }

  formDidPassValidation() {
    if (this.state.formWasSubmitted) {
      this.setState({
        requestedReset: false,
        isRequestingReset: true
      }, () => {
        DB.auth.resetPassword(
          React.findDOMNode(this.refs.email).value
        ).then((response) => {
          this.setState({
            requestedReset: true,
            isRequestingReset: false
          });
        }).catch((response) => {
          this.setState({
            requestedReset: false,
            isRequestingReset: false
          });

          this.context.flux.getActions('notifications').notify(
            'error', response.error
          );
        })
      });
    }
  }
}
