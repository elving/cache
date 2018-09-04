import React, { Component } from 'react';

export default class VimeoPlayer extends Component {
  render() {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${this.props.id}`}
        width={this.props.width}
        height={this.props.height}
        className={this.props.className}
        frameBorder="0"/>
    );
  }
}
