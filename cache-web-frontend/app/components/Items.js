import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import TextItem from 'components/TextItem';
import LinkItem from 'components/LinkItem';
import ImageItem from 'components/ImageItem';
import VideoItem from 'components/VideoItem';
import AudioItem from 'components/AudioItem';
import ItemPlaceholder from 'components/ItemPlaceholder';

export default class Items extends React.Component {
  render() {
    const listClasses = classNames({
      'items': true,
      'items--empty': !this.props.hasItems
    });

    return (
      <div className={listClasses}>
        {this.renderList()}
      </div>
    );
  }

  renderList() {
    if (this.props.hasItems) {
      return this.renderItems();
    } else if (this.props.itemsAreFiltered) {
      return (
        <div className="items-placeholder">
          <h2 className="items-placeholder-title">
            There are no items matching the selected filters.
          </h2>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
        </div>
      );
    } else if (!this.props.hasItems && this.props.hasFetchedCollections) {
      return (
        <div className="items-placeholder">
          <h2 className="items-placeholder-title">
            This collection doesn't have any items yet.
          </h2>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
          <ItemPlaceholder/>
        </div>
      );
    } else {
      return null;
    }
  }

  renderItems() {
    const { userIsOwnerOfCurrentCollection } = this.props;

    return this.props.items.map((item) => {
      switch (item.type) {
        case 'link':
          return (
            <LinkItem
              id={item.objectId}
              key={item.objectId}
              userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
              {...item}/>
          );

        case 'text':
          return (
            <TextItem
              id={item.objectId}
              key={item.objectId}
              userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
              {...item}/>
          );

        case 'image':
          return (
            <ImageItem
              id={item.objectId}
              key={item.objectId}
              userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
              {...item}/>
          );

        case 'audio':
          return (
            <AudioItem
              id={item.objectId}
              key={item.objectId}
              userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
              {...item}/>
          );

        case 'video':
          return (
            <VideoItem
              id={item.objectId}
              key={item.objectId}
              userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}
              {...item}/>
          );

        default:
          return null;
      }
    });
  }
}
