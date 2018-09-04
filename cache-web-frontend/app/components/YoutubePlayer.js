import React, { Component } from 'react';

export default class YoutubePlayer extends Component {
  render() {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${this.props.id}`}
        width={this.props.width}
        height={this.props.height}
        className={this.props.className}
        frameBorder="0"/>
    );
  }
}
