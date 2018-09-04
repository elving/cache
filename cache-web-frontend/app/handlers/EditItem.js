import React from 'react';
import { Link } from 'react-router';
import { isEmpty } from 'lodash'

import AppIcon from 'components/AppIcon';
import ItemForm from 'components/ItemForm';
import needsAuthentication from 'lib/needsAuthentication';

@needsAuthentication
export default class EditItem extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  render() {
    const { currentItem } = this.props;
    const { item, collection } = this.props.params;

    return (
      <div>
        <div className="content__title">
          <h1 className="content__title__text">Edit item</h1>
          <div className="content__title__actions">
            <Link
              to="item"
              params={{item, collection}}
              className="button button--transparent button--icon-only">
              <span className="button__icon">
                <AppIcon name="close" size="22px"/>
              </span>
            </Link>
          </div>
        </div>

        {!isEmpty(currentItem) && currentItem.objectId === item ? (
          <ItemForm
            item={currentItem}
            allTags={this.props.tags}
            onSubmit={this.onFormSubmit.bind(this)}
            isSaving={this.props.isEditingAnItem}
            isDisabled={this.props.isFetchingItems}
            buttonText={'Save changes'}
            collection={this.props.params.collection}
            collections={this.props.collections}
            hasCollections={this.props.hasCollections}
            savingButtonText={'Saving changes...'}
            showCollectionChooser={false}
          />
        ) : null}
      </div>
    );
  }

  onFormSubmit(formData) {
    delete formData.newCollectionName;
    delete formData.newCollectionIcon;
    delete formData.showCollectionForm;

    this.context.flux.getActions('items').edit(
      this.props.params.item, formData
    ).then(() => {
      this.context.flux.getActions('notifications').notify(
        'success', 'Item edited successfully!'
      );

      setTimeout(() => {
        this.context.router.transitionTo('item', {
          item: this.props.params.item,
          collection: this.props.params.collection
        });
      }, 0);
    }).catch((response) => {
      this.context.flux.getActions('notifications').notify(
        'error', response.error
      );
    });
  }
}
