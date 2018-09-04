import React, { Component } from 'react';
import classNames from 'classnames';
import { favicon, truncate } from 'lib/utils';

import AppIcon from 'components/AppIcon';
import ItemActions from 'components/ItemActions';

export default class ImageItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoaded: false,
      loadError: false
    };

    this.image = null;
    this.onLoadListener = null;
    this.onErrorListener = null;
  }

  componentDidMount() {
    this.image = new Image(this.props.meta.width, this.props.meta.height);

    this.onLoadListener = () => {
      this.setState({ loadError: false, isLoaded: true });
      this.image.removeEventListener('load', this.onLoadListener);
    };

    this.onErrorListener = () => {
      this.setState({ loadError: true, isLoaded: true });
      this.image.removeEventListener('error', this.onLoadListener);
    };

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
    const title = this.props.title || domain(this.props.directUrl);

    const mainClasses = classNames({
      'item': true,
      'item--highlighted': this.props.highlighted
    });

    const { userIsOwnerOfCurrentCollection } = this.props;

    return (
      <div
        ref="item"
        data-type="image"
        className={mainClasses}
        data-color={this.props.color}
        data-orientation={this.props.meta.orientation}>

        {this.renderContent()}

        <ItemActions
          id={this.props.id}
          directUrl={this.props.directUrl}
          collection={this.props.collection.objectId || this.props.collection}
          highlighted={this.props.highlighted}
          userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}/>

        <div className="item__info">
          <img
            src={favicon(this.props.sourceUrl)}
            width="14"
            height="14"
            className="item__favicon"/>

          <span className="item__title">{truncate(title, 80)}</span>
        </div>
      </div>
    );
  }

  renderContent() {
    const imageClasses = classNames({
      'item__image': true,
      'item__image--loading': !this.state.isLoaded
    });

    const imageStyles = {};

    if (this.state.isLoaded) {
      imageStyles.backgroundImage = `url(${this.props.directUrl})`;
    }

    return !this.state.loadError ? (
      <div className="item__content">
        <div style={imageStyles} className={imageClasses} ref={(component) => {
          if (this.state.isLoaded) {
            const image = React.findDOMNode(component);

            if (image) {
              const width = parseInt(this.props.meta.width, 10);
              const height = parseInt(this.props.meta.height, 10);

              if (width < 300 && height < 300) {
                image.style.backgroundSize = 'auto auto';
              } else if (width < 300) {
                image.style.backgroundSize = 'auto 100%';
              } else if (height < 300) {
                image.style.backgroundSize = '100% auto';
              }
            }
          }
        }}/>
      </div>
    ) : (
      <div className="item__content">
        <span className="item__icon">
          <AppIcon name="close" size="120px" color="#f4989c"/>
        </span>
        <span className="item__domain">
          Content not available
        </span>
      </div>
    )
  }
}
