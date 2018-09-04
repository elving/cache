import React, { Component } from 'react';
import classNames from 'classnames';

import AppIcon from 'components/AppIcon';

export default class CollectionsSearch extends Component {
  static contextTypes = {
    flux: React.PropTypes.object
  }

  render() {
    const mainClasses = classNames({
      'collections-search': true,
      'collections-search--searching': this.props.isSearching
    });

    return (
      <label className={mainClasses}>
        <AppIcon name="search" size="24px" color="#889094"/>
        <input
          onChange={this.onChange.bind(this)}
          className="collections-search__input"
          placeholder="Search collections"/>
      </label>
    );
  }

  onChange(event) {
    this.context.flux.getActions('collections').search(event.target.value);
  }
}
