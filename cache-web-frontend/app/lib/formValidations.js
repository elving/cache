export function isUrl(value) {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(value.trim());
}

export function isEmail(value) {
  return /^[\+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
    value.trim()
  );
}

export function isISODate(value) {
  return /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/.test(
    value.trim()
  );
}

export function isRequired(value) {
  return (value !== undefined && value !== null) && value.trim() !== '';
}

export function isEqual(value, expected) {
  return value.trim() === expected;
}

export function isMinimum(value, minimum) {
  return parseInt(value.trim(), 10) >= minimum;
}

export function isMaximum(value, maximum) {
  return parseInt(value.trim(), 10) <= maximum;
}

export function isOfLength(value, length) {
  return value.length === length;
}

export function isOfMinimumLength(value, minimum) {
  return value.length >= minimum;
}

export function isOfMaximumLength(value, maximum) {
  return value.length <= maximum;
}

export function isOneOf(value, types) {
  return types.indexOf(value.trim()) !== -1;
}

export function isValidPasswordLength(value) {
  return value.length >= 8;
}

export function isValidUsernameLength(value) {
  return value.length >= 3;
}

export function isValidNameLength(value) {
  return value.length <= 50;
}

export function isValidDescriptionLength(value) {
  return value.length <= 140;
}
