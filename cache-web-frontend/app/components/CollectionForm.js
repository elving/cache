import React from 'react';
import classNames from 'classnames';

import Form from 'components/Form';
import AppIcon from 'components/AppIcon';
import IconChooser from 'components/IconChooser';

export default class CreateCollectionForm extends Form {
  constructor(props, context) {
    super(props, context);

    this.validations = {
      name: {
        isRequired: 'A name is required to create a collection.',
        isValidNameLength: 'Your name was over 50 characters.'
      },

      description: {
        isValidDescriptionLength: 'Your description was over 140 characters.'
      }
    };

    this.state = Object.assign({
      icon: props.icon || 'folder',
      name: props.name,
      description: props.description
    }, this.state);
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isCreatingACollection) {
      if (nextProps.icon && this.state.icon !== nextProps.icon) {
        this.setState({ icon: nextProps.icon });
      }

      if (this.state.name !== nextProps.name) {
        this.setState({ name: nextProps.name });
      }

      if (this.state.description !== nextProps.description) {
        this.setState({ description: nextProps.description });
      }
    }
  }

  render() {
    return (
      <form
        className="create-collection"
        onSubmit={this.onSubmit.bind(this)}>
        <div className="group inline-groups">
          <div className="group create-collection__icon">
            <label className="label">Name</label>
            <IconChooser
              selected={this.props.icon}
              onSelect={this.didSelectIcon.bind(this)}/>
            <input ref="icon" type="hidden" value={this.state.icon}/>
          </div>
          <div className="group create-collection__name">
            <input
              ref="name"
              value={this.state.name}
              disabled={this.props.isDisabled}
              onChange={this.onNameChange.bind(this)}
              autoFocus
              className={this.getNameFieldClasses()}/>
          </div>
        </div>

        <div className="group">
          <label className="label">Description</label>
          <textarea
            ref="description"
            value={this.state.description}
            disabled={this.props.isDisabled}
            onChange={this.onDescriptionChange.bind(this)}
            className="textfield"/>
        </div>

        <div className="group">
          {this.renderSubmitButton()}
        </div>

        {this.renderError()}
      </form>
    );
  }

  renderError() {
    const { errors } = this.state;
    const invalidFields = Object.keys(errors);

    if (!this.state.isValid) {
      return invalidFields.map(function(field, index) {
        return (
          <div key={field + '-error-' + index} className="group">
            <label className="label label--error">{errors[field]}</label>
          </div>
        );
      })
    } else {
      return null;
    }
  }

  renderSubmitButton() {
    const { buttonText, isDisabled, disabledButtonText } = this.props;

    return (
      <button
        disabled={isDisabled}
        className="button button--primary">
        <span>
          {isDisabled ? disabledButtonText : buttonText}
        </span>
      </button>
    );
  }

  getNameFieldClasses() {
    const { errors, isValid } = this.state;

    return classNames({
      'textfield': true,
      'textfield--error': !isValid && errors.name
    });
  }

  didSelectIcon(icon) {
    this.setState({ icon });
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  formDidPassValidation() {
    if (this.state.formWasSubmitted) {
      this.props.onSubmit({
        icon: React.findDOMNode(this.refs.icon).value,
        name: React.findDOMNode(this.refs.name).value,
        description: React.findDOMNode(this.refs.description).value
      });
    }
  }
}
