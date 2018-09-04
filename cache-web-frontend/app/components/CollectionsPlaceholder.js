/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router';
import { random } from 'lodash';

import AppIcon from 'components/AppIcon';
import CollectionIcon from 'components/CollectionIcon';

export default class CollectionsPlaceholder extends React.Component {
  render() {
    const prefix = 'collections-placeholder';

    return (
      <div className={prefix}>
        <div className={`${prefix}__search`}>
          <AppIcon name="search" size="24px" color="#889094"/>
          <div className={`${prefix}__search__text`}/>
        </div>

        <div className={`${prefix}__list`}>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="tag" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="link" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="heart" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="picture" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="message" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="video" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="lightbulb" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="lock" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="cloud" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="compass" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="clock" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
          <div className={`${prefix}__list__item`}>
            <CollectionIcon size="22px" name="bookmark" color="#889094"/>
            <div style={this.getRandomWidth()} className={`${prefix}__list__item__text`}/>
          </div>
        </div>

        <div className={`${prefix}__actions`}>
          <Link
            to="create-collection"
            className="button button--primary-alt"
            data-action="create-collection">
            <span>Create collection</span>
          </Link>
        </div>
      </div>
    );
  }

  getRandomWidth() {
    return { width: `${random(20, 100)}%` };
  }
}
