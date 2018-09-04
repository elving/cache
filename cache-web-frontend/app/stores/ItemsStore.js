import { Store } from 'flummox';
import isSearch from 'lib/isSearch';
import itemTypes from 'lib/itemTypes';
import itemColors from 'lib/itemColors';
import hasSearchFilter from 'lib/hasSearchFilter';
import { where, clone, select, isEmpty, forEach, flatten } from 'lodash';

export default class ItemsStore extends Store {
  constructor(flux) {
    super();

    const itemsActions = flux.getActions('items');

    this.register(itemsActions.select, this.onSelect);
    this.register(itemsActions.filter, this.handleFilter);
    this.register(itemsActions.showDeleteModal, this.handleShowDeleteModal);
    this.register(itemsActions.hideDeleteModal, this.handleHideDeleteModal);
    this.register(itemsActions.showCreateModal, this.handleShowCreateModal);
    this.register(itemsActions.hideCreateModal, this.handleHideCreateModal);

    this.registerAsync(
      itemsActions.fetch,
      this.onFetch, this.onFetchSuccess, this.onFetchFail
    );

    this.registerAsync(
      itemsActions.fetchPublic,
      this.onFetch, this.onFetchSuccess, this.onFetchFail
    );

    this.registerAsync(
      itemsActions.create,
      this.onCreate, this.onCreateSuccess, this.onCreateFail
    );

    this.registerAsync(
      itemsActions.edit,
      this.onEdit, this.onEditSuccess, this.onEditFail
    );

    this.registerAsync(
      itemsActions.move,
      this.onMove, this.onMoveSuccess, this.onMoveFail
    );

    this.registerAsync(
      itemsActions.toggleHighlight,
      this.onHighlight, this.onHighlightSuccess, this.onHighlightFail
    );

    this.registerAsync(
      itemsActions.delete,
      this.onDelete, this.onDeleteSuccess, this.onDeleteFail
    );

    this.registerAsync(
      itemsActions.fetchTags,
      this.onFetchTags, this.onFetchTagsSuccess, this.onFetchTagsFail
    );

    this.state = {
      tags: [],
      items: [],
      allTags: [],
      current: null,
      filters: [],
      isMoving: false,
      isEditing: false,
      isCreating: false,
      isDeleting: false,
      hasFetched: false,
      isFetching: false,
      isFiltered: false,
      isSearching: false,
      filteredItems: [],
      isHighlighting: false,
      showDeleteModal: false,
      showCreateModal: false
    };
  }

  onSelect(id) {
    this.setState({ current: id });
  }

  handleFilter(filters) {
    let matches = [];

    if (!filters.length) {
      this.setState({
        filters: [],
        isFiltered: false,
        isSearching: false,
        filteredItems: []
      });
    } else {
      // Using lodash's `forEach` function here because I can
      // exit early if there are no more items to filter.
      forEach(filters, (filter, index) => {
        let items = matches.length ? matches : this.state.items;

        if (index > 0 && !matches.length) {
          return false;
        }

        if (filter === 'highlighted') {
          matches = where(items, { highlighted: true });
        } else if (itemTypes.indexOf(filter) !== -1) {
          matches = where(items, { type: filter });
        } else if (itemColors.indexOf(filter) !== -1) {
          matches = where(items, { color: filter });
        } else if (isSearch(filter)) {
          const search = (
            filter.replace(/^search\-/, '').toLowerCase().split(',')
          );

          search.forEach((term, termIndex) => {
            const _items = termIndex === 0 ? items : matches;

            matches = _items.filter((item) => {
              const { tags, title, description } = item;

              const regxp = new RegExp(term);
              const _tags = tags || [];
              const _title = title.toLowerCase();
              const _description = description ? description.toLowerCase() : '';

              if ((/^[\#]/).test(term)) {
                return _tags.indexOf(term.replace('#', '')) !== -1;
              } else {
                return (
                  _title.startsWith(term) ||
                  regxp.test(_title) ||
                  _description.startsWith(term) ||
                  regxp.test(_description)
                );
              }
            });
          });
        }
      });

      this.setState({
        filters: filters,
        isFiltered: true,
        isSearching: hasSearchFilter(filters),
        filteredItems: matches
      });
    }
  }

  onFetch() {
    this.setState({
      current: null,
      filters: [],
      hasFetched: false,
      isFetching: true,
      isFiltered: false,
      filteredItems: []
    });
  }

  onFetchSuccess(items) {
    this.setState({
      tags: flatten(items.map((i) => i.tags)),
      items,
      hasFetched: true,
      isFetching: false
    });
  }

  onFetchFail() {
    this.setState({
      tags: [],
      items: [],
      hasFetched: false,
      isFetching: false
    });
  }

  onCreate() {
    this.setState({
      isCreating: true,
      showCreateModal: false
    });
  }

  onCreateSuccess(item) {
    let items = this.state.items;
    items.unshift(item);

    this.setState({
      tags: flatten(items.map((i) => i.tags)),
      items,
      current: item.objectId,
      isCreating: false
    });
  }

  onCreateFail() {
    this.setState({ isCreating: false });
  }

  onEdit(payload) {
    const id = payload.actionArgs[0];
    const items = this.state.items;
    const changes = payload.actionArgs[1];

    forEach(items, function(item) {
      if (item.objectId === id) {
        Object.assign(item, changes);
        return false;
      }
    });

    this.setState({
      tags: flatten(items.map((i) => i.tags)),
      items,
      isEditing: true
    });
  }

  onEditSuccess() {
    this.setState({ isEditing: false });
  }

  onEditFail() {
    this.setState({ isEditing: false });
  }

  onMove(payload) {
    const id = payload.actionArgs[0];
    const items = select(this.state.items, function(item) {
      return item.objectId !== id;
    });

    this.setState({
      tags: flatten(items.map((i) => i.tags)),
      items,
      isMoving: true
    });
  }

  onMoveSuccess() {
    this.setState({ isMoving: false });
  }

  onMoveFail() {
    this.setState({ isMoving: false });
  }

  onHighlight(payload) {
    const id = payload.actionArgs[0];
    const items = this.state.items;

    forEach(items, (item) => {
      if (item.objectId === id) {
        item.highlighted = !item.highlighted;
        return false;
      }
    });

    this.setState({
      items,
      isHighlighting: true
    });
  }

  onHighlightSuccess() {
    this.setState({ isHighlighting: false });
  }

  onHighlightFail() {
    this.setState({ isHighlighting: false });
  }

  handleShowDeleteModal() {
    this.setState({ showDeleteModal: true });
  }

  handleHideDeleteModal() {
    this.setState({ showDeleteModal: false });
  }

  handleShowCreateModal() {
    this.setState({ showCreateModal: true });
  }

  handleHideCreateModal() {
    this.setState({ showCreateModal: false });
  }

  onDelete() {
    this.setState({ isDeleting: true });
  }

  onDeleteSuccess(response) {
    const items = select(this.state.items, function(item) {
      return item.objectId !== response.item;
    });

    this.setState({
      tags: flatten(items.map((i) => i.tags)),
      items,
      current: null,
      isDeleting: false,
      showDeleteModal: false
    });
  }

  onDeleteFail() {
    this.setState({
      isDeleting: false,
      showDeleteModal: false
    });
  }

  onFetchTags() {
    this.setState({ allTags: [] });
  }

  onFetchTagsSuccess(allTags) {
    this.setState({ allTags });
  }

  onFetchTagsFail() {
    this.setState({ allTags: [] });
  }

  hasItems() {
    return this.state.isFiltered
      ? this.state.filteredItems.length > 0
      : this.state.items.length > 0;
  }

  hasItem(id) {
    return !isEmpty(this.getById(id));
  }

  getItemsCount() {
    return this.state.items.length
  }

  getCurrent() {
    return this.getById(this.state.current);
  }

  getById(id) {
    return this.state.items.find(function(item) {
      return item.objectId === id;
    });
  }
}
