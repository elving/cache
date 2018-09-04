import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import AppIcon from 'components/AppIcon';
import CollectionIcon from 'components/CollectionIcon';

export default class CollectionsListItem extends Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  render() {
    const linkClassNames = classNames({
      'active': this.props.isActive,
      'collections-list__item-link': true
    });

    const dropdownClasses = classNames({
      'dropdown': true,
      'dropdown--up': this.props.invertDropdown,
      'dropdown--dark': true,
      'collections-list__item-actions': true
    });

    return (
      <li title={this.props.name} className="collections-list__item">
        <Link
          to="collection"
          params={{collection: this.props.id}}
          onClick={::this.hideCollectionsMobile}
          className={linkClassNames}
        >
          <CollectionIcon
            name={this.props.icon}
            size="22px"
            color="#fcfcfc"/>
          <span className="collections-list__item-text">
            {this.props.name}
          </span>
        </Link>
        <Link to="edit-collection"
          title={`Edit ${this.props.name}`}
          params={{collection: this.props.id}}
          onClick={::this.hideCollectionsMobile}
          className="collections-list__item-action"
        >
          <AppIcon
            size="18px"
            name="settings"
            color="#fcfcfc"
          />
        </Link>
      </li>
    );
  }

  hideCollectionsMobile() {
    this.context.flux.getActions('app').hideCollectionsMobile();
  }
}
