import React, { Component } from 'react';
import classNames from 'classnames';
import { truncate } from 'lib/utils';
import calculateImageSize from 'lib/calculateImageSize';

import AppIcon from 'components/AppIcon';

export default class ImagePreview extends Component {
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
    this.onLoadListener = () => {
      this.setState({ imageLoaded: true, loadError: false });
      this.image.removeEventListener('load', this.onLoadListener);
    };

    this.onErrorListener = () => {
      this.setState({ imageLoaded: true, loadError: true });
      this.image.removeEventListener('error', this.onLoadListener);
    };

    this.image = new Image(this.props.meta.width, this.props.meta.height);
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
    return (
      <div className="ItemPreview ImageItemPreview">
        {this.renderImage()}

        <p title={this.props.title} className="ItemPreview__title">
          {truncate(this.props.title)}
        </p>
      </div>
    );
  }

  renderImage() {
    const contentClasses = classNames({
      'ImageItemPreview__image-container': true,
      'ImageItemPreview__image-container--error': this.state.loadError,
      'ImageItemPreview__image-container--loading': !this.state.imageLoaded
    });

    const { width, height } = calculateImageSize(
      this.props.meta.width,
      this.props.meta.height,
      this.props.meta.orientation,
      340
    );

    return !this.state.loadError ? (
      <div className={contentClasses}>
        <img src={this.props.directUrl} className="ImageItemPreview__image"/>
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
