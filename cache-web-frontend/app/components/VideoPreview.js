import React, { Component } from 'react';
import { truncate, extension } from 'lib/utils';

export default class VideoPreview extends Component {
  render() {
    return (
      <div className="ItemPreview VideoItemPreview">
        <video
          width="100%"
          height="auto"
          preload="auto"
          controls
          className="VideoItemPreview__video"
          crossOrigin>
          <source
            src={this.props.directUrl}
            type={`video/${extension(this.props.directUrl)}`}/>
          <a href={this.props.directUrl} className="button">
            <span>Download</span>
          </a>
        </video>

        <p
          title={this.props.title}
          className="ItemPreview__title">
          {truncate(this.props.title)}
        </p>
      </div>
    );
  }
}
