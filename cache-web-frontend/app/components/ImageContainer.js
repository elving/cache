import React from 'react';
import AppIcon from 'components/AppIcon';

export default class ImageContainer extends React.Component {
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
    maxWidth: '100%',
    maxHeight: '100%',
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
    const { width, height, maxWidth, maxHeight } = this.props;

    return (
      <div
        style={{ width, height, maxWidth, maxHeight }}
        className={`ImageContainer ${this.props.className}`}>
        {this.renderImage()}
      </div>
    );
  }

  renderImage() {
    const { src } = this.props;
    const { isLoaded, loadError } = this.state;

    if (loadError) {
      return (
        <div className="ImageContainer__error">
          <AppIcon
            name="close"
            color="#f4989c"
            className="ImageContainer__error__icon"
          />
          <span className="ImageContainer__error__text">
            Image not available
          </span>
        </div>
      );
    } else if (isLoaded) {
      return (
        <img src={src} className="ImageContainer__image"/>
      );
    } else {
      return (
        <div className="ImageContainer__loader"/>
      );
    }
  }
}
