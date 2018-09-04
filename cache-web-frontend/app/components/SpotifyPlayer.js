import React, { Component } from 'react';
import { last, compact } from 'lodash';

export default class SpotifyPlayer extends Component {
  render() {
    const { url, width, height, className } = this.props;

    return (
      <iframe
        src={`https://embed.spotify.com/?uri=${this.parseUrl(url)}`}
        width={width}
        height={height}
        className={className}
        frameBorder="0"
      />
    );
  }

  parseUrl(url) {
    let parsedUrl;
    const isTrack = /album\/([a-zA-z0-9_]*)\/([a-zA-z0-9_]*)/;

    if (isTrack.test(url)) {
      const trackId = last(compact(url.split(isTrack)));
      parsedUrl = `https://player.spotify.com/track/${trackId}`;
    } else {
      parsedUrl = url;
    }

    return encodeURIComponent(parsedUrl);
  }
}
