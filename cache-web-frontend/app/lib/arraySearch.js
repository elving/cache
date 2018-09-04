const arraySearch = {
  findString(term, source) {
    let matches = [];

    term = term.toLowerCase();

    source.forEach(function(item) {
      const _item = item.toLowerCase();
      const regexp = new RegExp(term);

      if (_item.startsWith(term) || regexp.test(_item)) {
        matches.push(item);
      }
    });

    return matches;
  }
};

export default arraySearch;
