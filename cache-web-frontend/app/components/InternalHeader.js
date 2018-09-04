import React, { Component } from 'react';
import { Link } from 'react-router';

import Logo from 'components/Logo';

export default class InternalHeader extends Component {
  render() {
    const { logoSize, logoColor } = this.props;

    return (
      <div className="InternalHeader">
        <div className="InternalHeader__logo">
          <Logo
            width={logoSize}
            textColor={logoColor}
            iconColor={logoColor}
            className="InternalHeader__logo__image"/>
        </div>
        <div className="InternalHeader__links">
          {this.props.children}
        </div>
      </div>
    );
  }
}
