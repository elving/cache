/* eslint-disable max-len */
import React from 'react';
import SoundCloudAudio from 'soundcloud-audio';

export default class SoundCloudPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { resolvedUrl: null };
    this.SoundCloudPlayer = new SoundCloudAudio(props.clientId);
  }

  componentDidMount() {
    this.SoundCloudPlayer.resolve(this.props.url, (track) => {
      if (track && track.uri) {
        this.setState({ resolvedUrl: track.uri });
      }
    });
  }

  render() {
    const { resolvedUrl } = this.state;

    return resolvedUrl ? (
      <iframe
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(resolvedUrl)}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=true`}
        width={this.props.width}
        height={this.props.height}
        className={this.props.className}
        frameBorder="no"/>
    ) : null;
  }
}
