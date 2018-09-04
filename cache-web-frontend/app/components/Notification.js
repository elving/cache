import React from 'react';
import classNames from 'classnames';

import AppIcon from 'components/AppIcon';
import connectToStores from 'flummox/connect';

class Notification extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object
  }

  render() {
    const mainClasses = classNames({
      'Notification': true,
      'Notification--active': this.props.isActive,
      [`Notification--${this.props.type}`]: this.props.type,
      [`Notification--${this.props.position}`]: this.props.position
    });

    return (
      <div className={mainClasses}>
        {this.renderIcon()}

        <p className="Notification__message">
          {this.props.message}
        </p>

        <button
          type="button"
          onClick={this.close.bind(this)}
          className="Notification__close button button--transparent"
          data-action="closeNotification">
          <span className="button__icon">
            <AppIcon name="close" size="22px"/>
          </span>
        </button>
      </div>
    );
  }

  renderIcon() {
    let iconName;
    const { type } = this.props;

    switch (type) {
      case 'error':
        iconName = 'alert';
        break;

      case 'success':
        iconName = 'apply';
        break;

      default:
        iconName = 'notification';
        break;
    }

    return (
      <AppIcon
        name={iconName}
        size="22px"
        className="Notification__icon"/>
    );
  }

  close() {
    this.context.flux.getActions('notifications').close();
  }
}

export default connectToStores(Notification, ['notifications']);
