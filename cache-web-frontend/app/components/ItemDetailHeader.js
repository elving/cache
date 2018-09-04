import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import AppIcon from 'components/AppIcon';
import CollectionSwitcher from 'components/CollectionSwitcher';

export default class ItemDetailHeader extends Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="ItemDetail__header">
        <div className="ItemDetail__header__left">
          <span className="ItemDetail__date">
            Stored in <strong>
              <Link
                to="collection"
                params={{collection: this.props.collectionId}}>
                {this.props.collectionName}
              </Link>
            </strong> on &nbsp;
            <strong title={this.renderFullDate()}>
              {this.renderDateFromNow()}
            </strong>
          </span>
        </div>
        <div className="ItemDetail__header__right">
          {this.renderActions()}
        </div>
      </div>
    );
  }

  renderDateFromNow() {
    return moment(this.props.date).fromNow();
  }

  renderFullDate() {
    return moment(this.props.date).format('dddd, MMMM Do YYYY, h:mm A');
  }

  renderActions() {
    return this.props.userIsOwnerOfCurrentCollection ? (
      <div className="dropdown dropdown--light">
        <div className="dropdown__toggler dropdown__toggler--squared">
          <AppIcon
            size="22px"
            name="settings"
            className="dropdown__toggler__icon"/>
        </div>

        <div className="dropdown__items">
          <Link
            to="edit-item"
            params={{
              item: this.props.itemId,
              collection: this.props.collectionId
            }}
            className="dropdown__item">
            Edit
          </Link>
          <a
            href="#"
            onClick={this.showDeleteModal.bind(this)}
            className="dropdown__item">
            Delete
          </a>
          <div className="dropdown__item">
            <CollectionSwitcher
              item={this.props.itemId}
              onMove={this.handleCollectionMove.bind(this)}
              collection={this.props.collectionId}/>
          </div>
        </div>
      </div>
    ) : null;
  }

  handleCollectionMove(collection) {
    this.context.router.transitionTo('collection', { collection });
  }

  showDeleteModal(event) {
    event.preventDefault();
    this.context.flux.getActions('items').showDeleteModal();
  }
}
