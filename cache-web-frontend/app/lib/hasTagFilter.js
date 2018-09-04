import { find } from 'lodash';
import isTag from 'lib/isTag';
import cleanFilters from 'lib/cleanFilters';

export default function hasTagFilter(filters) {
  return find(cleanFilters(filters), function(filter) {
    return isTag(filter);
  }) !== undefined;
}
