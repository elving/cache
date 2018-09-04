/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { pluck, isEmpty } from 'lodash';

import Items from 'components/Items';
import Modal from 'components/Modal'
import cleanFilters from 'lib/cleanFilters';
import StoreLinkInput from 'components/StoreLinkInput';
import CollectionHeader from 'components/CollectionHeader';
import CollectionSidebar from 'components/CollectionSidebar';
import CollectionSidebarPlaceholder from 'components/CollectionSidebarPlaceholder';
import { FacebookButton, TwitterButton } from 'react-social';

export default class Collection extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      shareModalIsVisible: props.showShareCollectionModal,
      deleteModalIsVisible: props.showDeleteCollectionModal,
      privacyModalIsVisible: props.showPrivacyModal,
      createItemModalIsVisible: props.showCreateItemModal,

      isPublic: props.currentCollection
        ? props.currentCollection.isPublic
        : false
    };
  }

  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  static willTransitionFrom(transition, component) {
    if (component) {
      component.hideItemModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shareModalIsVisible: nextProps.showShareCollectionModal,
      deleteModalIsVisible: nextProps.showDeleteCollectionModal,
      privacyModalIsVisible: nextProps.showPrivacyModal,
      createItemModalIsVisible: nextProps.showCreateItemModal
    });

    if (!isEmpty(nextProps.currentCollection)) {
      this.setState({ isPublic: nextProps.currentCollection.isPublic });
    }
  }

  componentDidUpdate() {
    if (this.state.createItemModalIsVisible) {
      React.findDOMNode(this.refs.storeLinkInput.refs.link).focus();
    }
  }

  render() {
    const contentRightClasses = classNames({
      'collection-right': true,
      'collection-right--is-empty': !this.props.hasItems
    });

    return (
      <div className="collection">
        {this.renderDeleteModal()}
        {this.renderCreateItemModal()}
        {this.renderPrivacyModal()}
        {this.renderShareModal()}

        <div className="collection-left">
          {this.renderSidebar()}
        </div>

        <div className={contentRightClasses}>
          <CollectionHeader
            name={this.props.currentCollection.name}
            icon={this.props.currentCollection.icon}
            owner={this.props.currentCollection.createdBy || {}}
            allTags={this.props.tags}
            filters={this.props.query.filters || []}
            isPublic={this.props.currentCollection.isPublic}
            collection={this.props.params.collection}
            description={this.props.currentCollection.description}
            isSearchingItems={this.props.isSearchingItems}
            userIsOwnerOfCurrentCollection={this.props.userIsOwnerOfCurrentCollection}
          />

          <Items
            items={this.props.visibleItems}
            hasItems={this.props.hasItems}
            collection={this.props.params.collection}
            itemsAreFiltered={this.props.itemsAreFiltered}
            sidebarIsVisible={this.props.sidebarIsVisible}
            hasFetchedCollections={this.props.hasFetchedCollections}
            userIsOwnerOfCurrentCollection={this.props.userIsOwnerOfCurrentCollection}
          />
        </div>
      </div>
    );
  }

  renderSidebar() {
    return this.props.hasItems || this.props.itemsAreFiltered ? (
      <CollectionSidebar
        filters={cleanFilters(this.props.query.filters) || []}
        collection={this.props.params.collection}
        sidebarIsVisible={this.props.sidebarIsVisible}
        isSearchingItems={this.props.isSearchingItems}/>
    ) : (
      <CollectionSidebarPlaceholder/>
    );
  }

  renderDeleteModal() {
    return this.props.userIsOwnerOfCurrentCollection ? (
      <Modal width="520px"
        isVisible={this.state.deleteModalIsVisible}
        className="DeleteCollectionModal"
      >
        <h3 className="Modal__title">
          Are you sure you want to delete this collection?
        </h3>
        <p className="Modal__text">
          All items this collection will also be deleted. <br/>
          This action can't be undone.
        </p>
        <div className="Modal__actions">
          <button
            onClick={this.deleteCollection.bind(this)}
            disabled={this.props.isDeletingACollection}
            className="button button--danger"
            data-action="deleteCollection">
            <span>
              {!this.props.isDeletingACollection ? 'Yes, delete' : 'Deleting...'}
            </span>
          </button>
          <button
            onClick={this.hideDeleteModal.bind(this)}
            disabled={this.props.isDeletingACollection}
            className="button">
            <span>Cancel</span>
          </button>
        </div>
      </Modal>
    ) : null;
  }

  renderCreateItemModal() {
    return this.props.userIsOwnerOfCurrentCollection ? (
      <Modal width="520px"
        isVisible={this.state.createItemModalIsVisible}
        className="CreateItemModal"
      >
        <div className="Modal__content">
          <StoreLinkInput
            ref="storeLinkInput"
            collection={this.props.params.collection}/>
        </div>
        <div className="instructions" style={{ padding: '0 15px 12px' }}>
          <a
            href="http://www.trycache.co/tools"
            target="_blank"
          >
            Install the browser extension to save different types of content.
          </a>
        </div>
        <div className="Modal__actions">
          <button
            onClick={this.hideItemModal.bind(this)}
            className="button button--full-width">
            <span>Cancel</span>
          </button>
        </div>
      </Modal>
    ) : null;
  }

  renderPrivacyModal() {
    const { name, description } = this.props.currentCollection;
    const { userIsOwnerOfCurrentCollection } = this.props;
    const { isPublic, privacyModalIsVisible } = this.state;

    const shareClasses = classNames({
      'collection-privacy__share': true,
      'collection-privacy__share--visible': isPublic
    });

    const generateEmailMessage = () => {
      const subject = `${name} on Cache`;
      const message = (
        `Check out "${name}: ${description}" on Cache ${window.location.href}`
      );

      return `mailto:?subject=${subject}&body=${message}`;
    }

    const generateTwitterMessage = () => {
      const title = `${name}: ${description}`;
      const fullMessage = `${title} on @try_cache`;
      const shortMessage = `${name}: on @try_cache`;
      return fullMessage.length > 140 ? shortMessage : fullMessage;
    }

    const generateFacebookMessage = () => {
      return `${name}: ${description} on Cache`;
    }

    return userIsOwnerOfCurrentCollection ? (
      <Modal width="520px"
        isVisible={privacyModalIsVisible}
        className="CollectionPrivacyModal"
      >
        <h3 className="Modal__title">Privacy Settings</h3>
        <p className="Modal__text">
          When a collection is public, all the items in it <br/>
          become available for everyone to see (no login required).
        </p>
        <div className="Modal__content Modal__content--stacked">
          <div className="collection-privacy-toggle">
            <label className="collection-privacy-toggle__label">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={this.handlePrivacyChange.bind(this)}
                className="collection-privacy-toggle__input"/>
              This collection is public.
            </label>
          </div>
          <div className={shareClasses}>
            <div className="collection-privacy__share__items">
              <span className="collection-privacy__share__label">Share url:</span>
              <input
                ref={(component) => {
                  const input = React.findDOMNode(component);
                  if (input) input.select();
                }}
                value={window.location.href}
                readOnly
                onClick={(event) => { event.target.select(); }}
                className="textfield textfield--mini collection-privacy__share__input"/>
            </div>
            <div className="collection-privacy__share__items">
              <span className="collection-privacy__share__label">Share via:</span>
              <a
                href={generateEmailMessage()}
                className="collection-privacy__share__item button button--primary button--mini"
                data-action="shareEmail">
                <span>Email</span>
              </a>
              <TwitterButton
                message={generateTwitterMessage()}
                className="collection-privacy__share__item button button--primary button--mini"
                data-action="shareTwitter">
                <span>Twitter</span>
              </TwitterButton>
              <FacebookButton
                message={generateFacebookMessage()}
                className="collection-privacy__share__item button button--primary button--mini"
                data-action="shareFacebook">
                <span>Facebook</span>
              </FacebookButton>
            </div>
          </div>
        </div>
        <div className="Modal__actions">
          <button
            onClick={this.savePrivacy.bind(this)}
            disabled={this.props.isUpdatingPrivacy}
            className="button button--primary">
            <span>
              {this.props.isUpdatingPrivacy ? 'Updating privacy...' : 'Update'}
            </span>
          </button>
          <button
            onClick={this.hidePrivacyModal.bind(this)}
            disabled={this.props.isUpdatingPrivacy}
            className="button">
            <span>Close</span>
          </button>
        </div>
      </Modal>
    ) : null;
  }

  renderShareModal() {
    const { name, description } = this.props.currentCollection;
    const { shareModalIsVisible } = this.state;

    const generateEmailMessage = () => {
      const subject = `${name} on Cache`;
      const message = (
        `Check out "${name}: ${description}" on Cache ${window.location.href}`
      );

      return `mailto:?subject=${subject}&body=${message}`;
    }

    const generateTwitterMessage = () => {
      const title = `${name}: ${description}`;
      const fullMessage = `${title} on @try_cache`;
      const shortMessage = `${name}: on @try_cache`;
      return fullMessage.length > 140 ? shortMessage : fullMessage;
    }

    const generateFacebookMessage = () => {
      return `${name}: ${description} on Cache`;
    }

    return (
      <Modal width="520px"
        isVisible={shareModalIsVisible}
        className="CollectionShareModal"
      >
        <h3 className="Modal__title">Share this collection</h3>
        <div className="Modal__content Modal__content--stacked Modal__content--share">
          <div className="collection-privacy__share collection-privacy__share--visible">
            <div className="collection-privacy__share__items">
              <span className="collection-privacy__share__label">Share url:</span>
              <input
                ref={(component) => {
                  const input = React.findDOMNode(component);
                  if (input) input.select();
                }}
                value={window.location.href}
                readOnly
                onClick={(event) => { event.target.select(); }}
                className="textfield textfield--mini collection-privacy__share__input"/>
            </div>
            <div className="collection-privacy__share__items">
              <span className="collection-privacy__share__label">Share via:</span>
              <a
                href={generateEmailMessage()}
                className="collection-privacy__share__item button button--primary button--mini"
                data-action="shareEmail">
                <span>Email</span>
              </a>
              <TwitterButton
                message={generateTwitterMessage()}
                className="collection-privacy__share__item button button--primary button--mini"
                data-action="shareTwitter">
                <span>Twitter</span>
              </TwitterButton>
              <FacebookButton
                message={generateFacebookMessage()}
                className="collection-privacy__share__item button button--primary button--mini"
                data-action="shareFacebook">
                <span>Facebook</span>
              </FacebookButton>
            </div>
          </div>
        </div>
        <div className="Modal__actions">
          <button
            onClick={this.hideShareModal.bind(this)}
            className="button button--full-width">
            <span>Close</span>
          </button>
        </div>
      </Modal>
    );
  }

  deleteCollection() {
    this.context.flux.getActions('collections').delete(
      this.props.params.collection
    ).then(() => {
      this.hideDeleteModal();

      this.context.flux.getActions('notifications').notify(
        'success', 'Collection deleted successfully!'
      );

      this.context.router.transitionTo('collections');
    }).catch((response) => {
      this.context.flux.getActions('notifications').notify(
        'error', response.error
      );
    });
  }

  hideDeleteModal() {
    this.context.flux.getActions('collections').hideDeleteModal();
  }

  hideItemModal() {
    if (this.refs.storeLinkInput) {
      React.findDOMNode(this.refs.storeLinkInput.refs.link).value = '';
      this.context.flux.getActions('items').hideCreateModal();
    }
  }

  hidePrivacyModal() {
    this.context.flux.getActions('collections').hidePrivacyModal();
  }

  hideShareModal() {
    this.context.flux.getActions('collections').hideShareModal();
  }

  handlePrivacyChange() {
    this.setState({ isPublic: !this.state.isPublic });
  }

  savePrivacy() {
    const { isPublic } = this.state;
    const { collection } = this.props.params;

    this.context.flux.getActions('collections').updatePrivacy(
      collection, isPublic
    ).then((response) => {
      this.context.flux.getActions('notifications').notify(
        'success', 'Collection privacy was updated.'
      );
    }).catch((response) => {
      this.context.flux.getActions('notifications').notify(
        'success', response.error
      );
    });
  }
}
