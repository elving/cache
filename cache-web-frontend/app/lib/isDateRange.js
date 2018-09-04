export default function isDateRange(value) {
  return (/^(from\-|to\-)/).test(value) === true;
}
