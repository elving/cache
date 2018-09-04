import React from 'react';
import classNames from 'classnames';

import DB from 'lib/db';
import Form from 'components/Form';

export default class UserInformationForm extends Form {
  constructor(props, context) {
    super(props, context);

    this.state = Object.assign({
      name: props.name,
      username: props.username
    }, this.state);
  }

  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.name && this.state.name !== nextProps.name) {
      this.setState({ name: nextProps.name });
    }

    if (!this.state.username && this.state.username !== nextProps.username) {
      this.setState({ username: nextProps.username });
    }
  }

  render() {
    return (
      <form className="Auth__form" onSubmit={this.onSubmit.bind(this)}>
        <h2 className="Auth__title">Update your information</h2>

        <div className="group">
          <label className="label">Username</label>
          <input
            ref="username"
            type="text"
            value={this.state.username}
            disabled={this.props.isEditing}
            onChange={this.onUserNameChange.bind(this)}
            className="textfield"/>
        </div>

        <div className="group">
          <label className="label">Name</label>
          <input
            ref="name"
            type="text"
            value={this.state.name}
            disabled={this.props.isEditing}
            onChange={this.onNameChange.bind(this)}
            className="textfield"/>
        </div>

        <div className="group">
          <label className="label">Avatar</label>
          <p>To update your avatar, go over to &nbsp;
          <a href="http://en.gravatar.com/" target="_blank">gravatar.com</a>
          &nbsp; and upload your avatar.
          </p>
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
    const { isEditing } = this.props;

    return (
      <button
        disabled={isEditing}
        className="button button--primary">
        <span>
          {isEditing ? 'Updating...' : 'Update information'}
        </span>
      </button>
    );
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  formDidPassValidation() {
    const userInfo = {};
    const userActions = this.context.flux.getActions('user');

    if (this.state.formWasSubmitted) {
      const { name, username } = this.state;
      const nameSplit = name.split(' ');

      userInfo.username = username;
      userInfo.lastName = nameSplit[1] || '';
      userInfo.firstName = nameSplit[0] || '';

      userActions.edit(this.props.id, userInfo).then((response) => {
        this.context.flux.getActions('notifications').notify(
          'success', 'Information changed successfully.'
        );
      }).catch((response) => {
        this.context.flux.getActions('notifications').notify(
          'error', response.error
        );
      });
    }
  }
}
