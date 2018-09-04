import React from 'react';
import { Link } from 'react-router';

import AppIcon from 'components/AppIcon';
import CollectionSwitcher from 'components/CollectionSwitcher';

export default class ItemActions extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object
  }

  render() {
    return (
      <div className="item__actions">
        <Link
          to="item"
          params={{item: this.props.id, collection: this.props.collection}}
          onClick={this.onDetailClick.bind(this)}
          className="item__action">
          <AppIcon name="detail" size="24px" color="#889094"/>
        </Link>

        <a href={this.props.directUrl} target="_blank" className="item__action">
          <AppIcon name="source" size="24px" color="#889094"/>
        </a>

        {this.renderHighlightButton()}

        {this.renderActions()}
      </div>
    );
  }

  renderHighlightButton() {
    return this.props.userIsOwnerOfCurrentCollection ? (
      <button
        type="button"
        onClick={this.onHighlightClick.bind(this)}
        className="item__action">
        <span>
          {this.renderHighlightIcon()}
        </span>
      </button>
    ) : (
      this.renderHighlightIcon()
    )
  }

  renderHighlightIcon() {
    const styles = this.props.userIsOwnerOfCurrentCollection
      ? {}
      : { margin: 10 };

    return this.props.highlighted ? (
      <AppIcon name="highlight" size="22px" color="#2f9ee8" style={styles}/>
    ) : (
      <AppIcon name="highlight" size="22px" color="#889094" style={styles}/>
    )
  }

  renderActions() {
    return this.props.userIsOwnerOfCurrentCollection ? (
      <div className="dropdown dropdown--light dropdown--item dropdown--up">
        <div className="dropdown__toggler">
          <AppIcon
            size="21px"
            name="settings"
            className="dropdown__toggler__icon"/>
        </div>

        <div className="dropdown__items">
          <Link
            to="edit-item"
            params={{item: this.props.id, collection: this.props.collection}}
            className="dropdown__item">
            Edit
          </Link>
          <div className="dropdown__item">
            <CollectionSwitcher
              item={this.props.id}
              collection={this.props.collection}/>
          </div>
        </div>
      </div>
    ) : null;
  }

  onDetailClick() {
    this.context.flux.getActions('app').showSidebar();
    this.context.flux.getActions('items').select(this.props.id);
  }

  onHighlightClick() {
    this.context.flux.getActions('items').toggleHighlight(
      this.props.id, !this.props.highlighted
    );
  }
}
