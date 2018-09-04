import React, { Component } from 'react';

import CollectionPlaceholder from 'components/CollectionPlaceholder';
import CollectionsPlaceholder from 'components/CollectionsPlaceholder';

export default class ItemNotFound extends Component {
  render() {
    return (
      <div className="collections-placeholder-wrapper">
        <CollectionPlaceholder>
          <div className="collections-placeholder-msg">
            <h1 className="collections-placeholder__msg-title">
              The item you were looking for <br/> was not found.
            </h1>
          </div>
        </CollectionPlaceholder>
      </div>
    );
  }
}
