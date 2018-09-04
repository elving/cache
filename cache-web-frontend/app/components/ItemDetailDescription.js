import React, { Component } from 'react';
import { compact } from 'lodash';


export default class ItemDetailDescription extends Component {
  render() {
    return (
      <span>
        {this.renderDescriptionLines()}
      </span>
    );
  }

  renderDescriptionLines() {
    const { description } = this.props;

    return description ? (
      compact(description.split(/[\n\r]/gm)).map((line, index) => {
        return (
          <p key={`line-${index}`} className="ItemDetail__description">
            {line}
          </p>
        );
      })
    ) : null;
  }
}
