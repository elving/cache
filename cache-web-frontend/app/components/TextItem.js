import React, { Component } from 'react';
import classNames from 'classnames';
import { favicon, truncate } from 'lib/utils';

import ItemActions from 'components/ItemActions';

export default class ImageItem extends Component {
  render() {
    const title = this.props.title || domain(this.props.directUrl);

    const mainClasses = classNames({
      'item': true,
      'item--highlighted': this.props.highlighted
    });

    const { userIsOwnerOfCurrentCollection } = this.props;

    return (
      <div
        ref="item"
        data-type="text"
        className={mainClasses}
        data-color={this.props.color}>
        <div className="item__content">
          <p className="item__text">{truncate(this.props.meta.text)}</p>
        </div>
        <ItemActions
          id={this.props.id}
          directUrl={this.props.directUrl}
          collection={this.props.collection.objectId || this.props.collection}
          highlighted={this.props.highlighted}
          userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}/>
        <div className="item__info">
          <img
            src={favicon(this.props.sourceUrl)}
            width="14"
            height="14"
            className="item__favicon"/>
          <span className="item__title">{truncate(title, 80)}</span>
        </div>
      </div>
    );
  }
}
