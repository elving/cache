/* eslint-disable max-len */
import React from 'react';
import * as FormValidations from 'lib/formValidations';

export default class Form extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      isValid: false,
      formWasSubmitted: false
    };

    this.validations = {};
  }

  formWillValidate() {
    return;
  }

  formDidPassValidation() {
    return;
  }

  formDidFailValidation() {
    return;
  }

  formDidValidate() {
    return;
  }

  validate() {
    this.formWillValidate();

    let errors = {};
    let hasError = false;
    const fields = Object.keys(this.validations);

    fields.forEach((field) => {
      const fieldElement = React.findDOMNode(this.refs[field]);
      const fieldValidators = Object.keys(this.validations[field]);
      const fieldElementValue = fieldElement ? fieldElement.value : null;

      fieldValidators.forEach((fieldValidator) => {
        const fieldIsValid = FormValidations[fieldValidator](fieldElementValue);
        const errorMessage = this.validations[field][fieldValidator];

        if (!fieldIsValid && !(!fieldElementValue && !this.validations[field].isRequired)) {
          hasError = true;
          errors[field] = errorMessage;
        }
      });
    });

    this.setState({ errors, isValid: !hasError }, () => {
      this.formDidValidate();

      if (this.state.isValid) {
        this.formDidPassValidation();
      } else {
        this.formDidFailValidation();
      }

      this.setState({ formWasSubmitted: false });
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState({ formWasSubmitted: true }, () => {
      this.validate();
    });
  }
}
