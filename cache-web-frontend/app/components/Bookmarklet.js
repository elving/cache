/* eslint-disable max-len */
import React, { Component } from 'react';

export default class Bookmarklet extends Component {
  render() {
    return (
      <a
        href={`javascript:location.href='https://app.trycache.co/items/create?type='+encodeURIComponent('link')+'&title='+encodeURIComponent(document.title.replace(/(\r\n|\n|\r)/gm, ''))+'&sourceUrl='+encodeURIComponent(location.href)+'&directUrl='+encodeURIComponent(location.href)+'&description='+encodeURIComponent(document.querySelector('meta[name="description"]')&&document.querySelector('meta[name="description"]').getAttribute('content').replace(/(\r\n|\n|\r)/gm, ''))+'&storingMethod='+encodeURIComponent('bookmarklet');`}
        title="+ Store in Cache"
        className="button button--primary"
        data-action="bookmarklet">
        <span>
          + Store in Cache
        </span>
      </a>
    );
  }
}
