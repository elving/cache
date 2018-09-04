import React, { Component } from 'react';
import { truncate, extension } from 'lib/utils';

export default class AudioPreview extends Component {
  render() {
    return (
      <div className="ItemPreview AudioItemPreview">
        <audio
          width="100%"
          height="auto"
          preload="auto"
          controls
          className="AudioItemPreview__audio">
          <source
            src={this.props.directUrl}
            type={`audio/${extension(this.props.directUrl)}`}/>
          <a href={this.props.directUrl} className="button">
            <span>
              Download
            </span>
          </a>
        </audio>

        <p
          title={this.props.title}
          className="ItemPreview__title">
          {truncate(this.props.title)}
        </p>
      </div>
    );
  }
}
