import { last } from 'lodash';

export default function getServiceData(url) {
  let id, split;
  const isVine = /vine\.co\/v\/([a-zA-z0-9_]*)/;
  const isVimeo = /vimeo\.com\/([a-zA-z0-9_]*)/;
  const isImgur = /imgur\.com\/gallery\/([a-zA-z0-9_]*)/;
  const isGiphy = /giphy.com\/gifs\/([a-zA-z0-9_]*)/;
  const isYoutube = /youtube\.com\/watch\?v=([a-zA-z0-9_]*)/;
  const isTwitter = /twitter.com\/([a-zA-z0-9_]*)\/status\/([a-zA-z0-9_]*)/;
  const isInstagram = /instagram\.com\/p\/([a-zA-z0-9_]*)/;
  const isSoundCloud = /soundcloud\.com\/([a-zA-z0-9_-]*)\/([a-zA-z0-9_-]*)/;
  const isSpotifyAlbum = /spotify.com\/album\/([a-zA-z0-9_]*)/;
  const isSpotifyTrack = /spotify.com\/track\/([a-zA-z0-9_]*)/;
  const isSpotifyPlaylist = (
    /spotify.com\/user\/([a-zA-z0-9_]*)\/playlist\/([a-zA-z0-9_]*)/
  );
  const isSpotifyAlbumTrack = (
    /spotify.com\/album\/([a-zA-z0-9_]*)\/([a-zA-z0-9_]*)/
  );

  if (isYoutube.test(url)) {
    id = last(url.split('v='));

    return {
      service: 'youtube',
      serviceId: id ? id.replace('/', '') : null
    };
  } else if (isVimeo.test(url)) {
    id = last(url.split('/'));

    return {
      service: 'vimeo',
      serviceId: id ? id.replace('/', '') : null
    };
  } else if (isVine.test(url)) {
    id = last(url.split('/v/'));

    return {
      service: 'vine',
      serviceId: id ? id.replace('/', '') : null
    };
  } else if (isSoundCloud.test(url)) {
    id = encodeURIComponent(url);

    return {
      service: 'soundcloud',
      serviceId: id || null
    };
  } else if (isInstagram.test(url)) {
    id = last(url.split('/p/'));

    return {
      service: 'instagram',
      serviceId: id ? id.replace('/', '') : null
    };
  } else if (isImgur.test(url)) {
    id = last(url.split('/gallery/'));

    return {
      service: 'imgur',
      serviceId: id ? id.replace('/', '') : null
    };
  } else if (isGiphy.test(url)) {
    id = last(url.split('/gifs/'));

    if (id) {
      id = last(id.split('-'));
    }

    return {
      service: 'giphy',
      serviceId: id ? id.replace('/', '') : null
    };
  } else if (isTwitter.test(url)) {
    id = last(url.split('/status/'));

    return {
      service: 'twitter',
      serviceId: id ? id.replace('/', '') : null
    };
  } else if (isSpotifyAlbum.test(url) ||
  isSpotifyTrack.test(url) ||
  isSpotifyPlaylist.test(url) ||
  isSpotifyAlbumTrack.test(url)) {
    id = url.replace(/\?.+$/, '');

    return {
      service: 'spotify',
      serviceId: id || null
    };
  } else {
    return null;
  }
}
