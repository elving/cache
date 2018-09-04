export default function isSearch(value) {
  return (/^(search\-)/).test(value) === true;
}
