import React from 'react';
import Masonry from 'masonry-layout';

export default class MasonryLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.masonryLayout = null;
  }

  static defaultProps = {
    gutter: 0,
    isFitWidth: false,
    columnWidth: 0,
    transitionDuration: 0
  }

  componentDidMount() {
    const {
      gutter,
      isFitWidth,
      columnWidth,
      itemSelector,
      transitionDuration
    } = this.props;

    const layout = React.findDOMNode(this.refs.masonryLayout);

    this.masonryLayout = new Masonry(layout, {
      gutter,
      isFitWidth,
      columnWidth,
      itemSelector,
      transitionDuration
    });
  }

  componentDidUpdate() {
    this.masonryLayout.reloadItems();
    this.masonryLayout.layout();
  }

  componentWillUnmount() {
    this.masonryLayout.remove();
  }

  render() {
    return (
      <div ref="masonryLayout" className="masonry-layout">
        {this.props.children}
      </div>
    );
  }
}
