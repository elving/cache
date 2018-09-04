import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router';

import isSearch from 'lib/isSearch';
import classNames from 'classnames';
import buildFilters from 'lib/buildFilters';
import hasSearchFilter from 'lib/hasSearchFilter';
import { find, select, isEmpty } from 'lodash';

import AppIcon from 'components/AppIcon';
import CollectionIcon from 'components/CollectionIcon';

export default class CollectionHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { search: [] };
    const { filters } = props;

    if (filters && hasSearchFilter(filters)) {
      const search = find(filters, (filter) => isSearch(filter));

      if (search) {
        this.state.search = search.replace('search-', '').split(',');
      }
    }
  }

  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isSearchingItems && this.state.search) {
      this.setState({ search: '' }, () => {
        this.applySearchFilter();
      });
    }
  }

  render() {
    const mainClasses = classNames({
      'collection-header': true,
      'collection-header--searching': this.props.isSearchingItems
    });

    return (
      <div className={mainClasses}>
        <div className="content__title">
          <h1
            className="content__title__text collection-header__name">
            <CollectionIcon
              size="22px"
              name={this.props.icon}
              color="#5f6568"/>
            {this.props.name}
            {this.renderOwner()}
            {this.renderPrivacy()}
          </h1>

          {this.renderActions()}
        </div>
        {this.renderDescription()}
        {this.renderSearchBar()}
      </div>
    );
  }

  renderPrivacy() {
    const { isPublic, userIsOwnerOfCurrentCollection } = this.props;
    const privacyClasses = classNames({
      'collection-header__privacy': true,
      'collection-header__privacy--public': isPublic,
      'collection-header__privacy--private': !isPublic
    });

    return userIsOwnerOfCurrentCollection ? (
      <small className={privacyClasses}>
        {isPublic ? 'Public' : 'Private'}
      </small>
    ) : null;
  }

  renderOwner() {
    const { owner, userIsOwnerOfCurrentCollection } = this.props;

    return !userIsOwnerOfCurrentCollection && owner ? (
      <small className="collection-header__owner">
        by {owner.username}
      </small>
    ) : null;
  }

  renderDescription() {
    const { description } = this.props;

    return description ? (
      <p className="collection-header__description">{description}</p>
    ) : null;
  }

  renderSearchBar() {
    const { allTags } = this.props;

    return (
      <div className="collection-header__search">
        <Select
          multi={true}
          value={this.state.search}
          options={allTags.map((tag) => ({
            value: `#${tag}`,
            label: `#${tag}`
          }))}
          onChange={(value) => {
            this.setState({ search: value }, () => {
              this.applySearchFilter();
            });
          }}
          className="collection-header__search-input"
          placeholder="Search for keywords and #tags"
          allowCreate={true}
          addLabelText={`Search by keyword: {label}`}
          noResultsText="There are no tags created in this collection..."
          valueRenderer={(option) => option.label}
        />
        <button
          onClick={this.onCloseSearchClick.bind(this)}
          className="button"
          data-action="closeItemsSearch"
        >
          <span>Clear</span>
        </button>
      </div>
    );
  }

  renderActions() {
    return !this.props.userIsOwnerOfCurrentCollection ? (
      <div className="content__title__actions collection-header__actions">
        <button
          type="button"
          onClick={this.showShareModal.bind(this)}
          className="button button--mini button--primary"
          data-action="shareCollection">
          <span>
            Share collection
            <AppIcon name="share" size="18px" color="#2e9af4"/>
          </span>
        </button>
      </div>
    ) : (
      <div className="content__title__actions collection-header__actions">
        <button
          type="button"
          onClick={this.showCreateItemModal.bind(this)}
          className="button button--mini button--primary"
          data-action="storeLink">
            <span>
              Store link
              <AppIcon name="create" size="18px" color="#2e9af4"/>
            </span>
        </button>

        <div className="dropdown dropdown--light">
          <div className="dropdown__toggler">
            <AppIcon
              size="22px"
              name="settings"
              className="dropdown__toggler__icon"/>
          </div>

          <div className="dropdown__items">
            <Link
              to="edit-collection"
              params={{collection: this.props.collection}}
              className="dropdown__item">
              Edit
            </Link>

            <a
              href="#"
              onClick={this.showPrivacyModal.bind(this)}
              className="dropdown__item">
              Privacy
            </a>

            <a
              href="#"
              onClick={this.showDeleteModal.bind(this)}
              className="dropdown__item">
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }

  onCloseSearchClick() {
    this.context.flux.getActions('app').toggleItemsSearch();

    if (this.state.search) {
      this.setState({ search: '' }, () => {
        this.applySearchFilter();
      });
    }
  }

  applySearchFilter() {
    const { filters, collection } = this.props;

    setTimeout(() => {
      this.context.router.transitionTo('collection', { collection }, {
        filters: buildFilters(filters, `search-${this.state.search}`)
      });
    }, 0);
  }

  showDeleteModal(event) {
    event.preventDefault();
    this.context.flux.getActions('collections').showDeleteModal();
  }

  showPrivacyModal(event) {
    event.preventDefault();
    this.context.flux.getActions('collections').showPrivacyModal();
  }

  showShareModal() {
    this.context.flux.getActions('collections').showShareModal();
  }

  showCreateItemModal() {
    this.context.flux.getActions('items').showCreateModal();
  }
}
