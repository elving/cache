export default function isKeyword(value) {
  return (/^(keyword\-)/).test(value) === true;
}
