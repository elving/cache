import React from 'react';

import { isEmpty } from 'lodash';

export default class ItemDetailTags extends React.Component {
  render() {
    return !isEmpty(this.props.tags) ? (
      <div className="ItemDetail__tags">
        {this.renderTags()}
      </div>
    ) : null;
  }

  renderTags() {
    return this.props.tags.map((tag) => {
      return (
        <span key={`item-tag-${tag}`} className="ItemDetail__tag">{tag}</span>
      );
    });
  }
}
