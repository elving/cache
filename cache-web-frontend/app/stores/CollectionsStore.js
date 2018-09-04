import isOwner from 'lib/isOwner';
import { Store } from 'flummox';
import { clone, filter, isArray, isEmpty, forEach } from 'lodash';

export default class CollectionsStore extends Store {
  constructor(flux) {
    super();

    const collectionsActions = flux.getActions('collections');

    this.register(collectionsActions.add, this.onAdd);
    this.register(collectionsActions.select, this.onSelect);
    this.register(collectionsActions.search, this.onSearch);
    this.register(collectionsActions.resetSearch, this.onResetSearch);

    this.register(
      collectionsActions.showPrivacyModal, this.handleShowPrivacyModal
    );

    this.register(
      collectionsActions.hidePrivacyModal, this.handleHidePrivacyModal
    );

    this.register(
      collectionsActions.showDeleteModal, this.handleShowDeleteModal
    );

    this.register(
      collectionsActions.hideDeleteModal, this.handleHideDeleteModal
    );

    this.register(
      collectionsActions.showShareModal, this.handleShowShareModal
    );

    this.register(
      collectionsActions.hideShareModal, this.handleHideShareModal
    );

    this.registerAsync(
      collectionsActions.fetch,
      this.onFetch, this.onFetchSuccess, this.onFetchFail
    );

    this.registerAsync(
      collectionsActions.fetchPublic,
      this.onFetch, this.onFetchPublicSuccess, this.onFetchFail
    );

    this.registerAsync(
      flux.getActions('items').fetch, this.onItemsFetch
    );

    this.registerAsync(
      flux.getActions('items').fetchPublic, this.onItemsFetch
    );

    this.registerAsync(
      collectionsActions.create,
      this.onCreate, this.onCreateSuccess, this.onCreateFail
    );

    this.registerAsync(
      collectionsActions.edit,
      this.onEdit, this.onEditSuccess, this.onEditFail
    );

    this.registerAsync(
      collectionsActions.updatePrivacy,
      this.onUpdatePrivacy,
      this.onUpdatePrivacySuccess,
      this.onUpdatePrivacyFail
    );

    this.registerAsync(
      collectionsActions.delete,
      this.onDelete, this.onDeleteSuccess, this.onDeleteFail
    );

    this.state = {
      current: null,
      isEditing: false,
      isCreating: false,
      isDeleting: false,
      hasFetched: false,
      isFetching: false,
      collections: [],
      isSearching: false,
      showDeleteModal: false,
      showPrivacyModal: false,
      isUpdatingPrivacy: false,
      filteredCollections: []
    };
  }

  onAdd(collection) {
    let { collections } = this.state;
    collections.push(collection);
    this.setState({ collections });
  }

  onSelect(id) {
    this.setState({ current: id });
  }

  onSearch(term) {
    let matches = [];

    term = term.toLowerCase();

    this.state.collections.forEach(function(collection) {
      const name = collection.name.toLowerCase();
      const regexp = new RegExp(term);

      if (name.startsWith(term) || regexp.test(name)) {
        matches.push(collection);
      }
    });

    this.setState({
      isSearching: true,
      filteredCollections: matches
    });
  }

  onResetSearch() {
    this.setState({
      isSearching: false,
      filteredCollections: []
    });
  }

  onFetch() {
    this.setState({
      current: null,
      hasFetched: false,
      isFetching: true
    });
  }

  onFetchSuccess(collections) {
    this.setState({
      hasFetched: true,
      isFetching: false,
      collections
    });
  }

  onFetchPublicSuccess(collection) {
    let { collections } = this.state;

    if (collections && isArray(collections)) {
      collections.push(collection);
    } else {
      collections = [collection];
    }

    this.setState({
      hasFetched: true,
      isFetching: false,
      collections
    });
  }

  onFetchFail() {
    this.setState({
      hasFetched: false,
      isFetching: false,
      collections: []
    });
  }

  onItemsFetch(payload) {
    this.setState({ current: payload.actionArgs[0] });
  }

  onCreate() {
    this.setState({ isCreating: true });
  }

  onCreateSuccess(collection) {
    let collections = this.state.collections;

    if (isArray(collections)) {
      collections.unshift(collection);
    } else {
      collections = [collection];
    }

    this.setState({
      current: collection.objectId,
      isCreating: false,
      collections
    });
  }

  onCreateFail() {
    this.setState({ isCreating: false });
  }

  onEdit(payload) {
    let current;
    const id = payload.actionArgs[0];
    const changes = payload.actionArgs[1];

    forEach(this.state.collections, (collection, index) => {
      if (collection.objectId === id) {
        current = Object.assign({}, collection, changes);
        this.state.collections[index] = current;
        return false;
      }
    });

    this.setState({
      current: current.objectId,
      isEditing: true
    });
  }

  onEditSuccess() {
    this.setState({ isEditing: false });
  }

  onEditFail() {
    this.setState({ isEditing: false });
  }

  onUpdatePrivacy(payload) {
    let current;
    const id = payload.actionArgs[0];
    const isPublic = payload.actionArgs[1];

    forEach(this.state.collections, (collection, index) => {
      if (collection.objectId === id) {
        current = clone(this.state.collections[index]);
        current.isPublic = isPublic;
        this.state.collections[index] = current;
        return false;
      }
    });

    this.setState({
      current: current.objectId,
      isUpdatingPrivacy: true
    });
  }

  onUpdatePrivacySuccess() {
    this.setState({ isUpdatingPrivacy: false });
  }

  onUpdatePrivacyFail() {
    this.setState({ isUpdatingPrivacy: false });
  }

  handleShowPrivacyModal() {
    this.setState({ showPrivacyModal: true });
  }

  handleHidePrivacyModal() {
    this.setState({ showPrivacyModal: false });
  }

  handleShowShareModal() {
    this.setState({ showShareModal: true });
  }

  handleHideShareModal() {
    this.setState({ showShareModal: false });
  }

  handleShowDeleteModal() {
    this.setState({ showDeleteModal: true });
  }

  handleHideDeleteModal() {
    this.setState({ showDeleteModal: false });
  }

  onDelete() {
    this.setState({ isDeleting: true });
  }

  onDeleteSuccess(response) {
    this.setState({
      current: null,
      isDeleting: false,
      collections: filter(this.state.collections, function(collection) {
        return collection.objectId !== response.collection;
      }),
      showDeleteModal: false
    });
  }

  onDeleteFail() {
    this.setState({
      isDeleting: false,
      showDeleteModal: false
    });
  }

  hasCollection(id) {
    return !isEmpty(this.getById(id));
  }

  hasCollections() {
    return this.state.collections.length > 0;
  }

  getUserCollections() {
    return filter(this.state.collections, (collection) => {
      return isOwner(collection);
    });
  }

  getCurrent() {
    return this.getById(this.state.current);
  }

  getById(id) {
    return this.state.collections.find(function(collection) {
      return collection.objectId === id;
    });
  }
}
