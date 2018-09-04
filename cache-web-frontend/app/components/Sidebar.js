import React from 'react';
import classNames from 'classnames';

import session from 'lib/session';

export default class Sidebar extends React.Component {
  render() {
    const mainClasses = classNames({
      'sidebar': true,
      'sidebar--collapsed': (
        !this.props.sidebarIsVisible ||
        !session.userIsLoggedIn ||
        (this.props.collection && !this.props.userIsOwnerOfCurrentCollection)
      ),
      'sidebar--no-collection': !this.props.hasCollections,
      'sidebar--visible-mobile': this.props.collectionsVisibleMobile
    });

    return (
      <div className={mainClasses}>
        {this.props.children}
      </div>
    );
  }
}
