import React, { Component } from 'react';
import { domain, extension } from 'lib/utils';

import ItemDetailTags from 'components/ItemDetailTags';
import ItemDetailHeader from 'components/ItemDetailHeader';
import ItemDetailDescription from 'components/ItemDetailDescription';

export default class VideoDetail extends Component {
  render() {
    const { userIsOwnerOfCurrentCollection } = this.props;

    return (
      <div className="ItemDetail VideoDetail">
        <ItemDetailHeader
          date={this.props.createdAt}
          itemId={this.props.objectId}
          collectionId={this.props.collection.objectId}
          collectionName={this.props.collection.name}
          userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}/>

        <div className="ItemDetail__content">
          <h1 className="ItemDetail__title">{this.props.title}</h1>

          <video
            preload="auto"
            controls
            className="VideoDetail__video"
            crossOrigin>
            <source
              src={this.props.directUrl}
              type={`video/${extension(this.props.directUrl)}`}/>
            <a href={this.props.directUrl} className="button">
              <span>Download</span>
            </a>
          </video>

          <div className="ItemDetail__meta" data-color={this.props.color}>
            <ItemDetailDescription description={this.props.description}/>
            <ItemDetailTags tags={this.props.tags}/>

            <div className="ItemDetail__source-wrapper">
              <a
                href={this.props.sourceUrl}
                target="_blank"
                className="ItemDetail__source button button--primary">
                <span>
                  {`See in ${domain(this.props.sourceUrl)}`}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
