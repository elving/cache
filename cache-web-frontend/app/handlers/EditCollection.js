import React from 'react';
import { Link } from 'react-router';

import AppIcon from 'components/AppIcon';
import CollectionForm from 'components/CollectionForm';
import needsAuthentication from 'lib/needsAuthentication';

@needsAuthentication
export default class EditCollection extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <div className="content__title">
          <h1 className="content__title__text">Edit collection</h1>
          <div className="content__title__actions">
            <Link
              to="collection"
              params={{collection: this.props.params.collection}}
              className="button button--transparent button--icon-only"
              data-action="closeCollectionForm"
            >
              <span className="button__icon">
                <AppIcon name="close" size="22px"/>
              </span>
            </Link>
          </div>
        </div>

        <CollectionForm
          icon={this.props.currentCollection.icon}
          name={this.props.currentCollection.name}
          onSubmit={this.onFormSubmit.bind(this)}
          isDisabled={
            this.props.isFetchingCollections ||
            this.props.isEditingACollection
          }
          buttonText={'Save changes'}
          description={this.props.currentCollection.description}
          disabledButtonText={'Saving changes...'}/>
      </div>
    );
  }

  onFormSubmit(formData) {
    this.context.flux.getActions('collections').edit(
      this.props.params.collection, formData
    ).then(() => {
      this.context.flux.getActions('notifications').notify(
        'success', 'Collection edited successfully!'
      );

      setTimeout(() => {
        this.context.router.transitionTo('collection', {
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
