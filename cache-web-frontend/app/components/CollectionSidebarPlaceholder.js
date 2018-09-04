import React, { Component } from 'react';
import AppIcon from 'components/AppIcon';

export default class CollectionSidebarPlaceholder extends Component {
  render() {
    return (
      <div className="collection-sidebar">
        <div className="collections-placeholder__dark-filter">
          <AppIcon name="collapse" size="24px" color="#62676f"/>
        </div>
        <div className="collections-placeholder__filters">
          <div className="collections-placeholder__filter">
            <AppIcon name="search" size="24px" color="#62676f"/>
          </div>
          <div className="collections-placeholder__filter">
            <AppIcon name="highlight" size="24px" color="#62676f"/>
          </div>
        </div>
        <div className="collections-placeholder__filters">
          <AppIcon name="link" size="24px" color="#62676f"/>
          <AppIcon name="text" size="24px" color="#62676f"/>
          <AppIcon name="image" size="24px" color="#62676f"/>
          <AppIcon name="video" size="24px" color="#62676f"/>
          <AppIcon name="audio" size="24px" color="#62676f"/>
        </div>
        <div className="collections-placeholder__filters">
          <div className="collections-placeholder__color"></div>
          <div className="collections-placeholder__color"></div>
          <div className="collections-placeholder__color"></div>
          <div className="collections-placeholder__color"></div>
          <div className="collections-placeholder__color"></div>
          <div className="collections-placeholder__color"></div>
        </div>
      </div>
    );
  }
}
