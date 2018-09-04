import React, { Component } from 'react';
import classNames from 'classnames';
import { domain, favicon, truncate } from 'lib/utils';

import AppIcon from 'components/AppIcon';
import ImageCover from 'components/ImageCover';
import ItemActions from 'components/ItemActions';

export default class LinkItem extends Component {
  render() {
    const title = this.props.title || domain(this.props.directUrl);

    const mainClasses = classNames({
      'item': true,
      'item--has-cover': (
        this.props.meta &&
        this.props.meta.service !== 'spotify' &&
        this.props.meta.service !== 'soundcloud' &&
        this.props.meta.cover
      ),
      'item--highlighted': this.props.highlighted
    });

    const { userIsOwnerOfCurrentCollection } = this.props;

    return (
      <div
        ref="item"
        data-type="link"
        className={mainClasses}
        data-color={this.props.color}>
        {this.renderContent()}

        <ItemActions
          id={this.props.id}
          directUrl={this.props.directUrl}
          collection={this.props.collection.objectId || this.props.collection}
          highlighted={this.props.highlighted}
          userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}/>

        <div className="item__info">
          <img
            src={favicon(this.props.directUrl)}
            width="14"
            height="14"
            className="item__favicon"/>
          <span className="item__title">{truncate(title, 80)}</span>
        </div>
      </div>
    );
  }

  renderContent() {
    const { cover, service } = this.props.meta;
    const isNotInvalidService = (
      service !== 'spotify' && service !== 'soundcloud'
    );

    return cover && isNotInvalidService ? (
      <div className="item__content">
        <ImageCover className="item__link-cover" src={cover} height="220px"/>
        <span className="item__domain">
          <AppIcon name="link" size="16px" color="#889094"/>
          {domain(this.props.directUrl)}
        </span>
      </div>
    ) : (
      <div className="item__content">
        <span className="item__icon">
          {this.renderIcon()}
        </span>
        <span className="item__domain">
          <AppIcon name="link" size="16px" color="#889094"/>
          {domain(this.props.directUrl)}
        </span>
      </div>
    );
  }

  renderIcon() {
    const { meta } = this.props;

    if (meta.service) {
      switch (meta.service) {
        case 'youtube':
          return (
            <AppIcon
              size="115px"
              name="youtube"
              color="#d7deea"
              viewBox="0 0 100 100"/>
          );

        case 'soundcloud':
          return (
            <AppIcon
              size="115px"
              name="soundcloud"
              color="#d7deea"
              viewBox="0 0 100 100"/>
          );

        case 'vimeo':
          return (
            <AppIcon
              size="120px"
              name="vimeo"
              color="#d7deea"
              viewBox="0 0 100 100"/>
          );

        case 'vine':
          return (
            <AppIcon
              size="115px"
              name="vine"
              color="#d7deea"
              viewBox="0 0 143 142.5"/>
          );

        case 'instagram':
          return (
            <AppIcon
              size="115px"
              name="instagram"
              color="#d7deea"
              viewBox="0 0 56.693 56.693"/>
          );

        case 'imgur':
          return (
            <AppIcon
              size="115px"
              name="imgur"
              color="#d7deea"
              viewBox="0 0 314 110"/>
          );

        case 'giphy':
          return (
            <AppIcon
              size="115px"
              name="giphy"
              color="#d7deea"
              viewBox="0 0 16 16"/>
          );

        case 'twitter':
          return (
            <AppIcon
              size="115px"
              name="twitter"
              color="#d7deea"
              viewBox="0 0 274 223"/>
          );

        case 'spotify':
          return (
            <AppIcon
              size="115px"
              name="spotify"
              color="#d7deea"
              viewBox="0 0 60 60"
            />
          );

        default:
          return (
            <AppIcon name="link" size="120px" color="#d7deea"/>
          );
      }
    } else {
      return (
        <AppIcon name="link" size="120px" color="#d7deea"/>
      );
    }
  }
}
