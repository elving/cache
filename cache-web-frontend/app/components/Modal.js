import React from 'react';
import classNames from 'classnames';

export default class Modal extends React.Component {
  render() {
    let style = {};

    const { className } = this.props;

    const mainClasses = classNames({
      'ModalOverlay': true,
      'ModalOverlay--visible': this.props.isVisible
    });

    if (this.props.width) {
      style.width = this.props.width;
    }

    return (
      <div className={`${mainClasses} ${className}`}>
        <div style={style} className="Modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}
