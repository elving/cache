import React from 'react';
import { Link } from 'react-router';

import DB from 'lib/db';
import session from 'lib/session';
import { domain } from 'lib/utils';
import getServiceData from 'lib/getServiceData';
import { clone, defaults, isEmpty, first } from 'lodash';

import Header from 'components/Header';
import AppIcon from 'components/AppIcon';
import ItemForm from 'components/ItemForm';
import connectToStores from 'flummox/connect';
import ThumbnailChooser from 'components/ThumbnailChooser';
import needsAuthentication from 'lib/needsAuthentication';

class CreateItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      item: {},
      itemSaved: false,
      choosingThumbnail: true,
      isFetchingPageInfo: true,
      isCreatingCollection: false,
      errorFetchingPageInfo: false
    };
  }

  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    const params = this.context.router.getCurrentQuery();

    this.setState({
      item: this.getItemData(),
      collection: params.collection
    }, () => {
      const item = clone(this.state.item);

      DB.api.pageInfo(item.sourceUrl).then((response) => {
        if (!isEmpty(response.images)) {
          if (item.meta) {
            item.meta.cover = first(response.images);
          } else {
            item.meta = { cover: first(response.images) };
          }
        }

        this.setState({
          item: defaults(item, {
            title: response.title,
            description: response.description
          }),
          thumbnails: response.images,
          isFetchingPageInfo: false,
          errorFetchingPageInfo: isEmpty(response)
        });
      });

      this.context.flux.getActions('items').fetchTags().then(() => {
        this.context.flux.getActions('collections').fetch();
      });
    });
  }

  render() {
    return (
      <div className="CreateItem">
        <Header/>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    const {
      item,
      thumbnails,
      choosingThumbnail,
      isFetchingPageInfo,
      isCreatingCollection,
      errorFetchingPageInfo
    } = this.state;

    const showThumbnailChooser = (
      item.type === 'link' &&
      (item.meta && !item.meta.service) &&
      choosingThumbnail
    );

    if (isFetchingPageInfo) {
      return (
        <div className="CreateItem__content CreateItem__content--loading">
          <h1 className="CreateItem__title">
            {`Retrieving data from ${domain(item.sourceUrl)}`}
          </h1>
          <div className="CreateItem__content__loader"/>
        </div>
      );
    } else if (isEmpty(thumbnails) && showThumbnailChooser) {
      return (
        <div className="CreateItem__content">
          <h1 className="CreateItem__title">
            This link doesn't contain any extractable images
            to use for the item's thumbnail.
          </h1>
          <div className="CreateItem__actions">
            {this.renderCancelBtn()}
            <button
              onClick={this.showForm.bind(this)}
              className="button button--primary"
              data-action="goToStoreForm">
              <span>
                Continue <AppIcon name="next" size="16px" color="#2498F7"/>
              </span>
            </button>
          </div>
        </div>
      );
    } else if (showThumbnailChooser) {
      return (
        <div className="CreateItem__content">
          <h1 className="CreateItem__title">
            Choose a thumbnail for this link
          </h1>

          <ThumbnailChooser
            images={thumbnails}
            selected={item.meta ? item.meta.cover : null}
            onSelect={this.selectThumbnail.bind(this)}/>

          <div className="CreateItem__actions">
            {this.renderCancelBtn()}
            <button
              onClick={this.showForm.bind(this)}
              className="button button--primary"
              data-action="goToStoreForm">
              <span>
                Continue <AppIcon name="next" size="16px" color="#2498F7"/>
              </span>
            </button>
          </div>
        </div>
      );
    } else if (!this.props.isFetchingCollections) {
      return (
        <div className="CreateItem__content">
          <ItemForm
            item={item}
            allTags={this.props.allTags}
            onSubmit={this.onFormSubmit.bind(this)}
            isSaving={
              isCreatingCollection ||
              this.props.isCreatingAnItem
            }
            itemSaved={this.state.itemSaved}
            isDisabled={
              this.state.isFetchingPageInfo ||
              this.props.isFetchingCollections
            }
            buttonText={`Store this ${item.type}`}
            collection={this.state.collection}
            collections={this.props.collections}
            hideSettings={true}
            hasCollections={this.props.hasCollections}
            savingButtonText={'Storing...'}
            isFetchingCollections={this.props.isFetchingCollections}/>

          {this.renderThumbnailsBtn()}
        </div>
      );
    }
  }

  renderCancelBtn() {
    const { collection } = this.state;

    return collection ? (
      <Link
        to="collection"
        params={{collection: collection}}
        className="button button--transparent"
        data-action="cancelCreateItem">
        Cancel
      </Link>
    ) : null;
  }

  renderThumbnailsBtn() {
    const { item, thumbnails } = this.state;

    const showThumbnailChooser = (
      item.type === 'link' &&
      (item.meta && !item.meta.service) &&
      !isEmpty(thumbnails)
    );

    return showThumbnailChooser ? (
      <div className="CreateItem__actions">
        {this.renderCancelBtn()}

        <button
          onClick={this.showThumbnails.bind(this)}
          className="button button--grey"
          data-action="goToThumbnails">
          <span>
            <AppIcon name="prev" size="16px" color="#2c3e50"/>
            Choose thumbnail
          </span>
        </button>
      </div>
    ) : null;
  }

  showForm() {
    this.setState({ choosingThumbnail: false });
  }

  showThumbnails() {
    this.setState({ choosingThumbnail: true });
  }

  selectThumbnail(url) {
    const item = clone(this.state.item);

    if (item.meta) {
      item.meta.cover = url;
    } else {
      item.meta = { cover: url };
    }

    this.setState({ item });
  }

  getItemData() {
    const meta = {};
    const params = this.context.router.getCurrentQuery();
    const serviceData = getServiceData(params.sourceUrl);

    Object.keys(params).forEach(function(key) {
      switch(key) {
        case 'metaText':
          meta.text = params[key];
          break;

        case 'metaWidth':
          meta.width = params[key];
          break;

        case 'metaHeight':
          meta.height = params[key];
          break;

        case 'metaOrientation':
          meta.orientation = params[key];
          break;

        case 'metaExtension':
          meta.extension = params[key];
          break;
      }
    });

    if (serviceData && serviceData.serviceId) {
      meta.service = serviceData.service;
      meta.serviceId = serviceData.serviceId;
    }

    return {
      meta: meta,
      type: params.type,
      title: params.title,
      directUrl: params.directUrl,
      sourceUrl: params.sourceUrl,
      description: params.description,
      storingMethod: params.storingMethod
    };
  }

  onFormSubmit(formData) {
    const {
      newCollectionName,
      newCollectionIcon,
      showCollectionForm
    } = formData;

    const createItem = (collectionId = formData.collection) => {
      const item = Object.assign({}, this.state.item, {
        tags: formData.tags,
        color: formData.color,
        title: formData.title,
        collection: collectionId,
        description: formData.description
      });

      this.setState({ item }, () => {
        this.context.flux.getActions('items').create(
          Object.assign({}, this.state.item, {
            tags: formData.tags,
            color: formData.color,
            title: formData.title,
            collection: collectionId,
            description: formData.description
          })
        ).then(() => {
          if (this.state.collection) {
            setTimeout(() => {
              this.context.router.transitionTo('collection', {
                collection: collectionId
              });
            }, 0);
          } else {
            this.context.flux.getActions('notifications').notify(
              'success', 'Item stored successfully!', 'createdItem'
            );

            setTimeout(() => { window.close(); }, 1000);
          }
        }).catch((response) => {
          this.context.flux.getActions('notifications').notify(
            'error', response.error
          );
        });
      });
    }

    if (showCollectionForm) {
      this.setState({ isCreatingCollection: true }, () => {
        this.context.flux.getActions('collections').create({
          name: newCollectionName,
          icon: newCollectionIcon,
          description: ''
        }).then((response) => {
          createItem(response.objectId);
        }).catch((response) => {
          this.context.flux.getActions('notifications').notify(
            'error', response.error
          );
        });
      });
    } else {
      createItem();
    }
  }
}

export default needsAuthentication(
    connectToStores(
    CreateItem,
    ['items', 'collections'],
    ([itemsStore, collectionsStore], props) => {
      return {
        allTags: itemsStore.state.allTags,
        collections: collectionsStore.state.collections,
        hasCollections: collectionsStore.hasCollections(),
        currentCollection: collectionsStore.getCurrent() || {},
        isCreatingAnItem: itemsStore.state.isCreating,
        isFetchingCollections: collectionsStore.state.isFetching
      }
    }
  )
);
