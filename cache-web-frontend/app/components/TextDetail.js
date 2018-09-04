import React, { Component } from 'react';
import { domain } from 'lib/utils';

import MultilineText from 'components/MultilineText';
import ItemDetailTags from 'components/ItemDetailTags';
import ItemDetailHeader from 'components/ItemDetailHeader';
import ItemDetailDescription from 'components/ItemDetailDescription';

export default class TextDetail extends Component {
  render() {
    const { userIsOwnerOfCurrentCollection } = this.props;

    return (
      <div className="ItemDetail TextDetail">
        <ItemDetailHeader
          date={this.props.createdAt}
          itemId={this.props.objectId}
          collectionId={this.props.collection.objectId}
          collectionName={this.props.collection.name}
          userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}/>

        <div className="ItemDetail__content">
          <h1 className="ItemDetail__title">{this.props.title}</h1>

          <p className="TextDetail__text">
            <MultilineText text={this.props.meta.text}/>
          </p>

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
