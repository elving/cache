import React from 'react';
import classNames from 'classnames';

import CollectionsListItem from 'components/CollectionsListItem';

export default class CollectionsList extends React.Component {
  render() {
    const mainClasses = classNames({
      'list': true,
      'collections-list': true,
      'collections-list--empty': !this.props.hasCollections
    });

    return (
      <div className="collection-list-wrapper">
        <ol className={mainClasses}>
          {this.renderListItems()}
        </ol>
      </div>
    );
  }

  renderListItems() {
    const { collections } = this.props;

    return collections.map((collection, index) => {
      const invertDropdown = (
        collections.length > 10 && (index + 1) === collections.length
      );

      return (
        <CollectionsListItem
          id={collection.objectId}
          key={collection.objectId}
          icon={collection.icon}
          name={collection.name}
          isActive={this.props.currentCollection === collection.objectId}
          invertDropdown={invertDropdown}/>
      );
    });
  }
}
