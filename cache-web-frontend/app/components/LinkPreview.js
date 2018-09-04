import React, { Component } from 'react';
import { truncate } from 'lib/utils';

import AppIcon from 'components/AppIcon';
import VinePlayer from 'components/VinePlayer';
import GiphyViewer from 'components/GiphyViewer';
import VimeoPlayer from 'components/VimeoPlayer';
import TwitterCard from 'components/TwitterCard';
import ImgurGallery from 'components/ImgurGallery';
import SpotifyPlayer from 'components/SpotifyPlayer';
import YoutubePlayer from 'components/YoutubePlayer';
import ImageContainer from 'components/ImageContainer';
import InstagramViewer from 'components/InstagramViewer';
import SoundCloudPlayer from 'components/SoundCloudPlayer';

export default class LinkPreview extends Component {
  render() {
    return (
      <div className="ItemPreview LinkItemPreview">
        {this.renderPreview()}
      </div>
    );
  }

  renderPreview() {
    const { meta } = this.props;

    if (meta.service) {
      switch (meta.service) {
        case 'youtube':
          return (
            <YoutubePlayer
              id={meta.serviceId}
              width={300}
              height={169}
              className="LinkDetail__iframe"/>
          );

        case 'vimeo':
          return (
            <VimeoPlayer
              id={meta.serviceId}
              width={300}
              height={169}
              className="LinkDetail__iframe"/>
          );

        case 'vine':
          return (
            <VinePlayer
              id={meta.serviceId}
              width={300}
              height={300}
              className="LinkDetail__iframe"/>
          );

        case 'soundcloud':
          return (
            <SoundCloudPlayer
              url={this.props.sourceUrl}
              width={300}
              height={300}
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
              width={300}
              height={300}
              className="LinkDetail__iframe"/>
          );

        case 'giphy':
          return (
            <GiphyViewer
              id={meta.serviceId}
              width={300}
              height={300}
              className="LinkDetail__iframe"/>
          );

        case 'twitter':
          return (
            <TwitterCard
              url={this.props.sourceUrl}
              width={300}
              height={300}
              className="LinkDetail__iframe"/>
          );

        case 'spotify':
          return (
            <SpotifyPlayer
              url={meta.serviceId}
              width={300}
              height={300}
            />
          );

        default:
          return (
            <a
              href={this.props.directUrl}
              title={this.props.directUrl}
              target="_blank"
              className="LinkItemPreview__url">
              {truncate(this.props.directUrl)}
            </a>
          );
      }
    } else {
      return (
        <a
          href={this.props.directUrl}
          title={this.props.directUrl}
          target="_blank"
          className="LinkItemPreview__url">
          {this.renderCover()}
          {truncate(this.props.directUrl)}
        </a>
      );
    }
  }

  renderCover() {
    const { meta } = this.props;

    return meta.cover ? (
      <ImageContainer
        src={meta.cover}
        width="250px"
        height="250px"
        className="LinkItemPreview__cover"
      />
    ) : null;
  }
}
