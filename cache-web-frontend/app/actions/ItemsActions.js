import { Actions } from 'flummox';

import DB from 'lib/db';
import { last, defaults } from 'lodash';

export default class ItemsActions extends Actions {
  select(item) {
    return item;
  }

  filter(filters) {
    return filters;
  }

  search(keyword) {
    return keyword;
  }

  showDeleteModal() {
    return true;
  }

  hideDeleteModal() {
    return true;
  }

  showCreateModal() {
    return true;
  }

  hideCreateModal() {
    return true;
  }

  async fetch(collection) {
    return await DB.items.fetch(collection);
  }

  async fetchPublic(collection) {
    return await DB.items.fetchPublic(collection);
  }

  async create(item) {
    // TODO: Use a Class here to avoid this kind of things. It will also
    // make edits easier in store.
    defaults(item, {
      meta: {},
      tags: [],
      highlighted: false,
      storingMethod: 'app-web'
    });

    return await DB.items.create(item);
  }

  async edit(id, changes) {
    delete changes.collection;
    return await DB.items.edit(id, changes);
  }

  async move(id, collection) {
    return await DB.items.updateCollection(id, collection);
  }

  async toggleHighlight(id, highlighted) {
    return await DB.items.edit(id, { highlighted });
  }

  async delete(item) {
    return await DB.items.delete(item);
  }

  async fetchTags() {
    return await DB.items.fetchTags();
  }
}
