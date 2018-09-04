import React from 'react';
import { first } from 'lodash';
import classNames from 'classnames';
import ImageContainer from 'components/ImageContainer';

export default class ThumbnailChooser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { selected: props.selected || first(props.images) };
  }

  static defaultProps = {
    images: [],
    onSelect: function() { return; }
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = this.state;

    if (!selected && nextProps.images.length) {
      this.setState({ selected: nextProps.images[0] });
    }

    if (nextProps.selected && nextProps.selected !== selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  render() {
    return (
      <div className="thumbnail-chooser">
        <div className="thumbnail-chooser__list clearfix">
          {this.renderThumbnails()}
        </div>
      </div>
    );
  }

  renderThumbnails() {
    return this.props.images.map((url, index) => {
      const thumbnailClasses = classNames({
        'thumbnail-chooser__thumbnail': true,
        'thumbnail-chooser__thumbnail--selected': url === this.state.selected
      });

      return (
        <button
          key={`${url}--${index}`}
          onClick={this.select.bind(this, url)}
          className={thumbnailClasses}>
          <ImageContainer src={url}/>
        </button>
      );
    });
  }

  select(url) {
    this.setState({ selected: url });
    this.props.onSelect(url);
  }
}
