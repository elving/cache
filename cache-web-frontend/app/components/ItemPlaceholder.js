/* eslint-disable max-len */
import React from 'react';
import { random } from 'lodash';

import AppIcon from 'components/AppIcon';

export default class ItemPlaceholder extends React.Component {
  static defaultProps = {
    type: 'random'
  }

  render() {
    return (
      <div className="item-placeholder">
        {this.renderContent()}

        <div className="item-placeholder__actions">
          <AppIcon name="detail" size="24px" color="#e7ebf2"/>
          <AppIcon name="source" size="24px" color="#e7ebf2"/>
          <AppIcon name="highlight" size="24px" color="#e7ebf2"/>
          <AppIcon name="settings" size="24px" color="#e7ebf2"/>
        </div>

        <div className="item-placeholder__footer">
          <div className="item-placeholder__footer__image"/>
          <div style={this.getRandomWidth()} className="item-placeholder__footer__text"/>
        </div>
      </div>
    );
  }

  renderContent() {
    const type = this.props.type === 'random'
      ? ['text', 'icon', 'image'][random(0, 2)]
      : this.props.type;

    switch (type) {
      case 'text':
        return (
          <div className="item-placeholder__content">
            <div style={this.getRandomWidth()} className="placeholder__content__text"/>
            <div style={this.getRandomWidth()} className="placeholder__content__text"/>
            <br/>
            <div style={this.getRandomWidth()} className="placeholder__content__text"/>
            <div style={this.getRandomWidth()} className="placeholder__content__text"/>
          </div>
        );

      case 'icon':
        return (
          <div className="item-placeholder__content">
            <div className="placeholder__content__icon"/>
          </div>
        );

      case 'image':
        return (
          <div className="item-placeholder__content">
            <div className="placeholder__content__image"/>
          </div>
        );
    }
  }

  getRandomWidth() {
    return { width: `${random(50, 100)}%` };
  }
}
