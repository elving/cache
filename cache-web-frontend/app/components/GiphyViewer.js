import React, { Component } from 'react';

export default class GiphyViewer extends Component {
  render() {
    return (
      <iframe
        src={`https://giphy.com/embed/${this.props.id}?html5=true`}
        width={this.props.width}
        height={this.props.height}
        className={`${this.props.className} giphy-embed`}
        frameBorder="0"
        allowFullScreen/>
    );
  }
}
