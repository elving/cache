import React, { Component } from 'react';

export default class VinePlayer extends Component {
  render() {
    return (
      <div>
        <iframe
          src={`https://vine.co/v/${this.props.id}/embed/simple`}
          width={this.props.width}
          height={this.props.height}
          className={this.props.className}
          frameBorder="0"/>
          <script src="https://platform.vine.co/static/scripts/embed.js"/>
      </div>
    );
  }
}
