import React from 'react';

import { isEmpty } from 'lodash';

export default class ItemTags extends React.Component {
  render() {
    return !isEmpty(this.props.tags) ? (
      <div className="item__tags">
        {this.renderTags()}
      </div>
    ) : null;
  }

  renderTags() {
    return this.props.tags.map((tag) => {
      return (
        <span key={`item-tag-${tag}`} className="item__tag">{tag}</span>
      );
    });
  }
}
