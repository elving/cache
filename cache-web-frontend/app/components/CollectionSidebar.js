import React from 'react';
import { Link } from 'react-router';
import itemTypes from 'lib/itemTypes';
import itemColors from 'lib/itemColors';
import classNames from 'classnames';
import buildFilters from 'lib/buildFilters';
import hasKeywordFilter from 'lib/hasKeywordFilter';

import AppIcon from 'components/AppIcon';

import session from 'lib/session';

export default class CollectionSidebar extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { filters, collection, isSearchingItems } = nextProps;

    if (!isSearchingItems && hasKeywordFilter(filters)) {
      setTimeout(() => {
        this.context.router.transitionTo('collection', { collection }, {
          filters: buildFilters(filters, 'keyword-')
        });
      }, 0);
    }
  }

  render() {
    return (
      <div className="collection-sidebar">
        <div className="collection-sidebar__toggle">
          <button
            type="button"
            onClick={this.toggleSidebar.bind(this)}
            disabled={!session.userIsLoggedIn}
            className="button button--transparent"
            data-action="toggleSidebar">
            <span className="button__icon">
              {this.renderToggleIcon()}
            </span>
          </button>
        </div>
        <div className="collection-sidebar__top">
          <button
            type="button"
            onClick={this.onSearchClick.bind(this)}
            className="button button--transparent"
            data-action="searchItems">
            <span className="button__icon">
              {this.renderSearchIcon()}
            </span>
          </button>
          <button
            type="button"
            onClick={this.onFilterClick.bind(this, 'highlighted')}
            className="button button--transparent"
            data-action="filterHighlighted">
            <span className="button__icon">
              {this.renderHighlightIcon()}
            </span>
          </button>
        </div>
        <div className="collection-sidebar__types">
          {this.renderTypes()}
        </div>
        <div className="collection-sidebar__colors">
          {this.renderColors()}
        </div>
      </div>
    );
  }

  renderToggleIcon() {
    return !this.props.sidebarIsVisible ? (
      <AppIcon name="expand" size="24px" color="#fcfcfc"/>
    ) : (
      <AppIcon name="collapse" size="24px" color="#fcfcfc"/>
    );
  }

  renderSearchIcon() {
    return this.props.isSearchingItems ? (
      <AppIcon name="search" size="24px" color="#22a7f0"/>
    ) : (
      <AppIcon name="search" size="24px" color="#fcfcfc"/>
    );
  }

  renderHighlightIcon() {
    return this.props.filters.indexOf('highlighted') !== -1 ? (
      <AppIcon name="highlight" size="24px" color="#22a7f0"/>
    ) : (
      <AppIcon name="highlight" size="24px" color="#fcfcfc"/>
    );
  }

  renderTypes() {
    return itemTypes.map((type) => {
      const isSelected = this.props.filters.indexOf(type) !== -1;

      const typeClasses = classNames({
        'collection-sidebar__type': true,
        'collection-sidebar__type--selected': isSelected
      });

      return (
        <Link
          to="collection"
          key={`item-type-${type}`}
          query={{types: type}}
          params={{collection: this.props.collection}}
          onClick={this.onFilterClick.bind(this, type)}
          className={typeClasses}
          data-filter={type}>
          <AppIcon name={type} size="24px" color="#fcfcfc"/>
        </Link>
      );
    });
  }

  renderColors() {
    return itemColors.map((color) => {
      const isSelected = this.props.filters.indexOf(color) !== -1;

      const colorClasses = classNames({
        'collection-sidebar__color': true,
        'collection-sidebar__color--selected': isSelected
      });

      return (
        <Link
          to="collection"
          key={`item-color-${color}`}
          query={{colors: color}}
          params={{collection: this.props.collection}}
          onClick={this.onFilterClick.bind(this, color)}
          className={colorClasses}
          data-color={color}
          data-filter={color}/>
      );
    });
  }

  toggleSidebar() {
    this.context.flux.getActions('app').toggleSidebar();
  }

  onSearchClick() {
    this.context.flux.getActions('app').toggleItemsSearch();
  }

  onFilterClick(filter, event) {
    const { filters, collection } = this.props;

    event.preventDefault();

    setTimeout(() => {
      this.context.router.transitionTo('collection', { collection }, {
        filters: buildFilters(filters, filter)
      });
    }, 0);
  }
}
