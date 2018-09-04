import React, { Component } from 'react';
import classNames from 'classnames';
import { domain, favicon, truncate } from 'lib/utils';

import AppIcon from 'components/AppIcon';
import ItemActions from 'components/ItemActions';

export default class AudioItem extends Component {
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
        data-type="audio"
        className={mainClasses}
        data-color={this.props.color}>
        <div className="item__content">
          <span className="item__icon">
            <AppIcon name="audio" size="120px" color="#d7deea"/>
          </span>
          <span className="item__domain">{domain(this.props.directUrl)}</span>
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
