import React, { Component } from 'react';
import { domain } from 'lib/utils';

import VinePlayer from 'components/VinePlayer';
import VimeoPlayer from 'components/VimeoPlayer';
import GiphyViewer from 'components/GiphyViewer';
import TwitterCard from 'components/TwitterCard';
import ImgurGallery from 'components/ImgurGallery';
import YoutubePlayer from 'components/YoutubePlayer';
import SpotifyPlayer from 'components/SpotifyPlayer';
import ImageContainer from 'components/ImageContainer';
import ItemDetailTags from 'components/ItemDetailTags';
import InstagramViewer from 'components/InstagramViewer';
import SoundCloudPlayer from 'components/SoundCloudPlayer';
import ItemDetailHeader from 'components/ItemDetailHeader';
import ItemDetailDescription from 'components/ItemDetailDescription';

export default class LinkDetail extends Component {
  render() {
    const title = this.props.title || domain(this.props.directUrl);
    const { userIsOwnerOfCurrentCollection } = this.props;

    return (
      <div className="ItemDetail LinkDetail">
        <ItemDetailHeader
          date={this.props.createdAt}
          itemId={this.props.objectId}
          collectionId={this.props.collection.objectId}
          collectionName={this.props.collection.name}
          userIsOwnerOfCurrentCollection={userIsOwnerOfCurrentCollection}/>

        <div className="ItemDetail__content">
          <h1 className="ItemDetail__title">{title}</h1>

          <div style={{width: '90%', margin: '0 auto'}}>
            {this.renderContent()}
          </div>

          <div className="ItemDetail__meta" data-color={this.props.color}>
            <ItemDetailDescription description={this.props.description}/>
            <ItemDetailTags tags={this.props.tags}/>
            {this.renderSource()}
          </div>
        </div>
      </div>
    );
  }

  renderContent() {
    const { meta } = this.props;

    if (meta.service) {
      switch (meta.service) {
        case 'youtube':
          return (
            <YoutubePlayer
              id={meta.serviceId}
              width={560}
              height={315}
              className="LinkDetail__iframe"/>
          );

        case 'vimeo':
          return (
            <VimeoPlayer
              id={meta.serviceId}
              width={500}
              height={281}
              className="LinkDetail__iframe"/>
          );

        case 'vine':
          return (
            <VinePlayer
              id={meta.serviceId}
              width={500}
              height={500}
              className="LinkDetail__iframe"/>
          );

        case 'soundcloud':
          return (
            <SoundCloudPlayer
              url={this.props.sourceUrl}
              width={500}
              height={500}
              clientId={'fc818bd310d558ff91ec26d4ed797a26'}/>
          );

        case 'instagram':
          return (
            <InstagramViewer
              id={meta.serviceId}
              className="LinkDetail__iframe"/>
          );

        case 'imgur':
          return (
            <ImgurGallery
              id={meta.serviceId}
              width={500}
              height={500}
              className="LinkDetail__iframe"/>
          );

        case 'giphy':
          return (
            <GiphyViewer
              id={meta.serviceId}
              width={500}
              height={500}
              className="LinkDetail__iframe"/>
          );

        case 'twitter':
          return (
            <TwitterCard
              url={this.props.sourceUrl}
              width={500}
              height={500}
              className="LinkDetail__iframe"/>
          );

        case 'spotify':
          return (
            <SpotifyPlayer
              url={meta.serviceId}
              width={500}
              height={500}
            />
          );

        default:
          return (
            <a
              href={this.props.directUrl}
              target="_blank"
              className="LinkDetail__url">
              {this.props.directUrl}
            </a>
          );
      }
    } else if (meta.cover) {
      return (
        <span>
          <ImageContainer src={meta.cover} maxWidth="600px" maxHeight="600px"/>
          <a
            href={this.props.directUrl}
            target="_blank"
            className="LinkDetail__url">
            {this.props.directUrl}
          </a>
        </span>
      );
    } else {
      return (
        <a
          href={this.props.directUrl}
          target="_blank"
          className="LinkDetail__url">
          {this.props.directUrl}
        </a>
      );
    }
  }

  renderSource() {
    return this.props.meta.service ? (
      <div className="ItemDetail__source-wrapper">
        <a
          href={this.props.sourceUrl}
          target="_blank"
          className="ItemDetail__source button button--primary">
          <span>
            {`See in ${domain(this.props.sourceUrl)}`}
          </span>
        </a>
      </div>
    ) : null;
  }
}
