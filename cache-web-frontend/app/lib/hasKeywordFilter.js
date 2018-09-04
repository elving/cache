import { find } from 'lodash';
import isKeyword from 'lib/isKeyword';
import cleanFilters from 'lib/cleanFilters';

export default function hasKeywordFilter(filters) {
  return find(cleanFilters(filters), function(filter) {
    return isKeyword(filter);
  }) !== undefined;
}
