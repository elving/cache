// TODO: I need to find a way to either have a HOC or a Component
// to compose/extend here. I feel like I can make thing more DRY,
// specially the gif-canvas and the dimmensions logic.

import React, { Component } from 'react';
import classNames from 'classnames';
import { domain } from 'lib/utils';
import calculateImageSize from 'lib/calculateImageSize';

import AppIcon from 'components/AppIcon';
import ItemDetailTags from 'components/ItemDetailTags';
import ItemDetailHeader from 'components/ItemDetailHeader';
import ItemDetailDescription from 'components/ItemDetailDescription';

export default class ImageDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loadError: false,
      imageLoaded: false
    };

    this.image = null;
    this.onLoadListener = null;
    this.onErrorListener = null;
  }

  componentDidMount() {
    const { width, height } = this.props.meta;

    this.onLoadListener = () => {
      this.setState({ imageLoaded: true, loadError: false });
      this.image.removeEventListener('load', this.onLoadListener);
    };

    this.onErrorListener = () => {
      this.setState({ imageLoaded: true, loadError: true });
      this.image.removeEventListener('error', this.onLoadListener);
    };

    this.image = new Image(width, height);
    this.image.src = this.props.directUrl;

    if (this.image.complete) {
      this.onLoadListener();
    } else {
      this.image.addEventListener('load', this.onLoadListener);
      this.image.addEventListener('error', this.onErrorListener);
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.onLoadListener);
    this.image.removeEventListener('error', this.onErrorListener);
  }

  render() {
    const { userIsOwnerOfCurrentCollection } = this.props;

    return (
      <div className="ItemDetail ImageDetail">
        <ItemDetailHeader
          date={this.props.createdAt}
          itemId={this.props.objectId}
          collectionId={this.props.collection.objectId}
          collectionName={this.props.collection.name}
          userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}/>

        <div className="ItemDetail__content">
          <h1 className="ItemDetail__title">{this.props.title}</h1>

          {this.renderImage()}

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

  renderImage() {
    const contentClasses = classNames({
      'ImageDetail__image-container': true,
      'ImageDetail__image-container--error': this.state.loadError,
      'ImageDetail__image-container--loading': !this.state.imageLoaded
    });

    const { width, height } = calculateImageSize(
      this.props.meta.width,
      this.props.meta.height,
      this.props.meta.orientation,
      650
    );

    return !this.state.loadError ? (
      <div style={{ height }} className={contentClasses}>
        <img
          alt={this.props.title}
          src={this.props.directUrl}
          width={width}
          height={height}
          className="ImageDetail__image"/>
      </div>
    ) : (
      <div className={contentClasses}>
        <span className="item__icon">
          <AppIcon name="close" size="120px" color="#f4989c"/>
        </span>
        <span className="item__domain">
          Content not available
        </span>
      </div>
    );
  }
}
