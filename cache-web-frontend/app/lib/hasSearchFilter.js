import { find } from 'lodash';
import isSearch from 'lib/isSearch';
import cleanFilters from 'lib/cleanFilters';

export default function hasSearchFilter(filters) {
  return find(cleanFilters(filters), function(filter) {
    return isSearch(filter);
  }) !== undefined;
}
