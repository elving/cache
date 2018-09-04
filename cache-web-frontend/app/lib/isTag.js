export default function isTag(value) {
  return (/^(tag\-)/).test(value) === true;
}
