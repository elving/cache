import React from 'react';
import { Link } from 'react-router';

import Logo from 'components/Logo';
import AppIcon from 'components/AppIcon';
import AuthLink from 'components/AuthLink';
import connectToStores from 'flummox/connect';
import CurrentUserDropdown from 'components/CurrentUserDropdown';

class Header extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object
  }

  render() {
    return (
      <header className="header">
        <div className="header__content">
          {this.renderCollectionsIcon()}

          <a href="http://app.trycache.co/" target="_blank">
            <div className="header__logo">
              <Logo
                color="#2c3e50"
                width="80px"
                className="header__logo-image"
              />
            </div>
          </a>
        </div>

        <div className="header__content">
          <span className="header__links">
            <a
              href="http://www.trycache.co"
              target="_blank"
              className="header__link"
            >
              Home
            </a>
            <a href="/collections/" className="header__link">Collections</a>
            <a
              href="http://www.trycache.co/tools"
              target="_blank"
              className="header__link"
            >
              Tools
            </a>
          </span>

          <span className="header__user">
            <AuthLink/>
          </span>
        </div>
      </header>
    );
  }

  renderCollectionsIcon() {
    const { showCollectionIcon, collectionsVisibleMobile } = this.props;

    if (showCollectionIcon) {
      return collectionsVisibleMobile ? (
        <button onClick={::this.hideCollectionsMobile}
          className="button button--transparent"
          data-action="hideCollectionsMobile"
        >
          <AppIcon name="x" color="#2f4154"/>
        </button>
      ) : (
        <button onClick={::this.showCollectionsMobile}
          className="button button--transparent"
          data-action="showCollectionsMobile"
        >
          <AppIcon name="list" color="#2f4154"/>
        </button>
      );
    } else {
      return null;
    }
  }

  showCollectionsMobile() {
    this.context.flux.getActions('app').showCollectionsMobile();
  }

  hideCollectionsMobile() {
    this.context.flux.getActions('app').hideCollectionsMobile();
  }
}

export default connectToStores(
  Header, ['user'], ([store], props) => {
    return Object.assign({}, store.state, props);
  }
);
