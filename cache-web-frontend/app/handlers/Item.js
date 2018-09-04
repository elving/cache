import React from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import Modal from 'components/Modal';
import TextDetail from 'components/TextDetail';
import LinkDetail from 'components/LinkDetail';
import ImageDetail from 'components/ImageDetail';
import VideoDetail from 'components/VideoDetail';
import AudioDetail from 'components/AudioDetail';
import connectToStores from 'flummox/connect';

class Item extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteModalIsVisible: props.showDeleteItemModal
    };
  }

  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ deleteModalIsVisible: nextProps.showDeleteItemModal });
  }

  render() {
    const mainClasses = classNames({
      'Item': true,
      'Item--not-owner': !this.props.userIsOwnerOfCurrentCollection,
      'Item--no-sidebar': !this.props.userIsOwnerOfCurrentCollection
    });

    return (
      <div className={mainClasses}>
        {this.renderItem()}
        {this.renderDeleteModal()}
      </div>
    );
  }

  renderItem() {
    const {
      currentItem,
      currentCollection,
      userIsOwnerOfCurrentCollection
    } = this.props;

    if (isEmpty(currentItem) || isEmpty(currentCollection)) {
      return null;
    }

    switch (currentItem.type) {
      case 'text':
        return (
          <TextDetail
            id={currentItem.objectId}
            userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
            {...currentItem}/>
        );

      case 'link':
        return (
          <LinkDetail
            id={currentItem.objectId}
            userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
            {...currentItem}/>
        );

      case 'image':
        return (
          <ImageDetail
            id={currentItem.objectId}
            userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
            {...currentItem}/>
        );

      case 'video':
        return (
          <VideoDetail
            id={currentItem.objectId}
            userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
            {...currentItem}/>
        );

      case 'audio':
        return (
          <AudioDetail
            id={currentItem.objectId}
            userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
            {...currentItem}/>
        );

      default:
        return null;
    }
  }

  renderDeleteModal() {
    return this.props.userIsOwnerOfCurrentCollection ? (
      <Modal width="520px" isVisible={this.state.deleteModalIsVisible}>
        <h3 className="Modal__title">
          Are you sure you want to delete this item?
        </h3>
        <p className="Modal__text">
          This action can't be undone.
        </p>
        <div className="Modal__actions">
          <button
            onClick={this.deleteItem.bind(this)}
            disabled={this.props.isDeletingAnItem}
            className="button button--danger"
            data-action="deleteItem">
            <span>
              {!this.props.isDeletingAnItem ? 'Yes, delete' : 'Deleting...'}
            </span>
          </button>
          <button
            onClick={this.hideDeleteModal.bind(this)}
            disabled={this.props.isDeletingAnItem}
            className="button button--transparent">
            <span>Cancel</span>
          </button>
        </div>
      </Modal>
    ) : null;
  }

  deleteItem() {
    this.context.flux.getActions('items').delete(
      this.props.params.item
    ).then(() => {
      this.hideDeleteModal();

      this.context.flux.getActions('notifications').notify(
        'success', 'Item deleted successfully!'
      );

      this.context.router.transitionTo('collection', {
        collection: this.props.params.collection
      });
    }).catch((response) => {
      this.context.flux.getActions('notifications').notify(
        'error', response.error
      );
    });
  }

  hideDeleteModal() {
    this.context.flux.getActions('items').hideDeleteModal();
  }
}

export default connectToStores(
  Item, ['items'], ([itemsStore]) => ({
    isDeletingItem: itemsStore.state.isDeleting
  })
);
