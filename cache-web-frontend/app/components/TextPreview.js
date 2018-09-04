import React, { Component } from 'react';
import { truncate } from 'lib/utils';

import AppIcon from 'components/AppIcon';

export default class TextPreview extends Component {
  render() {
    return (
      <div className="ItemPreview TextItemPreview">
        <p
          title={this.props.meta.text}
          className="TextItemPreview__text">
          {truncate(this.props.meta.text)}
        </p>
      </div>
    );
  }
}
