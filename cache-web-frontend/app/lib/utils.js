import { last } from 'lodash';

export function truncate(str, limit = 140) {
  return str && str.length > limit
    ? (str.substring(0, limit - 3) + '...')
    : str;
}

export function favicon(url) {
  return `https://www.google.com/s2/favicons?domain_url=${url}`;
}

export function domain(url) {
  const link = document.createElement('a');
  link.href = url;
  return link.hostname.replace('www.', '');
}

export function extension(url) {
  const match = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
  return match ? last(match).replace('.', '') : '';
}
