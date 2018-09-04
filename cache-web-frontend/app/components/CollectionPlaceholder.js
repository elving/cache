/* eslint-disable max-len */
import React, { Component } from 'react';

import AppIcon from 'components/AppIcon';
import CollectionIcon from 'components/CollectionIcon';
import ItemPlaceholder from 'components/ItemPlaceholder';
import CollectionSidebarPlaceholder from 'components/CollectionSidebarPlaceholder';

export default class CollectionPlaceholder extends Component {
  render() {
    return (
      <div className="content">
        <div className="collection">
          <div className="collection-left">
            <CollectionSidebarPlaceholder/>
          </div>
          <div className="collection-right">
            <div className="collection-header">
              <div className="content__title">
                <div className="content__title__text collection-header__name">
                  <CollectionIcon size="22px" name="picture" color="#e7ebf2"/>
                  <div className="collections-placeholder__title"/>
                </div>
                <AppIcon name="settings" size="24px" color="#e7ebf2"/>
              </div>
            </div>
            <div className="items">
              <div className="items-placeholder">
                {this.props.children}
                <ItemPlaceholder/>
                <ItemPlaceholder/>
                <ItemPlaceholder/>
                <ItemPlaceholder/>
                <ItemPlaceholder/>
                <ItemPlaceholder/>
                <ItemPlaceholder/>
                <ItemPlaceholder/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
