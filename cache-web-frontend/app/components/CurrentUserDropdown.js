import md5 from 'blueimp-md5';
import { Link } from 'react-router';
import React, { Component } from 'react';

import AppIcon from 'components/AppIcon';

export default class CurrentUserDropdown extends Component {
  render() {
    const hash = md5(this.props.email);
    const avatar = `https://secure.gravatar.com/avatar/${hash}?d=retro`;

    return (
      <div className="CurrentUserDropdown dropdown dropdown--light">
        <div className="dropdown__toggler">
          <img
            src={avatar}
            className="CurrentUserDropdown__avatar"/>
          {this.renderName()}
          <AppIcon
            name="down"
            size="14px"
            className="dropdown__toggler__icon"/>
        </div>
        <div className="dropdown__items">
          <Link to="user-settings" className="dropdown__item">
            Your Settings
          </Link>
          <Link to="logout" className="dropdown__item">Logout</Link>
        </div>
      </div>
    );
  }

  renderName() {
    let name;
    const { username, firstName, lastName } = this.props;

    if (firstName && lastName) {
      name = `${firstName} ${lastName}`;
    } else if (firstName) {
      name = firstName;
    } else {
      name = username;
    }

    return name ? (
      <span className="CurrentUserDropdown__name dropdown__toggler__text">
        {name}
      </span>
    ) : null;
  }
}
