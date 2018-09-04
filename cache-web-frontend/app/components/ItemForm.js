import Select from 'react-select';
import classNames from 'classnames';
import React, { Component } from 'react';
import { isEmpty, isEqual, compact, first, clone, unique } from 'lodash'

import AppIcon from 'components/AppIcon';
import IconChooser from 'components/IconChooser';
import ColorPicker from 'components/ColorPicker';
import FluxComponent from 'flummox/component';
import CollectionChooser from 'components/CollectionChooser';

import TextPreview from 'components/TextPreview';
import LinkPreview from 'components/LinkPreview';
import ImagePreview from 'components/ImagePreview';
import VideoPreview from 'components/VideoPreview';
import AudioPreview from 'components/AudioPreview';

export default class ItemForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tags: props.item ? (props.item.tags || []) : [],
      title: props.item ? props.item.title : null,
      color: props.item ? props.item.color : null,
      errors: {},
      isValid: false,
      description: props.item ? props.item.description : null,
      hideSettings: props.hideSettings || false,
      hadNoCollections: false,
      newCollectionName: null,
      newCollectionIcon: null || 'folder',
      showCollectionForm: false
    };

    if (props.collection) {
      this.state.collection = props.collection;
    } else if (!isEmpty(props.collections)) {
      this.state.collection = first(props.collections).objectId;
    } else if (isEmpty(props.collections)) {
      this.state.showCollectionForm = true;
    }
  }

  static contextTypes = {
    flux: React.PropTypes.object
  }

  static defaultProps = {
    allTags: [],
    showCollectionChooser: true
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(this.props.collections) && nextProps.isSaving) {
      this.setState({ hadNoCollections: true });
    }
  }

  render() {
    const { item } = this.props;

    const previewClasses = classNames({
      'ItemForm__preview': true,
      'ItemForm__preview--loading': (
        this.props.isDisabled && !this.props.isSaving
      )
    });

    const settingClasses = classNames({
      'group': true,
      'group--hidden': this.state.hideSettings
    });

    return (
      <form
        className="ItemForm"
        onSubmit={::this.handleSubmit}>
        <div className={previewClasses}>
          {this.renderPreview()}
        </div>

        <div className="ItemForm__fields">
          {this.renderCollectionChooser()}

          <div className="group">
            <label className="label">Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={(event) => {
                this.setState({ title: event.target.value });
              }}
              className="textfield"
            />
          </div>

          <div className="group">
            <label className="label">Description</label>
            <textarea
              value={this.state.description}
              onChange={(event) => {
                this.setState({ description: event.target.value });
              }}
              className="textfield"
            />
          </div>

          {this.renderMoreSettingsToggle()}

          <div className={settingClasses}>
            <label className="label">Tags</label>
            <Select
              multi={true}
              value={this.state.tags.join(',')}
              options={this.props.allTags.map((tag) => ({
                value: tag,
                label: tag
              }))}
              onChange={(value) => {
                this.setState({
                  tags: value.split(',').map((tag) => {
                    return tag.replace(/\s|,|\W|_/, '');
                  })
                });
              }}
              placeholder="New tag..."
              allowCreate={true}
              addLabelText={`Add "{label}" as a new tag`}
              noResultsText="Add new tags for this item..."
              valueRenderer={(option) => `#${option.label}`}
            />
          </div>

          <div className={settingClasses}>
            <label className="label">Color</label>
            <ColorPicker
              selected={item.color}
              onChange={(color) => { this.setState({ color }); }}
            />
          </div>

          <div className="group">
            {this.renderSubmitButton()}
          </div>

          {this.renderError()}
        </div>
      </form>
    );
  }

  renderPreview() {
    const item = !isEmpty(this.props.item) ? this.props.item : {};

    if (this.props.isDisabled && !this.props.isSaving) {
      return null;
    } else {
      switch(item.type) {
        case 'text':
          return <TextPreview {...item}/>;

        case 'link':
          return <LinkPreview {...item}/>;

        case 'image':
          return <ImagePreview {...item}/>;

        case 'video':
          return <VideoPreview {...item}/>;

        case 'audio':
          return <AudioPreview {...item}/>;

        default:
          return this.renderPreviewError();
      }
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

  renderCollectionChooser() {
    const { showCollectionForm, hadNoCollections } = this.state;
    const { item, collections, showCollectionChooser } = this.props;
    const showCloseCollectionBtn = !isEmpty(collections) && !hadNoCollections;

    const newCollectionClasses = classNames({
      'group': true,
      'ItemForm__new-collection': true,
      'ItemForm__new-collection--no-collections': !showCloseCollectionBtn
    });

    if (showCollectionChooser && !showCollectionForm && !isEmpty(collections)) {
      return (
        <div className="group ItemForm__collection">
          <CollectionChooser
            label="Select or Create a Collection"
            collection={this.props.collection}
            collections={this.props.collections}
            hasCollections={this.props.hasCollections}
            onCollectionChange={(collection) => {
              this.setState({ collection });
            }}
            isFetchingCollections={this.props.isFetchingCollections}
          />
          <button
            type="button"
            className="button button--mini button--transparent"
            data-action="showCollectionMiniForm"
            onClick={() => {
              this.setState({ showCollectionForm: true });
            }}
          >
            <span>
              <AppIcon name="create" size="21px" color="#68758C"/>
            </span>
          </button>
          <input
            ref="collection"
            type="hidden"
            value={this.state.collection}
          />
        </div>
      );
    } else if (showCollectionForm || isEmpty(collections)) {
      return (
        <div className={newCollectionClasses}>
          <label className="label">New Collection</label>
          <div className="group inline-groups">
            <div className="group create-collection__icon">
              <IconChooser
                selected={this.props.icon}
                onSelect={(icon) => {
                  this.setState({ newCollectionIcon: icon });
                }}/>
              <input
                ref="collection-icon"
                type="hidden"
                value={this.state.newCollectionIcon}
              />
            </div>
            <div className="group create-collection__name">
              <input
                ref="collection-name"
                value={this.state.newCollectionName}
                onChange={(event) => {
                  this.setState({
                    newCollectionName: event.target.value
                  });
                }}
                autoFocus
                className="textfield"/>
            </div>
            {showCloseCollectionBtn ? (
              <div className="group">
                <button
                  type="button"
                  className="button button--mini button--transparent"
                  data-action="hideCollectionMiniForm"
                  onClick={() => {
                    this.setState({ showCollectionForm: false });
                  }}
                >
                  <span>
                    <AppIcon name="close" size="21px" color="#68758C"/>
                  </span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderMoreSettingsToggle() {
    return this.state.hideSettings ? (
      <button
        onClick={() => { this.setState({ hideSettings: false }); }}
        className="button button--transparent"
        data-action="showMoreSettings">
        <span>More settings <AppIcon name="panel" color="#2498F7"/></span>
      </button>
    ) : (
      null
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
    const { isSaving, isDisabled, buttonText, savingButtonText } = this.props;

    return (
      <button
        disabled={isDisabled || isSaving}
        className="button button--primary"
      >
        <span>{isSaving ? savingButtonText : buttonText}</span>
      </button>
    );
  }

  handleSubmit(event) {
    let isValid = false;
    const errors = {};

    const {
      title,
      collection,
      newCollectionName,
      showCollectionForm
    } = this.state;

    event.preventDefault();

    if (!title) {
      errors.title = 'A title is required to store this item.';
    }

    if (!showCollectionForm && !collection) {
      errors.collection = 'A collection is required to store this item.';
    }

    if (showCollectionForm && !newCollectionName) {
      errors.collection = (
        'A name is required to create a new collection for this item.'
      );
    }

    if (isEmpty(errors)) {
      isValid = true;
    }

    this.setState({ errors, isValid }, () => {
      if (isValid) {
        this.props.onSubmit({
          tags: this.state.tags,
          color: this.state.color,
          title: this.state.title,
          collection: this.state.collection,
          description: this.state.description,
          newCollectionName: this.state.newCollectionName,
          newCollectionIcon: this.state.newCollectionIcon,
          showCollectionForm: this.state.showCollectionForm
        });
      }
    });
  }
}
