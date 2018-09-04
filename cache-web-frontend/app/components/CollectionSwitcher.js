import React from 'react';

import connectToStores from 'flummox/connect';
import CollectionChooser from 'components/CollectionChooser';

class CollectionSwitcher extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object
  }

  static defaultProps = {
    onMove: function() { return; },
    onMoveFail: function() { return; },
    onMoveSuccess: function() { return; }
  }

  render() {
    return (
      <div className="CollectionSwitcher">
        {this.renderLabel()}
        <CollectionChooser
          showLabel={false}
          isDisabled={this.props.isMovingItem}
          collection={this.props.collection}
          collections={this.props.collections}
          hasCollections={this.props.hasCollections}
          onCollectionChange={this.onCollectionChange.bind(this)}/>
      </div>
    );
  }

  renderLabel() {
    return this.props.isMovingItem ? (
      <label className="CollectionSwitcher__label">Moving...</label>
    ) : (
      <label className="CollectionSwitcher__label">Move to:</label>
    );
  }

  onCollectionChange(collection) {
    this.props.onMove(collection);

    this.context.flux.getActions('items').move(
      this.props.item, collection
    ).then(() => {
      this.props.onMoveSuccess(collection);
      this.context.flux.getActions('notifications').notify(
        'success', 'Item moved successfully!'
      );
    }).catch((response) => {
      this.props.onMoveFail(collection);
      this.context.flux.getActions('notifications').notify(
        'error', response.error
      );
    });
  }
}

export default connectToStores(
  CollectionSwitcher,
  ['items', 'collections'],
  ([itemsStore, collectionsStore]) => ({
    collections: collectionsStore.state.collections,
    isMovingItem: itemsStore.state.isMoving,
    hasCollections: collectionsStore.hasCollections()
  })
);
