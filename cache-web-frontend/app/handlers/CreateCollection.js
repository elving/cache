import React from 'react';
import { Link } from 'react-router';
import session from 'lib/session';
import classNames from 'classnames';

import AppIcon from 'components/AppIcon';
import CollectionForm from 'components/CollectionForm';
import needsAuthentication from 'lib/needsAuthentication';

@needsAuthentication
export default class CreateCollection extends React.Component {
  static contextTypes = {
    flux: React.PropTypes.object,
    router: React.PropTypes.func.isRequired
  }

  render() {
    const titleClasses = classNames({
      'content__title': true,
      'content__title--has-no-collections': !this.props.hasCollections
    });

    return (
      <div>
        <div className={titleClasses}>
          <h1 className="content__title__text">Create a collection</h1>
          <div className="content__title__actions">
            <Link
              to="collections"
              className="button button--transparent button--icon-only">
              <span className="button__icon">
                <AppIcon name="close" size="22px"/>
              </span>
            </Link>
          </div>
        </div>

        <CollectionForm
          onSubmit={this.onFormSubmit.bind(this)}
          isDisabled={
            this.props.isFetchingCollections ||
            this.props.isCreatingACollection
          }
          buttonIcon={'create'}
          buttonText={'Create collection'}
          disabledButtonText={'Creating collection...'}
          isCreatingACollection={this.props.isCreatingACollection}/>
      </div>
    );
  }

  onFormSubmit(formData) {
    this.context.flux.getActions('collections').create(
      formData
    ).then((response) => {
      this.context.flux.getActions('notifications').notify(
        'success', 'Collection created successfully!'
      );

      setTimeout(() => {
        this.context.router.transitionTo('collection', {
          collection: response.objectId
        });
      }, 0);
    }).catch((response) => {
      this.context.flux.getActions('notifications').notify(
        'error', response.error
      );
    });
  }
}
