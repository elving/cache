import React from 'react';

import Form from 'components/Form';
import ColorPicker from 'components/ColorPicker';
import TextPreview from 'components/TextPreview';
import LinkPreview from 'components/LinkPreview';
import ImagePreview from 'components/ImagePreview';
import VideoPreview from 'components/VideoPreview';
import AudioPreview from 'components/AudioPreview';
import authenticated from 'lib/authenticated';

class StoreItemForm extends Form {
  constructor(props, context) {
    super(props, context);

    this.validations = {
      collection: {
        isRequired: 'A collection is required to store this item.'
      }
    };
  }

  static contextTypes = {
    flux: React.PropTypes.object
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit.bind(this)}
        className="store-item__form ui__form ui__form--stacked">
        {this.renderPreview()}
        {this.renderCollectionsSelect()}

        <div className="ui__group">
          <label className="ui__label">Description</label>
          <textarea
            ref="description"
            className="ui__textfield"/>
        </div>

        <div className="ui__group">
          <label className="ui__label">Color</label>
          <ColorPicker ref="color"/>
        </div>

        <div className="ui__group">
          {this.renderSubmitButton()}
        </div>

        {this.renderError()}
      </form>
    );
  }

  renderPreview() {
    switch(this.props.item.type) {
      case 'text':
        return <TextPreview {...this.props.item.content}/>;

      case 'link':
        return <LinkPreview {...this.props.item.content}/>;

      case 'image':
        return <ImagePreview {...this.props.item.content}/>;

      case 'video':
        return <VideoPreview {...this.props.item.content}/>;

      case 'audio':
        return <AudioPreview {...this.props.item.content}/>;

      default:
        return this.renderPreviewError();
    }
  }

  renderPreviewError() {
    return (
      <div className="item__preview ui__group" data-type="error">
        <strong className="item__preview__error">
          Looks like you don&#39;t have anything to store...
        </strong>
      </div>
    );
  }

  renderCollectionOptions() {
    return this.props.collections.map((collection) => {
      return (
        <option
          key={`collection-${collection.objectId}`}
          value={collection.objectId}
          className="collections__option">
          {collection.name}
        </option>
      );
    });
  }

  renderCollectionsSelect() {
    const { collections, hasCollections, isFetchingCollections } = this.props;
    const firstCollection = hasCollections ? collections[0].objectId : null;

    return (
      <div className="ui__group">
        <label className="ui__label">
          {isFetchingCollections ? 'Fetching Collections...' : 'Collections'}
        </label>

        <div className="ui__select" data-disabled={!hasCollections}>
          <select required ref="collection" defaultValue={firstCollection}>
            {this.renderCollectionOptions()}
          </select>
        </div>
      </div>
    );
  }

  renderSubmitButton() {
    const isDisabled = (
      this.props.isFetching ||
      !this.props.hasCollections ||
      this.props.isFetchingCollections
    );

    return (
      <button
        disabled={isDisabled}
        className="button button--primary">
        <span>
          {this.props.isFetching ? 'Storing item...' : 'Store Item'}
        </span>
      </button>
    );
  }

  renderError() {
    const { errors } = this.state;
    const invalidFields = Object.keys(errors);

    if (!this.state.isValid) {
      return invalidFields.map(function(field, index) {
        return (
          <div key={`${field}-error-${index}`} className="ui__group">
            <label className="ui__error">{errors[field]}</label>
          </div>
        );
      })
    } else {
      return null;
    }
  }

  formDidPassValidation() {
    const color = this.refs.color.state.selected;
    const collection = React.findDOMNode(this.refs.collection).value;
    const description = React.findDOMNode(this.refs.description).value;

    if (this.state.formWasSubmitted) {
      this.context.flux.getActions('items').create(
        this.props.userId,
        collection,
        Object.assign(this.props.item, { color, description })
      ).catch((response) => {
        this.setState({
          errors: { request: response.error },
          isValid: false
        });
      });
    }
  }
}

export default authenticated(StoreItemForm);
