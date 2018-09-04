import { isArray } from 'lodash';

export default function cleanFilters(filters) {
  return isArray(filters)
    ? filters.map((filter) => { return filter.replace(/\/$/, ''); })
    : [];
}
