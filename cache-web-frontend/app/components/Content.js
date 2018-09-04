import React from 'react';
import classNames from 'classnames';

export default class Content extends React.Component {
  render() {
    const {
      route,
      collection,
      hasCollections,
      isFetchingItems,
      sidebarIsVisible,
      userIsOwnerOfCurrentCollection
    } = this.props;

    const mainClasses = classNames({
      'content': true,
      'content--fetching': isFetchingItems,
      'content--no-collections': !hasCollections,
      'content--sidebar-collapsed': (
        (!sidebarIsVisible ||
        (!userIsOwnerOfCurrentCollection && collection)) ||
        (route && route.name === 'create-collection' && !hasCollections)
      )
    });

    return (
      <div ref="content" className={mainClasses}>
        {this.props.children}
      </div>
    );
  }
}
