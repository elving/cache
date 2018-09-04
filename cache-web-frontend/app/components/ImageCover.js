/* eslint-disable max-len */
import React from 'react';
import AppIcon from 'components/AppIcon';
import classNames from 'classnames';

export default class ImageCover extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { isLoaded: false, loadError: false };
    this.image = null;
    this.onLoadListener = null;
    this.onErrorListener = null;
  }

  static defaultProps = {
    src: '',
    width: '100%',
    height: '100%',
    className: ''
  }

  componentDidMount() {
    this.image = new Image();

    this.onLoadListener = () => {
      this.setState({ isLoaded: true, loadError: false });
      this.image.removeEventListener('load', this.onLoadListener);
    };

    this.onErrorListener = () => {
      this.setState({ isLoaded: true, loadError: true });
      this.image.removeEventListener('error', this.onLoadListener);
    };

    this.image.src = this.props.src;

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
    const { width, height } = this.props;
    const classes = classNames({
      'ImageCover': true,
      'ImageCover--loading': !this.state.isLoaded
    })

    return (
      <div
        style={{ width, height }}
        className={`${classes} ${this.props.className}`}>
        {this.renderCover()}
      </div>
    );
  }

  renderCover() {
    const { src, width, height } = this.props;
    const { isLoaded, loadError } = this.state;

    const styles = {
      backgroundImage: isLoaded ? `url(${src})` : null
    };

    if (loadError) {
      return (
        <div className="ImageCover__error">
          <AppIcon
            name="close"
            color="#f4989c"
            className="ImageCover__error__icon"
          />
          <span className="ImageCover__error__text">
            Image not available
          </span>
        </div>
      );
    } else if (isLoaded) {
      return (
        <div
          style={styles}
          className="ImageCover__image"

          ref={(component) => {
            if (isLoaded) {
              const cover = React.findDOMNode(component);

              if (cover) {
                const styles = window.getComputedStyle(cover);
                const imageWidth = this.image.width;
                const coverWidth = parseFloat(styles.width);
                const imageHeight = this.image.height;
                const coverHeight = parseFloat(styles.height);

                if (imageWidth < coverWidth && imageHeight < coverHeight) {
                  cover.style.backgroundSize = 'auto auto';
                } else if (imageWidth < coverWidth) {
                  cover.style.backgroundSize = 'auto 100%';
                } else if (imageHeight < coverHeight) {
                  cover.style.backgroundSize = '100% auto';
                } else if (imageWidth > coverWidth && imageHeight > coverHeight) {
                  cover.style.backgroundSize = 'contain';
                }
              }
            }
          }}
        />
      );
    } else {
      return (
        <div className="ImageCover__loader"/>
      );
    }
  }
}
