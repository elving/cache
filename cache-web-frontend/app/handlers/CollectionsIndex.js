import React, { Component } from 'react';

import needsAuthentication from 'lib/needsAuthentication';
import CollectionPlaceholder from 'components/CollectionPlaceholder';
import CollectionsPlaceholder from 'components/CollectionsPlaceholder';

@needsAuthentication
export default class CollectionsIndex extends Component {
  render() {
    const renderPlaceholder = (
      this.props.hasFetchedCollections &&
      !this.props.hasCollections &&
      !this.props.isFetchingItems
    );

    return renderPlaceholder ? (
      <div className="collections-placeholder-wrapper">
        <CollectionsPlaceholder/>
        <CollectionPlaceholder>
          <div className="collections-placeholder-msg">
            <h1 className="collections-placeholder__msg-title">
              It looks like you don't have any collections yet.
            </h1>

            <p className="collections-placeholder__msg-text">
              Collections are searchable containers that <br/>
              help you organize and search items you've stored.
            </p>
          </div>
        </CollectionPlaceholder>
      </div>
    ) : null;
  }
}
