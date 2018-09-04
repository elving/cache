/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import hasTagFilter from 'lib/hasTagFilter';
import hasSearchFilter from 'lib/hasSearchFilter';
import { Link, RouteHandler } from 'react-router';
import { last, pluck, isEmpty, isEqual } from 'lodash';

import Header from 'components/Header';
import AppIcon from 'components/AppIcon';
import Sidebar from 'components/Sidebar';
import Content from 'components/Content';
import ItemNotFound from 'components/ItemNotFound';
import CollectionsList from 'components/CollectionsList';
import CollectionsSearch from 'components/CollectionsSearch';
import CollectionNotFound from 'components/CollectionNotFound';

import session from 'lib/session';
import isOwner from 'lib/isOwner';
import cleanFilters from 'lib/cleanFilters';
import connectToStores from 'flummox/connect';

class Collections extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      willFilter: false,
      previousItem: props.params.item,
      previousFilters: cleanFilters(props.query.filters) || [],
      previousCollection: props.params.collection,
      hasFetchedCollections: false
    }

    this.itemsFetchTimeout = null;
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  componentWillMount() {
    // Show search input if navigating to a collection with a
    // keyword filter.
    if (hasSearchFilter(this.props.query.filters)) {
      this.props.flux.getActions('app').toggleItemsSearch();
    }

    // Show tags input filter if navigating to a collection with a
    // tag filter.
    if (hasTagFilter(this.props.query.filters)) {
      this.props.flux.getActions('app').toggleTagsSearch();
    }
  }

  componentDidMount() {
    let { filters } = this.props.query;
    const { flux } = this.props;
    const { router } = this.context;
    const { item, collection } = this.props.params;
    const itemsActions = flux.getActions('items');
    const collectionsActions = flux.getActions('collections');

    filters = cleanFilters(filters);

    if (collection) {
      collectionsActions.checkPrivacy(collection).then((isPublic) => {
        if (isPublic) {
          collectionsActions.fetchPublic(collection).then((publicCollection) => {
            const publicCollectionOwner = publicCollection.createdBy.objectId;

            if (!session.userIsLoggedIn || publicCollectionOwner !== session.getId()) {
              this.setState({ hasFetchedCollections: true }, () => {
                itemsActions.fetchPublic(collection).then(() => {
                  if (!isEmpty(filters)) {
                    this.setState({ previousFilters: filters }, () => {
                      itemsActions.filter(filters);
                    });
                  }

                  this.setState({ previousItem: item }, () => {
                    itemsActions.select(item);
                  });
                });
              });
            } else {
              this.fetchCollections();
            }
          });
        } else {
          if (!session.userIsLoggedIn) {
            this.setState({ hasFetchedCollections: true });
          } else {
            this.fetchCollections();
          }
        }
      }).catch((response) => {
        this.setState({ hasFetchedCollections: true });
      });
    } else {
      if (session.userIsLoggedIn) {
        this.fetchCollections();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { flux } = this.props;
    const { router } = this.context;
    const appActions = flux.getActions('app');
    const itemsActions = flux.getActions('items');
    const collectionsActions = flux.getActions('collections');

    const filters = cleanFilters(nextProps.query.filters) || [];
    const shouldFilterItems = !isEqual(this.state.previousFilters, filters);
    const willFilter = shouldFilterItems;
    const { hasCollections } = nextProps;
    const { item, collection } = nextProps.params;

    if (this.itemsFetchTimeout) {
      clearTimeout(this.itemsFetchTimeout);
    }

    // We don't need to run any of this logic if the user is on the create
    // collection page. This is a special case because of the url
    // (`/collections/create/`).
    if (hasCollections && last(nextProps.routes).name !== 'create-collection') {
      // If for some reason (maybe by pressing the back button) the user
      // navigates to `/collections/`, transition to the first collection.
      if (!collection) {
        this.setState({ previousCollection: collection }, () => {
          setTimeout(() => {
            router.transitionTo('collection', {
              collection: nextProps.collections[0].objectId
            });
          }, 0);
        });

      // Fetch items of the current collection if the current collection
      // changed.
      } else if (collection !== this.state.previousCollection) {
        if (!nextProps.isFetchingItems) {
          // If there are filters to be applied while we fetch for new items,
          // we need to perform the filtering after the request to fetch
          // items finishes. To acomplish this we use the `willFilter` flag so
          // that when fetching items triggers a new `componentWillReceiveProps`
          // cycle, the filtering logic happens after the promise is completed
          // and not immediately after starting to fetch new items.

          this.setState({ willFilter, previousCollection: collection }, () => {
            // Using this setTimeout we can prevent a dispatcher error
            // when firing multiple dispatches if the user tries to click on
            // the collections fast.

            this.itemsFetchTimeout = setTimeout(() => {
              appActions.closeItemsSearch();

              itemsActions.fetch(collection).then(() => {
                if (this.state.willFilter) {
                  this.setState({
                    willFilter: false,
                    previousFilters: filters
                  }, () => {
                    itemsActions.filter(filters);
                  });
                }
              });
            }, 0);
          });
        }

      // Filter items if there are filters or the filter parameters changed.
      } else if (shouldFilterItems && !this.state.willFilter) {
        this.setState({ previousFilters: filters }, () => {
          itemsActions.filter(filters);
        });

      // Set current item.
      } else if (item && item !== this.state.previousItem) {
        this.setState({ previousItem: item }, () => {
          itemsActions.select(item);
        });
      }
    }
  }

  render() {
    const mainClasses = classNames({
      'collections-page': true,
      'collections-page--fetching': (
        this.props.isFetchingCollections ||
        !this.state.hasFetchedCollections
      )
    });

    const mobileStyles = { overflow: 'hidden' };
    const { collectionsVisibleMobile } = this.props;

    return (
      <div
        style={collectionsVisibleMobile ? mobileStyles : {}}
        className={mainClasses}
      >
        <Header
          showCollectionIcon={true}
          collectionsVisibleMobile={this.props.collectionsVisibleMobile}
        />
        <div className="collections-page__wrapper">
          <Sidebar
            collection={this.props.params.collection}
            hasCollections={this.props.hasCollections}
            sidebarIsVisible={this.props.sidebarIsVisible}
            collectionsVisibleMobile={this.props.collectionsVisibleMobile}
            userIsOwnerOfCurrentCollection={this.props.userIsOwnerOfCurrentCollection}>
            <CollectionsSearch
              isSearching={this.props.isSearchingCollections}/>
            <CollectionsList
              collections={this.props.visibleCollections}
              hasCollections={this.props.hasCollections}
              currentCollection={this.props.params.collection}/>
            <div className="sidebar__actions">
              <Link to="create-collection"
                onClick={::this.hideCollectionsMobile}
                className="button button--primary-alt"
                data-action="create-collection"
              >
                <span>Create collection</span>
              </Link>
            </div>
          </Sidebar>
          <Content
            route={last(this.props.routes)}
            collection={this.props.params.collection}
            hasCollections={this.props.hasCollections}
            isFetchingItems={this.props.isFetchingItems}
            sidebarIsVisible={this.props.sidebarIsVisible}
            userIsOwnerOfCurrentCollection={this.props.userIsOwnerOfCurrentCollection}>
            {this.renderContent()}
          </Content>
        </div>
      </div>
    );
  }

  renderContent() {
    const itemsStore = this.props.flux.getStore('items');
    const collectionStore = this.props.flux.getStore('collections');

    const { item, collection } = this.props.params;
    const { hasFetchedCollections } = this.state;

    const {
      routes,
      hasCollections,
      isFetchingItems,
      isDeletingAnItem,
      isDeletingACollection
    } = this.props;

    const hasItem = itemsStore.hasItem(item);
    const hasCollection = collectionStore.hasCollection(collection);
    const isOnCreateCollectionPage = (last(routes).name === 'create-collection');

    if (isOnCreateCollectionPage || !hasFetchedCollections || isFetchingItems) {
      return (
        <RouteHandler
          {...this.props}
          hasFetchedCollections={hasFetchedCollections}/>
      );
    } else {
      if (item && !hasItem && !isFetchingItems && !isDeletingAnItem) {
        return (
          <ItemNotFound/>
        );
      } else if (collection && !hasCollection && !isDeletingACollection) {
        return (
          <CollectionNotFound/>
        );
      } else {
        return (
          <RouteHandler {...this.props} hasFetchedCollections={true}/>
        );
      }
    }
  }

  fetchCollections() {
    let { filters } = this.props.query;
    const { flux } = this.props;
    const { router } = this.context;
    const { item, collection } = this.props.params;
    const itemsActions = flux.getActions('items');
    const collectionsActions = flux.getActions('collections');
    const isOnCreateCollectionPage = last(this.props.routes).name === 'create-collection';

    filters = cleanFilters(filters);

    collectionsActions.fetch().then((collections) => {
      this.setState({ hasFetchedCollections: true }, () => {
        // Make sure that we dont automatically navigate the user to
        // the first collection if the current route is not `create-collection`.
        if (!isOnCreateCollectionPage && !collection && collections.length) {
          setTimeout(() => {
            router.transitionTo('collection', {
              collection: collections[0].objectId
            });
          }, 0);
        } else if (!isOnCreateCollectionPage && collection) {
          // If the user has no collections, redirect
          // to collections index route.
          if (!collections.length && collection) {
            setTimeout(() => {
              router.transitionTo('collections-index');
            }, 0);
          } else {
            // Fetch items of the current collection
            // (`/collections/:collection/`).
            itemsActions.fetch(collection).then(() => {
              this.itemsPromise = null;

              // Filter items (`/collections/:collection/?:filters`).
              if (!isEmpty(filters)) {
                this.setState({ previousFilters: filters }, () => {
                  itemsActions.filter(filters);
                });

              // Set current item (`/collections/:collection/:item/`).
              }

              this.setState({ previousItem: item }, () => {
                itemsActions.select(item);
              });

              // Since we already fetched all items, we don't need to fetch
              // individual items (`/collections/:collection/:item`).
            });
          }
        }
      });
    }).catch((error) => {
      if (error && error.code === 209) {
        setTimeout(() => {
          router.transitionTo('logout');
        }, 0);
      }
    });
  }

  hideCollectionsMobile() {
    this.context.flux.getActions('app').hideCollectionsMobile();
  }
}

export default connectToStores(
  Collections,
  ['app', 'items', 'collections'],
  ([appStore, itemsStore, collectionsStore]) => {
    const visibleItems = itemsStore.state.isFiltered
      ? itemsStore.state.filteredItems
      : itemsStore.state.items;

    const visibleCollections = collectionsStore.state.isSearching
      ? collectionsStore.state.filteredCollections
      : collectionsStore.state.collections;

    const currentCollection = collectionsStore.getCurrent() || {};

    return {
      tags: itemsStore.state.tags || [],
      items: itemsStore.state.items,
      hasItems: itemsStore.hasItems(),
      currentItem: itemsStore.getCurrent() || {},
      collections: collectionsStore.state.collections,
      hasCollections: collectionsStore.hasCollections(),
      isFetchingItems: itemsStore.state.isFetching,
      isEditingAnItem: itemsStore.state.isEditing,
      isDeletingAnItem: itemsStore.state.isDeleting,
      itemsAreFiltered: itemsStore.state.isFiltered,
      sidebarIsVisible: appStore.state.sidebarIsVisible,
      isSearchingItems: appStore.state.isSearchingItems,
      showPrivacyModal: collectionsStore.state.showPrivacyModal,
      isUpdatingPrivacy: collectionsStore.state.isUpdatingPrivacy,
      currentCollection: currentCollection,
      collectionIsPublic: currentCollection.isPublic,
      userIsAuthenticated: session.userIsLoggedIn,
      showCreateItemModal: itemsStore.state.showCreateModal,
      showDeleteItemModal: itemsStore.state.showDeleteModal,
      isEditingACollection: collectionsStore.state.isEditing,
      isCreatingACollection: collectionsStore.state.isCreating,
      isDeletingACollection: collectionsStore.state.isDeleting,
      isFetchingCollections: collectionsStore.state.isFetching,
      isSearchingCollections: collectionsStore.state.isSearching,
      collectionsVisibleMobile: appStore.state.collectionsVisibleMobile,
      showShareCollectionModal: collectionsStore.state.showShareModal,
      showDeleteCollectionModal: collectionsStore.state.showDeleteModal,
      userIsOwnerOfCurrentCollection: isOwner(currentCollection),

      visibleItems,
      visibleCollections
    };
  }
);
