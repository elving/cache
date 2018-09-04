import isSearch from 'lib/isSearch';
import { clone, forEach, isEmpty, without } from 'lodash';

export default function buildFilters(currentFilters, newFilter) {
  let filters = clone(currentFilters);

  if (isSearch(newFilter)) {
    let searchFound = false;

    // Using lodash's `forEach` function here because I can
    // exit early when the search filter is found.
    forEach(filters, function(filter, index) {
      if (isSearch(filter)) {
        searchFound = true;

        if (newFilter === 'search-') {
          delete filters[index];
        } else {
          filters[index] = newFilter;
        }

        return false;
      }
    });

    if (!searchFound && !(isEmpty(filters) && newFilter === 'search-')) {
      filters.push(newFilter);
    }
  } else if (filters.indexOf(newFilter) !== -1) {
    filters = without(filters, newFilter);
  } else {
    filters.push(newFilter);
  }

  return filters;
}
